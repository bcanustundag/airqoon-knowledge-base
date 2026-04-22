---
title: "Airqoon — Overview"
type: overview
tags: [airqoon, overview]
created: 2026-04-22
updated: 2026-04-23
sources: [Use-Cases.md, Certificates-&-Standards-&-Technical-Specifications.md, Target-Sectors.md, product-page.md, airqoon-vs-oizom-comparison.md, airqoon-lens.md, unite-l.md, customer-success-scenarios.md, distributor-partnership-search.md, outbound-marketing-linkedin-templates.md, Kullanım-Alanları.md, Unit-L-Getting-Started-Guide-v3.md, Unit-M-Maintenance-Manual.md, pace-projesi.md, satis-arastirma.md, clean-air-zone-caz.md]
---

# Airqoon — Overview

> This page synthesises everything the wiki knows about Airqoon. It serves as an executive briefing — what Airqoon is, what it does, and where the key open questions are.

---

## What is Airqoon?

**Airqoon** is a Turkish air quality monitoring and management company that provides **low-cost, continuous, real-time environmental intelligence** to enterprises, cities, and institutions. The company positions itself as a "product & solution company" delivering an integrated ecosystem of hardware sensors, cloud analytics, and AI-powered reporting.

Founded in Turkey, Airqoon has deployed sensors in **20+ cities and industrial sites** across Turkey and is expanding internationally — targeting markets in the EU, Eastern Europe, the Middle East (Azerbaijan, Iraq), North Africa (Egypt), Australia, and beyond.

**Core value proposition:** Make air quality monitoring **accessible, affordable, and actionable** — filling the gap between expensive reference stations and the need for dense, real-time spatial coverage.

---

## Product & Architecture

Airqoon's solution consists of three pillars:

### Hardware — Sensor Units

| Unit | Description | Key Specs |
|------|-------------|-----------|
| **[[Unit L]]** | Flagship outdoor sensor | 3.2 kg, solar-powered, 14-day battery backup, 4G/NB-IoT/WiFi, 5-min deployment, −10 °C to +65 °C, IP34 |
| **[[Unit M]]** | Compact/indoor unit | Smaller form factor, 2G/4G connectivity, designed for enclosed or semi-enclosed environments |
| **Unit N** | *(planned)* | Mentioned in internal docs; details TBD |

**Measurement parameters:**
- **Particulate matter:** PM1, PM2.5, PM10 (optical particle counters); optional particle size distribution (PM-Pro)
- **Gases (up to 8):** NO₂, O₃, SO₂, CO, CO₂, VOCs, H₂S, CH₄/tVOC
- **Meteorological:** temperature, humidity, pressure, wind speed/direction (anemometer add-on)
- **Noise:** Class-1 & Class-2 (IEC 61672-1:2013 compliant)

**Design philosophy:** Modular sensor cartridge system — sensors can be swapped on-site without dismounting the device. Solar-powered with configurable sampling intervals (1–60 min).

### Software — [[Airqoon Lens]] Platform

Customer-facing cloud analytics platform:
- Real-time data dashboard with live data streaming
- Historical trend analysis (daily, weekly, monthly)
- **Compare Mode** — side-by-side multi-location comparison
- 48-hour and inter-period change charts
- Smart alerts & alarm configuration
- Automated compliance reporting
- Flexible data export & API integration
- On-premise deployment option for security-sensitive clients

### Software — [[Airqoon Lens AI]]

GenAI-backed analysis module:
- Automated monthly assessment reports with executive summaries
- Pollution source identification
- Spatial/geographic distribution analysis
- Trend analysis and forecasting
- Actionable recommendations for policy makers
- Device performance monitoring & calibration tracking

### [[Airqoon Map]] — Public Platform

Open-access real-time air quality map:
- Citizen-facing interface showing live pollution data
- Citizen complaint collection system
- Wildfire maps & emergency notifications
- Custom branded maps for organisations
- Mobile-friendly interface

---

## Key Entities

- **[[Airqoon]]** — the company itself (entity page)
- **[[Baris Can Ustundag]]** — Co-founder
- **[[Oizom]]** — primary competitor (Polludrone)
- **Customers:** [[Akçansa]] (cement), [[EnerjiSA Üretim]] (energy), [[Kadıköy Belediyesi]], [[Bursa Büyükşehir Belediyesi]], [[GİSAŞ]]
- **Partners/prospects:** HAK Automation (Egypt), Alpha Scientific (Australia), REDA Safe (Saudi Arabia), Codico, Connected IoT, Senseair distributors
- **Standards bodies:** CEN TC 264, EPA, WMO, BSI (PAS 4023)
- **Projects:** [[PACE Projesi]] (EU/GIZ funded, earthquake zone), [[GEFF Turkey]]

---

## Key Concepts

