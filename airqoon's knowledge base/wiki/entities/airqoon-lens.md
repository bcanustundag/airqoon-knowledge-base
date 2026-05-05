---
title: "Airqoon Lens"
type: entity
entity_type: product
tags: [airqoon, software, platform, cloud, analytics, enterprise]
created: 2026-04-23
updated: 2026-04-29
sources: [airqoon-lens.md, product-page.md, airqoon-vs-oizom-comparison.md, airqoon-lens-yeni-ozellik-mesaj.md, unite-l.md, lens-api.md, lens-ui.md, 02-2026-Airqoon_Sunum.pdf]
---

# Airqoon Lens

> Airqoon's proprietary enterprise web dashboard and API platform for air quality monitoring, data visualisation, report management, and environmental alarm monitoring. Serves as the analytics backbone for all Airqoon sensor deployments.

---

## Platform Overview

**URL:** https://lens.airqoon.com (Production)

Airqoon Lens transforms raw sensor data into actionable environmental intelligence. It features advanced time-based map visualizations, comprehensive data export capabilities, advanced reporting tools with markdown editing and PDF export, and a complete alarm system for real-time monitoring.

## Architecture & Tech Stack

> Full architecture: [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]

The platform is divided into a frontend Enterprise Dashboard ([[wiki/sources/lens-ui|lens-ui]]) and a robust backend ([[wiki/sources/lens-api|lens-api]]):
- **Backend:** Node.js, Fastify, TypeScript, PostgreSQL (for structured data and Markdown reports), MongoDB (for telemetry/weather caching).
- **Background Processing:** RabbitMQ for asynchronous data export jobs.
- **Document Generation:** Puppeteer for server-side PDF generation of reports.
- **Storage:** S3-based storage for images and legacy assessment reports with secure API proxy access.

---

## Core Modules & Features

### 1. Dashboard Analytics & Visualization
- **Heatmaps & Trends:** Daily and hourly average calendar heatmaps, 24-hour pollutant trends, and location rankings.
- **Device Comparison:** Optimized multi-device comparison charts with interactive line/bar charts, and unit toggling (μg/m³ vs ppb).
- **Historical Data Visualization:** Specialized charts for particulate matter, gas measurements, and environmental conditions with multiple Y-axes and smart default visibility.
- **Telemetry Bulk Operations:** Optimized time-series endpoints supporting multiple pollutants (including H2S, VOC, NOISE).

### 2. Interactive Map Interface
- **Time-Based Playback:** Interactive 48-hour historical data playback with a slider and configurable playback speeds.
- **Advanced Wind Field (Beta):** High-performance wind field generation (sub-600ms response) with spatial clustering, time-synchronized historical playback, and visual cluster differentiation.
- **Device Integration:** Dynamic filtering by status and pollutant, integration with Airqoon Base Map External API, and interactive elliptical markers.
- **External Stations:** Supports fetching latest and historical telemetry for public/external reference stations.

### 3. Environmental Alarm System
- **Complex Rule Engine:** Supports AND/OR/NOT logic with multi-parameter monitoring.
- **Targeting & Lifecycle:** Alarms can target specific device groups. Features real-time tracking with acknowledgment, suppression, and false-alarm marking.
- **Analytics:** Comprehensive alarm statistics and history summaries.

### 4. Data Export System
- **Intelligent Processing:** Automatically switches between synchronous (immediate HTTP response) and asynchronous (RabbitMQ background job) processing based on data size (threshold: 10,000 records).
- **Rich Formats:** Excel and CSV exports. Excel includes a summary sheet with device metadata and clickable Google Maps links, plus individual device sheets.
- **Audit & Notification:** Full audit trail logging and automated email notifications for completed jobs.

### 5. Report Management
- **Markdown Editor:** Custom lightweight tab-based editor with image resizing and content-aware tracking.
- **Role-Based Access:** Admins have hard-delete and undelete capabilities; regular users have soft-delete limits. Tenant-scoped security ensures strict data isolation.
- **PDF Export:** Advanced PDF generation via Puppeteer with clickable navigation links, proper headers/footers, and professional formatting.

---

## Airqoon Lens AI (Add-on Module)

GenAI-powered analysis layer providing:

- **Automated monthly assessment reports** with executive summaries
- **Pollution source identification** — automatic detection and hotspot visualisation
- **Trend analysis** — daily, weekly, monthly patterns
- **Environmental factor correlation** — wind, pressure, temperature effects on AQ
- **Actionable recommendations** — policy formation support
- **Device performance monitoring** — sensor health and calibration tracking

---

## Customer Feedback

### Akçansa (Cement)
- Requested regional separation (BCM/CNK, sub-regions within CNK)
- Want meteorological analysis per measurement location
- Want recommendations to include affected areas ("could be affected" language)
- Want atmospheric pressure anomaly insights (e.g. lodos effect)
- Need daily averages including pressure data
- Want Istanbul-wide benchmarking against ministry reference stations
- False alarms during autumn fog — need smarter alert logic
- **Critical:** Daily AI summary (like a daily sum-up) needed on dashboard
- Monthly exceedance rates as percentages (not just counts) in executive summary
- Data continuity metrics in device performance section
- Delta/difference-based alerts when a unit is used as background reference

### EnerjiSA Üretim (Energy)
- Want calibration and maintenance reports centralised in platform
- Daily granularity more valuable than hourly
- Daily email alerts
- EBRD, IFC, DG organisations track their compliance
- Want "last 7 days summary" view on login — have limits been exceeded?

### Kadıköy Belediyesi (Municipality)
- Want print/export capability from map or other views
- Request custom date range (start–end) instead of fixed 7-day window
- Want map polygons showing boundaries
- Customisable map basemap layers
- Device hide/unhide and location change features
- Annual report capability
- Device offline notifications

---

*See also: [[Airqoon]], [[wiki/entities/unit-l|Unit L]], Airqoon Map*
