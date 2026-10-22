---
title: "How to Decide Which Business Processes to Automate: An Engineering Method"
sidebar_position: 13
---

# How to Decide Which Business Processes to Automate: An Engineering Method

## Short answer

Score candidate processes by volume, repeatability, input quality, exception
rate, error impact, reversibility, and observability. Then validate the
highest-value reversible candidate in shadow mode before allowing it to change
production state.

The best automation target is not necessarily the most technically interesting
one. It is the workflow whose behavior can be defined, checked, recovered, and
owned after launch.

## Target audience

This article is for engineers, technical leads, and platform teams evaluating:

- Internal workflow automation
- Data synchronization
- Notification and routing systems
- Approval preparation
- Scheduled reports
- Support triage
- Reconciliation jobs
- AI-assisted recommendations

It is not a substitute for legal, security, compliance, or domain review when
the automation affects regulated, financial, safety, employment, or
customer-impacting decisions.

## The problem: repetition alone is not readiness

A task can be repetitive and still be a poor automation candidate:

- Inputs are incomplete or ambiguous.
- Different people apply different policies.
- Exceptions are more common than normal cases.
- The output is difficult to verify.
- A wrong action is hard to reverse.
- Failures are silent.
- Nobody owns the result.
- The workflow changes faster than the automation can be maintained.

Conversely, a process that involves judgment may still benefit from partial
automation. The system can collect information, check completeness, prepare a
recommendation, or route work while a person retains the final decision.

Separate the question:

> Which work can the system perform safely and repeatedly?

from:

> Which decisions should remain accountable to a person?

## Map the workflow before scoring it

Represent the current process as states, transitions, inputs, outputs, and
owners:

```ts
type ProcessStep = {
  id: string;
  owner: string;
  inputs: string[];
  outputs: string[];
  decision?: string;
  failureModes: string[];
};

type ProcessMap = {
  start: string;
  steps: ProcessStep[];
  terminalStates: string[];
};
```

Example:

```text
received
  -> validate required fields
  -> classify request
  -> assign queue
  -> review exception
  -> complete action
  -> notify requester
```

For each step, identify:

- System of record
- Required inputs
- State transition
- Side effects
- Audit requirement
- Retry behavior
- Human owner
- Recovery action

Do not automate a step while ignoring the transitions around it. A fast
classification step may simply move the bottleneck to an unprepared exception
queue.

## Represent candidate characteristics explicitly

Use a data structure that makes assumptions visible:

```ts
type Candidate = {
  name: string;
  monthlyVolume: number;
  repeatability: number;
  inputQuality: number;
  exceptionRate: number;
  errorImpact: number;
  reversibility: number;
  observability: number;
  ownerAssigned: boolean;
  processStable: boolean;
};
```

Use documented scales, for example:

```text
1 = low
3 = moderate
5 = high
```

Do not imply that these numbers are objective measurements. They are a
structured conversation tool. Keep the underlying evidence beside the score.

## Rank candidates without hiding vetoes

A weighted score can help prioritize low- and medium-risk work:

```ts
const score = (item: Candidate) =>
  item.monthlyVolume *
    item.repeatability *
    item.inputQuality *
    item.reversibility *
    item.observability -
  item.exceptionRate * item.errorImpact;
```

In practice, normalize the variables before combining them so volume does not
overwhelm every other factor:

```ts
const normalizedScore = (item: Candidate) =>
  0.2 * item.repeatability +
  0.2 * item.inputQuality +
  0.2 * item.reversibility +
  0.2 * item.observability +
  0.2 * (1 - item.exceptionRate);
```

Expected output:

```text
Invoice reminders: 0.84
Customer escalation triage: 0.61
Contract approval: 0.22
```

These values are illustrative. The important design is to keep vetoes separate:

- Regulated decision without required review: do not automate directly.
- No rollback for a high-impact side effect: block.
- No accountable owner: block.
- Unobservable failure: block until detection exists.

A candidate should not win because a high volume score offsets an unacceptable
security or customer-impact risk.

## Choose task automation before decision automation

Classify the proposed behavior:

### Preparation

Collect data, validate fields, summarize records, or prepare a draft.

### Routing

Select a queue, assign an owner, or prioritize work using explicit rules.

### Execution

Create a record, send a notification, update a status, or call an external API.

### Decision

Approve, reject, escalate, or determine eligibility.

Preparation and routing are often safer starting points. Execution requires
idempotency and recovery. Decision automation requires policy ownership,
explainability, review, and stronger controls.

## Start in shadow mode

Shadow mode lets the automation observe production-like input and produce a
recommendation without changing the official outcome:

```text
automated_result = classify(input)
human_result = existing_process(input)
compare(automated_result, human_result)
```

Store enough context to investigate disagreement:

