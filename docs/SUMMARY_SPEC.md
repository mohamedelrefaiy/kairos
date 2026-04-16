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

## Structural formula

**Exactly 2 to 3 sentences. 45 to 70 words.**

- **S1** (Positioning + headline artifact): "<Role archetype> with <X years / scope> building <the single most JD-relevant thing> in <domain(s)>."
- **S2** (Proof): A specific artifact, system, or result. Name the thing. Prefer numbers, named systems, or named outcomes over abstract claims.
- **S3** (optional): A second depth marker. Cut entirely if it would repeat S1 or S2.

## Hard bans

Do not write any of these patterns. Examples are from real AI-generated summaries seen in the wild:

- **Aspirational closer**: "I'm genuinely excited about building X..." Unfalsifiable, breaks third-person register.
- **Mission-statement closer**: "Motivated by making frontier AI systems safe..." Cover-letter material.
- **Cover-letter closer**: "Targeting generative AI for protein structure..." "Targeting" is a cover-letter verb.
- **Meta-framing**: "Applying to a Data Platform role..." or "Suited to a Forward Deployed role..." Restates what the reader already knows.
- **Vague scope claim**: "Engineer working across AI, HPC, and data..." Replace with the most JD-relevant concrete artifact.

Also banned:
- First-person pronouns (`I`, `I'm`, `my`).
- Verbs: `excited`, `passionate`, `motivated by`, `seeking`, `targeting`, `applying to`, `suited to`, `looking to`, `eager to`, `driven by`.
- Phrases: `results-oriented`, `proven track record`, `strong background in`, `deep expertise in` (without immediate specific evidence), `combining X with Y` when X and Y are both generic.
- Naming the target company or target role inside the Summary. That is cover-letter work.

## The falsifiability test

Before saving, read each sentence and ask:

1. **"Is there a concrete claim here a skeptical reader could fact-check against the CV body?"** If no, rewrite or cut.
2. **"Would this be true of 10,000 other applicants to this role?"** If yes, it is filler. Replace with something specific: a named project, a number, a specific stack, or a named outcome.

## Verification checklist

- [ ] 2 to 3 sentences, 45 to 70 words.
- [ ] No banned verbs or phrases.
- [ ] No first-person pronouns.
- [ ] No target-company or target-role name.
- [ ] Every sentence passes the falsifiability test.
- [ ] 3 to 5 JD keywords present, legitimately reformulating real experience.
- [ ] Inline HTML style includes `text-align:justify;`.
- [ ] No em-dashes, en-dashes, or double-hyphens.

See `examples/mohamed_ali_summary_annotated.md` for two before-and-after walkthroughs.
