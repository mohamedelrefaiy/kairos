# Writing Rules

kairos applies these rules to every CV bullet, cover letter paragraph, and application response it produces. They are enforced at the advisor gate (or in the self-audit fallback) before any artifact is saved.

## The dash rule (non-negotiable)

Never use em-dashes (`—`) or en-dashes (`–`) anywhere in any output. Hyphens only.

- **Date or page ranges**: single hyphen. `2023 - 2026`, `1349-1360`. Never `--`, `–`, or `—`.
- **Appositives and pauses**: rewrite with a colon, a comma, a parenthetical, or split into two sentences.
- **Verification**: `grep -nP '[\x{2014}\x{2013}]' file.html`. Any match outside HTML comments must be fixed before save.

## Never

- Invent experience, metrics, skills, tools, or outcomes the user does not have.
- Use banned-lexicon words. Hard bans (recruiter-reported AI tells, backed by the 2024 excess-vocabulary study on LLM word frequency):
  - **Verbs**: leveraged, spearheaded, orchestrated, facilitated, fostered, honed, delved, showcased, underscored, bolstered, garnered, harnessed, cultivated, empowered, championed.
  - **Adjectives**: seamless, cutting-edge, robust, dynamic, pivotal, meticulous, transformative, multifaceted, innovative, comprehensive, vibrant, unwavering, results-oriented, detail-oriented, fast-paced.
  - **Nouns and phrases**: synergies, tapestry, testament, game-changer, thought leader, "at the intersection of", "passionate about", "proven track record", "directly aligned with", "demonstrating commitment to", "directly transferable to".
  - **Copula avoidance**: "serves as", "stands as", "boasts", "functions as". Write "is", "has", "built".
  - Technical-term exception: a match that is an established technical term of art ("dynamic programming", "robust statistics", "dynamic typing", "dynamic dispatch") is exempt. Marketing uses ("robust platform", "dynamic environment") are always rewrites.
- Use suspect verbs without a specific object and a number in the same bullet: "optimized", "streamlined", "enhanced", "drove", "improved". These are legal only as "optimized <named thing> by <number>": "optimized the ingest path, cutting cold-start from 9s to 2s" passes; "optimized system performance" never does.
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

## Cadence rules (AI tells are structural, not just lexical)

Recruiters report spotting AI-written CVs by rhythm before vocabulary. A document can pass every word filter and still read as generated. Enforce all of these on every output:

1. **No generic participial tails.** A sentence or bullet must not end in a comma plus "-ing" benefit clause: ", improving efficiency and reliability", ", driving impact", ", ensuring scalability". This `verb + object + gerund-benefit` template is the single strongest LLM fingerprint. Exception: a trailing "-ing" clause that carries a specific number or named system ("cutting p99 latency from 340ms to 55ms") is allowed, at most once per role.
2. **Vary sentence and bullet shape.** Within one role, bullets must not all follow the identical "Verb + object + metric" skeleton, and must visibly differ in length. In prose (Summary, responses), two adjacent sentences must not share the same grammatical skeleton; sentence lengths should differ noticeably (rule of thumb: 8+ words apart, or one is a fragment). Human writing is uneven. Uniform polish is the tell.
3. **One triad maximum.** At most one "X, Y, and Z" list per Summary or paragraph. Never two consecutive sentences that each carry a list. The rule-of-three tic is a documented LLM fingerprint.
4. **Real numbers, not marketing numbers.** Use the exact figure the user gave: "31.4 percent", "from 340ms to 55ms", "43 daily queries". Never round for polish, never invent a rounder-sounding number. If every number in a draft is a multiple of ten, ask the user for exact values before saving (during tailoring; in a non-interactive recompile, note it in the report instead of blocking).
5. **Casual jargon, engineer register.** Write jargon the way engineers write it: k8s, p99, CI, ETL. Do not define or soften terms the target reader knows. Spell out an acronym only when the JD itself spells it out, and only on first use (ATS rule).
6. **At most one "with" chain per sentence.** "with five years building X ... with contributions to Y" comma-chain stacking is LLM expansion. Split into a new sentence instead.
7. **Semicolons: one per document maximum.** Heavy semicolon rhythm is a reported AI tell (dashes are already banned outright). Counts prose text only: CSS, inline `style` attributes, and HTML markup are exempt.

## Filler scan (run before saving any output artifact)

Before saving any HTML, markdown, or text output, run this grep against the full content. Any match is a rewrite trigger, not a warning.

```bash
# Lexical scan: banned words and phrases
grep -inE "passionate|results.oriented|detail.oriented|proven track record|leverag|spearhead|orchestrat|facilitat|foster(ed|ing)|honed|delv(e|ed|ing)|showcas|underscor|bolster|garner|harness(ed|ing)|cultivat|empower|championed|seamless|cutting.edge|robust|dynamic|pivotal|meticulous|transformative|multifaceted|innovative|vibrant|unwavering|synergies|tapestry|testament|game.chang|thought leader|intersection of|fast.paced|serves as|stands as|boasts|functions as|directly aligned|demonstrating commitment|directly transferable|excited to|motivated by|seeking to|looking to|eager to|strong background|deep expertise|combining .+ with" <output-file>

# Cadence lint: participial benefit tails (match = rewrite unless the clause carries a number or named system)
grep -inE ", (driving|improving|enhancing|enabling|ensuring|boosting|streamlining|strengthening|increasing|reducing|accelerating|delivering|resulting in|contributing to|showcasing|demonstrating|highlighting|underscoring|allowing|making|helping|letting|saving|freeing|paving)" <output-file>

# Suspect-verb check (review trigger, not auto-reject): verb uses need a named
# object AND a number in the same bullet; noun uses ("Bayesian optimization")
# and project names ("streamline-py") are exempt
grep -inE "optimiz|streamlin|enhanc|improv(ed|ing)|drove|driving" <output-file>
```

Every lexical match must be removed or rewritten before saving, unless it is a genuine technical term ("dynamic programming", "robust statistics"). Every cadence match must be rewritten unless the trailing clause contains a specific number or named system. For HTML artifacts, these rules apply to rendered prose only: matches inside `<style>` blocks, inline `style` attributes, or tag markup are not violations. This applies to verbatim user quotes as well: if a quoted phrase contains a banned term, do not preserve it in the output file, not even inside an HTML comment. Paraphrase, summarize, or omit it instead.

After the greps, do one manual pass the regex cannot catch: read the draft's sentences in sequence and check shape variance (cadence rule 2), triad count (rule 3), and round-number suspicion (rule 4).

## Keyword injection (legitimate reformulation only)

- JD says "RAG pipelines" and CV says "LLM workflows with retrieval" → rewrite as "RAG pipeline design and LLM orchestration workflows".
- JD says "RL environments" and CV says "optimization on complex landscapes" → rewrite as "RL-inspired optimization across simulation environments".
- JD says "enterprise benchmarks" and CV says "evaluation protocols" → rewrite as "enterprise-grade benchmarking protocols".

The test is always: does the user's real experience honestly match the rephrased claim? If yes, rewrite. If no, leave the original and flag as a gap to the user.