```ts
type ShadowResult = {
  inputId: string;
  automatedOutcome: string;
  humanOutcome: string;
  agreed: boolean;
  reason?: string;
  evaluatedAt: string;
};
```

Expected output:

```text
Cases evaluated: 420
Agreement: 94%
False positive review: 11
False negative review: 14
Manual review required: 6%
```

Agreement is not accuracy. If both the old and new process are wrong in the
same way, agreement hides the problem. For high-impact workflows, compare
against an approved policy or independent review sample.

## Define acceptance criteria before the trial

Set measurable gates:

```text
Automation may proceed to limited execution only if:
  - required fields are valid for 99% of inputs
  - no high-severity false negatives appear in the review sample
  - every external side effect has a stable idempotency key
  - failed executions are visible within 10 minutes
  - a human can disable the workflow
```

The thresholds must match business impact. Do not borrow a generic 99%
threshold for a workflow where one missed case is unacceptable or where a
lower rate is operationally safe.

## Validate inputs at the boundary

Automation should reject or route invalid input explicitly:

```ts
type RequestInput = {
  requestId: string;
  customerId: string;
  category: string;
  amount?: number;
};

function validateInput(input: RequestInput) {
  const errors: string[] = [];

  if (!input.requestId) {
    errors.push("requestId is required");
  }

  if (!input.customerId) {
    errors.push("customerId is required");
  }

  if (!input.category) {
    errors.push("category is required");
  }

  return errors;
}
```

Do not silently fill missing business values with defaults unless the policy
explicitly defines that behavior. A success-shaped fallback can be more
dangerous than a visible failure.

Classify input failures:

- Permanent: invalid data or unauthorized request
- Transient: timeout or temporary service failure
- Policy exception: requires human judgment
- Unknown: quarantine and investigate

## Make side effects idempotent

Retries are normal in distributed systems. An automation that sends a payment,
creates a ticket, or changes a customer status must tolerate a timeout after
the external system accepted the request.

Use a stable operation key:

```ts
type Operation = {
  operationId: string;
  sourceRecordId: string;
  action: string;
  payloadHash: string;
};

async function executeOnce(operation: Operation) {
  const existing = await operationStore.find(operation.operationId);

  if (existing) {
    return existing.result;
  }

  const result = await externalClient.execute({
    idempotencyKey: operation.operationId,
    action: operation.action,
    payloadHash: operation.payloadHash
  });

  await operationStore.save({
    ...operation,
    result
  });

  return result;
}
```

Idempotency is not guaranteed by a local database alone. Confirm the external
service's behavior and decide how reconciliation works when the response is
lost.

## Design retries and dead-letter handling

Retry only failures that are likely to succeed later:

```text
Retryable:
  timeout
  temporary unavailable
  rate limit

Do not retry automatically:
  invalid request
  permission denied
  policy exception
  duplicate rejected by business rule
```

Define:

- Maximum attempts
- Backoff strategy
- Queue age limit
- Dead-letter destination
- Alert threshold
- Manual replay process
- Duplicate protection

An endlessly retrying job can create cost, duplicate side effects, and
operational noise. A failed item must become visible to someone who can act.

## Keep human review as an explicit state

Do not represent human review as a comment or a temporary pause. Model it:

```ts
type WorkflowState =
  | "received"
  | "validated"
  | "automated"
  | "needs-review"
  | "approved"
  | "rejected"
  | "failed";
```

For a review state, store:

- Reason for review
- Required reviewer role
- Evidence shown
- Decision
- Reviewer identity
- Decision time
- Follow-up action

This creates an audit trail and allows the team to measure whether exceptions
are shrinking, growing, or being ignored.

## Build a rollback and kill switch

Every automated side effect should have a defined disable path:

```text
Disable conditions:
  - correction rate exceeds threshold
  - duplicate side effects detected
  - source data is stale
  - review queue exceeds age limit
  - downstream service is unavailable

Disable action:
  stop new executions
  preserve queued inputs
  route new work to manual process
  alert owner and on-call contact
```

Test the switch. A documented button that nobody has permission to use is not
a rollback.

If actions cannot be reversed, use a reversible intermediate state, such as
draft, pending, or review-required, before committing the final side effect.

## Add observability for the business outcome

Technical metrics alone are insufficient. Monitor:

- Throughput
- Processing latency
- Retry count
- Failure count
- Queue age
- Duplicate rate
- Manual review rate
- Correction rate
- Business outcome

```ts
type AutomationMetrics = {
  processed: number;
  succeeded: number;
  failed: number;
  retried: number;
  needsReview: number;
  corrected: number;
  oldestQueueItemMinutes: number;
};
```

Expected output:

```text
Processed: 2,400
Succeeded: 2,310
Needs review: 74
Failed: 16
Corrected: 21
Oldest queue item: 38 minutes
Status: operating within threshold
```

