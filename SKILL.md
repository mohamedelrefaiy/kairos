---
name: kairos
description: Career advisor skill for Claude Code. Evaluates job descriptions, runs an adaptive interview, tailors your CV (HTML + PDF), and drafts application responses with a writing discipline that does not read as AI-generated. When a user pastes a JD or URL, run the full pipeline end-to-end with zero manual steps.
user_invocable: true
args: mode
argument-hint: "[start | defend | respond | recompile | tracker | update]"
---

# kairos: Career Advisor Skill

**kairos** (Greek: *the right moment to act*) is a Claude Code skill that turns a job description into a tailored, ATS-clean, advisor-reviewed CV PDF without the AI-written smell. It converses with the user about their real experience, maps it to the JD, and writes copy the user can defend in an interview.

## When to activate (no explicit invocation needed)

Activate this skill automatically when the user's message contains any of:
- A job description pasted inline (title + company + responsibilities)
- A job posting URL
- A request like "apply to X", "tailor my CV for Y", "I'm applying to Z"

If activated without an explicit mode, run the **full pipeline** (interview + eval + pdf + respond if the JD asks a question).

---

## Startup: First-Time Detection

**BLOCKING GATE - no pipeline step (including Parse JD, URL fetch, JD research, or any Haiku sub-agent) may begin until ALL startup steps below return success.** Do not launch any parallel agents or fetch any URLs until Step 3 completes. If any startup step requires user input (identity interview, CV builder), wait for the user to respond before continuing.

Run these checks every time kairos activates:

### Step 0: Check for updates (non-blocking)

Run this silently in the background. Never block the pipeline for it.

1. Read `~/.claude/skills/kairos/.last_update_check` (a file containing a Unix timestamp).
2. If the file does not exist, or the timestamp is more than 3 days old:
   - Run `git -C ~/.claude/skills/kairos fetch origin main --quiet` to fetch without merging.
   - Run `git -C ~/.claude/skills/kairos rev-list HEAD..origin/main --count` to count new commits.
   - If count is 0: write the current timestamp to `.last_update_check` and continue silently.
   - If count > 0: write the current timestamp to `.last_update_check`, then surface a one-line notice to the user **after the pipeline completes** (not before):

     > "kairos has {count} update(s) available. Run `/kairos update` to apply, or ignore to stay on the current version."

3. If the fetch fails (no network, not a git repo, etc.): silently skip. Never surface an error for a failed update check.

**`/kairos update` command**: when the user runs this, ask via `AskUserQuestion`:
> "Apply kairos updates now? This pulls the latest SKILL.md and scripts from GitHub. Your config.yaml and CV are never touched."
> - "Yes, update now"
> - "Not now"

If confirmed: run `git -C ~/.claude/skills/kairos pull origin main` and report what changed (the commit messages from the pulled commits). If the pull fails, show the error and suggest the user run it manually.

### Step 1: Locate or create config

Look for `config.yaml` in the current working directory (`./config.yaml`).

- **Found and filled in**: proceed.
- **Found but still has placeholder values** (`identity.name` is `"Mohamed Ali"` or `identity.email` is `"mohamed@example.com"`): run the identity interview (see below) to replace them.
- **Not found**: create `./config.yaml` by copying from `~/.claude/skills/kairos/config.example.yaml`, then run the identity interview.

**Identity interview** (run via `AskUserQuestion`, one batch):
- Full name
- Email address
- Location (city, country, or "Remote")
- Sponsorship required? (yes / no)
- LinkedIn, GitHub, portfolio URLs (all optional - offer "skip")

Write the answers directly into `./config.yaml`. Confirm the file is saved before moving on.

### Step 2: Locate or build the canonical CV

Look for the file at `paths.base_cv` in the config (default: `./templates/cv_template.html`).

