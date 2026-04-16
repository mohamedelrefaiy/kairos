# Install

kairos is a Claude Code skill. It runs inside Claude Code, uses native tools like `AskUserQuestion` and `Agent`, and generates PDFs via Playwright.

## 1. Prerequisites

- **Claude Code** (CLI, desktop app, or IDE extension). See https://claude.ai/code.
- **Node.js 18+** and **npm** (for Playwright).
- **Git** (to clone the repo and version your applications).

Optional, improves quality:
- **Claude Opus access** for the advisor gate. kairos degrades gracefully to a self-audit if Opus is not available.

## 2. Clone into the Claude skills directory

Claude Code automatically discovers skills placed under `~/.claude/skills/` (available across all your projects) or `.claude/skills/` inside a specific project folder.

For global use across all projects:

```bash
git clone https://github.com/mohamedelrefaiy/kairos.git ~/.claude/skills/kairos
```

For a single project only:

```bash
git clone https://github.com/mohamedelrefaiy/kairos.git .claude/skills/kairos
```

Claude Code picks up the skill on the next session automatically - no restart, no registration step.

## 3. Install Playwright

```bash
npm install -g playwright
npx playwright install chromium
```

Playwright ships with its own Chromium that renders HTML to PDF with CSS `@page` rules intact.

## 4. Set up your workspace

kairos writes application folders relative to where you run Claude Code from. Create a dedicated job-hunting folder and copy the templates into it:

```bash
mkdir -p ~/job-hunting/applications/preparing ~/job-hunting/applications/submitted
cp -r ~/.claude/skills/kairos/templates ~/job-hunting/templates
cp ~/.claude/skills/kairos/config.example.yaml ~/job-hunting/config.yaml
```

Open `~/job-hunting/config.yaml` and fill in:

- `identity.name`, `identity.email`, `identity.location`, `identity.sponsorship_required`.
- `identity.links.*` (optional: LinkedIn, GitHub, Scholar, portfolio).
- `paths.*` should point to your workspace (the defaults already match if you followed the setup above).
- Customise `archetypes:` if your domain is not covered by the defaults.

`config.yaml` contains personal info - do not commit it to a public repo.

## 5. Drop in your canonical CV

kairos ships with a sample template at `templates/cv_template.html`. Replace the content (not the CSS) with your own CV. Keep:

- The single-column `.page` structure.
- All the CSS.
- The section order: Summary, Education, Projects, Experience, Skills, Publications, Awards, Service.
- The `text-align:justify;` on the Summary div.

Everything else, rewrite with your real experience.

## 6. First run

```bash
cd ~/job-hunting
claude
```

Paste a Job Description (or a URL to a job posting) into the chat. kairos activates automatically - no slash command needed.

To verify the install is working, paste the contents of `~/.claude/skills/kairos/examples/sample_jd.md`. kairos should:

1. Run the adaptive interview (a few `AskUserQuestion` prompts).
2. Tailor a CV into `applications/preparing/<Company>_<Role>_<date>/cv_tailored.html`.
3. Either call the advisor or print `"advisor() unavailable; running self-review..."` depending on your plan.
4. Compile the PDF and report the path.

If any step fails, file an issue with the full Claude Code transcript.

## Troubleshooting

- **Skill not activating.** Check that `~/.claude/skills/kairos/SKILL.md` exists. Claude Code discovers skills by looking for `SKILL.md` in subdirectories of `~/.claude/skills/`.
- **"Playwright is not installed."** Run step 3 again. The script uses `require('playwright')` from your global `node_modules`.
- **Advisor gate is silently skipped.** Expected on plans without Opus access. Set `advisor.enabled: false` in config to make the fallback explicit.
- **Summary is over 70 words.** The self-audit should catch this. If it does not, file an issue.
