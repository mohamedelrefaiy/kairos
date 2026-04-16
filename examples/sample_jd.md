# Sample Job Description (for end-to-end verification)

Use this JD to verify a fresh install of kairos. Paste its contents into Claude Code after completing `INSTALL.md`, then confirm the full pipeline runs (interview, eval, tailored PDF, and a sample response).

---

**Company:** Acme Retrieval Systems
**Role:** Senior Platform Engineer, LLM Infrastructure
**Location:** Remote (United States) or San Francisco, CA
**Posted:** recent

## About the team

We build the retrieval and evaluation infrastructure behind Acme's LLM-powered customer-assistance products. Our platform serves retrieval-augmented generation (RAG) to three internal LLM product teams and processes roughly fifteen million embedding lookups per day. We are a small platform team (seven engineers) and own everything from ingestion pipelines to the evaluation harness that gates every production deploy.

## What you will do

- Design and own the next generation of our RAG serving layer, including embedding index management, hybrid keyword + vector retrieval, and a low-latency reranker tier.
- Build and maintain evaluators for LLM assistants: regression tests, quality rubrics, and ground-truth-free scoring protocols for private customer corpora.
- Scale our streaming Kafka ingestion pipelines from ten topics to fifty as more product teams onboard.
- Define Service Level Objectives (SLOs) for retrieval latency and quality, and drive the on-call rotation that maintains them.
- Mentor two junior engineers and set the technical direction for the team.

## Requirements

- 5+ years building data platform or ML infrastructure in production.
- Deep experience with at least one streaming system (Kafka, Kinesis, Pulsar) including exactly-once semantics and partition-skew handling.
- Comfort with Python as the primary language; Rust or Go experience a plus.
- Track record of designing and shipping evaluators for ML systems, ideally LLM-based. Bonus: experience with ground-truth-free or weakly-supervised evaluation.
- Experience running retrieval systems at scale (embedding indexes, vector databases, hybrid retrieval).
- Strong observability instincts: lineage tagging, OpenTelemetry, Prometheus / Grafana.
- Comfortable in a small, autonomous team. Willing to be on-call.

## Nice to have

- Open-source contributions to retrieval, evaluation, or streaming tooling.
- Experience with feature stores shared across multiple ML teams.
- Published work on evaluation of retrieval or LLM systems.

## What we offer

Competitive salary and equity, full health benefits, remote-friendly, annual learning budget.
