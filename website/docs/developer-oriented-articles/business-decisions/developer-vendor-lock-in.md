---
title: Measuring Vendor Lock-In Before It Becomes an Incident
sidebar_position: 29
---

# Measuring Vendor Lock-In Before It Becomes an Incident

## Short answer

Treat portability as an operational capability, not as a sentence in a
contract. Identify what the vendor owns, what the application assumes, and
what the team would need to rebuild during an outage or migration.

Test export, restore, permissions, integrations, identifiers, and critical
workflows before the dependency becomes urgent. A raw data dump is useful, but
it is not proof that the business can recover.

## Target audience

This article is for developers, technical leads, and platform engineers who
operate external services, SaaS products, hosted databases, payment systems,
messaging platforms, or other dependencies that contain important data or
control business workflows.

It is most useful when:

- An external service is becoming a system of record.
- Several internal systems depend on one vendor API.
- A migration would require months of parallel work.
- The team has a backup but has never restored it.
- A proprietary feature is embedded in daily operations.
- Only one person understands the integration.

The purpose is not to avoid managed services. It is to make the dependency
visible, bounded, and recoverable enough for its business criticality.

## The problem: an export is not a recovery plan

Teams often record that a vendor supports export and consider the risk handled.
That assumption hides several separate questions:

- Does the export include every entity?
- Are attachments, comments, relationships, and history included?
- Are timestamps and user identities preserved?
- Can the data be restored without the original product?
- Can users continue the important workflow?
- Can integrations be redirected?
- Are permissions recreated safely?
- How much manual cleanup is required?
- How long does recovery take?

An export can pass a file-existence check while failing the actual business
requirement. For example, a customer-support export may contain ticket rows but
not attachments, audit history, search indexes, custom fields, or the mapping
between agents and teams.

Define the recovery objective first:

```text
Business requirement:
  customer support must resume within 24 hours of a provider outage.

Technical implication:
  critical tickets, customer references, ownership, status, and attachments
  must be recoverable in a replacement or temporary workflow.
```

Without a recovery objective, a team cannot tell whether a three-day restore is
acceptable or whether a partial export is a failure.

## Map the dependency surface

Start with an inventory of what the vendor provides and what the application
assumes:

| Surface | Questions |
| --- | --- |
| Data | Which records, relationships, files, and history are stored there? |
| Identity | Which users, roles, groups, and external IDs are required? |
| API | Which endpoints, pagination rules, webhooks, and rate limits are used? |
| Workflow | Which business rules exist only in the vendor product? |
| Integration | Which systems send or receive updates? |
| Operations | Who monitors failures and performs recovery? |
| Contract | What controls export, support, retention, and termination? |
| Cost | Which seats, API calls, storage, or usage meters can grow? |

Classify each dependency:

```ts
type Dependency = {
  name: string;
  systemOfRecord: boolean;
  criticality: "low" | "important" | "core" | "high";
  proprietaryBehavior: string[];
  upstreamSystems: string[];
  downstreamSystems: string[];
  recoveryObjectiveHours: number;
  owner: string;
};
```

The `systemOfRecord` field matters. If the vendor is not authoritative, the
team may be able to rebuild it from an internal source. If it is authoritative,
export completeness and recovery testing deserve substantially more attention.

## Record a portability profile

A portability profile makes a dependency comparable over time:

```ts
type PortabilityProfile = {
  exportStartedAt: string;
  exportCompletedAt: string;
  recordsExpected: number;
  recordsExported: number;
  attachmentsExpected: number;
  attachmentsExported: number;
  relationshipsVerified: number;
  relationshipsMissing: number;
  restoreMinutes: number;
  manualSteps: string[];
  proprietaryFeatures: string[];
  replacementCandidates: number;
  lastSuccessfulTest: string;
};
```

Calculate completeness separately for each important object rather than using
one overall percentage:

```ts
function completeness(expected: number, actual: number) {
  if (expected === 0) {
    return 1;
  }

  return Math.min(actual / expected, 1);
}

const result = {
  records: completeness(10000, 10000),
  attachments: completeness(10000, 10000),
  relationships: completeness(998, 998)
};
```

Expected output:

```text
Records: 100%
Attachments: 100%
Relationships: 100%
Recovery readiness: pending workflow verification
```

