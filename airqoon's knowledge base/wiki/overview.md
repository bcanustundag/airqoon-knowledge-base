---
title: "Airqoon — Overview"
type: overview
tags: [airqoon, overview]
created: 2026-04-22
updated: 2026-05-03
sources: [Use-Cases.md, Certificates-&-Standards-&-Technical-Specifications.md, Target-Sectors.md, product-page.md, airqoon-vs-oizom-comparison.md, airqoon-lens.md, unite-l.md, customer-success-scenarios.md, distributor-partnership-search.md, outbound-marketing-linkedin-templates.md, Kulım-Alanları.md, Unit-L-Getting-Started-Guide-v3.md, Unit-M-Maintenance-Manual.md, pace-projesi.md, satis-arastirma.md, clean-air-zone-caz.md, pace_047_logframe.md, claude-business-project-memory.md]
---

# Airqoon — Overview

> This page synthesises everything the wiki knows about Airqoon. It serves as an executive briefing — what Airqoon is, what it does, and where the key open questions are.

---

## What is Airqoon?

**[[wiki/entities/airqoon|Airqoon]]** (operating under İNNOVATHİNK MÜHENDİSLİK SANAYİ VE TİCARET A.Ş.) is a Turkish environmental monitoring company delivering **low-cost, continuous, real-time environmental intelligence** to enterprises, cities, and institutions. The company provides an integrated ecosystem of hardware sensors, cloud analytics (Lens), public maps, and AI-powered reporting.

Founded in Istanbul (~2018, as Inovatink → İnovathink → Airqoon), the company has deployed **200+ sensor nodes across 30+ cities in 5+ countries** (Turkey, Azerbaijan, Iraq, and prospecting in Egypt, Australia, EU). Headquartered at Marmara Üniversitesi Teknoloji Geliştirme Bölgesi, Maltepe, Istanbul. Holds **Teknopark status** (zero corporate tax) and ISO 9001:2015 / ISO 27001:2022 certifications.

**Core value proposition:** Make air quality monitoring **accessible, affordable, and actionable** — filling the gap between expensive reference stations and the need for dense, real-time spatial coverage.

---

## Product & Architecture

Airqoon's solution consists of three pillars:

### Hardware — Sensor Units

| Unit                     | Description         | Key Specs                                                                                    |                                                                                                        |
| ------------------------ | ------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **[[wiki/entities/unit-l | Unit L]]**          | Flagship outdoor sensor                                                                      | 3.2 kg, solar-powered, 14-day battery backup, 4G/NB-IoT/WiFi, 5-min deployment, −10 °C to +65 °C, IP34 |
| **Unit M**               | Compact/indoor unit | Smaller form factor, 2G/4G connectivity, designed for enclosed or semi-enclosed environments |                                                                                                        |
| **Unit N**               | *(planned)*         | Mentioned in internal docs; details TBD                                                      |                                                                                                        |

**Measurement parameters:**
- **Particulate matter:** PM1, PM2.5, PM10 (optical particle counters); optional particle size distribution (PM-Pro)
- **Gases (up to 8):** NO₂, O₃, SO₂, CO, CO₂, VOCs, H₂S, CH₄/tVOC
- **Meteorological:** temperature, humidity, pressure, wind speed/direction (anemometer add-on)
- **Noise:** Class-1 & Class-2 (IEC 61672-1:2013 compliant)

**Design philosophy:** Modular sensor cartridge system — sensors can be swapped on-site without dismounting the device. Solar-powered with configurable sampling intervals (1–60 min).

### Software — [[wiki/entities/airqoon-lens|Airqoon Lens]] Platform

Customer-facing cloud analytics platform:
- Real-time data dashboard with live data streaming
- Historical trend analysis (daily, weekly, monthly)
- **Compare Mode** — side-by-side multi-location comparison
- 48-hour and inter-period change charts
- Smart alerts & alarm configuration
- Automated compliance reporting
- Flexible data export & API integration
- On-premise deployment option for security-sensitive clients

**Backend Services:**

> Full backend architecture: [[wiki/sources/airqoon-cloud-architecture|Cloud Architecture]]

- **[[wiki/sources/lens-api|lens-api]]**: Core environmental intelligence REST API (Fastify, PostgreSQL, RabbitMQ).
- **[[wiki/sources/lens-ui|lens-ui]]**: Enterprise dashboard frontend (React/TypeScript).
- **lens-mcp**: Model Context Protocol (MCP) server for Lens AI.
- **[[wiki/sources/airqoon-alarm-worker|alarm-worker]]**: Python async service — RabbitMQ streams → alarm evaluation → notifications.
- **[[wiki/sources/airqoon-autoreporter|auto-reporter]]**: Multi-tenant report generator (Python, PostgreSQL, S3, Anthropic Claude).

### Software — Airqoon Lens AI

