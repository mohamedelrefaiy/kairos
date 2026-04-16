# Writing Rules

kairos applies these rules to every CV bullet, cover letter paragraph, and application response it produces. They are enforced at the advisor gate (or in the self-audit fallback) before any artifact is saved.

## The dash rule (non-negotiable)

Never use em-dashes (`—`) or en-dashes (`–`) anywhere in any output. Hyphens only.

- **Date or page ranges**: single hyphen. `2023 - 2026`, `1349-1360`. Never `--`, `–`, or `—`.
- **Appositives and pauses**: rewrite with a colon, a comma, a parenthetical, or split into two sentences.
- **Verification**: `grep -nP '[\x{2014}\x{2013}]' file.html`. Any match outside HTML comments must be fixed before save.

## Never

- Invent experience, metrics, skills, tools, or outcomes the user does not have.
- Use filler: *passionate about*, *results-oriented*, *proven track record*, *leveraged*, *spearheaded*, *facilitated*, *seamless*, *cutting-edge*, *directly aligned with*, *demonstrating commitment to*, *directly transferable to*, *synergies*.
- Use label-style transitions in prose: *A concrete example from my own work:*, *The technical problem I care about:*, *In summary:*. Open paragraphs with the thing itself.
- Write bullets any engineer could dismiss as "anyone can do that with a cron job". If a bullet describes a schedule or a mechanical step, rewrite to lead with the hard or unique architectural choice.
- Use passive voice when active works.
- Start every bullet with the same verb.

## Always

- Lead every bullet and every paragraph with the hard or unique part: the architectural decision, the counterintuitive choice, the thing that made the problem non-obvious.
- The lead sentence of any paragraph or answer summarizes what follows, so a skim reader gets the point.
- Keep bullets to roughly two lines. Tight, human sentence structure, not compressed telegram.
- Use the JD's exact vocabulary to reformulate real experience, never to invent.
- Short sentences. Action verbs. Specifics over abstractions. Name tools, projects, and concrete outcomes.

## Keyword injection (legitimate reformulation only)

- JD says "RAG pipelines" and CV says "LLM workflows with retrieval" → rewrite as "RAG pipeline design and LLM orchestration workflows".
- JD says "RL environments" and CV says "optimization on complex landscapes" → rewrite as "RL-inspired optimization across simulation environments".
- JD says "enterprise benchmarks" and CV says "evaluation protocols" → rewrite as "enterprise-grade benchmarking protocols".

The test is always: does the user's real experience honestly match the rephrased claim? If yes, rewrite. If no, leave the original and flag as a gap to the user.
