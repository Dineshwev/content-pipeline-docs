---
title: How to Decide Which Business Processes to Automate
sidebar_position: 12
---

# How to Decide Which Business Processes to Automate

## Short answer

Automate work that is frequent, repetitive, rules-based, measurable, and safe
to reverse. Keep people closely involved when the work depends on judgment,
empathy, negotiation, or changing context.

The best first automation is usually not the most impressive one. It is a
narrow workflow with a clear owner, predictable inputs, a visible outcome, and
a safe way to stop or correct it. Improve the process before automating it when
nobody can explain what should happen or who is accountable when it goes wrong.

## Why this decision is hard

Automation is often presented as a technology decision, but the difficult
questions are operational:

- What exactly is the process?
- Which parts are repetitive?
- Which exceptions require judgment?
- What happens when input data is incomplete?
- Who reviews the result?
- How quickly must an error be detected?
- What will the team do with the time saved?

A bad process can appear attractive because it is annoying. Automating it may
make the confusion happen faster and at greater scale.

For example, a team may want to automate customer refunds because staff spend
time checking requests. But if the refund policy is unclear, customer records
are incomplete, and exceptions are common, the first investment should be
clarifying eligibility and ownership—not connecting another payment tool.

## What this is based on

Evaluate the process using evidence rather than enthusiasm about a product:

- Frequency
- Time spent
- Error and rework rate
- Exception rate
- Cost when wrong
- Input quality
- Review effort
- Process stability
- Number of handoffs
- Availability of a rollback

A simple inventory may look like this:

| Process | Frequency | Manual time | Exceptions | Cost when wrong | Candidate |
| --- | --- | --- | --- | --- | --- |
| Weekly report assembly | Weekly | 5 hours | Low | Medium | Strong |
| Customer refund review | Daily | 3 hours | High | High | Improve first |
| New employee access setup | Monthly | 2 hours | Medium | High | Controlled automation |
| Product strategy decisions | Irregular | Variable | Very high | High | Keep human-led |

The table is a starting point. Observe the work before assigning a final
decision.


The companion technical article explains the implementation in detail:

[How to Decide Which Business Processes to Automate: An Engineering Method](../../developer-oriented-articles/business-decisions/developer-automate-processes)

## Distinguish task automation from decision automation

Not all automation removes the same kind of human responsibility.

### Task automation

The system performs a predictable action:

- Copying approved data between systems
- Sending a reminder
- Creating a standard report
- Checking required fields
- Routing a request to the correct queue

These are often good early candidates.

### Decision automation

The system determines what should happen:

- Approving a refund
- Rejecting an application
- Changing a customer's eligibility
- Prioritizing a safety-related request
- Sending a sensitive communication

Decision automation requires stronger evidence, clearer policy, auditability,
and an escalation path. A human review step may be appropriate even when the
routine work around the decision is automated.

## Option A: Automate immediately

Automating now can be appropriate when:

- The inputs have a stable structure.
- The rules are written and understood.
- The result can be checked.
- Exceptions are uncommon and identifiable.
- Errors are reversible.
- Someone owns the workflow.
- The process occurs often enough to repay setup and maintenance.

**Best for:** stable, high-volume work with clear inputs and outputs.

**Main risk:** hidden exceptions are ignored, and staff spend more time
reviewing, correcting, and explaining the automation than they spent doing the
original task.

## Option B: Improve manually first

Improve the process before automating when:

- People perform different versions of the process.
- The policy is still changing.
- Nobody agrees on the desired result.
- Exceptions dominate normal cases.
- Input data is inconsistent.
- Ownership is unclear.
- A wrong result would be difficult to reverse.

Manual improvement does not mean doing nothing. Standardize the form, remove
unnecessary approvals, define the owner, and record common exceptions. Then
reconsider automation with a clearer process.

**Best for:** changing or ambiguous workflows.

**Main risk:** “improve it first” becomes a permanent excuse to tolerate
unnecessary work. Set a review date and a small improvement target.

## Comparison table