GenAI-backed analysis module:
- Automated monthly assessment reports with executive summaries
- Pollution source identification
- Spatial/geographic distribution analysis
- Trend analysis and forecasting
- Actionable recommendations for policy makers
- Device performance monitoring & calibration tracking

### Airqoon Map — Public Platform

Open-access real-time air quality map:
- Citizen-facing interface showing live pollution data
- Citizen complaint collection system
- Wildfire maps & emergency notifications
- Custom branded maps for organisations
- Mobile-friendly interface

**Backend Services:**
- **[[wiki/sources/airqoon-base-map-consumer|base-map-consumer]]**: Node.js — SQS/RabbitMQ telemetry consumer, AQI calc, weather sync, MODIS fire data.
- **[[wiki/sources/airqoon-base-map-external-api|base-map-external-api]]**: Fastify REST API — devices, telemetry, AQI, multi-tenant access.
- **[[wiki/sources/airqoon-base-map-tile-server|base-map-tile-server]]**: Vector tile server (.pbf) for spatial map rendering.
- **[[wiki/sources/airqoon-basic-map-api|basic-map-api]]**: Fastify REST API — station metadata, widget data.
- **[[wiki/sources/airqoon-data-external-projection|data-external-projection]]**: Transforms external (gov) station data into internal format.
- **[[wiki/sources/airqoon-base-map-ui|base-map-ui]]**: React frontend — MapLibre GL JS, heatmaps, device markers.
- **[[wiki/sources/airqoon-widget-ui|widget-ui]]**: Embeddable AQI widget carousel for 3rd-party sites.

### Internal Tooling & Firmware

- **Firmware:** ESP32-based, FreeRTOS, MQTT/TLS port 8883. Repos: [[wiki/sources/airqoon-su-fw|airqoon-su-fw]], [[wiki/sources/airqoon-su-local-fw|airqoon-su-local-fw]], [[wiki/sources/LCF|LCF]].
- **Calibration Tooling:** [[wiki/sources/AirqoonCalibrationToolBackend|Qoonify]] (IBB + ThingsBoard integration), [[wiki/sources/cal-app|cal-app]] (Streamlit), [[wiki/sources/LCM|LCM]] (Serial Data Plotter).
- **Operations:** [[wiki/sources/airqoon-ops-engine|airqoon-ops-engine]] for batch/component tracking via Notion.
- **Simulator:** [[wiki/sources/acme_aq_simulator|acme_aq_simulator]] — realistic telemetry to ThingsBoard over MQTT.
- **Provisioning:** [[wiki/sources/aq-prov-app|aq-prov-app]] — device registration and initial configuration.

---

## Key Entities

- **[[wiki/entities/airqoon|Airqoon]]** — the company itself
- **[[wiki/entities/baris-can-ustundag|Barış Can Üstündağ]]** — Co-founder & CEO
- **Team:** Orhun Hazneci (technical/ops), Gülkan Güner (support/service)
- **Municipal clients:** Bursa Büyükşehir, Denizli, Kadıköy, Mudanya, İnegöl, Avcılar belediyeleri
- **Industrial clients:** Akçansa (cement), Oyak Çimento, Çimsa, Çimentaş, TÜPRAŞ, Enerjisa Üretim, GİSAŞ
- **Competitors:** [[wiki/entities/oizom|Oizom]], [[wiki/entities/bettair|Bettair]], [[wiki/entities/kunak-technologies|Kunak]], Clarity Movement, Envirosuite
- **Partners/prospects:** HAK Automation (Egypt), Alpha Scientific (Australia), REDA Safe (Saudi Arabia), Codico, Connected IoT, BCN Smart Tech (Malaysia)
- **Academic partners:** Prof. Dr. Ülkü Alver Şahin (İÜ-Cerrahpaşa), Prof. Fatma Öztürk (Boğaziçi/MELTEM), Assoc. Prof. Burçak Kaynak Tezel (İTÜ)
- **Standards bodies:** CEN TC 264 (Nicole Perschau at VDI/DIN), EPA, WMO, BSI (PAS 4023), VITO (Martine Van Poppel)
- **Projects:** [[wiki/sources/pace-projesi|PACE Projesi]] (EU/GIZ "Clean Air Hatay"), [[wiki/analyses/teknopark-aq-fusion-proposal|AQ-Fusion]] (Teknopark R&D), MELTEM (TÜBİTAK-GSRI), GEFF Turkey
- **R&D history:** [[wiki/sources/teknopark-previous-projects|4 completed STB projects]] (070382, 076102, 085513, 093950)
- **Research:** [[wiki/sources/inegol_pm_presentation|İnegöl PM Assessment]] (ASIC 2026), Eastern Anatolia Observatory, "Clean Air Hatay" metagenomic dust analysis

---

## Key Concepts