The example output describes a report shape, not a result from a universal
benchmark. Keep the measured values and the test date with the report.

## Define recovery objectives

Use familiar continuity measures:

- **RPO (recovery point objective):** how much recent data the business can
  afford to lose.
- **RTO (recovery time objective):** how long the business can operate without
  the service.

```ts
type RecoveryObjective = {
  rpoMinutes: number;
  rtoMinutes: number;
  acceptableDataLoss: string;
  minimumWorkflow: string[];
};

const supportSystemObjective: RecoveryObjective = {
  rpoMinutes: 60,
  rtoMinutes: 1440,
  acceptableDataLoss: "up to one hour of ticket updates",
  minimumWorkflow: ["view customer history", "assign owner", "record response"]
};
```

Do not choose these numbers because they look professional. Confirm them with
the business owner. A system that supports an internal convenience workflow
may tolerate a day of downtime; a system handling customer payments may not.

## Design a recurring export

An export job should be observable, repeatable, and independent enough to run
without a developer manually clicking through an interface.

```text
export()
  -> record export identifier and start time
  -> download all pages and attachments
  -> validate counts and required fields
  -> calculate checksums
  -> encrypt and store in controlled backup storage
  -> record retention and expiration
  -> alert on missing or unexpected data
```

The implementation should account for:

- Pagination and continuation tokens
- Rate limits
- Retries with backoff
- Authentication and token rotation
- Partial exports
- Changes during the export
- Attachment size limits
- API schema changes
- Deletion and retention policy

Avoid a silent best-effort export. If the export skips a page or attachment,
the job should fail clearly or produce a visible partial status.

```ts
type ExportResult = {
  status: "complete" | "partial" | "failed";
  records: number;
  attachments: number;
  missing: string[];
  checksum: string;
};

function requireCompleteExport(result: ExportResult) {
  if (result.status !== "complete" || result.missing.length > 0) {
    throw new Error(
      `Export is not complete: ${result.missing.length} items missing`
    );
  }
}
```

Store credentials separately from exported data. Limit who can retrieve the
backup, and document how access is granted during an incident. A backup that
cannot be accessed safely is not a practical recovery asset.

## Verify exports independently

Do not validate a backup only with the same vendor API that created it. An API
can report that an export succeeded while the export process omitted data.

Verify:

- Record counts against a known source
- Required fields and data types
- Unique identifiers
- Foreign-key or relationship integrity
- Attachment counts and checksums
- Timestamp handling and timezone
- User and team mappings
- Audit or history requirements
- Duplicate records
- Deleted and archived records

Example validation:

```ts
type ValidationReport = {
  missingRecords: string[];
  duplicateRecords: string[];
  missingAttachments: string[];
  brokenRelationships: string[];
};

function isPortable(report: ValidationReport) {
  return Object.values(report).every((items) => items.length === 0);
}
```

Expected output:

```text
Records restored: 10,000
Attachments verified: 10,000
Broken relationships: 0
Missing audit entries: 12
Portability status: failed for full recovery
```

The correct response to missing history is not to lower the success criteria
after the test. Either document the limitation and its business impact,
negotiate a better export, or change the recovery design.

## Restore into an independent environment

A restore test should use a separate account, environment, or destination.
Restoring into the same production tenant can hide the fact that the team
still depends on the original system.

Test the sequence:

1. Provision the destination.
2. Load the exported records.
3. Recreate identities and permissions.
4. Load attachments and relationships.
5. Configure the minimum required workflow.
6. Run smoke tests with a business representative.
7. Record duration, manual steps, and failures.
8. Destroy or retain the test environment according to policy.

```text
Provisioning: 35 minutes
Data import: 2 hours
Relationship repair: 45 minutes
Permission setup: 30 minutes
Smoke tests: 18/18 passed
Manual reconciliation: 27 records
Recovery status: usable with known gaps
```

This output is illustrative. The team should report actual timings and test
results, including the people involved.

The goal is not always to maintain a permanent replacement. For many systems,
an occasional restore test is enough to prove that the export is usable and to
measure the work required during a real migration.

## Test proprietary behavior explicitly

Portable data may not reproduce vendor-specific behavior. Identify features
that cannot be represented in a neutral format:

- Custom automation rules
- Saved searches
- Approval workflows
- Vendor-specific statuses
- Embedded scripts
- Search indexes
- Calculated fields
- Notification rules
- Access policies
- Generated reports

Create a feature inventory:

| Feature | Portable representation | Replacement work | Criticality |
| --- | --- | --- | --- |
| Customer records | JSON or CSV | Low | Core |
| Attachments | Files plus metadata | Medium | Core |
| Approval rules | None | High | Important |
| Search views | Query definitions | Medium | Important |
| Audit history | Partial export | High | Core |

Do not describe the system as portable just because the raw records can be
downloaded. Report the difference between data portability and workflow
portability.

## Isolate vendor-specific integration code

If internal systems call a vendor directly from many locations, switching costs
spread across the codebase. Use a boundary where the dependency is important:

```ts
type CustomerStatus = "new" | "active" | "resolved";

type CustomerRecord = {
  id: string;
  status: CustomerStatus;
  ownerId: string;
};

interface CustomerDirectory {
  getCustomer(id: string): Promise<CustomerRecord>;
  updateStatus(id: string, status: CustomerStatus): Promise<void>;
}
```

The adapter can translate between the internal contract and the vendor API:

```ts
class VendorCustomerDirectory implements CustomerDirectory {
  async getCustomer(id: string): Promise<CustomerRecord> {
    const response = await vendorClient.customers.get({ externalId: id });

    return {
      id,
      status: mapVendorStatus(response.status),
      ownerId: response.assignedUserId
    };
  }

  async updateStatus(id: string, status: CustomerStatus) {
    await vendorClient.customers.update({
      externalId: id,
      status: mapInternalStatus(status)
    });
  }
}
```

This boundary does not make the system vendor-neutral. It limits how far
vendor-specific names and behavior spread. Keep the interface small and based
on business operations rather than copying every vendor endpoint.

For low-risk tools, a direct integration may be entirely reasonable. Add an
adapter when it meaningfully reduces blast radius, supports testing, or
protects a core workflow.

## Preserve ownership and identifiers

Identifier mistakes can make a migration much harder than expected. Decide:

- Which system generates the canonical identifier
- Whether vendor IDs are stored as external references
- How deleted records are represented
- How user identities map after a migration
- How duplicate records are detected
- How historical references remain resolvable

Prefer stable internal IDs for important domain objects:

```ts
type ExternalReference = {
  system: "vendor-a" | "vendor-b";
  externalId: string;
  firstSeenAt: string;
};

type Customer = {
  id: string;
  externalReferences: ExternalReference[];
};
```

Do not assume a vendor ID can be reused in another system. Keep the mapping
explicit so the migration can be tested and reconciled.

## Test outages and degraded operation

Portability and resilience are related but different. A business may not need a
replacement for every outage if it can operate safely in a degraded mode.

Test:

- Read-only access during a write outage
- Local queueing of new work
- Manual intake and later reconciliation
- Cached reference data
- Delayed notifications
- Duplicate prevention after replay
- Customer communication during downtime

```text
Vendor API unavailable
  -> accept request into controlled local queue
  -> show staff that synchronization is delayed
  -> retry with stable idempotency key
  -> reconcile accepted and rejected records
  -> alert if queue age exceeds recovery objective
```

Do not queue data indefinitely without a limit, ownership, or privacy review.
A degraded mode is useful only when the team knows how it ends.

## Measure operational ownership

An exit plan that only the original developer understands is another form of
lock-in. Record:

- Who owns the integration
- Who receives alerts
- Who can rotate credentials
- Who can initiate an export
- Who validates a restore
- Who approves a migration
- Which runbooks are current

Run a handoff exercise. Ask another engineer to perform the export or restore
using the documentation. Record where they need undocumented knowledge.

```text
Handoff test:
  Operator: engineer who did not build the integration
  Task: restore the latest export into the test environment
  Result: completed with 3 documentation questions
  Action: update credentials, attachment, and relationship instructions
```

The purpose is not to punish the original author. It is to identify knowledge
that is currently stored in a person instead of in the system.

## Review contract-dependent assumptions

Some recovery capabilities exist only if a commercial term remains active.
Track them explicitly:

