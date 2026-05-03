---
title: "Airqoon Auto Reporter"
type: source
tags: [github, repository, code]
created: 2026-04-23
updated: 2026-04-23
sources: ["raw/github_repos/airqoon-autoreporter.md"]
---

# Airqoon Auto Reporter

**Repository:** `airqoon-autoreporter`
**Source File:** `raw/github_repos/airqoon-autoreporter.md`

## Description
A CLI tool for generating and scheduling multi-tenant air quality reports using PostgreSQL data and S3 storage. Reports are produced in Turkish or English Markdown.

## Role in Architecture

**Layer:** Backend Microservices (K8s)

CLI tool and API for generating multi-tenant air quality reports. Supports monthly, weekly, and single-page reports in Turkish/English Markdown. AI-powered insights via Anthropic Claude. Uploads to S3 and Notion. Scheduled via cron with email notifications (SMTP).

## Tech Stack

Python, PostgreSQL, MongoDB, AWS S3, Anthropic Claude API, SMTP, Notion API

## Related Entities
- [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]
- [[wiki/entities/airqoon-lens|Airqoon Lens]]
- [[wiki/entities/airqoon|Airqoon]]
