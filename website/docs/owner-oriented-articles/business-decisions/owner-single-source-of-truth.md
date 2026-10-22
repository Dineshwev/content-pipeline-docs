---
title: The Business Case for a Single Source of Truth
sidebar_position: 20
---

# The Business Case for a Single Source of Truth

## Short answer

A single source of truth is valuable when conflicting versions cause real
delay, rework, customer confusion, or business risk. It does not mean every
detail must live in one application. It means people know which record is
authoritative for a particular decision.

For most teams, the right approach is to define one trusted source per domain,
not to force the entire business into one tool. Give that source an owner,
update rules, and a way to identify stale information.

## Why this decision is hard

When people find conflicting information, the usual response is to create
another document or send another message explaining which version is correct.
That solves the immediate conversation but adds another copy to the system.

Over time, information spreads across:

- Shared drives
- Spreadsheets
- Project-management tools
- Chat messages
- Email threads
- Customer-support replies
- Sales materials
- Code and configuration
- Personal notes

The problem is not that every copy is wrong. The problem is that people cannot
quickly tell which copy should guide their next action.

Imagine a company changing its pricing:

1. The finance spreadsheet contains the new prices.
2. The website still displays the old prices.
3. Sales has a presentation with a third version.
4. Support answers from a previous email template.
5. A customer receives a quote that does not match the invoice.

The cost is larger than the time spent editing one document. Someone must
investigate the disagreement, correct the customer-facing material, explain
what happened, and decide how to prevent it next time.

The opposite extreme also causes problems. A team may try to place every piece
of information into one platform. That can create a central bottleneck,
complicate ownership, and make specialized work harder.

The useful question is not:

> Can we put everything in one system?

It is:

> For this type of decision, where should people look first, and who is
> responsible for keeping that source trustworthy?

## What this is based on

This analysis focuses on the business cost of conflicting information rather
than on a particular software product. Look for evidence such as:

- Time spent asking which version is current
- Customer or internal decisions based on outdated information
- Duplicate updates across multiple systems
- Reopened work caused by conflicting requirements
- Support or sales answers that need later correction
- Onboarding delays caused by missing context
- Decisions that depend on one person's private files

A simple incident record can make the cost visible:

| Incident | Time lost | Impact | Root cause |
| --- | ---: | --- | --- |
| Old pricing sent to customer | 3 hours | Quote corrected | Three uncontrolled versions |
| Outdated onboarding step | 1 day | New employee delayed | No document owner |
| Conflicting product requirement | 6 hours | Work re-done | Chat treated as specification |

These figures are examples of the information to collect, not benchmark
results. The purpose is to find whether conflicting versions are occasional
annoyances or a recurring business problem.

## What “single source of truth” actually means

A single source of truth does not mean:

- Only one tool may be used.
- Everyone edits the same document.
- Information is never copied.
- Drafts and experiments are forbidden.
- One department controls every decision.

It means a specific domain has an authoritative record. Other copies may exist,
but they are either temporary drafts, generated views, or clearly labeled
references.

Examples:

| Domain | Possible authoritative source |
| --- | --- |
| Current product requirements | Product decision record or issue tracker |
| Published pricing | Approved pricing record |
| Customer account status | Customer system |
| Deployment configuration | Version-controlled repository |
| Staff policy | Current policy repository |
| Financial reporting | Approved finance system |

The correct source depends on the decision. A product roadmap, a customer
account, and a deployment configuration should not necessarily live in the
same application.

## Option A: Allow multiple working sources

Under this approach, teams use the tools that suit their work and rely on
communication to resolve conflicts.

### Best for

Multiple working sources can be appropriate when:

- The work is exploratory.
- Drafts change quickly.
- Decisions are temporary or easy to reverse.
- Different teams need different working formats.
- The cost of inconsistency is low.
- Everyone involved can easily reach the people with context.

For example, several people may use private notes while exploring a product
idea. Those notes do not need to become an official source before a decision is
made.

### Main strengths

This approach is flexible and fast. Teams can choose tools for brainstorming,
analysis, collaboration, and execution without waiting for a central
repository.

It also avoids a large migration project. The business can keep working with
existing tools while learning what information actually needs to be governed.

### Main risk

Temporary copies often become permanent. A draft is forwarded, added to a
presentation, copied into a support response, and then treated as current by
someone who does not know its history.

The organization also begins to rely on people as the indexing system. New
employees may not know which person to ask, and experienced employees spend
time resolving questions that should have had a visible answer.

## Option B: Define an authoritative source

Under this approach, the team identifies the official record for a domain and
labels other material accordingly.

### Best for

This approach is valuable when:

- Several teams make decisions from the same information.
- Customers or external partners see the result.
- Incorrect information creates financial, legal, or operational risk.
- The same facts are updated repeatedly.
- New employees need reliable context.
- A decision is expensive to reverse.

### Main strengths

An authoritative source reduces the time required to resolve disagreement. It
also makes ownership visible: the team can ask who maintains the record instead
of searching every copy.

A trusted source improves more than consistency. It can support:

- Better onboarding
- More reliable reporting
- Faster customer responses
- Safer automation
- Clearer audits
- Easier change communication

### Main risk

The source can become a bottleneck. If only one person can update it, changes
may wait in a queue or people may create unofficial copies to keep working.

Centralization can also create false confidence. A record may be officially
authoritative but still outdated, incomplete, or based on an unreviewed
assumption.

An authoritative source needs an owner, update process, review date, and a way
to communicate meaningful changes.

## Comparison table

