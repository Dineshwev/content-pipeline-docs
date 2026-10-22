---
title: Implementing a Single Source of Truth Without Creating Data Drift
sidebar_position: 21
---

# Implementing a Single Source of Truth Without Creating Data Drift

## Short answer

Choose one canonical representation, derive other views from it, and record
freshness, ownership, and rebuild status. Duplicated fields are acceptable only
when synchronization is explicit and observable.

The safest design is not always “store everything in one table.” It is “make
one representation authoritative and make every other representation
replaceable.” This lets a system support search, filtering, and presentation
without allowing each view to become an independent source of truth.

## Target audience

This article is for:

- Developers designing internal data systems
- Engineers maintaining documentation stores or content pipelines
- Technical leads dealing with duplicated records
- Teams adding search indexes, caches, or read models

It assumes familiarity with application data and asynchronous jobs, but not
with a particular database or search provider.

The owner-oriented companion explains why this matters to the business:

[The Business Case for a Single Source of Truth](../owner-oriented-articles/owner-single-source-of-truth)

## The problem

A system often stores the same information in several useful forms:

- A Markdown page for readers
- Structured fields for filtering
- A search index for discovery
- A cache for fast responses
- An export for another team
- An analytics table for reporting

That duplication is not automatically wrong. Each representation can serve a
different purpose.

The problem begins when each representation can be edited independently.

For example, a software directory might store:

```text
Markdown page:   "Best for small teams"
Structured field: ["startups", "small teams"]
Search index:    "Best for startups"
```

If someone edits only the Markdown page, the system now has three different
descriptions of the same fact. A reader may see one version while a filter or
search result uses another.

This is data drift: derived representations no longer reflect the record they
are meant to represent.

## Design goals

The implementation should:

1. Identify one canonical representation.
2. Make writes to that representation explicit.
3. Derive secondary views predictably.
4. Detect stale or failed projections.
5. Support retries without duplicating side effects.
6. Expose ownership and freshness to operators.
7. Allow a projection to be rebuilt from the canonical record.
8. Make migration and rollback possible.

It should not:

- Treat a cache as the source of truth.
- Allow hidden edits to generated views.
- Assume successful JSON means synchronized data.
- Depend on one manual rebuild command nobody remembers.
- Add projections before there is a real access problem.

## Choose the canonical representation

Start by deciding what the system is authoritative about. A single source can
be a document, structured record, event log, or another explicitly owned
representation.

For a content system, one possible choice is a structured document record:

```ts
type CanonicalDocument = {
  id: string;
  title: string;
  body: string;
  audience: string[];
  status: "draft" | "published" | "archived";
  version: number;
  updatedAt: string;
  updatedBy: string;
};
```

The important fields are not only `body` and `title`. `version`, `updatedAt`,
and `updatedBy` let the system determine whether a derived view reflects the
record and who changed it.

If the canonical record is Markdown instead, structured fields can be derived
from front matter or parsed content. If the canonical record is structured
data, Markdown can be rendered from it. Choose based on how people actually
edit and review the information.

## Model projections explicitly

A projection is a representation derived from the canonical record:

```ts
type Projection = {
  projectionName: "search" | "public-page" | "analytics";
  documentId: string;
  sourceVersion: number;
  generatedAt: string;
  status: "current" | "stale" | "failed";
  errorMessage?: string;
  payload: string;
};
```

Expected output:

```text
Source version: 4
Search projection version: 4
Projection status: current
```

The projection stores the source version it was built from. Comparing content
timestamps can work, but a monotonically increasing version is easier to reason
about when updates happen quickly.

## Derive, do not independently edit

Keep the transformation in a named function:

```ts
function toSearchProjection(document: CanonicalDocument): string {
  return [
    document.title,
    document.body,
    document.audience.join(" ")
  ].join("\n");
}
```

Expected output:

```text
Search text length: 428
Derived from version: 4
```

The projection should not become a second editing surface unless the system
also defines how edits are reconciled back into the canonical record. In most
cases, the safer choice is to make the projection read-only.

## Detect stale projections

Reject or rebuild a projection whose source version is behind:

```ts
function isCurrent(
  projection: Projection,
  document: CanonicalDocument
): boolean {
  return (
    projection.sourceVersion === document.version &&
    projection.status === "current"
  );
}

if (!isCurrent(projection, document)) {
  await rebuildProjection(document, projection.projectionName);
}
```

Expected output:

```text
Document version: 5
Projection version: 4
Action: rebuild search projection
```

Do not silently serve stale data for every use case. Search results may tolerate
a short delay; a customer-facing price or permission decision may not.

## Rebuild projections safely

A rebuild should be repeatable. Running it twice for the same source version
should produce the same result:

```ts
async function rebuildProjection(
  document: CanonicalDocument,
  name: Projection["projectionName"]
): Promise<void> {
  const payload = buildProjectionPayload(document, name);

  await saveProjection({
    projectionName: name,
    documentId: document.id,
    sourceVersion: document.version,
    generatedAt: new Date().toISOString(),
    status: "current",
    payload
  });
}
```

Expected output:

```text
Rebuilt projection: search
Document: tool-d9
Source version: 5
Status: current
```

If the projection is written to an external search provider, use a stable
document ID and an upsert operation where possible. That makes retries less
likely to create duplicate records.

## Handle failures and retries

Projection work often runs asynchronously. The canonical write should not be
marked unsuccessful merely because a search index is temporarily unavailable.
Instead, record the projection failure and make it visible:

