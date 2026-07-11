# Professional Summary Spec

The canonical spec lives inside `SKILL.md` under the heading **Professional Summary Spec** and is what the skill enforces at the advisor gate. This page is a standalone, human-readable version for candidates who want to understand the rules before running the tool.

## Why this exists

The Summary is the single most-failed section in AI-generated CVs. Without discipline, it collapses into aspirational fluff, mission statements, and sentences that could apply to any of ten thousand other applicants. kairos treats the Summary as the highest-leverage section on the page and enforces the rules below on every run.

## The job of the Summary

Three things, in this order:

1. **Positioning.** One sentence that tells a skim reader what kind of engineer or scientist you are and why that matches the JD.
2. **Proof.** One or two concrete artifacts, results, or technical depth markers the CV body will back up. Every claim must be falsifiable.
3. **Keyword surface.** 3 to 5 of the JD's top keywords carried naturally so ATS and human skimmers both register the match in the first five seconds.

It is not a cover letter. It is not a mission statement. It is not a "why I'm excited" paragraph.

## Step 0: Mine before you write (mandatory)

Do NOT draft a single word until this extraction is complete. Skipping it is the root cause of generic output.

**0a. Check interview notes first.**
Read `interview_notes.md` before touching the CV. Interview answers are first-class artifacts — the user may have described depth, scope, or outcomes the CV does not expose. Add any usable claims to the candidate pool below.

**0b. Extract the JD's single most load-bearing requirement.**
One phrase. The thing the role cannot exist without. This anchors S1.

**0c. Build a ranked candidate artifact pool.**
Scan every CV bullet and every interview answer. For each item that contains a number, a named system, a named outcome, or a named external user, add it to the pool. As you add each item, assign two tags:

**Specificity rank** (1 = strongest proof):

| Rank | Artifact type |
|------|--------------|
| 1 | Specific number (%, $, count, latency, throughput) |
| 2 | Named external users (companies, labs, open-source dependents) |
| 3 | Named publication or venue (NeurIPS, ICML, CVPR, etc.) |
| 4 | Named open-source project with measurable adoption (stars, forks, downloads) |
| 5 | Named internal system with named downstream team or user count |
| 6 | Named method or technique tied to a concrete outcome |
| 7 | Named project with no quantification — use only if nothing above exists |

**JD relevance tag** (assigned at the time of adding, against the load-bearing requirement from step 0b):
- **(a) direct match** — speaks directly to the load-bearing requirement
- **(b) adjacent** — related but not the core requirement
- **(c) unrelated** — strong proof point but off-topic for this JD

**0d. Select exactly one artifact for S1 and one for S2.**
- S1 artifact: the highest-ranked item tagged (a) or (b). Must be the most JD-relevant item — not the first item in the CV.
- S2 artifact: the highest-ranked item in the entire pool, regardless of JD relevance tag. The most impressive falsifiable proof on the page. Must differ from S1.

**0e. Scope vs. years in S1.**
Use whichever is stronger:
- Prefer scope over years for mid-career candidates: "serving 50M users" beats "with 5 years".
- Use years only when the number signals seniority (7+) or when no scope data exists.
- When both are strong, lead with scope.

**0f. If the pool has fewer than two rank-1 through rank-5 artifacts:**
Do not invent. Ask the user before writing:
> "I don't see strong proof points for [load-bearing requirement]. The strongest thing I found is [best pool item]. Can you tell me about any work in that area I can add? Even an unfinished project, a course project, or adjacent work counts if it's real."

## When to skip the Summary entirely

A Summary must earn its place. For candidates with under ~3 years of experience and a linear, self-explanatory history (one track, obvious fit), the first Experience bullet often says everything a Summary would — ask the user via `AskUserQuestion` whether to skip it and lead with Education or Experience instead. Keep the Summary when the candidate is mid-career (3+ years), changing tracks, or has a scattered history the reader needs help parsing.

## Structural formula

**Exactly 2 to 3 sentences. 45 to 70 words total.** Longer than that and it stops being a summary. Thin-CV candidates (junior, career change) may land at 35 to 50 words, never pad a Summary with filler to reach the range. Count words as whitespace-separated tokens: "40 percent" is two words, "feature-store" is one, "(RLHF)" is one.

- **S1 (Positioning + scope/years + headline artifact):** `<Role archetype> with <scope or X years> building <S1 artifact from pool> in <domain(s)>.` Must name a concrete artifact — not just a domain ("AI", "data") but a named thing ("a Kafka-backed feature store", "RLHF reward models").
- **S2 (Proof):** State the S2 artifact concretely. Must include at least one rank-1 through rank-4 artifact: a specific number, a named external user, a named venue, or a named open-source project with adoption signal. Falsifiable against the CV body or interview notes.
- **S3 (optional):** A second depth marker the JD cares about. Cut entirely if it repeats S1 or S2.

## Register (how it should sound)

Strong human-written summaries at this level are plain, declarative, and slightly dry, closer to "Senior engineer with 3 years at Amazon, promoted twice in 3 years" than to flowing prose. Enforce:

- **Short declarative sentences.** 12 to 20 words is the natural range. Never one long sentence of stacked clauses.
- **Fragment openers are allowed and often best.** "Data platform engineer, five years on Kafka streaming pipelines and a Python feature store." reads more human than a fully wound sentence with "with ... building ... serving" chained clauses. Fragments are deliberate style, not punctuation errors: capitalize normally and end with a period, which satisfies the ATS proper-punctuation rule.
- **Adjacent sentences must differ in shape and length** (8+ words apart, or one is a fragment). Two polished 30-word sentences in a row is the classic generated-Summary rhythm.
- **Zero non-technical adjectives.** "Streaming", "distributed", "asynchronous" are facts; "innovative", "robust", "comprehensive" are polish and banned.
- **Keyword ceiling per sentence: 2.** The Summary carries 3 to 5 JD keywords total, but never more than two in one sentence. A Summary that mirrors the JD's own phrasing back at it reads as AI even when every claim is true.

## Draft → critique → rewrite protocol

After writing the first draft, do NOT save it. Run this pass first:

1. **Per-sentence skeptic test:** "What specific thing is this person claiming, and where in the CV or interview notes can I verify it?" Vague or unverifiable sentences are rewritten or cut.
2. **10,000-applicant test:** "Would this phrase appear in 10,000 other summaries for this role?" If yes, replace it with something that names a specific project, number, stack, or outcome.
3. **S1 concreteness check:** Does S1 name a concrete artifact, not just a domain? "Building AI systems" fails. "Building a retrieval-augmented generation pipeline" passes.
4. **S2 specificity check:** Does S2 contain a rank-1 through rank-4 artifact? If not, go back to the pool.
5. **Scope check:** Is years the only scope signal in S1, and the candidate has under 7 years? Replace or augment with a concrete scope phrase.
6. **Phrase audit — no free passengers.** For every phrase that contains no number and no named user, ask: "Is this doing positioning, proof, or keyword work?" If none of those three, cut it. Implementation details (stack choices, infrastructure methods, tools used to build something) are not proof — they belong in bullets or Skills. The one exception: if the tool itself is the named artifact (e.g., "Developed AlProtein"), the tool name earns its place. But "running on SLURM with MPI" appended to a sentence that already has a proof number adds nothing — it describes the how, not the what or the outcome. Cut it and use the freed words for a second rank-1 artifact instead.
7. **Cadence check (read the draft aloud).** Do adjacent sentences share the same grammatical skeleton or nearly the same length? Does any sentence end in a generic "-ing" benefit tail? Is there more than one "X, Y, and Z" triad? More than one "with" chain in a sentence? Any "serves as / stands as / boasts"? Each hit is a rewrite. The target rhythm is uneven: a fragment or short sentence next to a longer one.
8. Rewrite anything that fails. The first draft almost always has at least one sentence that fails step 2, 3, 6, or 7. This is expected.

## Advisor gate: Summary-specific checks

The advisor must explicitly check these four failure modes — not just do a general read:

1. **S1 artifact test:** Does S1 contain a concrete named artifact (not just a domain or function)? Flag if not.
2. **S2 specificity test:** Does S2 contain a number, named external user, named venue, or named open-source project? Flag if not.
3. **Banned phrase scan:** Grep S1+S2+S3 for every banned verb and phrase. Flag any match.
4. **Cadence test:** Flag if adjacent sentences share the same skeleton or near-identical length, if any sentence ends in a generic participial benefit tail, if more than one triad list appears, or if any sentence carries more than two JD keywords.

If any flag is raised, the advisor must propose a rewrite — not just note the issue.

## Hard bans

- **Aspirational closer**: "I'm genuinely excited about building X..." Unfalsifiable, breaks third-person register.
- **Mission-statement closer**: "Motivated by making frontier AI systems safe..." Cover-letter material.
- **Cover-letter closer**: "Targeting generative AI for protein structure..." "Targeting" is a cover-letter verb.
- **Meta-framing**: "Applying to a Data Platform role..." Restates what the reader already knows.
- **Vague scope claim**: "Engineer working across AI, HPC, and data..." Replace with a concrete artifact.
- **Years as the only signal**: "Engineer with 4 years of experience in ML." Always pair years with a concrete artifact or scope phrase.
- **JD echo**: Summary restates the JD's own phrasing ("distributed systems at scale in a fast-paced environment") without an artifact behind each phrase. Keyword mirroring with no execution detail is a reported recruiter tell, and modern ATS flag unnatural keyword density too.
- **Uniform cadence**: Two perfectly parallel ~30-word sentences, each ending in a benefit clause. Rhythm is the tell. Vary sentence shape and length (see Register above).

Also banned:
- First-person pronouns (`I`, `I'm`, `my`).
- Verbs: `excited`, `passionate`, `motivated by`, `seeking`, `targeting`, `applying to`, `suited to`, `looking to`, `eager to`, `driven by`.
- Phrases: `results-oriented`, `proven track record`, `strong background in`, `deep expertise in` (without immediate specific evidence), `combining X with Y` when X and Y are both generic.
- Naming the target company or target role inside the Summary.

