---
title: How to Choose Technology When You Cannot Evaluate the Code
sidebar_position: 26
---

# How to Choose Technology When You Cannot Evaluate the Code

## Short answer

Choose technology based on the business outcome, reliability, data ownership,
support, total cost, and exit options—not on impressive technical vocabulary.

You do not need to evaluate every line of code yourself. You do need to ask
what the system must accomplish, what happens when it fails, who is
responsible for it, and how difficult it would be to leave. Use a technical
reviewer for implementation risk, but keep the business decision with the
people accountable for the outcome.

## Why this decision is hard

A product demo is designed to make a tool look capable. It usually shows:

- A clean interface
- A successful workflow
- Carefully chosen sample data
- A confident product representative
- Features that are easy to demonstrate

The important differences often appear later:

- A critical integration does not work as expected.
- The team cannot export all of its data.
- Pricing increases with usage.
- The vendor's support is slower than the business requires.
- Permissions are too broad or too difficult to manage.
- Users avoid the tool and continue with spreadsheets.
- An outage stops an important operation.
- Nobody knows who owns the system internally.

Imagine a business choosing a customer-support platform. The product has useful
automation and reporting, but the team does not ask whether:

1. Customer history can be exported completely.
2. Support agents can access only the records they need.
3. The system can continue operating during an integration failure.
4. Reports match the business's definition of a resolved request.
5. The vendor provides the response time the business needs.

The business does not need to understand the platform's entire implementation.
It needs enough evidence to judge whether the platform is safe and suitable.

## What this is based on

Use a decision record that covers:

- The business problem
- The desired outcome
- Must-have requirements
- Total cost
- Failure impact
- Security and privacy expectations
- Support requirements
- Data ownership
- Export and exit options
- Internal ownership
- Review date

Separate what is known from what is promised:

| Statement | Evidence | Confidence |
| --- | --- | --- |
| Data can be exported | Tested sample export | High |
| Integration supports required workflow | Vendor documentation | Medium |
| Support will respond within four hours | Contract commitment | High |
| Users will adopt the tool | Short pilot | Medium |

Vendor claims are useful inputs, but they should not be treated as test results
until the business verifies the parts that matter.

## Start with the business outcome

Do not begin with “we need a CRM,” “we need AI,” or “we need a new platform.”
Begin with the problem:

> What should be easier, faster, safer, or more reliable after we adopt this
> technology?

Examples:

- Reduce customer response time from two days to one day.
- Give finance a reliable view of unpaid invoices.
- Reduce duplicate data entry during onboarding.
- Make approved company policies easier to find.
- Reduce the risk of losing customer history.

Write one or two measurable outcomes. If the team cannot explain how success
will be recognized, it is too early to compare products.

## Option A: Choose by features

Feature-led evaluation begins by comparing product capabilities.

### Best for

Features are useful for:

- Creating an initial shortlist
- Checking whether a basic requirement exists
- Finding products in a familiar category
- Identifying possible integration paths

### Main strengths

Feature lists make early conversations easier. They help the team eliminate
products that obviously cannot perform a necessary function and give reviewers
a common vocabulary.

They are also efficient when the requirement is simple and objective, such as
whether a product supports a particular export format.

### Main risks

A feature list does not show:

- How well the feature works in the real workflow
- How difficult it is to configure
- Which plan includes it
- What happens at the expected scale
- Whether users will adopt it
- Whether the feature is maintained
- Whether the output is accurate

A long list can create false confidence. One vendor may describe a basic
capability with a marketing phrase while another describes a mature workflow
with a short label.

## Option B: Choose by outcomes and risk

Outcome-led evaluation starts with the work the business needs to complete and
the risks it can accept.

### Best for

This approach is useful when:

- The tool affects customers or revenue.
- The business will depend on the system for several years.
- Migration would be difficult.
- Data is sensitive or valuable.
- The workflow crosses multiple teams.
- A failure would interrupt operations.

### Main strengths

Outcome-led evaluation connects technical characteristics to business
consequences. It asks not only “does the product have this feature?” but:

- Does it solve the problem in our workflow?
- What evidence supports that claim?
- What does it cost to operate?
- What happens when it is unavailable?
- How will we recover or leave?

It may take longer, but it produces a decision that is easier to explain and
review later.

### Main risks

The process requires more effort and may need help from technical, legal,
security, or operations specialists. It can also become too slow if every
possible risk is investigated before the business has identified the important
ones.

Use proportional review. A low-cost, reversible tool does not need the same
process as a system that stores customer records or controls payments.

## Comparison table

| Factor | Feature-led choice | Outcome-led choice |
| --- | --- | --- |
| Shortlisting speed | Higher | Moderate |
| Business fit | Uncertain | Clearer |
| Evidence quality | Often uneven | Explicit |
| Vendor risk | Often missed | Reviewed |
| Total cost | May be incomplete | More complete |
| Failure planning | Often delayed | Included early |
| Evaluation effort | Lower initially | Higher initially |
| Long-term confidence | Variable | Stronger |
| Best fit | Early exploration | Important or difficult-to-reverse purchases |

Feature comparison is useful at the beginning. It should not be the final
decision method for an important system.

## What to evaluate when you cannot read the code

### 1. Workflow fit

Ask the vendor to demonstrate the workflow using your process, not a generic
example.

Questions:

- Can a real user complete the important task?
- Which steps require manual copying?
- What happens when data is missing?
- Can the process support exceptions?
- Can the team change the workflow without vendor help?

### 2. Reliability

Ask:

- What availability does the vendor commit to?
- How are incidents communicated?
- What happens to work during an outage?
- How is data recovered?
- Can the business continue manually?