- **Found**: proceed.
- **Not found**: ask the user via `AskUserQuestion`:

  > "I need your canonical CV to tailor from. How would you like to provide it?"
  > - "Paste my existing CV text or HTML now"
  > - "I have an HTML file - I'll give you the path"
  > - "I don't have one yet - build it with me step by step"

  **If they paste or provide a path**: save it to `./templates/cv_template.html`, copying the kairos CSS structure from `~/.claude/skills/kairos/templates/cv_template.html` (content replaced with theirs, CSS and section order preserved).

  **If they want to build from scratch**: run the CV builder interview (see below), then save the result to `./templates/cv_template.html`.

### Step 3: Ensure supporting files are present

Copy these from the skill installation directory if not already present in the working directory - the user never needs to do this manually:

```bash
# pdf generation script
mkdir -p ./scripts
cp ~/.claude/skills/kairos/scripts/generate_pdf.js ./scripts/generate_pdf.js

# application folders
mkdir -p ./applications/preparing ./applications/submitted
```

### CV Builder Interview (step by step, no existing CV)

Build the canonical CV by asking the user section by section via `AskUserQuestion`. Save incrementally to `./templates/cv_template.html` after each section so progress is never lost.

**Sections to collect, in order:**

1. **Identity**: name, email, location, links (already collected in Step 1 - skip if done).
2. **Education**: for each degree - institution, degree title, field, start/end dates, GPA (optional), notable awards or thesis.
3. **Experience**: for each role - company, title, start/end dates, 3-5 bullets describing what they built and what it achieved. For each bullet, ask "what was the hard or unique part?" to avoid generic mechanics.
4. **Projects**: for each open-source or personal project - name, URL, one-line description, 2-3 bullets on what it does and what makes it non-obvious.
5. **Skills**: ask them to name the tools, languages, and frameworks they use actively. Do not suggest a list - let them name what is real.
6. **Publications** (optional): title, venue, year, co-authors, one-line summary.
7. **Awards and honours** (optional): name, year, brief context.

After each section, confirm the content looks right before moving to the next. After all sections, render a preview summary and ask for approval before saving the final HTML.

---

## Configuration Reference

All paths in config are resolved relative to the config file's location (the current working directory). The skill never hardcodes paths.

Minimum keys:
- `identity.name`, `identity.email`, `identity.location`, `identity.sponsorship_required`
- `identity.links.*` (optional; skip empty links in the CV header)
- `paths.base_cv`, `paths.applications_dir`
- `pdf.page_format`, `pdf.font_family`
- `advisor.enabled`
- `archetypes` (optional; falls back to built-in defaults below)

**Default archetypes** (used if `archetypes:` is not set in config):

| Archetype | JD signals |
|-----------|-----------|
| AI Platform | "RAG", "evals", "observability", "LLM", "retrieval" |
| Data Platform / Backend | "pipelines", "distributed", "ETL", "streaming", "Kafka" |
| ML Research | "foundation models", "pretraining", "RL", "benchmarks" |
| Forward Deployed / Solutions | "client", "deployment", "on-site", "customer success" |

The user is encouraged to customise `archetypes:` to their domain.

---

## Model Routing (cost and quality)

Route sub-tasks to the right model. Do not do everything on the orchestrator model.

| Sub-task | Model | Why |
|----------|-------|-----|
| `WebSearch` / `WebFetch` calls (comp data in Block D, legitimacy checks in Block G, company research, JD URL fetch) | **Haiku 4.5** (`claude-haiku-4-5-20251001`) | Cheap, fast, accurate enough for extraction and summarization of web pages. Delegate via the `Agent` tool with `model: "haiku"`. |
| Document drafting (tailored CV rewrite, cover letter, application responses) | **Sonnet 4.6** (orchestrator default) | Best coding/writing model. This is where the craft lives. |
| Pre-PDF review of the CV draft | **Opus 4.6 advisor** when available | Call `advisor()` after the CV HTML is written but BEFORE PDF compile. Fallback behaviour is documented below. |

**How to delegate web research to Haiku**: use `Agent` with `subagent_type: "general-purpose"` and `model: "haiku"`. Prompt must be self-contained (it will not see this conversation). Ask for a structured report (table or bullet list) under a word cap so the result drops cleanly into the eval blocks.

