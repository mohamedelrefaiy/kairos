# Eval Framework (Blocks A-G)

kairos evaluates every job description against your CV before tailoring. The evaluation produces seven blocks plus a global score. The goal is to tell you, in under a minute, whether this role is worth applying to and, if so, which parts of your CV to lead with.

## Block A: Role Summary

A table with: archetype (from your `archetypes:` config or kairos defaults), domain, function, seniority, remote policy, one-sentence TL;DR.

## Block B: CV Match

Read your canonical CV. Map each JD requirement to specific CV lines. List gaps with:
1. Is it a hard blocker or a nice-to-have?
2. Is there adjacent experience?
3. What is the mitigation strategy?

This block is sharpened by the Phase 0 interview answers if the interview ran.

## Block C: Level Strategy

Detected level (IC4, IC5, Senior, Staff, etc.) vs your natural fit. Specific phrases you can use to position real experience against the JD's level without overclaiming.

## Block D: Compensation and Demand

Uses WebSearch over Glassdoor, Levels.fyi, and Blind (delegated to a Haiku sub-agent for cost). Returns a table with sources. Says "no data found" honestly when nothing reliable surfaces. Does not bluff.

## Block E: Personalization Plan

Table of the top five CV changes for this role: what to emphasize, what to reorder, how to reframe. This block drives the `pdf` mode's tailoring pass.

## Block F: Interview Prep

Six to eight STAR+R stories (Situation, Task, Action, Result, Reflection) mapped to JD requirements. The Reflection column records what was learned and which seniority signal it sends. kairos will reuse these when `respond` mode generates written answers.

## Block G: Posting Legitimacy

Qualitative only, separate from the score. Labels the posting as **High Confidence**, **Proceed with Caution**, or **Suspicious**. Checks: posting age, apply-button status, JD specificity, recent layoffs at the company (WebSearch). Framed as signals, never accusations.

## Global Score (1 to 5)

- **4.5+**: Strong match, apply.
- **4.0 to 4.4**: Worth applying.
- **3.5 to 3.9**: Apply only with a specific reason.
- **Below 3.5**: Recommend against. kairos will ask whether to proceed before tailoring.

## How to override the evaluation

If you disagree with the score, you can tell kairos to tailor anyway. The whole pipeline is advisory: the score is input to your decision, not a gate.
