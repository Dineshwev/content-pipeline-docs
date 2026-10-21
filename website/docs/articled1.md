# How I Built a Human-Gated AI Content Pipeline for an Open-Source Directory

## Short answer

I built a TypeScript workflow that takes a human-approved software tool, gathers
information from GitHub and its website, asks Groq to turn that material into
structured content, validates the response, and saves it in Supabase.

The workflow automates the repetitive writing work, but it does not automate
the decision to include a tool or claim that generated content is automatically
correct. The current implementation proves the workflow works; it does not yet
provide a reliable benchmark for speed, cost, or factual accuracy.

## Target audience

This article is for developers who are building content or enrichment
workflows, especially workflows that combine a database, external APIs, and an
AI model.

You do not need to use the same stack to follow the design. The important ideas
are the boundary between human review and automation, the use of multiple
sources, structured output, and honest result reporting.

## The problem

An open-source directory is useful only when its entries are consistent enough
to compare.

A reader might want to know what a tool does, who it is for, what it costs,
where it can be deployed, and what trade-offs come with using it. Writing all
of that by hand is manageable for a small list, but it becomes a slow and
repetitive job as the directory grows.

Generating a page from only a tool name is not a good alternative. The model
does not have enough context, so it may produce a vague description or fill in
details that were never verified.

There is also a separate editorial question: should the tool be included at
all? I did not want that decision to be made by an automated script.

I split the workflow into two decisions:

1. **Tool selection:** a person researches a candidate and approves or rejects
   it.
2. **Content preparation:** a script gathers source material, generates
   structured fields, validates them, and saves the result.

That separation is the central design choice. Approving a tool for the
directory is not the same as verifying every sentence later generated about
it.

## Architecture

The workflow connects the following pieces:

| Component | Responsibility |
| --- | --- |
| Admin panel and review service | Records whether a candidate is approved or rejected |
| Supabase | Stores tools, generated fields, source excerpts, and processing status |
| GitHub API | Provides repository metadata and, when available, README content |
| Firecrawl | Retrieves website text as additional source material |
| Groq API | Generates structured content from the collected information |
| TypeScript script | Coordinates selection, retrieval, generation, validation, and updates |

The structured-content command is registered in `package.json` as
`generate-structured-content`.

There is also a separate `generate-content` command in the repository. They are
not interchangeable. The structured workflow gathers more source material and
writes fields such as intended audience, pros, and cons. The basic generator
uses a smaller input workflow.

## Implementation

### Step 1: A person approves the tool

The workflow starts in the admin interface. I review a pending tool, do some
basic research, and decide whether it belongs in the directory.

The endpoint accepts only two decisions: `approved` or `rejected`.

```ts
const status = body?.status;

if (status !== "approved" && status !== "rejected") {
  return NextResponse.json(
    {success: false, error: "Invalid status value."},
    {status: 400}
  );
}

const tool = await updateToolStatus(
  params.id,
  status,
  note,
  category
);
```

The reviewer can also save a category and an optional note.

An approved record becomes eligible for content generation. A rejected record
does not. This keeps the inclusion decision explicit and prevents the script
from silently deciding what belongs in the directory.

This is still an initial editorial decision, not a complete fact-check. The
generated page needs its own review when accuracy matters.

### Step 2: Select records to process

The script connects to Supabase and looks for approved tools whose structured
content is missing or previously failed.

The query also loads fields such as the tool name, description, category, URL,
GitHub stars, programming language, license, pricing, features, and
integrations.

The important filter is:

```ts
query = query.eq("status", "approved");

return query.or(
  "structured_content_status.is.null," +
  "structured_content_status.eq.failed"
);
```

The script supports `--limit` and `--slug`, so I can test one record before
processing a larger batch:

```bash
npm run generate-structured-content -- --limit=1
```

That small run is useful for catching configuration and prompt problems without
touching a large number of records.

The command needs Supabase credentials and a Groq API key. GitHub API access can
also use `GITHUB_TOKEN`. I keep these values in the local environment rather
than putting them in the article or repository.