---

## Phase 0: Interview (adaptive, runs before eval)

Before running eval or drafting the CV, gather context from the user about their experience relative to this specific JD. The canonical CV is a baseline; the interview surfaces depth, recency, and stories that the CV does not expose.

### How to run it

Use a **clarifying-question style**: every question is answerable with a tap (pick-one) or a single word. The user should never have to write a paragraph. Keep the total round to ~5 questions max.

**Rendering (PREFERRED): use the `AskUserQuestion` tool.** This renders each question as a native picker in Claude Code with one option per line, so the user just picks instead of typing "1a, 2b, 3c". Batch 2 to 4 questions in a single `AskUserQuestion` call (the tool supports multi-question batches) so the interview feels like one short form, not a rapid-fire Q&A.

- Each question: ≤ 2-line `question`, a short `header` (≤ 12 chars) shown above the picker, 2 to 4 `options` with `{label, description}`.
- Always include an "Other / skip" option when the pick list might not cover the user's reality.
- `multiSelect: false` unless you genuinely want several tags (e.g., "which archetypes fit?").

**Fallback rendering** (only if `AskUserQuestion` is unavailable): format each question as a mini-block, one option per line, blank line between questions. Never inline options as "(a) X, (b) Y, (c) Z" in a paragraph. Example:

```
**Q1. Closest match to the JD's lead requirement?**
  a) A specific project I can name
  b) Adjacent work (I will describe)
  c) Nothing direct

**Q2. Have you used the JD's primary stack in production?**
  a) Yes, shipped to users
  b) Personal or academic project
  c) No
```

### Steps

1. Read the canonical CV at `{{paths.base_cv}}` and extract the JD's 6 to 10 hard requirements.
2. For each requirement, mark as **clear match**, **adjacent**, or **gap**.
3. Compose **3 opening questions** covering: the single most load-bearing JD requirement, the biggest gap or adjacency, and one depth/motivation probe. Send them as a single `AskUserQuestion` batch.
4. **Adaptive follow-ups** (cap at 2): only when an answer was "Other" without detail, or a gap still has no signal. Each follow-up is another `AskUserQuestion` with 2 to 4 options.
5. If the user says "just run it", "skip the interview", or similar, skip to eval and use only what's in the CV.

### What to do with the answers

- Feed them into Block B (CV Match) and Block E (Personalization Plan) so the tailored CV can legitimately reformulate using the user's spoken experience.
- Never fabricate. If an interview answer contradicts the CV (e.g., user claims depth in something not on the CV), ask whether to add it as a new bullet with specifics, or leave it off.
- Save a short `interview_notes.md` in the application folder capturing the Q&A. This is the paper trail for any new claims introduced into the CV.

---

## Command Routing

| Input | Action |
|-------|--------|
| Job Description text or URL | Full pipeline - auto-activates, no command needed |
| `start` | Manually invoke the full pipeline |
| `defend` | Skeptical-interviewer dry-run on a tailored CV: challenge claims, surface weak bullets the user cannot defend in 30 seconds |
| `respond` | Draft answers to application essay questions for an existing application |
| `recompile` | Recompile tailored CV HTML to PDF after a manual edit |
| `tracker` | Show application status across `preparing/` and `submitted/` |
| `update` | Apply available updates from GitHub (prompted automatically every 3 days) |

---

## Writing Rules (apply to ALL CV, cover letter, and application response text)

### Strict dash rule (non-negotiable)
Never use em-dashes (`—`) or en-dashes (`–`) anywhere in any output artifact. This includes date ranges, page ranges, appositives, and stylistic pauses.
- Date and page ranges: single hyphen (`2023 - 2026`, `1349-1360`). Never `--`, `–`, or `—`.
- Appositives and pauses: rewrite with a colon, a comma, a parenthetical, or split into two sentences.
- Before saving any output, grep for `—`, `–`, and `--` and remove every occurrence in prose (HTML comments `<!--` ... `-->` are fine).