These values are example output. Define alert thresholds with the process
owner, and make alerts actionable rather than merely frequent.

## Test with replayable data

Create a representative fixture set containing:

- Normal cases
- Missing fields
- Duplicate records
- Boundary values
- Multiple currencies or time zones
- Large payloads
- Previously processed items
- Known exception cases
- Downstream failures

Run the automation in a test environment and compare:

```text
expected outcome
actual outcome
side effects
audit record
retry behavior
manual review state
```

For integrations, use recorded responses or a controlled fake service so
timeouts, rate limits, malformed payloads, and delayed responses can be tested
repeatedly.

## Validate with production-like shadow traffic

Before enabling side effects, run the automation against sampled or mirrored
inputs:

```text
source event
  -> existing workflow continues unchanged
  -> automation evaluates a copy
  -> result is stored for comparison
  -> disagreement is reviewed
```

Protect privacy and access boundaries. Do not mirror sensitive production data
into an uncontrolled development environment.

Measure disagreement by category:

| Category | Cases | Agreement | Action |
| --- | --- | --- | --- |
| Standard request | 280 | 98% | Candidate for limited execution |
| Missing data | 64 | 71% | Improve validation |
| Policy exception | 42 | 55% | Keep human-led |
| Duplicate request | 34 | 91% | Add idempotency test |

An overall average would hide the weak performance on exceptions.

## Release in stages

A safe rollout may use:

1. Offline fixture tests
2. Shadow mode
3. Internal-only execution
4. Small percentage or low-risk category
5. Human approval for every side effect
6. Limited autonomous execution
7. Wider rollout with continuous monitoring

Define entry and exit criteria for each stage. Do not advance because the
calendar says the pilot is over.

Example:

```text
Move from shadow to limited execution when:
  - 500 representative cases evaluated
  - no critical false negatives
  - input validation passes
  - retry and rollback tests pass
  - owner signs off on exception handling
```

## Results and methodology

Record:

1. Process map and candidate rationale
2. Baseline volume, time, quality, and cost
3. Input and exception categories
4. Shadow-mode comparison
5. Test fixtures and failure scenarios
6. Acceptance criteria
7. Rollout stage and duration
8. Technical and business metrics
9. Incidents and corrective actions
10. Final expansion or stop decision

Use result categories:

```text
Proven:
  target outcome improved and controls remained within threshold

Promising:
  improvement observed but sample, duration, or attribution is limited

Blocked:
  input quality, ownership, or recovery behavior is not ready

Negative:
  errors, maintenance, or operational burden exceed the benefit
```

Store the candidate score and post-launch result together. Revisit the weights
when real evidence shows that the original ranking was wrong.

## Challenges and trade-offs

### A score can create false precision

Use scoring to compare candidates, not to replace domain judgment. Keep veto
conditions separate.

### Shadow mode costs extra capacity

The temporary duplicate evaluation is justified when changing the official
outcome would be costly. For low-risk work, a smaller sample may be enough.

### Human review can become the bottleneck

Measure queue age and reviewer effort. Automation is not successful if it
creates an exception queue nobody can process.

### Retries can make incidents worse

Use idempotency, bounded retries, and dead-letter handling before enabling
external side effects.

### High agreement can hide shared errors

Compare against policy, independent review, or a known-good sample when the old
process may also be inconsistent.

## When to avoid this approach + limitations

Do not build a complex scoring, shadow, and rollout platform for a low-risk
task that can be safely automated with a simple script and manual check.

Do not automate high-impact decisions solely because a score is high. Involve
the domain owner, security, legal, or compliance reviewers where appropriate.

Metrics cannot capture every consequence. A process may become less humane,
less understandable, or harder to appeal even when throughput improves.

## Repository link and next steps

Keep candidate definitions, process maps, fixture data, shadow results,
validation code, runbooks, metrics, and rollout decisions together. Keep
secrets and sensitive production data outside the repository.

Before implementation:

1. Map the workflow and ownership.
2. Define the business outcome and failure impact.
3. Classify task, execution, and decision automation.
4. Establish input and exception categories.
5. Define acceptance, rollback, and review criteria.

During the trial:

1. Run fixture tests and shadow mode.
2. Measure agreement by category.
3. Validate retries, idempotency, and failure visibility.
4. Review human workload and queue age.
5. Advance stages only when evidence meets the gates.

After launch:

1. Monitor business and technical outcomes.
2. Revisit thresholds and exception rules.
3. Review ownership and runbooks.
4. Compare maintenance cost with actual benefit.
5. Disable or redesign automation that no longer earns its operational cost.

Automation is an engineering system, not merely a script. It needs explicit
state, safe failure behavior, observable outcomes, accountable ownership, and a
rollback path before it is allowed to change important work.
