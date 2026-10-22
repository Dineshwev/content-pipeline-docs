---
title: "Build or Buy: A Technical Evaluation Method"
sidebar_position: 17
---

# Build or Buy: A Technical Evaluation Method

## Short answer

Evaluate the constraint before choosing an implementation style. Measure
integration effort, data portability, failure recovery, security work, and
maintenance over a defined period.

Build only when the additional control solves a real business or technical
constraint. Buy when a mature product handles the important workflow and the
remaining gaps are acceptable. The numbers in the examples below are
illustrative; they show the method, not a production benchmark.

## Target audience

This article is for:

- Developers advising a founder or operations team
- Technical leads supporting procurement decisions
- Engineers comparing an internal service with a commercial product
- Teams preparing a technical discovery or proof of concept

It assumes that the reader can follow basic application and infrastructure
concepts, but it does not assume knowledge of a particular vendor or
programming language.

The owner-oriented companion explains the business decision in more detail:

[Should You Hire a Developer or Buy a Tool?](../owner-oriented-articles/owner-hire-developer-or-buy-tool)

## The problem

Build-versus-buy discussions often compare a subscription price with a
developer's salary. That is too narrow to support a reliable decision.

A purchased tool may require:

- Data migration
- Integration work
- Custom adapters
- Higher pricing tiers
- Manual workarounds
- Vendor support
- Export and recovery testing

A custom system may require:

- Discovery and design
- Application development
- Hosting and observability
- Security reviews
- Backups and recovery
- Dependency upgrades
- User support
- Future feature work

There is also an opportunity cost. Developers working on an internal tool are
not working on the product, customer issues, or other infrastructure work.

Consider a team that needs a customer onboarding workflow. A commercial tool
can provide forms, notifications, and workflow states quickly. A custom
service can connect directly to the team's existing customer and billing
systems, but the team must own the integration and every future change.

The technical question is not:

> Which option has more features?

It is:

> Which option meets the critical requirements with the least unacceptable
> risk over the period we care about?

## Evaluation approach

I use five stages:

1. Define the workflow and the decision boundary.
2. Separate requirements from preferences.
3. Identify the riskiest unknowns.
4. Test those unknowns with the smallest useful prototype.
5. Compare total ownership cost and operational responsibility.

The order matters. A feature matrix created before the workflow is understood
usually rewards products with the longest feature list.

## Stage 1: Define the workflow

Write down the current process before comparing products. Include the people,
systems, inputs, outputs, and failure paths.

For example:

```text
Customer submits information
        |
        v
Operations reviews the record
        |
        +--> Missing information -> request correction
        |
        v
Billing system is updated
        |
        v
Welcome message is sent
        |
        v
Onboarding is marked complete
```

Expected output:

```text
Workflow stages: 5
External systems: 2
Manual decision points: 1
Known exception paths: 1
```

The diagram is intentionally simple. Its purpose is to reveal where the
decision actually lives. If the difficult part is connecting two systems,
buying a product with a polished user interface may not solve the main problem.

### Define the decision boundary

Decide what is in scope:

- One workflow or several
- One department or the whole business
- A prototype or a production system
- A short-term solution or a three-year capability

Without a boundary, “build” can expand into a replacement for the entire
business operation.

## Stage 2: Separate requirements from preferences

Not every desired feature deserves equal weight. Divide requirements into
three groups:

### Veto requirements

If the option fails one of these, it is not acceptable.

Examples:

- Required data cannot be exported.
- The service cannot meet a mandatory security requirement.
- The system cannot integrate with a critical source.
- Recovery time exceeds the business limit.

### Weighted requirements

These affect the decision but can be traded against one another.

Examples:

- Ease of administration
- Reporting flexibility
- Workflow customization
- User experience
- Deployment speed

### Preferences

These are useful, but should not decide the purchase by themselves.

Examples:

- A preferred programming language
- A familiar interface
- A feature that is convenient but not necessary

Represent the requirements explicitly:

```ts
type Requirement = {
  name: string;
  category: "veto" | "weighted" | "preference";
  weight: number;
  buyScore: number;
  buildScore: number;
};

const requirements: Requirement[] = [
  {
    name: "Data export",
    category: "veto",
    weight: 5,
    buyScore: 4,
    buildScore: 5
  },
  {
    name: "Billing integration",
    category: "weighted",
    weight: 5,
    buyScore: 2,
    buildScore: 5
  },
  {
    name: "Time to first release",
    category: "weighted",
    weight: 4,
    buyScore: 5,
    buildScore: 2
  }
];
```