### Step 3: Gather source material

Before asking the model to write anything, the script tries to give it useful
source material.

For a tool with a GitHub repository, it retrieves repository statistics and a
README excerpt. It also tries to retrieve text from the tool's website through
the Firecrawl integration.

The main calls look like this:

```ts
const stats = await fetchGitHubStats(
  ref.owner,
  ref.repo,
  tool.name
);

const branch = stats?.default_branch ?? "main";
const readme = await fetchReadme(
  ref.owner,
  ref.repo,
  branch
);

const deployment = parseDeploymentInfo(readme);
const websiteContent = await scrapeWebsiteContent(
  tool.url,
  tool.name
);
```

The workflow limits the README input to 6,000 characters. It can also use
existing database fields, repository statistics, and release-related metadata.

This step is deliberately best-effort. A repository URL may be missing, a
README may be unavailable, or a website may block retrieval. When that happens,
the workflow can continue with less context or fall back to the existing tool
description.

That makes the pipeline more resilient, but it also creates an important
trade-off: missing source material means the generated result may be less
complete.

### Step 4: Ask Groq for structured content

Once the source material is ready, the script builds a prompt and sends it to
Groq.

The response is requested as JSON containing fields such as:

- Summary or description
- Intended and unsuitable audiences
- Advantages and disadvantages
- Pricing
- Features and integrations
- Deployment information

The request configuration is roughly:

```ts
body: JSON.stringify({
  model,
  messages: [{role: "user", content: prompt}],
  temperature: 0.3,
  max_tokens: 2048,
  response_format: {type: "json_object"}
})
```

The prompt tells the model to use the supplied material and avoid inventing
features or metrics. The script parses the JSON and checks that the required
fields have the expected shape.

The default model is `openai/gpt-oss-120b`. The `GROQ_MODEL` environment
variable can override it.

I chose structured output instead of one large block of Markdown because the
directory needs to display and edit individual fields. A structured response
also makes it easier to reject missing or malformed sections.

There is a limit to what this validation can prove. Valid JSON is not the same
as verified information. A model can return a perfectly shaped response that
still contains an unsupported claim.

### Step 5: Validate and save the result

After generation, the script prepares the page content and updates the
corresponding Supabase record.

The update includes the generated content, individual fields, source excerpt,
timestamp, and processing status:

```ts
const updatePayload = {
  ai_content: aiContent,
  deployment_info: deployment,
  best_for: content.best_for,
  not_for: content.not_for,
  pros: content.pros,
  cons: content.cons,
  pricing_info: content.pricing_info ?? null,
  key_features: content.key_features ?? [],
  integrations: content.integrations ?? [],
  readme_excerpt: readme,
  enrichment_completed_at: new Date().toISOString(),
  structured_content_status: "success"
};
```

The record is then updated in the `open_source_tools` table.

When GitHub data is available, repository metadata is updated as well. That
means one record can hold both the generated page and the individual fields
used to render it.

This gives the directory flexibility, but it introduces a consistency problem:
if someone edits the Markdown and structured fields independently, the two
versions can drift apart. A future version should choose one source of truth or
update both representations together.

## Results and methodology

The implementation demonstrates a complete path for an approved tool:

1. Select it from Supabase.
2. Gather available GitHub and website information.
3. Send the material to Groq.
4. Validate the structured response.
5. Save the result and processing status.

The D9 example shows the intended page shape: a description, repository
statistics, deployment information, audience suitability, pros, and cons.

What I can currently claim is:

| Area | What the implementation shows |
| --- | --- |
| Approval-based selection | Records are filtered by approval status |
| Source enrichment | GitHub metadata, README retrieval, and website retrieval are implemented |
| Structured generation | The model is asked for defined JSON fields |
| Output validation | Required fields and response structure are checked |
| Database persistence | Generated content and structured fields are stored |
| Generation speed | Not measured across a representative batch |
| Failure rate | Not measured across a representative batch |
| Factual accuracy | No systematic accuracy evaluation has been completed |
| Processing cost | No documented production run has been measured |

