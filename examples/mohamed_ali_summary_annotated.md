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

> Data platform engineer with five years building streaming Kafka pipelines and a Python feature store serving two in-house ML teams, with open-source contributions to a widely used retrieval library. Shipped an internal evaluator for retrieval-augmented Large Language Model (LLM) assistants that cut review time by 40 percent across forty daily queries, with the whole stack open-sourced under Apache 2.0.

**Why this works:**
- **S1**: positioning (data platform engineer) + scope (five years) + headline artifact (Kafka pipelines, Python feature store). JD keywords `streaming`, `pipelines`, `feature store` carried naturally.
- **S2**: named artifact (evaluator), specific number (40 percent across forty daily queries), falsifiable claim (open-sourced under Apache 2.0 — verifiable). Acronym `LLM` spelled out on first use for ATS.
- No banned verbs. No meta-framing. No target-company name. Third-person implied subject.
- Word count: 64. Sentence count: 2. Inside the 45-70 window.

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

> ML research engineer with six years across supervised fine-tuning, reinforcement learning from human feedback (RLHF), and open-source reproduction of published benchmarks. Author of three NeurIPS papers on small-model distillation and maintainer of an evaluation harness used by two external labs for foundation-model regression testing.

**Why this works:**
- **S1**: positioning (ML research engineer) + scope (six years) + three concrete methods (SFT, RLHF, open-source reproduction). `RLHF` spelled out on first use. JD keywords `foundation models`, `fine-tuning`, `benchmarks` land naturally.
- **S2**: named venue (NeurIPS), specific count (three papers), named artifact (evaluation harness), named downstream users (two external labs). Every claim falsifiable.
- No target-company name. No aspirational closer. No "motivated by".
- Word count: 54. Sentence count: 2.

---

## The shape to imitate

| Element | Example 1 | Example 2 |
|---|---|---|
| S1 opens with | "Data platform engineer with five years building..." | "ML research engineer with six years across..." |
| S1 contains | concrete stack (Kafka, Python, feature store) | concrete methods (SFT, RLHF, reproduction) |
| S2 proves S1 with | named artifact + number + license | named venue + count + named users |
| First-person pronouns | zero | zero |
| Target company named | no | no |
| Banned verbs | zero | zero |
| Word count | 64 | 54 |

Copy the **shape**, not the **content**. Fill S1 and S2 with your own concrete proofs from your own CV.