| Factor | Automate now | Improve first |
| --- | --- | --- |
| Initial speed | Higher | Lower |
| Process clarity required | High | Lower |
| Setup effort | Moderate or high | Low or moderate |
| Exception handling | Must be designed early | Learned and documented |
| Error recovery | Must be explicit | Usually manual |
| Reversibility | Depends on the workflow | Usually high |
| Best fit | Stable repetitive work | Unclear or changing work |

The choice can also be staged: simplify the process manually, automate one
low-risk step, and leave the judgment-heavy step with a person.

## Choose based on the whole process

Do not automate a single visible action without mapping what surrounds it:

```text
Request received
  -> validate required information
  -> determine eligibility
  -> obtain approval
  -> perform action
  -> notify requester
  -> record result
  -> handle exception
```

Automation may reduce the action itself while making validation, approval, or
exception handling harder. Ask:

- Where does the process start and end?
- What inputs are required?
- Which systems are involved?
- Who owns each handoff?
- What counts as success?
- What happens when an input is missing?
- What evidence must be retained?
- How does a person correct the result?

If these questions cannot be answered, the process is not ready for broad
automation.

## Measure the baseline

Observe the process for a representative period:

- Number of cases
- Active time per case
- Waiting time
- Error and correction rate
- Exception rate
- Handoffs
- Escalations
- Customer impact
- Review time

Example:

```text
Observation period: 4 weeks
Cases completed: 312
Median active time: 14 minutes
Median elapsed time: 1.6 days
Exceptions: 22%
Corrections: 8%
Manual handoffs: 3 per case
```

These figures are an example format, not a benchmark. Record how they were
measured and whether the sample includes unusual periods.

Calculate expected value conservatively:

```text
potential time value =
  cases
  × avoidable minutes
  × approximate labor value

net value =
  potential time value
  - implementation
  - maintenance
  - review
  - correction
  - support
```

Time saved is not automatically cash saved. Explain whether the capacity will
be used for more customer work, reduced overtime, faster delivery, or simply
less context switching.

## Evaluate process readiness

Score readiness separately from potential value:

| Readiness question | Low readiness | High readiness |
| --- | --- | --- |
| Inputs | Inconsistent and incomplete | Structured and validated |
| Rules | Informal or disputed | Written and approved |
| Ownership | Unclear | Named accountable owner |
| Exceptions | Frequent and unpredictable | Rare or classifiable |
| Output | Difficult to check | Easily verified |
| Recovery | No rollback | Reversible and auditable |
| Stability | Changes weekly | Stable over time |

A high-value process with low readiness should become an improvement project,
not an immediate automation project.

## Design human review intentionally

Human review should not be an undefined promise that “someone will check it.”
Specify:

- Which outputs require review
- Who reviews them
- What the reviewer checks
- How much time is available
- What happens when the reviewer rejects a result
- How rejected cases are measured
- Whether the process stops when review is unavailable

For example:

```text
Automation may prepare a refund recommendation.
The finance lead must approve refunds above the defined threshold.
Rejected recommendations return to the support queue with a reason.
No refund is issued when required evidence is missing.
```

This preserves human accountability while still removing repetitive
preparation work.

## Start with a narrow, reversible workflow

Use a staged rollout:

1. Document the current process.
2. Remove unnecessary steps.
3. Automate preparation or routing first.
4. Keep the final action human-approved.
5. Run with a small group or low-risk category.
6. Compare results with the baseline.
7. Expand only when error and recovery behavior are understood.

Good first candidates often have:

- A clear beginning and end
- A limited number of systems
- Low-cost errors
- A simple rollback
- Enough volume to measure results
- A willing process owner

Avoid starting with the most sensitive customer or financial workflow merely
because it has the largest theoretical savings.

## Plan for bad inputs and exceptions

List common exception classes before selecting a tool:

- Missing required information
- Duplicate request
- Invalid value
- Conflicting records
- Timeout or unavailable integration
- User lacks permission
- Policy exception
- Request exceeds a threshold

For each exception, decide:

- Reject or queue?
- Notify whom?
- Preserve what information?
- Retry automatically?
- Require human review?
- How is resolution recorded?

If the team cannot answer these questions, automation will likely create a
larger exception queue.

## Define controls and rollback

Before launch, agree on:

- Approval thresholds
- Access permissions
- Audit history
- Rate limits
- Maximum batch size
- Duplicate prevention
- Alert thresholds
- Kill switch or disable procedure
- Manual fallback
- Recovery owner

A rollback does not always mean restoring software. It may mean stopping new
automated actions while people process the queue manually.

Example:

```text
Disable automation when:
  - correction rate exceeds 5% for two consecutive days
  - duplicate records appear
  - required review queue is older than four hours
  - source data is unavailable

Fallback:
  route new requests to the existing manual queue
  preserve submitted data
  notify the process owner
```

The thresholds should match the consequence of failure. Do not use arbitrary
numbers without an owner who can act on them.

## Measure after automation

Compare the same categories used in the baseline:

| Metric | Before | After | Interpretation |
| --- | --- | --- | --- |
| Active time per case | 14 min | 6 min | Potential efficiency gain |
| Exceptions | 22% | 25% | Needs investigation |
| Corrections | 8% | 3% | Quality improved |
| Manual handoffs | 3 | 1 | Coordination reduced |
| Review time | 0 | 4 min | New control cost |

Do not report only the six-minute active-time reduction. Include exception,
review, correction, and support effort.

Track whether improvements persist after the initial rollout. Early results may
reflect extra attention from the project team.

## Review the people impact

Automation changes responsibilities even when it does not eliminate jobs:

- Someone monitors failures.
- Someone handles exceptions.
- Someone updates rules.
- Someone communicates changes.
- Someone trains new staff.

Ask affected employees:

- Which part of the process became easier?
- Which new work appeared?
- Which cases are harder to handle?
- Which result do they no longer trust?
- What would make the workflow safer?

People closest to the process often identify exceptions that a requirements
meeting misses.

## Results and methodology

A useful automation decision record contains:

1. Process map and owner
2. Baseline period and measures
3. Readiness assessment
4. Exception catalogue
5. Expected value and full cost
6. Controls and rollback
7. Pilot scope
8. Post-launch results
9. Unresolved risks
10. Expansion or stop decision

Use a simple result classification:

```text
Outcome:
  Proven: target improved without unacceptable quality loss
  Promising: improvement observed, but sample or duration is limited
  Blocked: process or evidence is not ready for expansion
  Negative: maintenance, errors, or disruption exceed the benefit
```

This keeps deployment separate from success. A workflow can be automated and
still be a poor investment.

## When not to automate

Do not automate a process simply because it is annoying. Wait or improve first
when:

- The policy is unclear.
- Exceptions are the majority of cases.
- Input data is unreliable.
- A wrong action could harm a customer or create legal exposure.
- No one owns the outcome.
- The process changes faster than the automation can be maintained.
- The expected savings are too small to repay operating cost.

Human-led work is also appropriate when the value comes from judgment,
relationship, empathy, negotiation, or interpreting new information.

## Limitations

Before-and-after comparisons cannot prove causation on their own. Demand,
staffing, seasonality, training, and parallel process changes can affect the
result.

Automation may create benefits that are difficult to measure, such as reduced
stress or better consistency. It may also create costs that appear later,
including rule maintenance, integration failures, and staff workarounds.

No readiness score can replace judgment about consequence and accountability.
The safest process is not always the most automated one.

## Repository link and next steps

Keep the process map, baseline queries, exception catalogue, rollout checklist,
runbook, and measurement results together. Do not store credentials or
unredacted customer records in the repository.

Before implementation:

1. Name the owner and desired outcome.
2. Measure the current workflow.
3. Separate task automation from decision automation.
4. Classify exceptions and failure impact.
5. Define controls and rollback.

During rollout:

1. Start with a narrow reversible scope.
2. Preserve human approval where risk requires it.
3. Monitor errors, exceptions, and review burden.
4. Compare with the baseline.
5. Interview the people doing the work.

After rollout:

1. Recalculate value using actual maintenance and support effort.
2. Review whether the process or policy changed.
3. Expand only when evidence supports it.
4. Retire automation that no longer earns its operating cost.

The right automation removes predictable work while preserving accountability
for decisions, exceptions, and outcomes.
