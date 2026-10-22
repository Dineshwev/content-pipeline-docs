---
title: Measuring the Cost of Rewriting the Same Information
sidebar_position: 11
---

# Measuring the Cost of Rewriting the Same Information

## Short answer

Measure repeated work at the point where it happens. Track request frequency,
handling time, search time, correction rate, source conflicts, and maintenance
effort. Then design the smallest reusable knowledge structure that can reduce
that work without creating an unreliable second system.

The goal is not to maximize document count. The goal is to make stable,
high-value information easier to find, reuse, update, and verify.

## Target audience

This article is for developers and engineers building or maintaining:

- Internal documentation systems
- Support and ticketing workflows
- Customer knowledge bases
- Sales enablement tools
- Runbooks and operational guides
- Content pipelines
- Search and retrieval systems

It is especially relevant when the same answer appears in chat, tickets,
documents, code comments, and personal notes with no clear authority.

## The problem: duplicated text is often duplicated decision logic

Repeated writing is not always a copy-and-paste problem. A person may rewrite
the same information because:

- The authoritative source is difficult to find.
- Existing content is written for a different audience.
- The source is out of date.
- Search returns several conflicting versions.
- The answer depends on data that is not structured.
- No one trusts the existing document.
- The workflow does not link to knowledge at the moment it is needed.

If the team only creates another page, the underlying problem may remain. The
new page becomes one more version that can drift.

Model the information flow:

```text
Question arrives
  -> search existing sources
  -> decide which source is trustworthy
  -> adapt the answer to the context
  -> send or publish the response
  -> correct it if the source was stale
```

Each step can carry cost. Measure the whole path rather than only typing time.

## Establish a baseline

Record a sample of repeated requests before changing the workflow:

```ts
type RepeatedRequest = {
  topic: string;
  channel: "support" | "chat" | "sales" | "operations" | "onboarding";
  occurrences: number;
  searchMinutes: number;
  answerMinutes: number;
  correctionMinutes: number;
  sourceConflicts: number;
  risk: "low" | "medium" | "high";
};

const annualMinutes = requests.reduce(
  (total, item) =>
    total +
    item.occurrences *
      (item.searchMinutes + item.answerMinutes + item.correctionMinutes),
  0
);
```

Expected output:

```text
Annual repeated-request time: 2,460 minutes
Topics observed: 18
Conflicting-source incidents: 7
Confidence: medium
```

The figures are example output. Use a defined observation period and state how
the sample was collected.

Include time spent by the person asking and the person answering when that
waiting or coordination time affects the business. Avoid pretending all
minutes have the same economic value.

## Categorize requests before building a solution

Use categories that reveal what kind of intervention is appropriate:

| Category | Example | Likely solution |
| --- | --- | --- |
| Stable procedure | How to create a standard account | Checklist or guide |
| Current value | This month's pricing limit | Structured source with owner |
| Decision rule | When to escalate a customer issue | Decision record and examples |
| Contextual case | How should this unusual customer be handled? | Human review |
| System fact | Which fields are required by the API? | Generated reference |
| Temporary issue | Why did today's import fail? | Incident note |

Do not turn contextual cases or temporary incidents into permanent rules
without deciding whether they generalize. A knowledge system becomes noisy when
every answer is treated as reusable.

## Separate canonical data from explanatory content

Some information should have one structured source:

- Limits
- Prices
- Status definitions
- Feature availability
- Retention periods
- Configuration values

Other information needs explanation:

- How to perform a task
- Why a decision was made
- What an exception looks like
- How to troubleshoot a failure

Keep the relationship explicit:

```ts
type CanonicalFact = {
  key: string;
  value: string;
  effectiveFrom: string;
  owner: string;
  sourceUrl: string;
  version: number;
};

type KnowledgeArticle = {
  id: string;
  title: string;
  audience: "customer" | "support" | "engineering" | "operations";
  body: string;
  canonicalFactKeys: string[];
  reviewAfter: string;
  owner: string;
};
```

An article should not silently duplicate a changing value if it can link to the
canonical fact. This reduces drift when the value changes.

## Choose a source-of-truth strategy

Common strategies include:

### One authoritative document

Useful for small teams and stable procedures. Easy to understand, but
harder to reuse across different audiences.

### Structured source plus generated views

Useful when customers, support staff, and engineers need different
presentations of the same facts. Requires validation and publishing logic.

