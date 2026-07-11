# Mohamed Ali Professional Summary: before and after

A worked example of the Professional Summary Spec, applied to two different JDs for the same fictional candidate (Mohamed Ali). Read alongside `docs/SUMMARY_SPEC.md`.

---

## Example 1: Data Platform Engineer JD

### Before (typical AI-generated output)

> Experienced engineer applying to a Data Platform Engineering role, with a strong background in distributed systems and a proven track record of building scalable pipelines. Passionate about leveraging AI to drive internal tooling improvements and excited to contribute to the team's mission.

**What goes wrong:**
- **Meta-framing**: "applying to a Data Platform Engineering role" states what the reader already knows.
- **Banned phrases**: "strong background", "proven track record", "passionate about", "leveraging", "excited to".
- **Zero falsifiable claims**: nothing in this summary could be fact-checked against the CV body.
- **First-person feel** even though it avoids "I".
- Would be true of ~10,000 other applicants. Fails the falsifiability test.

### After (Spec-compliant)

> Data platform engineer, five years on streaming Kafka pipelines and a Python feature store used by two in-house ML teams. Built an internal evaluator for retrieval-augmented LLM assistants that cut review time by 40 percent. The whole stack is open source under the Apache 2.0 license.

**Why this works:**
- **S1**: fragment opener, positioning (data platform engineer) + scope (five years, "used by two in-house ML teams") + headline artifact (Kafka pipelines, Python feature store). JD keywords `streaming`, `pipelines`, `feature store` carried naturally. No participial tail.
- **S2**: named artifact (evaluator), specific number (40 percent), JD keyword surface (retrieval-augmented LLM). The outcome sits in the main clause, not a trailing "-ing" benefit clause.
- **S3**: plain copula ("is"), falsifiable claim (open source under Apache 2.0). No "serves as" or "stands as".
- No banned verbs. No meta-framing. No target-company name. Third-person implied subject.
- Uneven sentence lengths (20 / 15 / 11 words) give the human rhythm the spec asks for, rather than uniform polished clauses.
- Word count: 46. Sentence count: 3. Inside the 45-70 window without padding.

---

## Example 2: ML Research Engineer JD

### Before (typical AI-generated output)

> Empirical researcher applying to BigLab's ML Research team with years of ML experience, passionate about foundation models, motivated to push frontier AI systems forward and contribute to impactful research.

**What goes wrong:**
- Every sentence is mission statement or meta-framing.
- Names the target company inside the Summary (banned).
- "Years of ML experience" is vague scope, no number, no proof.
- "Passionate about", "motivated to", "impactful research" are all banned phrases.

### After (Spec-compliant)

> ML research engineer: six years across supervised fine-tuning, reinforcement learning from human feedback (RLHF), and open-source benchmark reproduction. Author of three NeurIPS papers on small-model distillation. Maintainer of an evaluation harness that two external labs run for foundation-model regression testing.

**Why this works:**
- **S1**: colon opener, positioning (ML research engineer) + scope (six years) + one triad of concrete methods (SFT, RLHF, open-source benchmark reproduction), the spec's one-triad maximum, not exceeded elsewhere. `RLHF` spelled out on first use. JD keywords `foundation models`, `fine-tuning`, `benchmarks` land naturally.
- **S2**: named venue (NeurIPS), specific count (three papers), no participial tail.
- **S3**: named artifact (evaluation harness), named downstream users (two external labs). Every claim falsifiable.
- No target-company name. No aspirational closer. No "motivated by".
- Uneven sentence lengths (18 / 8 / 14 words) instead of two matched, polished sentences back to back.
- Word count: 40. Sentence count: 3.

---

## The shape to imitate

| Element | Example 1 | Example 2 |
|---|---|---|
| S1 opens with | "Data platform engineer, five years on..." (fragment) | "ML research engineer: six years across..." (colon) |
| S1 contains | concrete stack (Kafka, Python, feature store) | concrete methods (SFT, RLHF, reproduction) |
| S2 proves S1 with | named artifact + number | named venue + count |
| S3 proves further with | plain copula + verifiable license fact | named artifact + named downstream users |
| Sentence lengths | uneven (20 / 15 / 11 words) | uneven (18 / 8 / 14 words) |
| First-person pronouns | zero | zero |
| Target company named | no | no |
| Banned verbs | zero | zero |
| Word count | 46 | 40 |

Copy the **shape**, not the **content**. Fill S1 and S2 with your own concrete proofs from your own CV.
