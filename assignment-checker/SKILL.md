---
name: assignment-checker
description: Assess and grade a Web Developer home assignment against its requirements document, producing a weighted 0-100 scorecard with a summary, pros/cons, a requirement checklist and per-criterion evidence. Use this whenever the user asks to check, review, grade, assess, score or evaluate a home assignment, take-home, coding exercise, candidate submission or exam - including phrasings like "check this assignment", "evaluate the candidate's repo", "grade this take-home", "assignment checker" or "exam checker" - and also whenever they hand over a requirements/brief document together with a repository URL or project folder and ask how good it is, even if they never say the word "assignment".
---

# Assignment Checker

You are reviewing a candidate's home assignment for a Web Developer position. A real
person spent their evenings on this and a hiring decision will lean on what you write,
so the review has to be **fair, specific and grounded in the brief** - not a generic
code critique and not a pile of compliments.

Two failure modes to steer away from:

- **Grade inflation.** Reviewing code makes it tempting to reward visible effort. The
  question is not "did they work hard" but "does this meet the brief, and how well".
  If every criterion lands at 85+, you are grading effort.
- **Scope drift.** Penalising a missing test suite when the brief never asked for tests
  is unfair to the candidate and useless to the hiring manager. The requirements
  document defines the goalposts. Anything beyond it is bonus, not baseline.

Evidence is what separates a useful review from an opinion. Every score you give should
be traceable to something you can point at: a file and line, a command's output, a
requirement the brief stated. If you cannot cite it, you are guessing - say so.

## Step 1 - Establish the two inputs

**The requirements document.** Read it in full before looking at any code. If the user
did not supply one, ask for it - without the brief there is no rubric and no defensible
grade. Common shapes: `.md`, `.pdf`, `.docx`, a pasted block of text, a URL. PDFs read
directly with the Read tool. A `.docx` is a zip - unzip it and read `word/document.xml`,
stripping the tags. Check what the machine actually has before reaching for a tool;
Python in particular is often absent on Windows dev boxes.

**The submission.** In priority order:

