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
Scan every CV bullet and every interview answer. For each item that contains a number, a named system, a named outcome, or a named external user, add it to the pool and rank it:

| Rank | Artifact type |
|------|--------------|
| 1 | Specific number (%, $, count, latency, throughput) |
| 2 | Named external users (companies, labs, open-source dependents) |
| 3 | Named publication or venue (NeurIPS, ICML, CVPR, etc.) |
| 4 | Named open-source project with measurable adoption (stars, forks, downloads) |
| 5 | Named internal system with named downstream team or user count |
| 6 | Named method or technique tied to a concrete outcome |
| 7 | Named project with no quantification — use only if nothing above exists |

**0d. Select exactly one artifact for S1 and one for S2.**
- S1 artifact: the highest-ranked item from pool (a) or (b) that can be stated as a noun phrase. Must be the most JD-relevant item — not the first item in the CV.
- S2 artifact: the highest-ranked item in the entire pool, regardless of JD relevance. The most impressive falsifiable proof on the page. Must differ from S1.

**0e. Scope vs. years in S1.**
Use whichever is stronger:
- Prefer scope over years for mid-career candidates: "serving 50M users" beats "with 5 years".
- Use years only when the number signals seniority (7+) or when no scope data exists.
- When both are strong, lead with scope.

**0f. If the pool has fewer than two rank-1 through rank-5 artifacts:**
Do not invent. Ask the user before writing:
> "I don't see strong proof points for [load-bearing requirement]. The strongest thing I found is [best pool item]. Can you tell me about any work in that area I can add? Even an unfinished project, a course project, or adjacent work counts if it's real."

## Structural formula

**Exactly 2 to 3 sentences. 45 to 70 words.**

- **S1 (Positioning + scope/years + headline artifact):** `<Role archetype> with <scope or X years> building <S1 artifact from pool> in <domain(s)>.` Must name a concrete artifact — not just a domain ("AI", "data") but a named thing ("a Kafka-backed feature store", "RLHF reward models").
- **S2 (Proof):** State the S2 artifact concretely. Must include at least one rank-1 through rank-4 artifact: a specific number, a named external user, a named venue, or a named open-source project with adoption signal. Falsifiable against the CV body or interview notes.
- **S3 (optional):** A second depth marker the JD cares about. Cut entirely if it repeats S1 or S2.

## Draft → critique → rewrite protocol

After writing the first draft, do NOT save it. Run this pass first:

1. **Per-sentence skeptic test:** "What specific thing is this person claiming, and where in the CV or interview notes can I verify it?" Vague or unverifiable sentences are rewritten or cut.
2. **10,000-applicant test:** "Would this phrase appear in 10,000 other summaries for this role?" If yes, replace it with something that names a specific project, number, stack, or outcome.
3. **S1 concreteness check:** Does S1 name a concrete artifact, not just a domain? "Building AI systems" fails. "Building a retrieval-augmented generation pipeline" passes.
4. **S2 specificity check:** Does S2 contain a rank-1 through rank-4 artifact? If not, go back to the pool.
5. **Scope check:** Is years the only scope signal in S1, and the candidate has under 7 years? Replace or augment with a concrete scope phrase.
6. **Phrase audit — no free passengers.** For every phrase that contains no number and no named user, ask: "Is this doing positioning, proof, or keyword work?" If none of those three, cut it. Implementation details (stack choices, infrastructure methods, tools used to build something) are not proof — they belong in bullets or Skills. The one exception: if the tool itself is the named artifact (e.g., "Developed AlProtein"), the tool name earns its place. But "running on SLURM with MPI" appended to a sentence that already has a proof number adds nothing — it describes the how, not the what or the outcome. Cut it and use the freed words for a second rank-1 artifact instead.
7. Rewrite anything that fails. The first draft almost always has at least one failing sentence. This is expected.

## Advisor gate: Summary-specific checks

The advisor must explicitly check these three failure modes — not just do a general read:

