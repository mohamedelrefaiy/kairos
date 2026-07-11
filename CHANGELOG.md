# Changelog

All notable changes to kairos are documented here.
Format: `## [MAJOR.MINOR.PATCH.MICRO] - YYYY-MM-DD` with Added / Changed / Fixed / Removed sections.

## [1.1.0.0] - 2026-07-11

### Added
- Cadence rules: seven structural anti-AI-writing rules (no generic participial tails, sentence-shape variance, one triad maximum, exact numbers over marketing numbers, casual engineer jargon, one "with" chain per sentence, semicolon cap) grounded in 2024-2026 recruiter reports and the arXiv 2406.07016 excess-vocabulary study.
- Expanded banned lexicon (~40 new terms) plus a suspect-verb tier: "optimized"-class verbs are legal only with a named object and a number.
- Two-part lint before every save: lexical banned-word grep, participial-tail grep, and a new suspect-verb review grep, plus a manual cadence pass.
- Summary Register spec: short declarative sentences, fragment openers, uneven adjacent sentence lengths, zero non-technical adjectives, keyword ceiling of two per sentence.
- "When to skip the Summary" guidance for junior candidates with linear histories, with a defined downstream path when skipped.
- One-command install via the agent-skills CLI: `npx skills add mohamedelrefaiy/kairos`; `/kairos update` now detects npx installs and points to `npx skills update kairos`.
- Prompt-injection guard: fetched job postings and web research results are treated as untrusted data; embedded instructions are surfaced, never followed.
- Word-count methodology for the Summary gates (whitespace-separated tokens).
- VERSION and CHANGELOG files (this release starts the version history).

### Changed
- All worked-example summaries rewritten to the new register: uneven sentence lengths, fragment openers, no participial tails; README and the example CV now showcase the compliant version.
- ATS rules: keyword stuffing is flagged as actively penalized; acronyms are spelled out only when the JD itself spells them out; deliberate Summary fragments documented as ATS-safe.
- SKILL.md frontmatter cleaned up to the current Claude Code skill spec (removed unrecognized `user_invocable` and `args` fields).

### Fixed
- Semicolon cap and lint greps scoped to rendered prose so locked CSS and HTML markup never trip them.
- Round-number "ask the user" rule qualified for non-interactive recompiles (report instead of block).
- Technical-term exception broadened beyond three hardcoded examples; marketing uses stay banned.
- Word-count and annotation errors in the worked examples.