- [[Indicative Monitoring]] — Airqoon's positioning (supplementary/indicative per 2008/50/EC)
- [[CEN TS 17660]] — EU performance evaluation standard for sensor systems (Parts 1 & 2)
- [[Low-Cost Air Sensors]] — the broader sensor movement Airqoon belongs to
- [[Clean Air Zone]] — regulatory concept relevant to city customers
- [[Fugitive Emissions]] — industrial monitoring use case (TS EN 15446)
- [[Perimeter Monitoring]] — core industrial use case
- [[Urban Heat Island]] — use case for cities
- [[Sustainability Reporting]] — ESRS, EU Taxonomy, ESG reporting drivers

---

## Target Sectors

1. **Cities & Municipalities** — urban monitoring networks, public awareness, smart city integration
2. **Cement Industry** — perimeter monitoring, dust control, regulatory compliance
3. **Mining Operations** — open pit/underground air quality, blast monitoring
4. **Oil & Gas** — fugitive emission monitoring, leak detection (CH₄, tVOC)
5. **Organized Industrial Zones (OIZ)** — hotspot identification, source attribution
6. **Schools & Playgrounds** — indoor/outdoor child health protection
7. **Aluminum Industry** — environmental impact monitoring
8. **Shopping Mall Play Areas** — indoor air quality

---

## Competitive Landscape

### Airqoon vs [[Oizom]] (Polludrone)

| Dimension | Airqoon Unit L | Oizom Polludrone |
|-----------|---------------|-----------------|
| **Weight** | 3.2 kg | 8 kg |
| **Battery backup** | **14 days** | 24 hours |
| **Deployment time** | **5 minutes** | Complex mounting |
| **Price** | **$2,500–5,500** | >$8,000 |
| **Public map** | **Yes** | No |
| **AI reports** | **GenAI monthly** | No |
| **IP rating** | IP34 | IP66 |
| **Temp range** | −10 to +65 °C | −20 to +60 °C |

**Airqoon advantage:** 40–60% cost advantage, superior battery life, faster deployment, public engagement platform, AI analytics. **Oizom advantage:** higher IP protection, wider temperature range, more connectivity options (LoRa, Ethernet, Satellite), UV radiation sensor.

### Other competitors mentioned in research:
- **Reference station vendors:** Szutest, Referans Çevre, Junray
- **Sensor platforms:** Senseair (component), AirSensEUR (EU JRC)

---

## Regulatory Environment

### Key Standards & Directives

| Standard | Scope |
|----------|-------|
| **Directive 2008/50/EC** | EU ambient air quality framework; defines Data Quality Objectives for indicative monitoring |
| **CEN TS 17660-1 (2021)** | Performance evaluation — gaseous pollutants |
| **CEN TS 17660-2 (2024)** | Performance evaluation — particulate matter |
| **PAS 4023:2023** (UK) | Code of practice for low-cost sensor deployment |
| **EPA/600 series** (USA) | PM2.5, O₃, NO₂, CO, SO₂ sensor testing protocols |
| **ASTM D8559-24** (USA) | Standard specification for outdoor AQ sensors |
| **GAW-293:2024** (WMO) | Integrating low-cost sensors into global networks |
| **TS EN 16450** | Automated PM measuring systems |
| **TS EN 15446** | Fugitive emission measurement |

Airqoon builds to **indicative monitoring** standards per 2008/50/EC and is preparing units for **CEN TS 17660** certification.

### Turkish Regulatory Context
- Çevre Şehircilik Bakanlığı sets national air quality regulations
- İl Müdürlükleri conduct enforcement/inspection
- Growing ESRS/EU Taxonomy compliance pressure on Turkish industry exporting to EU

---

## Sales & Go-to-Market

### Channels
- **Direct sales** — municipalities, industrial enterprises (Turkey)
- **Distributor partnerships** — actively seeking partners in Egypt, Australia, Saudi Arabia, Scandinavia, Eastern Europe
- **EU-funded projects** — PACE (GIZ), GEFF, potential Horizon programs
- **Consulting partnerships** — Bureau Veritas, DNV, TÜV SÜD, Big 4 firms (Deloitte, PwC, KPMG, EY) for ESG/sustainability services

### Customer Personas
1. **Facility owner** — regulatory compliance, risk avoidance, cost-effective monitoring
2. **Government regulator** (Çevre İl Müdürlüğü) — enforcement, expanding network coverage
3. **Municipality** (Belediye) — public health, smart city, PR/transparency
4. **OIZ management** — perimeter monitoring, source detection, environmental KPIs
5. **NGOs** — supporting high-impact environmental projects

---

## Open Questions

- **Unit N specs** — mentioned in internal docs but no details available
- **ISO 17025 calibration** — Oizom has it; does Airqoon plan to pursue?
- **Revenue model details** — pricing structure beyond hardware (SaaS? subscription for Lens?)
- **Data pipeline architecture** — technical details of cloud infrastructure not yet documented
- **Two Notion databases inaccessible** — IDs `8d49471d` and `347c3f2b` not shared with integration; content unknown

---

*Sources: 73 raw files (30 Resources Docs + 43 Notion marketing/sales/growth pages) | Last updated: 2026-04-23*