```ts
async function markProjectionFailure(
  projection: Projection,
  error: Error
): Promise<void> {
  await saveProjection({
    ...projection,
    status: "failed",
    errorMessage: error.message,
    generatedAt: new Date().toISOString()
  });
}
```

Expected output:

```text
Canonical document saved: yes
Search projection: failed
Retry scheduled: yes
User-facing document: available
```

Whether a user-facing page should remain available during projection failure
depends on the product. The important point is to make the trade-off explicit
instead of hiding it behind a success-shaped response.

## Version concurrency

Two updates can arrive close together:

```text
Update A reads version 4
Update B reads version 4
Update A writes version 5
Update B writes based on version 4
```

Use optimistic concurrency or another write rule to prevent a later update
from silently overwriting an earlier one:

```ts
const updated = await updateDocument({
  id: document.id,
  expectedVersion: 4,
  body: nextBody
});

if (!updated) {
  throw new Error("Document changed; reload before saving.");
}
```

Expected output:

```text
Update A: accepted as version 5
Update B: rejected due to version conflict
```

Without this check, the projection may be perfectly synchronized with a record
that has already discarded another person's work.

## Migration strategy

Moving from multiple editable copies to one canonical source is a data
migration, not only a tooling change.

### 1. Inventory the representations

List every place the information exists and how it is used:

| Representation | Current owner | Used for | Can be edited? | Freshness |
| --- | --- | --- | --- | --- |
| Markdown | Content team | Public page | Yes | Unknown |
| Structured fields | Admin panel | Filtering | Yes | Unknown |
| Search index | Search service | Discovery | No | Automatic |

### 2. Choose the canonical record

Select the representation with the clearest ownership, safest editing path, and
best ability to preserve necessary information.

### 3. Reconcile conflicts

Do not automatically choose the newest copy without understanding what changed.
For important records, compare the versions and record the decision.

### 4. Freeze or label old editors

Once the migration starts, prevent new divergence. Make old fields read-only or
label them as deprecated.

### 5. Backfill projections

Generate the derived views from the canonical records and record the source
version used for each rebuild.

### 6. Verify before switching reads

Compare representative outputs, search behavior, filters, and public pages.
Switch gradually if the system is business-critical.

## Results and methodology

Evaluate the design with controlled tests:

| Test | Expected evidence |
| --- | --- |
| Canonical update | Version increases exactly once |
| Projection rebuild | Projection records source version |
| Retry | Same source version does not create duplicates |
| Stale projection | Rebuild or explicit stale response |
| Failed provider | Error is recorded and retryable |
| Concurrent edit | Older write is rejected |
| Migration | Conflicts are identified before cutover |
| Rollback | Previous canonical or projection state can be restored |

Useful operational metrics include:

- Number of stale projections
- Projection rebuild duration
- Failed rebuild count
- Retry count
- Version conflicts
- Time spent reconciling data
- Percentage of records with unknown freshness
- Time from canonical update to projection availability

Example output:

```text
Canonical records checked: 1,000
Current projections: 982
Stale projections: 12
Failed projections: 6
Median rebuild time: 1.8 seconds
```

These numbers are example outputs, not measurements from this repository. A
real report should include the record count, projection type, observation
period, and failure causes.

## Challenges and trade-offs

### One canonical source can become a bottleneck

If every update requires one team or service, users may create unofficial
copies to keep working. Provide a clear update path and appropriate access
instead of treating central control as the solution.

### Derived views improve access but add consistency work

Search indexes and read models can make the system faster and easier to use,
but every projection needs rebuild logic, monitoring, and failure handling.

### Eventual consistency may be acceptable

A search result that updates in a few seconds may be fine. A permission or
pricing decision based on old data may not be. Define acceptable staleness per
projection rather than applying one rule to all data.

### Rebuilding can be expensive

Large projections may require queues, batching, rate limits, and progress
tracking. A full rebuild should not overwhelm the canonical database or an
external provider.

### Generated content creates a special drift risk

If AI-generated Markdown and structured fields are both stored, decide which is
canonical. Otherwise a human edit to one representation can silently diverge
from the other.

### History matters

Overwriting the current record may make it impossible to understand why a
change occurred. Keep an audit record or version history when the domain
requires explanation or rollback.

## When to avoid this approach

Do not add projections when:

- The data is small and already easy to access.
- There is no real performance, search, or presentation requirement.
- Nobody can own rebuild failures.
- The source changes so often that derived views are always stale.
- The projection would be another editable copy.
- A simple query or view already solves the problem.

Do not centralize information that needs separate security boundaries merely to
make the architecture look simpler.

## Limitations

This design does not eliminate incorrect data. It makes the source of an
incorrect value easier to identify.

Other limitations include:

- A canonical record can still be incomplete.
- A projection can be current but generated from a bad transformation.
- Version numbers do not explain the meaning of a change.
- External providers can fail during rebuilds.
- Eventual consistency can surprise users if it is not communicated.
- Migration conflicts may require human judgment.
- Strong synchronization can increase write latency and operational cost.

The right consistency model depends on the consequence of stale information.
Do not choose strong consistency everywhere without considering performance and
availability.

## Repository link and next steps

Keep these artifacts with the schema or service:

1. Canonical model and ownership rule
2. Projection definitions
3. Transformation functions
4. Version and concurrency policy
5. Rebuild and retry commands
6. Freshness thresholds
7. Migration and rollback procedure
8. Monitoring dashboards and alerts

Start with one projection. Prove that it can be rebuilt, monitored, and
recovered before adding more read models or external indexes.

## Final takeaway

**Duplicate data is manageable when it is derived, versioned, rebuildable, and
never mistaken for the source of truth.**