### Distributed ownership with explicit links

Useful when different teams own different domains. Requires clear ownership
and conflict resolution.

Choose based on update frequency, audience, and consequence of inconsistency.
Do not introduce a database or content platform merely because a document has
become inconvenient.

## Build search around the question people ask

People do not always use the official title of an article. They search for:

- Error messages
- Customer language
- Old terminology
- Short descriptions
- Product names
- Symptoms rather than causes

Capture search terms and failed searches:

```ts
type SearchEvent = {
  query: string;
  resultIds: string[];
  selectedId?: string;
  resolved: boolean;
  durationMs: number;
  occurredAt: string;
};
```

Useful search measures:

- Zero-result rate
- Search-to-click rate
- Time from question to selected source
- Repeat searches before resolution
- Search result correction reports
- Queries that lead to an outdated document

Do not treat a click as a successful answer. A user may open a result, fail to
find the needed detail, and ask a person anyway.

## Link knowledge to the workflow

A separate documentation portal cannot solve every context problem. Surface
relevant guidance where the task happens:

- Link setup instructions from the account form.
- Link escalation rules from the support status field.
- Link runbooks from alerts.
- Link policy explanations from approval requests.
- Link API reference from generated errors.

The link should identify the scope and effective date when a wrong answer has
meaningful consequences.

## Define content freshness and ownership

Every reusable item should have:

- An owner
- An audience
- A source
- An effective date
- A review trigger
- A correction path

```ts
type FreshnessPolicy = {
  reviewAfterDays: number;
  triggers: Array<
    "product-change" |
    "policy-change" |
    "customer-report" |
    "vendor-change" |
    "incident"
  >;
};
```

Prefer event-driven review over a calendar alone. A page about an API limit
should be reviewed when the API changes, even if its quarterly review is still
months away.

Do not automatically label content stale only because its date passed. The
system should route it for review and make the uncertainty visible.

## Add validation for high-risk information

Validation can catch drift between structured sources and published content:

```ts
type ValidationIssue = {
  articleId: string;
  rule: "missing-owner" | "expired-review" | "broken-link" | "stale-fact";
  message: string;
};

function validateArticle(article: KnowledgeArticle): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!article.owner) {
    issues.push({
      articleId: article.id,
      rule: "missing-owner",
      message: "Knowledge article has no accountable owner"
    });
  }

  if (new Date(article.reviewAfter) < new Date()) {
    issues.push({
      articleId: article.id,
      rule: "expired-review",
      message: "Knowledge article requires review"
    });
  }

  return issues;
}
```

For important procedures, validation may include:

- Required headings
- Approved links
- Current API or configuration values
- Working examples
- Permissions and escalation instructions
- Presence of an effective date

Validation should surface a problem. It should not silently publish a
success-shaped fallback when the source is missing or stale.

## Measure duplicate and conflicting sources

A content inventory can identify likely duplicates:

```ts
type ContentRecord = {
  id: string;
  title: string;
  bodyHash: string;
  topicKeys: string[];
  owner?: string;
  updatedAt: string;
};

function duplicateGroups(records: ContentRecord[]) {
  const groups = new Map<string, ContentRecord[]>();

  for (const record of records) {
    const group = groups.get(record.bodyHash) ?? [];
    group.push(record);
    groups.set(record.bodyHash, group);
  }

  return [...groups.values()].filter((group) => group.length > 1);
}
```

Exact hashes catch identical copies, not semantically conflicting text. Add
topic keys, links, or human review for content that says similar things in
different words.

Measure:

- Number of active pages for one topic
- Number of conflicting values
- Number of links to obsolete pages
- Number of duplicate templates
- Time required to identify the current version

Do not automatically delete duplicates. Some pages may serve different
audiences. Mark the authoritative source and redirect or rewrite deliberately.

## Measure the after-state with the same categories

After introducing reusable knowledge, repeat the baseline measurement:

```text
Metric                         Before       After        Change
--------------------------------------------------------------------
Repeated requests               64/month     38/month     -41%
Median search time              7 min        2.5 min      -64%
Median answer time              12 min       6 min        -50%
Conflicting-source incidents    7/month      2/month      -71%
Knowledge maintenance           0 hours      5 hours      +5 hours
```

These figures are an example report shape. Include:

- Comparable periods
- Same request categories
- Sample size
- Product or staffing changes
- Excluded work
- Maintenance and support effort

