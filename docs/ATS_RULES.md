# ATS Rules

Applicant Tracking Systems (ATS) are the first reader of your CV. kairos enforces ATS-safe formatting by default. The rules below govern both the Mohamed Ali template and every tailored output.

## Hard formatting requirements

- **Single-column layout.** No tables, sidebars, multiple columns, or text boxes. The HTML template uses a `.page` div with a single content column.
- **No headers or footers.** ATS cannot read them. Keep contact info in the body, directly below the name.
- **No borders, shading, or decorative lines.** Bullet points are fine. The green section rules are CSS `border-bottom` on the heading text, which ATS parsers treat as a boundary, not a graphic.
- **Standard font only.** Times New Roman. Override `pdf.font_family` in `config.yaml` only if you know your recipient's parser.
- **Font size**: 10.5 pt minimum for body text.
- **Letter-spacing**: normal only. No condensed or expanded.
- **No accented characters or special characters.** Use *resume* not *résumé*.
- **No credentials next to the name.** No `PhD`, `MBA`, etc. next to the candidate's name in the header.
- **No punctuation in the name line.** No `( ) , / -` in the `<h1>`.
- **Proper capitalization and punctuation throughout.**

## Dates

Always include months: `Aug 2020 - Aug 2026`. Use hyphen, not en-dash. Dates sit on the right side of the organization line.

## Section headers

ALL CAPS. Use standard names where possible: EDUCATION, EXPERIENCE, PROJECTS, PUBLICATIONS, SKILLS. The template's section-title styling takes care of the capitalisation via `text-transform: uppercase`.

## Keywords

- **Distribute** across Summary (top five keywords from the JD), first bullet of each role, and the Skills section.
- **Use exact JD vocabulary** when your experience honestly matches.
- **Spell out acronyms on first use**: "Large Language Model (LLM)".
- **Include the exact job title** somewhere in the resume (typically in the Summary or a relevant bullet).

## Content

- **UTF-8 selectable text only.** No images of text. ATS parsers cannot read rasterized content.
- **No misspellings.** Run your favourite spell-checker on the HTML before PDF compile.
- **Length.** ATS parsers do not penalize length. Keep to two pages for human readability. kairos verifies page count after PDF compile.

## Why Times New Roman

It is the most broadly supported serif font in ATS parsers that pre-date modern font subsetting. Using it means the CV renders identically in applicant review systems, PDF viewers, and printed copies. If you choose to override this via `pdf.font_family`, know your audience.