Reliability is not only an uptime percentage. A system can be available while
producing incorrect or delayed results.

### 3. Data ownership and portability

Ask:

- Who owns the data under the contract?
- Can all records be exported?
- Are history, attachments, relationships, and permissions included?
- Is the export usable without the vendor?
- How long does data remain available after cancellation?
- Can the team test a restore?

An export button is not proof of portability. Test whether the exported data
could support a realistic migration.

### 4. Security and privacy

Ask:

- What data will the vendor receive?
- Who can access it?
- How are accounts and permissions managed?
- What happens when an employee leaves?
- How are credentials and sensitive fields protected?
- How are incidents reported?
- Which contractual or regulatory obligations apply?

Use specialist review for high-risk systems. The owner still needs to
understand the business consequence of a security failure.

### 5. Support and accountability

Ask:

- Who in the business owns the vendor relationship?
- What support channels exist?
- What response time is needed?
- Are support commitments contractual?
- What happens when the account manager changes?
- Is there a documented escalation path?

A tool without an internal owner becomes shelfware even when the product is
technically capable.

### 6. Total cost

Include:

- Subscription or license
- Setup and configuration
- Migration
- Integrations
- Training
- Administration
- Premium support
- Usage increases
- Data storage
- Internal review
- Exit or replacement

Ask how the cost changes if the business doubles its users, records, or
volume.

### 7. Vendor continuity

No vendor is guaranteed to exist or maintain the same product forever. Ask:

- How mature is the product?
- How frequently does it change?
- Can a key feature be removed?
- What happens after an acquisition?
- Is there a public roadmap or change policy?
- How much of the business depends on one provider?

The goal is not to predict the future perfectly. It is to understand the
consequence if the future is different from the sales presentation.

## A practical evaluation process

### Step 1: Write the decision statement

Example:

> We need a customer-support system that reduces response time, preserves
> customer history, supports role-based access, and can be replaced without
> losing essential records.

### Step 2: Define must-have outcomes

Choose a small number of measurable outcomes:

| Outcome | Baseline | Target |
| --- | ---: | ---: |
| Average response time | 36 hours | Under 24 hours |
| Duplicate customer records | 8 per month | Under 2 per month |
| New-agent onboarding | 10 days | Under 5 days |
| Export recovery test | Not tested | Completed quarterly |

The figures are examples. The important point is to define the target before
choosing the product.

### Step 3: Create decision gates

Some requirements should eliminate a product rather than receive a low score:

- Required data cannot be exported.
- The vendor cannot meet a mandatory security requirement.
- The system cannot support a critical workflow.
- The expected failure impact is unacceptable.

### Step 4: Create a shortlist

Use features and vendor research to identify a few candidates. Do not conduct a
full evaluation of every product in the market.

### Step 5: Run a real workflow trial

Use representative tasks, users, and safe sample data. Ask the vendor to show
the difficult path, not only the successful demo.

Test:

- Missing data
- Duplicate records
- Permission boundaries
- Approval changes
- Export
- Integration failure
- User correction
- Account cancellation or recovery

### Step 6: Record evidence and open questions

Use a decision table:

| Requirement | Evidence | Result | Confidence | Owner |
| --- | --- | --- | --- | --- |
| Export customer history | Sample export and restore | Partial | Medium | Operations |
| Role-based access | Role test | Passed | High | Security |
| Response-time improvement | Four-week pilot | Not measured | Low | Support |

### Step 7: Decide and define the review date

State:

- The selected option
- The assumptions
- The rejected options
- The remaining risks
- The owner
- The date when the decision should be reviewed

## My recommendation

Use features to make a shortlist, then choose through a real workflow trial and
a written risk review.

I recommend asking five questions before approving an important technology
purchase:

1. What business outcome will improve?
2. What evidence shows the tool can achieve it?
3. What happens when the system is wrong or unavailable?
4. Who owns the data, relationship, and internal adoption?
5. How would we leave if the tool became unsuitable?

If the vendor cannot answer these questions clearly, slow down the decision.
Uncertainty is not always a reason to reject a tool, but it is a reason to
record a risk and decide who will investigate it.

For low-cost, reversible tools, a short trial may be enough. For systems that
store important data or shape core operations, involve technical, security, and
legal reviewers before signing.

## When not to use a feature-led decision

Do not choose primarily by features when:

- The tool stores sensitive or irreplaceable data.
- The business will depend on it for several years.
- Switching would be expensive.
- The workflow affects customers or revenue.
- Multiple teams need different permissions.
- The vendor's pricing grows with usage.
- The product requires substantial integration.

Do not choose primarily by a score when a requirement is a hard security,
legal, or operational gate. A high average cannot compensate for a failed
mandatory control.

## When not to over-evaluate

Do not create a six-month procurement process for a low-cost tool that:

- Uses non-sensitive data
- Can be cancelled easily
- Has a usable export
- Does not control a critical workflow
- Can be replaced without meaningful disruption

Proportional evaluation is part of good decision-making. The review should
match the consequence of being wrong.

## Limitations of this analysis

No evaluation framework can remove uncertainty:

- Vendor roadmaps change.
- Pricing may change.
- Product quality can vary by plan.
- Short trials may not represent long-term adoption.
- Internal ownership may change after purchase.
- Security and reliability claims require specialist review.
- A good product can still fail if users do not adopt it.
- A poor product can appear successful if the trial is too easy.

Vendor financial health and future strategy are also difficult to assess from
public information alone. Record assumptions and define review triggers rather
than pretending the decision is permanent.

## Final takeaway

**You do not need to understand every line of code, but you do need to
understand the outcome, the evidence, the failure plan, and the path out.**