### Never
- Invent experience, metrics, skills, tools, or outcomes the user does not have.
- Use filler: "passionate about", "results-oriented", "proven track record", "leveraged", "spearheaded", "facilitated", "seamless", "cutting-edge", "directly aligned with", "demonstrating commitment to", "directly transferable to", "synergies".
- Use label-style transitions in prose: never "A concrete example from my own work:", "The technical problem I care about:", "In summary:". Open paragraphs with the thing itself.
- Write bullets whose mechanics any engineer could dismiss as "anyone can do that with a cron job". If a bullet describes a schedule or a mechanical step, rewrite to lead with the hard or unique architectural choice.
- Use passive voice when active works.
- Start every bullet with the same verb.

### Always
- Lead every bullet and every paragraph with the hard or unique part: the architectural decision, the counterintuitive choice, the thing that made the problem non-obvious.
- Lead sentence of any paragraph or answer summarizes what follows, so a skim reader gets the point.
- Keep bullets to roughly two lines. Tight, human sentence structure, not compressed telegram.
- Use the JD's exact vocabulary to reformulate real experience, never to invent.
- Short sentences. Action verbs. Specifics over abstractions. Name tools, projects, and concrete outcomes.

### Keyword injection (legitimate reformulation only)
- JD says "RAG pipelines" and CV says "LLM workflows with retrieval" → rewrite as "RAG pipeline design and LLM orchestration workflows"
- JD says "RL environments" and CV says "optimization on complex landscapes" → rewrite as "RL-inspired optimization across simulation environments"
- JD says "enterprise benchmarks" and CV says "evaluation protocols" → rewrite as "enterprise-grade benchmarking protocols"

---

## Professional Summary Spec (applies to every tailored CV)

The Summary is the single most-failed section in AI-generated CVs. It tends to collapse into aspirational fluff, meta-framing, and sentences that would be true of 10,000 other applicants. This spec exists to prevent that.

### The job of the Summary

Three things, in this order:

1. **Positioning.** Tell a skim reader in one sentence what kind of engineer / scientist / operator the user is and why that matches the JD. This replaces the old-school "Objective" line.
2. **Proof.** One or two concrete artifacts, results, or technical depth markers the CV body will back up. Falsifiable by anyone who reads the rest of the page.
3. **Keyword surface.** Carry 3 to 5 of the JD's top keywords naturally, so ATS and human skimmers both register the match in the first 5 seconds.

It is NOT a cover letter, NOT a mission statement, NOT a "why I'm excited" paragraph, and NOT a restatement of the CV.

### Structural formula

**Exactly 2 to 3 sentences. 45 to 70 words total.** Longer than that and it stops being a summary.

- **S1 (Positioning + headline artifact):** `<Role archetype> with <X years / scope> building <the single most JD-relevant thing> in <domain(s)>.` Leads with the hard or unique part, never with "passionate", "motivated", "excited", or "seeking".
- **S2 (Proof):** A specific artifact, system, or result from the CV, stated concretely. Name the thing. Prefer a number, a named system, or a named outcome over an abstract claim. This sentence must be something a skeptical reader can later verify by reading the CV body.
- **S3 (optional, only if it adds a new signal):** A second depth marker the JD cares about (e.g., shipped open source used by others, peer-reviewed publications, specific stack depth). Cut S3 entirely if it would repeat S1 or S2.

### Hard bans (do not write these)

| Disease | Failed phrasing pattern | Why banned |
|---------|------------------------|-----------|
| **Aspirational closer** | "I'm genuinely excited about using X to build Y..." | Unfalsifiable. Breaks third-person register. Classic AI tell. |
| **Mission-statement closer** | "Motivated by making frontier AI systems safe, interpretable, and verifiably bounded..." | Belongs in a cover letter, not a Summary. |
| **Cover-letter closer** | "Targeting generative AI for protein structure on NVIDIA's PyTorch and CUDA stack." | "Targeting" is a cover-letter verb. The Summary describes who the user is, not what they are applying for. |
| **Meta-framing** | "Researcher applying to the Anthropic Fellows Program..." / "...suited to a Forward Deployed Engineer role with direct client delivery." | The reader already knows which role this is. Restating it wastes the most valuable line on the page. |
| **Vague scope claim** | "Engineer working across AI, HPC, and data..." | "Working across" means nothing. Replace with the most JD-relevant concrete artifact. |