Calculate net effect:

```text
net time reduction =
  repeated work before
  - repeated work after
  - maintenance work
  - new search or review work
```

Do not claim that all reduction came from the documentation system if the
product, staffing, or customer population changed at the same time.

## Measure content quality, not just usage

High page views can mean the content is useful or that users cannot find the
answer quickly. Add outcome signals:

- Search resolved without escalation
- Support case reopened
- Correction reported
- User followed the procedure successfully
- Link or example failed
- Customer received an incorrect answer

```ts
type KnowledgeOutcome = {
  articleId: string;
  foundAnswer: boolean;
  completedTask: boolean;
  neededEscalation: boolean;
  correctionReported: boolean;
};
```

The system should make it easy to report “this is wrong” or “this did not
answer my question.” Feedback without an owner becomes another unprocessed
queue.

## Design a small reusable-content service carefully

A simple service may expose:

```ts
interface KnowledgeRepository {
  find(query: string, audience: string): Promise<KnowledgeArticle[]>;
  get(id: string): Promise<KnowledgeArticle>;
  reportCorrection(id: string, message: string): Promise<void>;
  listDueForReview(now: Date): Promise<KnowledgeArticle[]>;
}
```

Keep retrieval separate from publishing and ownership. The search layer should
not become the authority for changing business rules.

For generated or transformed content:

- Store the source and generated version
- Record generation time and source version
- Validate required facts
- Make review status visible
- Preserve the ability to regenerate
- Avoid publishing unverified output automatically

This is particularly important when AI or templates are used to create
customer-facing explanations.

## Results and methodology

Report the system and workflow using a repeatable packet:

1. Baseline observation period
2. Request taxonomy
3. Content inventory and source-of-truth rules
4. Search and retrieval metrics
5. Freshness and validation results
6. Adoption and task outcomes
7. Maintenance and support effort
8. Comparable after-period
9. Known confounding changes
10. Recommendation and next review date

Example output:

```text
Observation period: 8 weeks
Topics measured: 24
Repeated-request reduction: 41%
Median search-time reduction: 64%
Conflicting-source incidents: 7 -> 2 per month
Maintenance effort: 5 hours per month
High-risk stale items: 1
Confidence: medium
```

Use confidence labels based on sample size, measurement consistency, and
whether other changes occurred. Do not use confidence as a substitute for
explaining the evidence.

## Challenges and trade-offs

### Search can hide a source-of-truth problem

Better ranking may help users find conflicting pages more quickly. Fix
ownership and authority, not only retrieval.

### Generated content can multiply drift

Generated views are useful when source versions and validation are explicit.
Otherwise, automation creates more copies to maintain.

### Content analytics can invade privacy

Measure the workflow outcome with the least identifying information necessary.
Set access and retention rules for search and user behavior data.

### Maintenance is a real feature cost

Every published page creates review and correction obligations. Estimate them
before creating a large content estate.

### Reduced questions can be ambiguous

Fewer requests may mean the answer became easier to find, or that users stopped
asking and worked around the problem. Pair request volume with task outcomes.

## When to avoid this approach + limitations

Avoid building a custom knowledge platform when:

- The problem is small and a maintained document is enough.
- Questions are rare and low consequence.
- An existing support or documentation system already provides ownership,
  search, review, and feedback.
- The measurement cost exceeds the cost of the repeated work.

Do not claim that a knowledge base eliminates repeated questions. New
employees, product changes, exceptions, and customer context will continue to
create demand.

Time estimates are noisy. Before-and-after data cannot prove causation without
accounting for seasonality, staffing, product changes, and demand. A search
success event also cannot prove that the answer was correct.

## Repository link and next steps

Keep the request taxonomy, measurement queries, content schema, validation
rules, and decision record together. Do not include private customer messages,
tokens, or unredacted support data in the repository.

Before implementation:

1. Define the repeated-work categories.
2. Record a baseline.
3. Decide which facts need a canonical source.
4. Assign content owners.
5. Choose the smallest useful search and feedback capability.

After launch:

1. Compare equivalent periods.
2. Review stale and conflicting content.
3. Measure task completion, not only page views.
4. Include maintenance and support in the cost model.
5. Remove unused or misleading content.
6. Revisit the design when product behavior or ownership changes.

The technical solution is successful when it reduces duplicated work without
creating a larger, less trustworthy system of duplicated information.