- Export access after cancellation
- Read-only access during a transition
- Support response time
- Data retention period
- API availability and rate limits
- Incident notification
- Assistance with migration
- Price and usage limits

Keep contractual claims separate from tested behavior:

| Claim | Evidence | Status |
| --- | --- | --- |
| Full export available | Successful test of records and files | Passed |
| Export after cancellation | Contract clause, not tested | Contract-dependent |
| Support response within four hours | Service commitment | Contract-dependent |
| Replacement workflow works | Independent restore test | Unverified |

Technical tests cannot prove a contract will be honored, and a contract cannot
prove that a migration process will work. Both forms of evidence matter.

## Results and methodology

Report portability with enough detail for a future engineer to reproduce it:

1. Dependency and business criticality
2. RPO and RTO
3. Dataset shape and size
4. Export method and version
5. Validation checks
6. Restore destination
7. Workflow smoke tests
8. Missing data and proprietary behavior
9. Manual steps and duration
10. Last successful test and next review date

Example summary:

```text
Dependency: customer support platform
Criticality: core
RPO/RTO: 60 minutes / 24 hours
Export: complete for records and attachments
Restore: 3 hours 50 minutes
Workflow: 14/16 smoke tests passed
Known gap: audit history not portable
Readiness: usable fallback, not full replacement
Next review: 2027-01-15
```

Use a readiness classification that matches the evidence:

- **Unknown:** no meaningful export or recovery test exists.
- **Partial:** some data or workflow is recoverable, with important gaps.
- **Usable fallback:** the minimum business workflow can continue.
- **Migration-ready:** data and required behavior have been tested in an
  independent destination.

Do not claim “migration-ready” when only a file download has been verified.

## Challenges and trade-offs

### Neutral formats lose behavior

CSV, JSON, and files are easier to move than proprietary workflows, but they
do not automatically preserve approvals, permissions, search, or automation.
Document which behavior must be rebuilt.

### Abstraction layers have a cost

An adapter adds code, tests, monitoring, and another place for bugs. Use it for
critical dependencies, not every SaaS product.

### Backups contain sensitive data

Exports need access controls, encryption, retention rules, and deletion
procedures. Portability work must not create an uncontrolled copy of customer
data.

### Restore tests consume engineering time

Prioritize by business impact. A quarterly restore test may be appropriate for
a core system; an annual export review may be enough for a lower-risk tool.

### Alternatives may be worse

A replacement can be technically possible but operationally inferior. Compare
support, security, performance, and user workflow rather than treating exit
itself as the goal.

## When to avoid this approach

Do not build a full secondary implementation when:

- The service is low-risk and easy to replace.
- The data is temporary or reproducible.
- The cost of maintaining the fallback exceeds the likely business impact.
- A standard, approved recovery service already provides the needed controls.
- The proposed abstraction duplicates the vendor API without reducing risk.

Use a proportionate approach: document the dependency, maintain the necessary
export, and test the highest-impact recovery behavior.

## Limitations

No portability test predicts every migration problem. Vendor APIs change,
exports may differ by plan, and a replacement system may not support the same
quality or workflow.

An independent restore can prove that a sample is usable without proving that a
large production migration will be fast. A degraded mode can reduce outage
impact without being suitable for a long-term replacement.

This method also cannot replace legal, security, or compliance review. It
provides engineering evidence so those decisions can be made with fewer hidden
assumptions.

## Repository link and next steps

Keep export jobs, validation scripts, restore instructions, smoke tests, and
dependency records together. Protect test data and credentials according to the
same policy as production data.

Before launch:

1. Identify the system of record.
2. Define RPO and RTO with the business owner.
3. Test export completeness.
4. Verify relationships, files, and identities.
5. Restore into an independent environment.
6. Run the minimum business workflow.
7. Record proprietary gaps and manual steps.

During operation:

1. Monitor export jobs and failures.
2. Rotate credentials and verify access.
3. Re-run restore tests on a defined schedule.
4. Review API, pricing, and product changes.
5. Keep at least two people able to perform recovery.
6. Reassess the dependency when criticality or usage changes.

Vendor lock-in is manageable when it is measured. The important question is not
whether a service is external. It is whether the team knows what would be lost,
how long recovery would take, and which parts of the business can still
function while the dependency is unavailable.