**Also banned outright:**
- First-person pronouns ("I", "I'm", "my"). Summary is third-person implied-subject, same as the rest of the CV.
- Verbs: "excited", "passionate", "motivated by", "seeking", "targeting", "applying to", "suited to", "looking to", "eager to", "driven by".
- Phrases: "results-oriented", "proven track record", "strong background in", "deep expertise in" (without the specific evidence in the same sentence), "combining X with Y" when X and Y are both generic.
- Naming the target company or role inside the Summary. That is cover-letter work.

### The falsifiability test

Before saving, read each sentence and ask: **"Is there a concrete claim here that a skeptical reader could fact-check against the CV body?"** If the answer is no for any sentence, rewrite or cut it.

Also ask: **"Would this sentence be true of 10,000 other applicants to this role?"** If yes, it is filler. Replace with something specific: a named project, a number, a specific stack, or a named outcome.

### Keyword injection inside the Summary

The Summary must surface 3 to 5 of the JD's top keywords, but only by reformulating real experience. Never invent. Use the exact JD vocabulary where the underlying experience genuinely matches. Spell out the first use of acronyms that the JD spells out (e.g., "Large Language Model (LLM)") so both ATS and human skimmers match.

### Worked examples (before → after)

These use a fictional candidate, "Mohamed Ali": BS CS, MS ML, five years as a data platform and ML engineer. Use them as shape, not content. Write your own proofs from your own CV.

**Before (failed)** — Data Platform Engineer JD:
> Engineer applying to a Data Platform role at BigCo, with strong background in pipelines and a proven track record in distributed systems, excited to leverage AI for internal tooling.

Problems: meta-framing ("applying to"), banned phrases ("strong background", "proven track record"), aspirational closer, zero falsifiable claims.

**After (correct)**:
> Data platform engineer with five years building streaming Kafka pipelines and a Python feature-store layer serving two ML teams. Shipped an internal evaluator for retrieval-augmented LLM assistants that cut review time by 40 percent, with the whole stack open-sourced under Apache 2.0.

- S1: positioning + scope + JD-relevant artifact (streaming pipelines, feature store).
- S2: named result (40 percent), named artifact (open-source evaluator), JD keyword surface (retrieval-augmented LLM).
- No "excited", no "applying to", no first-person.

**Before (failed)** — ML Research Engineer JD:
> Empirical researcher applying to BigLab's ML Research team with years of ML experience, passionate about foundation models, motivated to push frontier AI systems forward.

Problems: every sentence is mission statement or meta-framing.

**After (correct)**:
> ML research engineer with six years across supervised fine-tuning, reinforcement learning from human feedback (RLHF), and open-source reproduction of published benchmarks. Author of three NeurIPS papers on small-model distillation and maintainer of an evaluation harness used by two external labs for foundation-model regression testing.

- S1: concrete methods (SFT, RLHF), open-source reproduction as a falsifiable claim.
- S2: named venue (NeurIPS), named artifact (evaluation harness), named downstream users (two external labs).

### Verification checklist (before advisor gate)

- [ ] 2 to 3 sentences, 45 to 70 words.
- [ ] No banned verbs or phrases (grep the list above).
- [ ] No first-person pronouns.
- [ ] No target-company or target-role name inside the Summary.
- [ ] Every sentence passes the falsifiability test.
- [ ] 3 to 5 JD keywords present, all legitimately reformulating real experience.
- [ ] Inline style includes `text-align:justify;`.
- [ ] No em-dashes, en-dashes, or double-hyphens.

---

## Step: Tailor CV (internal pipeline step, runs after interview)

This is not a user-facing command. It runs as part of the full pipeline after the interview answers are collected.