## The falsifiability test

Before saving, read each sentence and ask:

1. **"Is there a concrete claim here a skeptical reader could fact-check against the CV body or interview notes?"** If no, rewrite or cut.
2. **"Would this be true of 10,000 other applicants to this role?"** If yes, it is filler. Replace with a named project, a number, a specific stack, or a named outcome.

## Verification checklist

- [ ] Interview notes checked (step 0a) before touching the CV.
- [ ] Artifact pool built and ranked before drafting (steps 0b-0f).
- [ ] S1 uses scope or years paired with a concrete artifact — not years alone.
- [ ] S1 names a concrete artifact, not just a domain or function.
- [ ] S2 contains a rank-1 through rank-4 artifact.
- [ ] Draft → critique → rewrite pass completed — including phrase audit (no implementation details without a proof outcome) and cadence check (step 7).
- [ ] 2 to 3 sentences, 45 to 70 words (35 to 50 acceptable for thin CVs; never padded).
- [ ] Adjacent sentences differ in shape and length; no generic participial tails; at most one triad; no sentence with 3+ JD keywords.
- [ ] No banned verbs or phrases.
- [ ] No first-person pronouns.
- [ ] No target-company or target-role name.
- [ ] Every sentence passes the falsifiability test.
- [ ] 3 to 5 JD keywords present, legitimately reformulating real experience.
- [ ] Inline HTML style includes `text-align:justify;`.
- [ ] No em-dashes, en-dashes, or double-hyphens.

## Worked examples

All three examples happen to use the 3-sentence form; two sentences is equally valid whenever S3 would repeat S1 or S2.

### Example 1: Strong CV, Data Platform Engineer JD

**Before (failed):**
> Experienced engineer applying to a Data Platform Engineering role, with a strong background in distributed systems and a proven track record of building scalable pipelines. Passionate about leveraging AI to drive internal tooling improvements.

Problems: meta-framing, banned phrases, zero falsifiable claims. "Proven track record" and "strong background" appear in ten thousand other summaries.

**After (correct):**
> Data platform engineer, five years on streaming Kafka pipelines and a Python feature store used by two in-house ML teams. Built an internal evaluator for retrieval-augmented LLM assistants that cut review time by 40 percent. The whole stack is open source under the Apache 2.0 license.

- S1: fragment opener (positioning + years + JD-relevant artifact, "used by two in-house ML teams" as scope). No "with ... building ... serving" chained clauses.
- S2: named artifact (evaluator), named result (40 percent), JD keyword surface (retrieval-augmented LLM). No participial tail: the outcome sits in the main clause.
- S3: eleven words, plain copula ("is"), falsifiable. Sentence lengths 20 / 15 / 11 (46 words total), visibly uneven, which is the human rhythm. Note: "open source under Apache 2.0" earns its place in S3 as a verifiable, named fact, not because it signals adoption on its own. A rank-4 label still requires measurable adoption data (stars, forks, downloads); absent that, this stays supporting detail alongside the rank-1 artifact in S2 rather than a standalone proof point.

### Example 2: Strong CV, ML Research Engineer JD

**Before (failed):**
> Empirical researcher applying to BigLab's ML Research team with years of ML experience, passionate about foundation models, motivated to push frontier AI systems forward.

Problems: meta-framing, company name in Summary (banned), "years of ML experience" is years-as-only-signal, all banned phrases.

**After (correct):**
> ML research engineer: six years across supervised fine-tuning, reinforcement learning from human feedback (RLHF), and open-source benchmark reproduction. Author of three NeurIPS papers on small-model distillation. Maintainer of an evaluation harness that two external labs run for foundation-model regression testing.

- S1: concrete methods (SFT, RLHF), one triad (the maximum). Six years paired with concrete methods, not left naked.
- S2 + S3: named venue (NeurIPS) in an eight-word sentence, then named artifact and named downstream users (two external labs). Rank-2 and rank-3 artifacts, three different sentence shapes.

### Example 3: Thin CV, junior / career-change candidate

Pool after step 0c: two rank-5 items (named projects, no numbers), one rank-6 item. No rank-1 through rank-4 artifacts. Step 0f triggers — ask the user before writing.

User provides: "The API I built is used by three other teams at my company, roughly 200 internal users."

**After (correct):**
> Backend engineer, two years building REST APIs and async job queues in Python and FastAPI. Designed an internal notification service now used by three teams and roughly 200 employees. It replaced a manual Slack-based process.

- S1: scope injected from interview notes ("used by three teams"), not invented.
- S2: named artifact + named users (200 employees). S3 carries the outcome as its own short plain sentence, not as a ", replacing ..." participial tail.
- 35 words total: under the standard range, which is correct for a thin CV. Never pad.
- No numbers were fabricated. The scope came from the user ("roughly 200" stays "roughly 200", do not sharpen it).

See `examples/mohamed_ali_summary_annotated.md` for additional annotated walkthroughs.