1. **S1 artifact test:** Does S1 contain a concrete named artifact (not just a domain or function)? Flag if not.
2. **S2 specificity test:** Does S2 contain a number, named external user, named venue, or named open-source project? Flag if not.
3. **Banned phrase scan:** Grep S1+S2+S3 for every banned verb and phrase. Flag any match.

If any flag is raised, the advisor must propose a rewrite — not just note the issue.

## Hard bans

- **Aspirational closer**: "I'm genuinely excited about building X..." Unfalsifiable, breaks third-person register.
- **Mission-statement closer**: "Motivated by making frontier AI systems safe..." Cover-letter material.
- **Cover-letter closer**: "Targeting generative AI for protein structure..." "Targeting" is a cover-letter verb.
- **Meta-framing**: "Applying to a Data Platform role..." Restates what the reader already knows.
- **Vague scope claim**: "Engineer working across AI, HPC, and data..." Replace with a concrete artifact.
- **Years as the only signal**: "Engineer with 4 years of experience in ML." Always pair years with a concrete artifact or scope phrase.

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
- [ ] Draft → critique → rewrite pass completed — including phrase audit (no implementation details without a proof outcome).
- [ ] 2 to 3 sentences, 45 to 70 words.
- [ ] No banned verbs or phrases.
- [ ] No first-person pronouns.
- [ ] No target-company or target-role name.
- [ ] Every sentence passes the falsifiability test.
- [ ] 3 to 5 JD keywords present, legitimately reformulating real experience.
- [ ] Inline HTML style includes `text-align:justify;`.
- [ ] No em-dashes, en-dashes, or double-hyphens.

## Worked examples

### Example 1: Strong CV, Data Platform Engineer JD

**Before (failed):**
> Experienced engineer applying to a Data Platform Engineering role, with a strong background in distributed systems and a proven track record of building scalable pipelines. Passionate about leveraging AI to drive internal tooling improvements.

Problems: meta-framing, banned phrases, zero falsifiable claims. "Proven track record" and "strong background" appear in ten thousand other summaries.

**After (correct):**
> Data platform engineer with five years building streaming Kafka pipelines and a Python feature store serving two in-house ML teams. Shipped an internal evaluator for retrieval-augmented Large Language Model (LLM) assistants that cut review time by 40 percent, with the whole stack open-sourced under Apache 2.0.

- S1: scope ("serving two ML teams") + concrete artifact (Kafka pipelines, feature store). Years present but scope strengthens them.
- S2: rank-1 artifact (40 percent) + rank-4 artifact (open-sourced). Two falsifiable claims in one sentence.

### Example 2: Strong CV, ML Research Engineer JD

**Before (failed):**
> Empirical researcher applying to BigLab's ML Research team with years of ML experience, passionate about foundation models, motivated to push frontier AI systems forward.

Problems: meta-framing, company name in Summary (banned), "years of ML experience" is years-as-only-signal, all banned phrases.

**After (correct):**
> ML research engineer with six years across supervised fine-tuning, reinforcement learning from human feedback (RLHF), and open-source reproduction of published benchmarks. Author of three NeurIPS papers on small-model distillation and maintainer of an evaluation harness used by two external labs for foundation-model regression testing.

- S1: six years paired with three concrete methods — not naked years.
- S2: rank-3 artifact (NeurIPS, three papers) + rank-2 artifact (two external labs). Both are independently falsifiable.

### Example 3: Thin CV, junior / career-change candidate

Pool after step 0c: two rank-5 items (named projects, no numbers), one rank-6 item. No rank-1 through rank-4 artifacts. Step 0f triggers — ask the user before writing.

User provides: "The API I built is used by three other teams at my company, roughly 200 internal users."

**After (correct):**
> Backend engineer with two years building REST APIs and async job queues in Python and FastAPI. Designed an internal notification service now used by three teams across 200 employees, replacing a manual Slack-based process.

- S1: two years is low, but paired with concrete tech stack (REST APIs, FastAPI, async queues).
- S2: rank-2 artifact (200 employees, three teams) from interview notes — not invented. Named outcome (replaced manual process).
- No numbers were fabricated. Scope came from the user.

See `examples/mohamed_ali_summary_annotated.md` for additional annotated walkthroughs.