| Factor | Multiple working sources | Authoritative source |
| --- | --- | --- |
| Flexibility during exploration | High | Moderate |
| Speed of creating a draft | High | Moderate |
| Ease of finding current information | Low to moderate | Higher if maintained |
| Conflict risk | Higher | Lower, but not eliminated |
| Ownership clarity | Often weak | Explicit |
| Migration effort | Low initially | Moderate initially |
| Maintenance effort | Hidden and distributed | Visible and assigned |
| Onboarding | Depends on people | Easier when current |
| Auditability | Difficult | Stronger |
| Best fit | Exploration and temporary work | Repeated or high-consequence decisions |

The authoritative-source option is not automatically better for every document.
It is better when the cost of disagreement is greater than the cost of
maintaining a trusted record.

## The cost of conflicting information

### Direct cost

This includes:

- Time spent searching
- Duplicate data entry
- Rewriting documents
- Correcting customer communication
- Reworking tasks based on old requirements
- Meetings created to resolve disagreement

### Operational cost

Conflicting information can delay:

- Product releases
- Customer onboarding
- Sales commitments
- Financial reporting
- Compliance responses
- Incident recovery

### Trust cost

When employees or customers repeatedly receive different answers, they stop
trusting the system. They ask more people, save more private copies, and create
even more versions.

This is a feedback loop:

```text
Conflicting information
        |
        v
Less trust in the official source
        |
        v
More private copies and messages
        |
        v
More conflicting information
```

Breaking the loop requires both a trusted source and confidence that the source
will be maintained.

## How to establish a source without centralizing everything

### 1. Choose a domain

Start with one area where inconsistency is expensive. Examples include pricing,
customer status, product requirements, or operational procedures.

Do not begin with “all company knowledge.” That scope is too broad to govern
well.

### 2. Identify the decision the source supports

Ask what people need to decide:

- Which price should be quoted?
- Which product behavior should be built?
- Which customer status should be acted on?
- Which procedure should an employee follow?

The source should be chosen around a decision, not around a preference for a
particular application.

### 3. Name the owner

An owner is responsible for accuracy and review. They do not need to make every
change personally, but they must be able to confirm who can update the record
and when it should be reviewed.

### 4. Label other versions

Not every copy can be deleted immediately. Mark drafts, archived versions,
exports, and generated views clearly.

Useful labels include:

- Draft
- Current
- Archived
- Superseded
- For reference only
- Last reviewed on

### 5. Define the update path

People need to know how a change becomes official. A simple path might be:

```text
Proposed change
      |
      v
Owner review
      |
      v
Authoritative record updated
      |
      v
Affected teams notified
```

If the process takes too long, people will bypass it. Keep the path
proportional to the risk of the information.

### 6. Review freshness

Some information needs review after every change. Other information may need a
quarterly or annual review. The important point is to make freshness visible.

An old record should not look identical to a recently verified record.

## Decision framework

Keep multiple working sources when:

- The material is exploratory.
- It is clearly marked as a draft.
- The decision is temporary or easy to reverse.
- The cost of disagreement is low.
- Different teams need different working formats.

Define an authoritative source when:

- People make recurring decisions from the information.
- Customers or external partners see it.
- Inconsistency creates financial or operational risk.
- Several teams maintain related copies.
- New people need to find the answer without personal introductions.
- The reason for a decision is likely to be revisited.

Create separate authoritative sources by domain when:

- Different owners have legitimate responsibility.
- The information has different update cycles.
- Combining it would create a central bottleneck.
- The systems need different controls or access permissions.

Do not designate a source as authoritative until:

- An owner is named.
- The update path is clear.
- The source can be accessed by the people who need it.
- Old copies can be identified.
- There is a review or freshness rule.

## My recommendation

I recommend a **federated model**:

1. Allow teams to use drafts and working documents while exploring.
2. Define one authoritative source for each important domain.
3. Give every source an owner and review expectation.
4. Label copies and generated views so they are not mistaken for the source.
5. Link decisions and downstream documents back to the authoritative record.
6. Review whether the source is still useful after significant changes.

Do not start by migrating every document. Start with the domain where conflict
has already caused measurable cost.

For example, if pricing is inconsistent, define the approved pricing record
first. Then update the website, sales material, and support templates from that
record or make their update responsibilities explicit.

The goal is not perfect centralization. The goal is fewer decisions made from
uncertain information.

## When not to centralize

Do not create a central authoritative source when:

- The material is still exploratory.
- Different teams have genuinely different decisions to make.
- No one can own the record.
- The proposed system is harder to access than the current information.
- The migration effort is greater than the cost of current disagreement.
- The business is using centralization to avoid resolving unclear ownership.

Do not centralize sensitive information merely for convenience. Access control,
privacy, and separation of duties may require multiple controlled systems.

## Limitations of this analysis

A single source of truth does not solve every information problem:

- The authoritative record can still be wrong.
- Owners can leave or stop reviewing it.
- Updates may fail to reach downstream copies.
- Different domains may legitimately use different systems.
- Centralized information can create access or outage risk.
- Searchability does not guarantee understanding.
- A source may be current but still omit important context.

There is also a trade-off between consistency and speed. Requiring approval for
every minor change can make the source less useful because people stop updating
it.

The right governance level depends on the consequence of being wrong. Pricing,
customer status, and safety procedures may need stronger controls than an
internal brainstorming document.

## Final takeaway

**A single source of truth is not one giant tool; it is a clear agreement about
which record people trust, who maintains it, and when it must be reviewed.**
