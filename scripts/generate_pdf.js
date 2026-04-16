#!/usr/bin/env node
/*
 * kairos PDF generator.
 *
 * Usage:
 *   node scripts/generate_pdf.js <html-path> [--format Letter|A4] [--out <pdf-path>]
 *
 * Requires Playwright (with a Chromium browser installed):
 *   npm install -g playwright
 *   npx playwright install chromium
 *
 * The script honours CSS @page rules via preferCSSPageSize so the HTML
 * template's margins stay authoritative.
 */

const path = require("path");
const fs = require("fs");

function parseArgs(argv) {
  const args = { html: null, format: "Letter", out: null };
  const rest = argv.slice(2);
  if (rest.length === 0 || rest[0].startsWith("--")) {
    usage();
    process.exit(1);
  }
  args.html = path.resolve(rest[0]);
  for (let i = 1; i < rest.length; i += 1) {
    const flag = rest[i];
    if (flag === "--format") {
      args.format = rest[++i] || "Letter";
    } else if (flag === "--out") {
      args.out = path.resolve(rest[++i] || "");
    } else {
      console.error(`Unknown flag: ${flag}`);
      usage();
      process.exit(1);
    }
  }
  if (!args.out) {
    args.out = args.html.replace(/\.html?$/i, ".pdf");
  }
  return args;
}

function usage() {
  console.error(
    "Usage: node scripts/generate_pdf.js <html-path> [--format Letter|A4] [--out <pdf-path>]"
  );
}

async function main() {
  const args = parseArgs(process.argv);

  if (!fs.existsSync(args.html)) {
    console.error(`HTML not found: ${args.html}`);
    process.exit(1);
  }

  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch (err) {
    console.error(
      "Playwright is not installed. Run: npm install -g playwright && npx playwright install chromium"
    );
    process.exit(1);
  }

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.goto(`file://${args.html}`, { waitUntil: "load" });
    await page.waitForTimeout(800);
    await page.pdf({
      path: args.out,
      format: args.format,
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log(`PDF written: ${args.out}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