1. A git origin URL the user gave you -> clone it into the scratchpad directory (not
   into the user's project): `git clone <url> <scratch>/submission`. Keep the history,
   it is a signal.
2. A local path the user gave you -> review it in place, read-only.
3. Neither -> review the current working directory, and say so explicitly in the report
   so nobody is confused about what got graded.

Record the commit SHA and date (`git log -1 --format='%H %ad %an'`). If the submission
has no git history at all, that is worth a line in the report - it usually means a zip
drop and it removes a useful signal, though it is not itself a defect.

## Step 2 - Turn the brief into a rubric

Read the document twice: once for the assignment, once specifically hunting for how it
will be judged.

**Extract two lists.**

*Hard requirements* - every concrete thing the brief says the submission must do or
have. "The list must be filterable by year", "use TypeScript", "include a README
explaining your decisions", "deploy it somewhere". These become a checklist you verify
one by one. Watch for requirements buried in prose rather than bullets; briefs love to
hide a "should also" mid-paragraph.

*Criteria and weights* - the dimensions the submission is scored on.

- **Weights given in the brief** (explicitly, or as points/percentages): use them
  exactly. Do not second-guess a stated rubric.
- **Criteria named but unweighted**: assign weights yourself from the brief's emphasis -
  how much space it spends on each, what it calls out as important, what the role needs.
  State in the report that the weights are inferred and why.
- **No criteria at all**: derive them from the hard requirements. A reasonable default
  spread for a web dev take-home, to adapt rather than paste:
  Functional completeness 35, Code quality & structure 25, UI/UX & polish 15,
  Correctness & edge cases 10, Documentation 10, Testing 5.
  Adjust to what the brief actually asks for - drop Testing to 0 if tests were never
  mentioned, raise UI/UX for a design-heavy brief.

Weights must total 100. Show the candidate-facing criteria as they appear in the brief,
using the brief's own vocabulary, so the hiring manager can line the report up against
the document they wrote.

## Step 3 - Read the code before running anything

Build a picture of the submission statically first. This is where most of the signal is,
and it means the later verification step confirms or contradicts a view you already hold
rather than forming it.

Worth covering:

- **Shape**: entry points, directory layout, where state lives, how data flows. Does the
  structure match what the README claims?
- **The hard-requirement checklist from Step 2**: locate the code implementing each one.
  A requirement you cannot find in the code is very likely not implemented - but check
  for it under a different name before concluding that.
- **Quality signals**: naming, function size, duplication, separation of concerns, error
  handling, type safety (are types load-bearing or is it `any` everywhere?), dead code,
  leftover `console.log`, commented-out blocks, hardcoded values that should be config.
- **The claims/reality gap**: candidates over-claim in READMEs. If the README says
  "fully accessible" or "handles all error states", go verify. A README claiming
  something the code does not do is worse than a modest README.
- **Git history**: `git log --oneline`. Incremental commits with meaningful messages
  suggest real iterative work; one enormous "initial commit" tells you nothing and may
  mean the history was squashed or the work was pasted in wholesale. Note it as a weak
  signal, never as an accusation.
- **Dependencies**: does the stack match what the brief asked for? Is there a
  disproportionate pile of libraries for the problem size, or conversely a sensible
  choice well used?

## Step 4 - Ask before executing candidate code

You now know what you would learn by running it. Ask the user before doing so, because
a submission from an unknown candidate is untrusted code: `npm install` alone runs
arbitrary lifecycle scripts, and dev servers open ports.

Ask once, concisely, listing the exact commands and what each will tell you. Something
like:

> I've reviewed the code statically. To verify it actually works I'd like to run:
> `npm ci --ignore-scripts` (install), `npm run build` (does it compile?),
> `npm test` (test suite), `npm run lint`. This executes the candidate's code and
> dependency install scripts. Want me to go ahead, run a subset, or skip execution?

If they approve, run the commands and grade on the real output - a submission that does
not build is a materially different submission from one that does, and no amount of
elegant reading substitutes for that. Capture actual output: error messages, test
counts, lint warning counts.

If they decline, grade from the static read and say plainly in the report that nothing
was executed, so scores on "does it work" are inferred from reading. Do not quietly
pretend you verified something you did not.

If there is no interactive user to ask - you were invoked in a batch, a hook, or as a
subagent - treat that as a decline. Running unreviewed code with nobody watching is the
wrong default, and a report that is honest about being static-only is more useful than
one that silently took the risk.

Judgement call worth making: if the build fails for an environmental reason (wrong Node
version, a private registry, a missing `.env`), that is usually not the candidate's
fault unless the brief asked them to make setup painless. Try the obvious fix once,
then note the situation rather than scoring them down for your environment.

## Step 5 - Score each criterion

Score 0-100 per criterion using these bands. They exist to keep you honest: pick the
band that describes what you found, then adjust within it.

| Band | Meaning |
|---|---|
| 90-100 | Exceeds the brief. Production-quality; you would merge this. |
| 75-89 | Meets the brief well. Minor gaps or nitpicks only. |
| 60-74 | Meets most of the brief. Notable gaps, rough edges, or a shaky approach that works. |
| 40-59 | Partially meets it. Significant requirements missing or broken. |
| 20-39 | Barely addresses this dimension. |
| 0-19 | Absent, or present but non-functional. |

Rules that keep the number meaningful:

- A criterion the candidate did not attempt scores near 0 and stays in the table at full
  weight. Never silently drop it or redistribute its weight - the missing work is the
  finding.
- An unmet **hard** requirement caps the criterion it belongs to at 74. You cannot
  "meet the brief well" while missing something the brief demanded.
- If the submission does not build or run at all, functional criteria cannot exceed 39
  regardless of how good the code reads.
- Bonus work beyond the brief lifts a score within its band; it does not offset a
  missing requirement.

Compute the total with the bundled script rather than by hand - weighted sums are easy
to fumble and an arithmetic slip discredits the whole report:

```bash
node "<skill-dir>/scripts/score.mjs" <scores.json>
```

Write `scores.json` as:

```json
{
  "criteria": [
    {"name": "Functional completeness", "weight": 35, "score": 80, "note": "All 4 required filters work; export missing"},
    {"name": "Code quality & structure", "weight": 25, "score": 72, "note": "Clean separation, some duplication in hooks"}
  ]
}
```

It prints the finished markdown table plus the overall grade, and errors out if the
weights do not total 100. Paste its output into the report as-is.

## Step 6 - Write the report

Print the report in the conversation **and** save it to
`assessment-<repo-name>-<YYYY-MM-DD>.md` in the current working directory (tell the user
the path). Hiring managers forward these.

Use this structure:

```markdown
# Assignment Assessment - <repo or candidate name>

**Assignment:** <title from the brief>
**Submission:** <URL or path> @ `<short SHA>` (<commit date>)
**Reviewed:** <today's date>
**Verification:** <e.g. "build + tests + lint executed" | "static review only, no code executed">

## Summary

<3-5 sentences. What they built, what stack, how it stands against the brief, and the
headline judgement. A hiring manager who reads only this paragraph should know whether
to keep reading.>

## Pros

- <Specific and evidenced. "Filtering logic is pure and framework-free
  (`src/lib/filtering.ts`), which makes it trivially testable" - not "good code
  quality".>

## Cons

- <Same standard. Name the impact, not just the flaw: "No loading state on the initial
  fetch (`useVideos.ts:22`), so the grid flashes empty on slow connections."
  Distinguish brief violations from opinions - mark the latter as such.>

## Requirement checklist

| # | Requirement (from the brief) | Status | Evidence |
|---|---|---|---|
| 1 | <verbatim or close paraphrase> | Met / Partial / Not met | `src/x.ts:41` or command output |

## Scores

<output of scores.py - the criteria table>

**Overall grade: <N> / 100**

<One sentence tying the number to a recommendation, e.g. "Solid mid-level submission -
worth advancing to a technical interview, with the missing test coverage as a discussion
topic.">

## Notes on this review

- <Were weights taken from the brief or inferred? If inferred, why these.>
- <What was and was not executed.>
- <Anything that limited the review: no git history, missing env vars, ambiguous
  requirement you had to interpret - and how you interpreted it.>
```

Keep the whole thing skimmable. Pros and cons of 3-6 bullets each land better than
fifteen; fold the small stuff into the criterion notes. Write about the submission, not
the person - "the error handling is inconsistent", never "the candidate is careless".

## Calibration check before you submit

Reread your own report once with fresh eyes:

- Could someone who never saw the code understand each pro and con from your bullet
  alone?
- Does every score above 85 have specific evidence, and every score below 50 a concrete
  missing thing?
- Have you penalised anything the brief never asked for? Remove it or move it to a
  clearly-labelled "beyond the brief" observation.
- Does the overall grade match the narrative? A 90 next to a summary full of gaps means
  one of the two is wrong.