Expected output:

```text
Veto requirements passed: 2/2
Weighted requirements: 3
```

The scores are not objective truth. They make assumptions visible so the team
can challenge them.

## Stage 3: Build a weighted decision matrix

Once the requirements are agreed, calculate a provisional score:

```ts
const decision = requirements.map((item) => ({
  name: item.name,
  buy: item.weight * item.buyScore,
  build: item.weight * item.buildScore
}));

const totals = decision.reduce(
  (result, item) => ({
    buy: result.buy + item.buy,
    build: result.build + item.build
  }),
  {buy: 0, build: 0}
);
```

Expected output:

```text
Buy weighted score: 7.1
Build weighted score: 8.0
```

Treat this as a conversation starter, not as an automatic decision. A high
average score must not override a failed veto requirement.

### Add an uncertainty column

A score without confidence can create false precision. Record how each score
was established:

| Requirement | Buy score | Evidence | Confidence |
| --- | ---: | --- | --- |
| Data export | 4/5 | Tested sample export | High |
| Billing integration | 2/5 | Vendor documentation only | Medium |
| Time to release | 5/5 | Existing customer reference | Low |

An untested score should trigger a prototype or a vendor question.

## Stage 4: Test the riskiest unknown

Do not begin with the easiest demo. Test the requirement most likely to change
the decision.

Typical high-risk unknowns include:

- Can the data be exported completely?
- Can the product integrate with the existing identity system?
- Can a failed operation be retried safely?
- Can the workflow support a required exception?
- Can the team operate it without vendor assistance?
- Can the custom design meet the required security boundary?

### Prototype the purchased tool

Test the product with a representative, non-sensitive sample:

```text
create_test_workspace()
load_representative_data()
configure_real_workflow()
simulate_invalid_input()
export_data()
restore_export()
measure_operator_steps()
```

Expected output:

```text
Workflow completed: yes
Invalid input handled: partial
Export complete: yes
Restore verified: yes
Manual workarounds: 3
```

### Prototype the custom approach

Do not build the whole product. Implement the riskiest integration and one
representative path:

```text
connect_to_existing_system()
create_minimal_record()
process_one_success_case()
process_one_failure_case()
measure_maintenance_steps()
```

Expected output:

```text
Integration proven: yes
Failure recovery proven: no
Estimated production unknowns: 4
```

The prototype should answer a decision question. If it only demonstrates that
the team can write code, it is not a useful build-versus-buy test.

## Stage 5: Compare total ownership cost

### Purchased product model

Estimate the cost for the period being evaluated:

```ts
const buyCost =
  subscriptionFees +
  setupHours * engineeringRate +
  migrationHours * operatorRate +
  integrationCost +
  trainingCost +
  supportCost +
  expectedExitCost;
```

Expected output:

```text
Three-year buy cost: $52,400
```

Include plan increases, additional users, usage charges, premium support, and
the cost of workarounds. If the price is uncertain, show a range instead of
inventing a precise total.

### Custom system model

Estimate the cost of owning the system:

```ts
const buildCost =
  discoveryCost +
  developmentCost +
  testingCost +
  infrastructureCost +
  securityReviewCost +
  yearlyMaintenanceCost * years +
  supportCost * years;
```

Expected output:

```text
Three-year build cost: $78,000
```

Maintenance is not optional. A custom system that is not updated, monitored,
backed up, and supported is not a lower-cost system; it is an unmanaged risk.

### Include opportunity cost

If internal engineers build the system, estimate the value of the product work
that will be delayed:

```text
opportunity_cost =
  engineer_hours
  * estimated_value_of_deferred_work
```

This value may be difficult to calculate. It should still be discussed rather
than silently treated as zero.

## Security and operational evaluation

Security should not be reduced to a weighted average if a requirement is
mandatory.

Ask both options:

- Where is data stored?
- Who can access it?
- How are credentials managed?
- What is logged?
- How are incidents reported?
- How are backups protected?
- How are deleted records handled?
- What happens when an employee leaves?
- Who is responsible for applying fixes?

