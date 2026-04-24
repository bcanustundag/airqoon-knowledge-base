# Airqoon Knowledge Base — Schema

This file defines how the LLM maintains the Airqoon knowledge base. Read this at the start of every session.

## Purpose

This is a **persistent, compounding wiki** about Airqoon — the air quality monitoring platform. It is not a RAG system. The LLM reads sources, synthesizes knowledge, and writes it into structured wiki pages. Knowledge is compiled once and kept current, not re-derived on every query.

## Directory Structure

```
airqoon's knowledge base/
├── CLAUDE.md              ← this file (schema)
├── index.md               ← master catalog of all wiki pages
├── log.md                 ← append-only chronological log of all operations
│
├── raw/                   ← immutable source documents (never modify)
│   ├── articles/          ← web articles, blog posts (Obsidian Web Clipper)
│   ├── papers/            ← research papers, technical reports
│   ├── meetings/          ← meeting transcripts, notes
│   ├── slack/             ← exported Slack threads
│   ├── matrix/            ← exported Matrix/Synapse room conversations
│   ├── data/              ← data files, CSVs, exports
│   └── assets/            ← downloaded images and attachments
│
└── wiki/                  ← LLM-generated markdown files (you own this)
    ├── overview.md        ← high-level synthesis of everything known
    ├── entities/          ← pages for specific people, orgs, places, systems
    ├── concepts/          ← domain concepts and technical topics
    ├── sources/           ← one summary page per raw source
    └── analyses/          ← comparisons, research answers, explorations
```

## Core Principles

1. **Raw sources are immutable.** Never edit files in `raw/`. They are the source of truth.
2. **The wiki is the product.** The LLM writes and maintains all files in `wiki/`.
3. **Index stays current.** Update `index.md` on every ingest or new wiki page creation.
4. **Log everything.** Append an entry to `log.md` after every operation.
5. **Cross-reference aggressively.** Use `WikiLinks` liberally. Every entity and concept mentioned in a page should link to its own page if one exists.
6. **Frontmatter on all wiki pages.** Every wiki file should have YAML frontmatter (see format below).

## Wiki Page Frontmatter Format

```yaml
---
title: "Page Title"
type: entity | concept | source | analysis | overview
tags: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: []   # list of raw source filenames that contributed to this page
---
```

## Operations

### Ingest a New Source

When the user says "ingest [source]" or drops a file into `raw/`:

1. Read the source file carefully.
2. Discuss key takeaways with the user.
3. Create a summary page in `wiki/sources/` named after the source file.
4. Identify all entities (people, organizations, systems, locations) and concepts mentioned.
5. Update or create the relevant `wiki/entities/` and `wiki/concepts/` pages — integrate the new information, note contradictions with existing claims, strengthen or challenge existing synthesis.
6. Update `wiki/overview.md` if the source meaningfully changes the big picture.
7. Update `index.md` with any new pages.
8. Append an entry to `log.md`.

A single source will typically touch 5–15 wiki pages.

### Answer a Query

When the user asks a question:

1. Read `index.md` to identify relevant wiki pages.
2. Read those pages and synthesize an answer with `WikiLinks` citations.
3. If the answer is valuable (a comparison, analysis, or new connection), offer to file it as a new page in `wiki/analyses/`.
4. If filed, update `index.md` and `log.md`.

### Lint the Wiki

When the user says "lint" or "health check":

1. Scan all wiki pages for:
   - Pages that contradict each other
   - Stale claims superseded by newer sources
   - Orphan pages with no inbound links
   - Concepts mentioned but lacking their own page
   - Missing cross-references
   - Data gaps that a web search could fill
2. Report findings and suggest fixes.
3. Suggest new questions to investigate or new sources to find.
4. Append a lint entry to `log.md`.

## Log Entry Format

Each log entry starts with a consistent prefix for easy grep:

```
## [YYYY-MM-DD] ingest | Source Title
## [YYYY-MM-DD] query | Question asked
## [YYYY-MM-DD] lint | Health check summary
## [YYYY-MM-DD] edit | Manual update description
```

Example grep: `grep "^## \[" log.md | tail -10`

## Source-Specific Notes

### Matrix / Synapse Chats

Airqoon runs a self-hosted Matrix Synapse server. To export room history into `raw/matrix/`:

**Option A — Admin export (recommended for full history):**
```bash
python -m synapse.app.admin_cmd -c /path/to/homeserver.yaml \
  export-data @username:your.domain --output-directory ./raw/matrix/
```
Produces JSON files per room. Store them as `raw/matrix/<room-name>.json`.

**Option B — Client-side CLI (for E2EE rooms):**
```bash
# Install
pip install matrix-commander
# Authenticate once
matrix-commander --login password
# Export a room's last N messages to a file
matrix-commander --room '!roomid:your.domain' --tail 5000 > raw/matrix/room-name.txt
```
Use this when rooms are end-to-end encrypted (E2EE) — the server-side export can't decrypt those.

**Naming convention:** `raw/matrix/<channel-or-room-name>_YYYY-MM-DD.json` (or `.txt`).

When ingesting Matrix exports, treat each room as a separate source. The LLM should:
1. Identify the room topic and participants.
2. Extract decisions, action items, and notable discussions.
3. Create a source summary page in `wiki/sources/`.
4. Update relevant entity and concept pages.

---

## Domain Context

**Airqoon** is an air quality monitoring platform. The knowledge base is focused on:

- Air quality science (pollutants, sensors, measurement standards)
- Airqoon product and architecture (API, sensors, data pipeline, customers)
- Competitive landscape (other AQ monitoring companies and solutions)
- Regulatory environment (air quality standards, government policy)
- Research (academic papers on air quality, health effects, sensing)
- Business context (customers, municipalities, partnerships)

Adjust entity and concept categories as the domain evolves. Update this schema together with the user when conventions need to change.