- Indicative Monitoring — Airqoon's positioning (supplementary/indicative per 2008/50/EC)
- [[wiki/concepts/en17660-standard|CEN TS 17660]] — EU performance evaluation standard for sensor systems (Parts 1 & 2)
- [[wiki/concepts/low-cost-air-sensors|Low-Cost Air Sensors]] — the broader sensor movement Airqoon belongs to
- [[wiki/concepts/clean-air-zones|Clean Air Zone]] — regulatory concept relevant to city customers
- Fugitive Emissions — industrial monitoring use case (TS EN 15446)
- [[wiki/concepts/perimeter-monitoring|Perimeter Monitoring]] — core industrial use case
- Urban Heat Island — use case for cities
- Sustainability Reporting — ESRS E1/E2 (pollution), TSRS 1/2 (KGK), EU Taxonomy
- SKDM / CBAM — Carbon Border Adjustment Mechanism (cement, steel exporters)
- ÇSED / ESIA — Environmental and Social Impact Assessment (EBRD/IFC funded projects)

---

## Top 5 Use Cases & Target Sectors

1. **Industrial Fenceline & Environmental Impact Monitoring** — Cement, Mining & Quarries, Oil & Gas, Iron & Steel (moving from reactive complaint handling to proactive pollution prevention via wind-based source attribution).
2. **Municipal Air Quality & Noise Monitoring Network** — Metropolitan & District Municipalities (providing neighborhood-resolution data and public transparency).
3. **Indoor Air Quality for Public & Commercial Spaces** — Shopping Malls, Schools, Hospitals, Offices (early detection of HVAC failures, ESG reporting).
4. **Organized Industrial Zone (OIZ) Environmental Management** — OIZ Management, Free Zones (evidence-based tenant management and source identification).
5. **Research, Scientific Studies & Emergency Response** — Universities, NGOs, Disaster Response (publishable data, rapid deployment).

---

## Competitive Landscape

*For a detailed analysis, see the full [[wiki/concepts/competitors|Competitive Landscape]] node.*

### Airqoon vs [[Oizom]] (Polludrone)

| Dimension           | Airqoon Unit L    | Oizom Polludrone |
| ------------------- | ----------------- | ---------------- |
| **Weight**          | 3.2 kg            | 8 kg             |
| **Battery backup**  | **14 days**       | 24 hours         |
| **Deployment time** | **5 minutes**     | Complex mounting |
| **Price**           | **$2,500–5,500**  | >$8,000          |
| **Public map**      | **Yes**           | No               |
| **AI reports**      | **GenAI monthly** | No               |
| **IP rating**       | IP34              | IP66             |
| **Temp range**      | −10 to +65 °C     | −20 to +60 °C    |

**Airqoon advantage:** 40–60% cost advantage, superior battery life, faster deployment, public engagement platform, AI analytics. **Oizom advantage:** higher IP protection, wider temperature range, more connectivity options (LoRa, Ethernet, Satellite), UV radiation sensor.

### Airqoon vs [[wiki/entities/kunak-technologies|Kunak]] (Kunak AIR Pro)
**Kunak's Strategy:** Focuses heavily on "type approval" and rigorous certifications. They publicly share extensive co-location field study results demonstrating high accuracy (R² > 0.85, U(exp) < 25%).
**Airqoon's Challenge:** Airqoon needs to match Kunak's transparency by publishing its own co-location data and formalizing its CEN/TS 17660 compliance to remain competitive in high-end tenders.

### Airqoon vs [[wiki/entities/bettair|Bettair]] (Bettair MK2)
**Bettair's Strategy:** Achieved Class 1 CEN/TS 17660-1 accreditation and offers a unique "Zero Maintenance Cost" model. They bundle software subscriptions and EU connectivity into the cost of pre-calibrated replacement cartridges.
**Airqoon's Challenge:** Airqoon must effectively position its SIM replacement workflow and software ecosystem (Lens/Map) against Bettair's compelling "all-in-one" bundled pricing model, especially in EU markets.

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
- Çevre Şehircilik Bakanlığı sets national air quality regulations (SKHKKY, HKDYY)
- İl Müdürlükleri conduct enforcement/inspection
- SKDM/CBAM: Since 1 Jan 2026, Turkish cement/steel/aluminium exporters must report and pay for embedded carbon emissions to EU
- TSRS 1/2 (KGK): Turkish Sustainability Reporting Standards — Scope 1/2/3 GHG emissions, aligned with ISSB IFRS S1/S2
- Growing ESRS/EU Taxonomy compliance pressure on Turkish industry exporting to EU
- EBRD/IFC funded projects require ÇSED (ESIA), continuous environmental monitoring, and World Bank EHS compliance

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
- **CEN/TS 17660 certification gap** — No ISO/IEC 17025-accredited lab exists in Europe to certify under this standard. VITO (Martine Van Poppel) confirmed in writing; running a DG ENV project with accreditation to follow
- **Two Notion databases inaccessible** — IDs `8d49471d` and `347c3f2b` not shared with integration; content unknown
- **Investment round** — Pre-seed/bootstrapped; ₺9M (~$200K) new investment under discussion

---

*Sources: 75+ raw files | Last updated: 2026-05-03*