1. Read the canonical CV at `{{paths.base_cv}}`.
2. Rewrite the Professional Summary following the **Professional Summary Spec** below. The Summary `<div>` must include `text-align:justify;` in its inline style. Verify after writing.
3. Reorder Selected Open Source Projects (or equivalent section) so the most JD-relevant project leads. Rewrite each bullet to lead with the hard or unique architectural choice (two lines max).
4. Reorder Technical Skills categories so the JD-relevant category leads. Only include terms honestly demonstrated in the projects or experience.
5. Reorder Experience bullets by relevance to the JD. Reformulate using JD vocabulary where truthful.
6. Inject JD keywords naturally into existing achievements. Never invent.
7. Create the application folder at `{{paths.applications_dir}}/preparing/<Company>_<Role>_<YYYY-MM-DD>/`. New applications always start in `preparing/`. Once the user confirms submission, move the folder to `{{paths.applications_dir}}/submitted/` and update `README.md` Application Status.
8. Save HTML to `<app-dir>/cv_tailored.html`.

---

## Step: Parse JD (internal pipeline step, runs before interview)

This is not a user-facing command. It runs automatically at the start of every pipeline.

1. If the input is a URL, delegate fetch to a Haiku sub-agent (`Agent` tool, `model: "haiku"`). Ask for the full JD text and company name. If fetch fails, ask the user to paste the JD text directly.
2. Extract 15 to 20 hard requirements and keywords from the JD text.
3. Read the canonical CV at `{{paths.base_cv}}`. For each hard requirement, mark as **clear match**, **adjacent**, or **gap**. A gap that is a hard blocker (e.g., required credential or years of experience the candidate clearly lacks) surfaces a one-line note to the user before proceeding.
4. Detect archetype from the `archetypes:` block in config (or defaults). This shapes Summary framing and Skills reorder in the tailoring step.
5. Detect company location to set page format: Letter (US, Canada) or A4 (elsewhere).
6. Feed the keyword list, gap map, and archetype into the interview questions (Phase 0) and the tailoring step.

No report is produced. No score is shown. This step exists to give the interview and tailoring steps the information they need.

---

## Command: pdf (Recompile tailored CV to PDF)

Use this command to recompile an existing `cv_tailored.html` after a manual edit. If no tailored CV exists yet, run the full pipeline instead.

### Pipeline

1. Read the existing `cv_tailored.html` in the application folder. If no application folder is specified, list folders under `{{paths.applications_dir}}/preparing/` and ask the user which one.
2. Detect page format from the existing `README.md` (Letter or A4).
3. **Advisor gate BEFORE PDF compile.** If `advisor()` is available, call it with no parameters. Ask it to flag: weak or generic bullets, filler language, label-style transitions, any em/en-dash, and audit the Professional Summary against the Professional Summary Spec. Apply fixes to `cv_tailored.html`.

   **If `advisor()` is unavailable** or `advisor.enabled: false` in config: print `"advisor() unavailable; running self-review instead"`, then self-audit against the Summary verification checklist and the writing ban list. PDF compile proceeds only after either pass completes.

4. Generate PDF:
   ```bash
   node scripts/generate_pdf.js <app-dir>/cv_tailored.html --format {{pdf.page_format}}
   ```
6. Verify no em-dashes or en-dashes in prose:
   ```bash
   grep -nP '[\x{2014}\x{2013}]' <app-dir>/cv_tailored.html
   ```
   If any match outside HTML comments, fix and recompile.
7. Report: PDF path, page count, and a one-line summary of advisor-driven changes applied.

### Styling (lock to the canonical CV, do not change)

- **Font:** Times New Roman throughout (body and headings). ATS-safe. Override via `pdf.font_family` only if you know your recipient's parser.
- **Colors:** Section titles in dark green `#006400` with a black rule underneath. Body text black. Links black.
- **Layout:** Single-column, Letter format (US roles) or A4 (elsewhere). `0.5in` top/bottom and `0.65in` side margins via CSS `@page`.
- **Type sizes:** Name 22pt uppercase bold, body 10.5pt, section titles 11pt uppercase bold, line-height 1.35 to 1.5.
- **Separators:** Use a vertical bar ` | ` or `&nbsp;|&nbsp;` in header and inline metadata. Never a dash.