These are implementation results, not performance benchmarks.

For example, repository statistics displayed on the D9 page are snapshots. If
they are used as evidence, the page should record when they were retrieved.

A proper benchmark would process a known group of approved tools and record:

- Number selected
- Number successful, failed, and skipped
- Total elapsed time
- API and processing cost
- Corrections required after human review

Factual accuracy would need a separate procedure that compares generated claims
with the relevant source material. Until that work is done, I would not claim a
specific improvement in speed, cost, or accuracy.

## Challenges and trade-offs

### Incomplete source material

External information is not always available. Repositories can move, README
files can be missing, and websites can block automated retrieval.

The workflow continues when optional data is missing, but the result may be
less useful. Resilience keeps the batch moving; it does not guarantee a
complete page.

### Valid structure is not factual accuracy

Schema validation catches malformed or incomplete responses. It does not check
whether every sentence is true.

If the directory needs stronger editorial confidence, generated claims need a
separate review step.

### Deployment information is inferred

The script infers deployment information from README text. Keyword detection
can find a useful signal, but it cannot prove that a deployment option is
supported, current, or maintained.

I treat these labels as hints until the detection logic has been evaluated.

### Two representations can drift

Storing both Markdown and individual fields makes the content flexible to
display and edit. It also creates two versions of the same information.

The safer long-term design is to define one canonical representation and
derive the other from it.

### External services can fail

The workflow depends on Supabase, Groq, GitHub, and website retrieval. Missing
credentials, rate limits, network failures, and API changes can interrupt a
run.

Retries and status tracking help with some temporary failures, but they do not
remove those dependencies.

## When to avoid this approach

Avoid this design when:

- Every generated claim must be verified before it is stored.
- The source material is too sensitive to send to an external model.
- The directory is small enough that careful manual writing is faster.
- You do not have a person available to review candidate tools and generated
  claims.
- A single source of truth is required but the system cannot enforce it.

This approach is most useful when the work is repetitive, the source material
is reasonably accessible, and a human can review the result.

## Limitations and next steps

This implementation is a working exploration of a human-reviewed,
AI-assisted workflow. It is not an autonomous system for producing verified
software evaluations.

The next improvements I would make are:

1. **Record source freshness.** Store when repository and website information was
   retrieved.
2. **Add claim review.** Separate approval of a tool from review of the claims
   generated for its page.
3. **Measure real runs.** Process a repeatable batch and record success,
   failure, skipped records, time, and cost.
4. **Improve deployment detection.** Distinguish detected signals from verified
   support.
5. **Synchronize stored content.** Prevent Markdown and structured fields from
   being edited into conflict.
6. **Test failure cases.** Cover missing repositories, sparse READMEs,
   inaccessible websites, malformed responses, and API failures.

These are planned improvements, not capabilities I have already measured.

## Repository and reproduction

The project source code is available in the repository. The structured-content
generator is located at:

`core/scripts/generate-tool-structured-content.ts`

The basic content generator and administrative review endpoint are separate
components.

To reproduce the structured-content step for the approved tool with the slug
`d9`:

```bash
cd core
npm run generate-structured-content -- --slug=d9
```

Configure the required Supabase and Groq environment variables first. Set
`GITHUB_TOKEN` if authenticated GitHub API access is needed, and keep all
credentials private.

After the command finishes, inspect the corresponding Supabase record. Check
the generated Markdown, structured fields, and processing status. A
`success` status means the script's validation passed; it does not certify
that every generated claim is factually correct.

## Conclusion

I built this pipeline to remove repetitive content preparation without handing
editorial judgment over to an AI model.

The current workflow keeps tool selection with a person, gathers whatever
source material is available, asks Groq for consistent fields, validates the
response, and stores the result in Supabase.

That is useful progress, but it is not the same as proving that the generated
pages are accurate or cheaper to maintain. The next meaningful step is to run a
repeatable batch, record the numbers, and review the claims systematically.