For a purchased product, the vendor owns part of the implementation, but the
business still owns account configuration, access management, and the decision
to use the service.

For a custom system, the business owns more of the security boundary. The team
must document dependencies, patching, recovery, and operational ownership.

## Results and methodology

A useful evaluation report should include:

| Area | What to record |
| --- | --- |
| Workflow fit | Completed steps, workarounds, and unsupported cases |
| Integration | Engineering hours, defects, and retry behavior |
| Data portability | Export contents, restore result, and manual steps |
| Reliability | Failure cases, recovery time, and monitoring requirements |
| Security | Open questions, controls tested, and unresolved risks |
| Cost | Assumptions, one-time work, recurring work, and exit cost |
| Operations | Owner, support path, deployment, and backup responsibilities |
| Adoption | User completion rate and training effort |

Separate observations from forecasts:

```text
Observed:
- Sample export restored successfully.
- One required workflow needed a manual workaround.

Not yet proven:
- Production recovery time.
- Long-term vendor pricing.
- Maintenance effort after six months.
```

Do not report the weighted score without the evidence behind it.

## Challenges and trade-offs

### Weighted scoring can hide blockers

An average can make a serious failure look acceptable. Use veto requirements
for security, legal, data portability, and other non-negotiable constraints.

### Prototypes can be misleading

A prototype proves that one path can work. It does not prove production
reliability, user adoption, support quality, or long-term maintenance.

### Existing products include invisible engineering

A mature product may provide backups, monitoring, upgrades, and support that
would be expensive to recreate. Do not compare only visible features.

### Custom systems create organizational coupling

Even well-designed code can become dependent on one team or one person.
Repository ownership, documentation, tests, and deployment knowledge are part
of the technical decision.

### The cheapest decision may change later

A purchased tool may be right during early growth and become restrictive
later. A custom system may be unjustified at first but become worthwhile when
the workflow becomes strategically important.

The decision should therefore include a review trigger, not only a permanent
verdict.

## When to choose each option

### Choose buy when:

- The workflow is common and stable.
- The product passes all veto requirements.
- The remaining gaps are inconvenient rather than dangerous.
- The business needs a result quickly.
- The vendor provides usable export and recovery options.
- Internal technical capacity is limited.

### Choose build when:

- A critical workflow is not supported by available products.
- The workflow is a meaningful competitive advantage.
- Integration is more important than a broad feature set.
- The business can fund ongoing maintenance.
- A technical owner will remain responsible after launch.
- The prototype proves the riskiest technical constraint.

### Choose a hybrid approach when:

- A product handles common functionality well.
- One or two custom integrations create the real value.
- Replacing the entire product would be unnecessary.
- The custom component can remain small and replaceable.

Hybrid systems need clear ownership boundaries. Otherwise the business can
inherit both vendor limitations and custom maintenance without gaining either
system's full benefit.

## When to avoid this evaluation method

Do not create a detailed scoring matrix when:

- The decision is trivial and easily reversible.
- The requirements are not understood well enough to score.
- A mandatory security or legal requirement already eliminates an option.
- The team is using numbers to avoid making a judgment.
- The prototype has no decision question or success criterion.

In those cases, clarify the requirement or make the veto decision first.

## Limitations

This method cannot predict every future cost. It is limited by:

- The quality of the requirements
- The accuracy of cost assumptions
- The representativeness of prototype data
- The reliability of vendor information
- The team's ability to estimate maintenance
- Changes in staffing, product direction, or business strategy

The weighted scores are organization-specific. Another team can reasonably
reach a different conclusion using the same options.

Production security, legal, compliance, and reliability reviews may be
required separately. They should not be treated as optional evidence in a
procurement spreadsheet.

## Repository link and next steps

Keep the following artifacts in the decision record:

1. Workflow map
2. Veto and weighted requirements
3. Evidence and confidence for each score
4. Prototype code or configuration
5. Cost assumptions
6. Open vendor questions
7. Operational ownership plan
8. Review date and exit criteria

After the decision, record whether the assumptions were correct. If the team
chose a purchased product, measure adoption, workarounds, and export behavior.
If it chose to build, measure delivery time, maintenance effort, incidents, and
the amount of the original scope that remains in use.

## Final takeaway

**Build only when control solves a proven constraint; buy when a reliable
product solves the problem without creating a larger one.**