### Section order (lock to the canonical CV)

1. Header (name, contact row)
2. Professional Summary
3. Education
4. Selected Open Source Projects (or equivalent)
5. Experience
6. Technical Skills
7. Publications (optional)
8. Honors and Awards (optional)
9. Service and Leadership (optional)

### ATS Rules

**Formatting (hard requirements):**
- Single-column layout. No tables, sidebars, multiple columns, or text boxes.
- No headers or footers. ATS cannot read them. Keep contact info in the body.
- No borders, shading, decorative lines, or special symbols. Bullet points are fine.
- Standard font only: Times New Roman.
- Font size 10.5pt minimum for body text.
- No condensed or expanded letter-spacing. Normal spacing only.
- No accented characters or special characters (use "resume" not "résumé").
- No credentials (PhD, MBA) next to the candidate's name.
- No punctuation in the name line: no `( ) , / -`.
- Proper capitalization and punctuation throughout.

**Dates:** Always include months (e.g., `Aug 2020 - Aug 2026`). Dates appear to the right of the organization line.

**Section headers:** ALL CAPS. Use standard names where possible: EDUCATION, EXPERIENCE, PROJECTS, PUBLICATIONS, SKILLS.

**Keywords:** Distribute across Summary (top 5 keywords), first bullet of each role, and Skills. Use exact JD vocabulary in context. Spell out acronyms on first use: "Large Language Model (LLM)". Include the exact job title somewhere in the resume.

**Content:** UTF-8 selectable text only. No images of text. No misspellings. Length is not penalized by ATS. Keep to 2 pages for human readability.

---

## Mode: respond (Application essay answers)

When a JD or application form asks a written question (e.g., "Why are you a strong fit?"), draft the answer following these rules:

1. Open with a single lead sentence that summarizes the whole answer. If the reader stops there, they still get the thesis.
2. Paragraph 2: open with the problem or topic itself, not a label. Bad: "The technical problem I care about is...". Good: "Runtime workflow synthesis under a safety boundary is where I think the real problem sits."
3. Paragraph 3: open with lived experience, not a label. Bad: "A concrete example from my own work:". Good: "I've already pushed on this with a local-first agent I built that..."
4. Target 250 to 350 words unless the form specifies otherwise.
5. Save to `<app-dir>/application_response.md`.
6. Apply all global writing rules: no em-dashes, no filler, no label transitions, lead with the hard part.
7. Run the same advisor gate described in `pdf` step 13 on the response before saving. If advisor is unavailable, self-audit against the writing ban list and dash rule.

---

## Mode: defend (Skeptical-interviewer dry-run)

The whole kairos discipline is "every claim on the page is falsifiable." `defend` mode tests that claim against the user, not against a model. It runs a 3 to 5 minute skeptical-interviewer rehearsal on the tailored CV before the user submits the application or walks into a real interview.

### When to run it

- Automatically as the last step of the full pipeline (after PDF compile), unless the user opts out with "skip defend".
- On demand via `defend` mode, against any tailored CV in `{{paths.applications_dir}}/preparing/` or `{{paths.applications_dir}}/submitted/`.

### How to run it

1. Read the tailored CV at `<app-dir>/cv_tailored.html`.
2. Pick **3 to 5 of the highest-stakes claims** in the CV. Selection rule: prefer claims that contain a specific number, a named system, or a strong outcome verb. Skip generic statements. The point is to stress-test the lines a real interviewer is most likely to circle.
3. For each picked claim, generate **one challenge question** in the voice of a skeptical interviewer. Use one of these shapes:
   - **The number**: "You wrote 'cut review time by 40 percent across forty daily queries.' What was the absolute baseline, and how was the 40 percent measured?"
   - **The architecture**: "You wrote 'designed a back-pressure protocol that degrades gracefully under partition skew.' Walk me through the failure mode it prevents and why your approach beats the obvious alternative."
   - **The ownership**: "You wrote 'led a migration from nightly batch ETL to event-driven Kafka streaming.' Who else was on that project, and what specifically was your decision vs. a team consensus?"
   - **The follow-up**: "If I asked you to draw the system on a whiteboard right now in two minutes, what would you draw first?"
4. Send the challenge questions as an `AskUserQuestion` batch (preferred) or, if the user would rather type, as a numbered prose list. Each question gets 2 to 4 picker options:
   - "I have a clean answer ready"
   - "I have an answer but it is rough"
   - "I would struggle to defend this in 30 seconds"
   - "This claim is overstated, fix the bullet"
5. **Adaptive follow-up** (cap at 2 rounds): for any answer that is "rough" or "struggle", ask one targeted follow-up to surface the real story or the real number. For "overstated", ask whether to soften, qualify, or remove the bullet.
6. **Save a defend report** to `<app-dir>/defend_report.md` with three sections:
   - **Strong**: claims the user can defend cleanly.
   - **Needs prep**: claims with rough answers, plus the user's notes for what to study.
   - **Bullet edits**: claims the user marked "overstated", plus the proposed rewrite.
7. **If any bullet was marked overstated**, offer to re-run the relevant section of the `pdf` mode pipeline (advisor gate included) to apply the rewrites and recompile the PDF. Never silently rewrite without confirmation.

### What `defend` is and is not

- It is a **rehearsal tool**, not a fact-checker. The user is the source of truth for whether they can defend a claim.
- It is **not** the eval mode's interview prep (Block F, STAR+R stories). Block F covers behavioural questions from the JD; `defend` covers technical questions from the user's own CV.
- It is **deliberately short**. 3 to 5 questions, two follow-ups max. The goal is to surface the one or two bullets the user cannot defend, not to simulate a full interview.

---

## Mode: tracker (Application Status)

Read all subdirectories under `{{paths.applications_dir}}/preparing/` and `{{paths.applications_dir}}/submitted/`.
For each, read `README.md` and extract Application Status.

Display two tables, one per tier:

### Preparing
| Company | Role | Date Created | Status | PDF |
|---------|------|-------------|--------|-----|
| ... | ... | ... | ... | yes or no |

### Submitted
| Company | Role | Date Applied | Status | PDF |
|---------|------|-------------|--------|-----|
| ... | ... | ... | ... | yes or no |

---

## Full Pipeline (JD or URL pasted directly)

0. **Startup checks (BLOCKING)**: Run the full Startup sequence (Steps 0-3) above. Do NOT proceed to any pipeline step until `config.yaml` exists and is filled in, the canonical CV exists at `paths.base_cv`, and supporting files are copied. If any startup step requires user input (identity interview, CV builder), wait for it to complete before continuing.
1. **Parse JD** (see step above): fetch if URL, extract keywords and hard requirements, detect archetype and page format.
2. **Interview (Phase 0)**: run the adaptive interview. Skip only if the user explicitly says so.
3. **Tailor the CV**: section reordering, bullet rewriting, keyword injection, Professional Summary rewrite - all against real experience from the CV and interview answers.
4. **Advisor gate** before PDF compile, with fallback as described in the `pdf` pipeline.
5. **Compile PDF**, verify dashes, write `README.md` and `interview_notes.md` to the application folder.
6. **Respond**: if the JD or form includes a written question, draft `application_response.md` under the same writing rules and advisor gate.
7. **Defend**: skeptical-interviewer dry-run on the tailored CV. Save `defend_report.md`. Skip only if the user says "skip defend". If defend surfaces overstated bullets, offer to rewrite and recompile.
8. **Report**: application folder path, PDF path, response path (if any), defend report path, keyword coverage percent, one-line summary of what was tailored, count of bullets marked needs-prep or overstated.

The user pastes a JD and gets everything end-to-end. The only required interaction is answering the interview questions.

