# Airqoon Knowledge Base — Log

Append-only chronological record of all wiki operations. Each entry uses a consistent prefix for grep-ability.

Tip: `grep "^## \[" log.md | tail -10` gives you the last 10 entries.

---

## [2026-04-22] edit | Knowledge base initialized

Created base folder structure and schema:
- `CLAUDE.md` — schema and operating instructions
- `index.md` — master page catalog
- `log.md` — this file
- `wiki/overview.md` — placeholder for high-level synthesis
- Directory structure: `raw/` (articles, papers, meetings, slack, data, assets) and `wiki/` (entities, concepts, sources, analyses)

Wiki is empty. Ready to ingest first sources.

## [2026-04-22] edit | Exported Notion Resources Docs database

Exported 30 pages from the Notion "Resources Docs" database (`b3a1a582-51f6-418d-818c-a22804c4a431`) under the "Resources" page to `raw/articles/`.

Pages exported (30 total):
- Sectoral Air Pollution in Numbers (EN, Onboarding/Marketing)
- Unit L Getting Started Guide v3 (EN, Guides)
- Air Sensors Standardization and Evaluation Efforts (EN, Onboarding)
- Airqoon M Başlangıç Kılavuzu (Guides)
- Measurement Methods in Monitoring Air Quality (EN, Onboarding/Domain)
- Airqoon Başlangıç Kılavuzu v4 (TR, Guides)
- airqoon Weekly Meeting Structure (EN, Onboarding)
- airqoon Haftalık Toplantı Yapısı (TR, Onboarding)
- Research Labs Evaluating Air Quality Sensor Performance
- Airqoon M/L SIM Kurulumu ve Değişimi (TR/EN variants)
- Unit M – SIM Installation and Replacement Guide (TR, Guides)
- Unit M - Maintenance Manual (EN, Guides)
- Taslak MET'lerde İzleme
- GEFF Türkiye fizibilite çalışması
- Airqoon M Başlangıç Kılavuzu - Noise (Guides)
- Use Cases / Kullanım Alanları (EN/TR, Marketing/Onboarding)
- Gothenburg Protocol Analysis (Marketing)
- Airqoon Başlangıç Kılavuzu v2 (TR, Guides)
- Pre-Test Süreci Talimatları (TR, Domain/Instructions)
- Airqoon Üniteleri Sensör Kalibrasyonu / Sensor Calibration (TR/EN, Process/Onboarding)
- Hava Ölçümleri ve Hava Sensör Sistemleri (TR, Onboarding/Domain)
- Airqoon Sensor Üniteleri Test Süreci 17660 (TR, Domain/Instructions)
- Certificates & Standards & Technical Specifications (EN, Domain)
- Field Recovery (Process)
- Kurumsal Pazar Analizi (TR, Marketing)
- Target Sectors (EN, Marketing/Onboarding)

Export script saved at `scratch/export-notion.mjs` for re-use.
Sources are ready for ingestion into the wiki.

## [2026-04-22] ingest | Extracted 43 Notion marketing/sales/growth pages

Extracted 41 pages + 2 databases from Notion using `scratch/fetch-notion-pages.mjs`:

**Pages (41):** gathering-testimonials, outbound-marketing-linkedin-templates, customer-success-scenarios, marketing-documents, pace-projesi, airqoon-lens-yeni-ozellik-mesaj, iot-hava-kalitesi-izleme-bursa, n8n-templates, airqoon-vs-oizom-comparison, satis-arastirma, unite-l, product-page, airqoon-lens, distributor-partnership-search, istanbul-hava-kalitesi-olcumu, copernicus, surdurulebilirlik-nedir, emisyon-ve-imisyon-olcumleri, clean-air-zone-caz, yonetmelik-guncel, air-sensors-growth-marketing-staj, ngos, konular, usa-hava-kirliligi-olcum-arastirmasi, archive, 2026-potential-events, target-sectors, sales-funnel, merhaba-iletisim, projeler, azerbaijan, iraq, scewc2023, sales-pipeline-active-leads, potential-lead-companies, mbb-hava-kirliligi-kentsel-doku, cimento-potansiyel-kurumlar, partnerships-crm, partner-onboarding, tweet-akisi, sensor-tanitim-paylasim-metni

**Databases (2):** marketing-content-calendar (141 entries), social-media-sharing-calendar (36 entries)

All 43/43 succeeded. Total: ~1.2 MB. Saved to `raw/articles/notion/`.

## [2026-04-23] ingest | First wiki digestion — 13 pages created

Digested 73 raw files (30 Resource Docs + 43 Notion pages). Created:

### Overview (1)
- **wiki/overview.md** — Comprehensive executive briefing: company identity, product architecture (Unit L/M/N, Lens, Map, AI), target sectors, competitive landscape (vs Oizom), regulatory environment, sales/GTM strategy, open questions

### Entity Pages (4)
- **wiki/entities/airqoon.md** — Company: identity, product portfolio, value proposition, customer base, distribution, projects
- **wiki/entities/unit-l.md** — Product: technical specs, measurement capabilities, design philosophy, competitive position
- **wiki/entities/airqoon-lens.md** — Product: platform features, AI module, detailed customer feedback (Akçansa, EnerjiSA, Kadıköy, Bursa)
- **wiki/entities/oizom.md** — Competitor: Polludrone specs, Envizom platform, strengths/weaknesses

### Concept Pages (3)
- **wiki/concepts/low-cost-air-sensors.md** — Technology overview, standards landscape, sensing methods, market context, research labs
- **wiki/concepts/clean-air-zones.md** — CAZ/LEZ framework, UK classification, Turkey relevance
- **wiki/concepts/perimeter-monitoring.md** — Industrial use case, Airqoon vs reference stations, regulatory context

### Source Pages (6)
- **wiki/sources/airqoon-vs-oizom-comparison.md**
- **wiki/sources/product-page.md**
- **wiki/sources/customer-success-scenarios.md**
- **wiki/sources/use-cases.md**
- **wiki/sources/distributor-partnership-search.md**
- **wiki/sources/pace-projesi.md**

Updated `index.md` with all new pages and pending raw file inventory.

Remaining: ~67 raw files have content in `raw/` but do not yet have individual source summary pages in `wiki/sources/`. Their knowledge has been incorporated into the overview, entity, and concept pages where relevant.
## [2026-04-23] ingest | Ingested 23 GitHub repositories into wiki/sources
## [2026-04-23] edit | Digested 23 GitHub repositories, updated overview.md with new software architecture details (Airqoon Map, Lens API, firmware, simulators).
## [2026-04-23] ingest | Ingested 3 EN 17660 PDFs — voting letter and both standard parts

Digested three PDFs from `raw/articles/`:

1. **CEN-TC 264_N3553_Letter_Result_of_voting_prelNWIs_EN17660-1_and_-2_WG42.pdf**
   - Date: 2026-03-11. Formal CEN/TC 264 letter announcing 100% approval vote to advance both EN 17660 parts from Technical Specifications to full European Standards (Decisions 1486 and 1487). TSE (Turkey) abstained. Only comment: France flagged need to reference Directive 2024/2881 instead of Directive 2008/50/EC.
   - Created: `wiki/sources/en17660-n3553-voting-letter.md`

2. **CEN:TC 17660-1-2021.pdf** (89 pages, image-only, OCR'd)
   - CEN/TS 17660-1:2021 — Test protocol and DQOs for gaseous pollutants (NO₂, SO₂, O₃, CO). 4-step protocol (pre-test → lab → field or extended field). 3 classes: Class 1 (≤25% expanded uncertainty at LV), Class 2 (≤30%), Class 3 (≤50%). Measurement uncertainty budget components: lack of fit, drift, cross-sensitivity, T/RH, memory, pressure, EMF.
   - Created: `wiki/sources/en17660-1-gaseous-pollutants.md`

3. **CEN:TC 17660-2-2024.pdf** (58 pages, image-only, OCR'd)
   - FprCEN/TS 17660-2:2024 — Test protocol and DQOs for PM sensors (PM₂.₅, PM₁₀, coarse). 2-step: lab coarse particle test + mandatory field co-location with EN 12341 (reference) and EN 16450 (equivalent). Same 3-class framework. RH sensitivity is the key PM-specific challenge.
   - Created: `wiki/sources/en17660-2-particulate-matter.md`

Additionally created:
- `wiki/concepts/en17660-standard.md` — Synthesis concept page covering both parts, classes, regulatory linkage (Directive 2024/2881 implications), and Airqoon's certification gaps.

Updated `index.md` with 3 source pages + 1 concept page.

Key insight: Directive 2024/2881 tightens PM₂.₅ LV from 25 to 10 µg/m³ — this makes Class 1 certification significantly harder (25% of 10 µg/m³ = 2.5 µg/m³ allowed uncertainty). Airqoon should determine its current EN 17660 class status and plan for EN conversion timeline (est. 2026-2028).

## [2026-04-23] ingest | Digested Top 5 Use Cases and İnegöl PM Presentation (ASIC2026)
- Converted `Airqoon_Top5_UseCases_SalesReference.docx` to text, parsed `inegol_pm_presentation_2.pdf`.
- Created two new source pages: `wiki/sources/airqoon_top5_use_cases.md` and `wiki/sources/inegol_pm_presentation.md`.
- Updated `index.md` with links to both new sources.
- Updated `wiki/overview.md` by replacing the `Target Sectors` list with the new `Top 5 Use Cases & Target Sectors` and adding the İnegöl study under `Research & Case Studies` in the Key Entities section.
- Digested `PACE047_Annex 3_Logframe.docx` (Clean Air Hatay project logframe). Created `wiki/sources/pace_047_logframe.md`, and updated `index.md` and `wiki/overview.md` to reflect the new project details including 10 pilot schools, metagenomic dust analysis, and Corsi-Rosenthal boxes.
- Digested 3 Claude Project Memory files from `raw/assets`: `claude-business-project-memory.md`, `claude-programming-project-memory.md`, and `claude-conv-helper-project-memory.md`. Created corresponding source pages and a dedicated entity page `wiki/entities/baris-can-ustundag.md` documenting technical scope, BD philosophy, and strategic objectives. Updated `index.md`.

## [2026-04-24] ingest | Digested Chat Uploads: AirQuest Poster and Unit L Datasheet

Ingested two documents provided via chat:
- **AirQuest International Symposium Poster**: Created `wiki/sources/airquest-symposium-poster.md`. Captured event details (Zonguldak, April 2026, Interreg BSB) and design critique (missing EU logos, QR code).
- **Unit L Teknik Föy v1.1**: Created `wiki/sources/unit-l-teknik-foy-v1-1.md`. Captured technical specs, sensor performance, packages, and feedback on document professionalization (language consistency, CEN/TS 17660 certification addition, software ecosystem mention).

Updated `index.md` with the new source pages.

## [2026-04-24] ingest | Digested 5 New Documents

Ingested five newly added documents:
- **Miniature Cihazlar Teknik Analiz**: Created `wiki/sources/miniature-teknik-analiz.md`. Captured firmware debug session regarding PM sensor data drops and VOC resets under sleep conditions.
- **Unit L Teknik Föy v1.2 (TR)** & **Unit L Product Sheet v2.2 (EN)**: Created `wiki/sources/unit-l-teknik-foy-v1-2.md` and `wiki/sources/unit-l-product-sheet-v2-2.md`. Tracked the addition of CEN/TS 17660 compliance into the datasheets.
- **Bettair MK2 Ficha Tecnica** & **FAQs**: Created `wiki/sources/bettair-ficha-tecnica.md` and `wiki/sources/bettair-faq-mk2.md`. Extracted competitor pricing strategies (software/calibration included in price) and certification marketing approaches.

Updated `index.md` with the new source pages.

## [2026-04-26] ingest | Digested two Kunak Technologies PDFs
- Extracted text from `1a5a8ef68ae3edcafb87c70f9bad47b7e4e1e48bf5a07bb3cb524df1fe445839.pdf` and `b7a6f0fc2fd37207330aa809fa5557c0304f80e39f6d3b5d09d3dbaaf6d725a2.pdf` using `pdftotext`.
- Created source page `wiki/sources/kunak-standardization-intro.md` outlining Kunak's presentation on sensor certifications, testing protocols, and market trends.
- Created source page `wiki/sources/kunak-air-pro-performance-tests.md` detailing Kunak AIR Pro's co-location field study results (R² and U(exp)) across multiple pollutants.
- Created entity page `wiki/entities/kunak-technologies.md` for the competitor Kunak Technologies.
- Updated `wiki/concepts/low-cost-air-sensors.md` to reference Kunak as a competitor driving the certification trend.
- Updated `index.md` with the new pages.

## [2026-04-26] edit | Created Competitors node
- Created `wiki/entities/bettair.md` to establish the Bettair entity from previously ingested sources.
- Created `wiki/concepts/competitors.md` to synthesize the competitive landscape, grouping Oizom, Kunak, and Bettair.
- Updated `index.md` to reflect the new entity and concept pages.

## [2026-04-26] lint | Health check summary
- Ran a Python-based linting script across all `wiki/` pages to identify broken links and orphan pages.
- Identified and fixed ~30 auto-fixable broken links caused by case and spacing mismatches (e.g., changing `[[Airqoon Lens]]` to `[[wiki/entities/airqoon-lens|Airqoon Lens]]`).
- Removed broken links to non-existent concepts (`AirQuest`, `Interreg BSB`) in `wiki/sources/airquest-symposium-poster.md`.
- Verified that there are **0 orphan pages** in the knowledge base.
- Knowledge base is highly connected and structurally sound.

## [2026-04-26] edit | Created Airqoon Unit L vs Bettair analysis
- Synthesized technical and strategic information from Unit L and Bettair sources.
- Created `wiki/analyses/airqoon-vs-bettair.md` to formalize the competitive analysis.
- Updated `index.md` to index the new analysis page.

## [2026-04-28] ingest | Digested Airqoon Catalog and Unit L Product Sheet PDFs
- Extracted text from `airqoon-catalog-preliminary-v5.2.pdf` and `1-unit-l-product-sheet-en.pdf` using `pdftotext`.
- Created source page `wiki/sources/airqoon-catalog-v5-2.md` outlining the preliminary catalog for Unit L, Unit M, Unit N, and addons.
- Created source page `wiki/sources/unit-l-product-sheet-v2-1.md` documenting Unit L specs and packaging options.
- Updated `index.md` with the new pages.

## [2026-04-29] edit | Created Airqoon Use Cases Analysis
- Synthesized use case documentation from the entire knowledge base into a single comprehensive analysis.
- Created `wiki/analyses/airqoon-use-cases.md` detailing the problem, solution, and outcomes for five core use cases.
- Updated `index.md` to index the new analysis.

## [2026-04-29] edit | Enriched Airqoon Lens Entity
- Investigated `lens-api` and `lens-ui` documentation to enrich the `airqoon-lens` entity page.
- Replaced the QA URL with the production URL (`https://lens.airqoon.com`).
- Detailed the architecture, tech stack (Fastify, Postgres, RabbitMQ, Puppeteer), and core modules (Alarm System, Data Export, Interactive Map, Dashboard Analytics).

## [2026-04-29] edit | Enriched Unit L, Created Unit M and Airqoon Map Entities
- Updated `wiki/entities/unit-l.md` with new specifications from the v5.2 Catalog and v2.1 Product Sheet (e.g., battery size, weight, packaging options).
- Created `wiki/entities/unit-m.md` outlining the indoor sensor's capabilities, specs, and troubleshooting workflow.
- Created `wiki/entities/airqoon-map.md` detailing the public map's architecture, IDW heat maps, satellite fire detection, and citizen reporting features.
- Updated `index.md` to index the new entity pages.

## [2026-04-29] ingest | Ingested Innovathink ISO Certificates
- Extracted and digested `İNNOVATHİNK 9001.pdf` and `İNNOVATHİNK 27001.pdf`.
- Created source pages `wiki/sources/innovathink-iso-9001.md` and `wiki/sources/innovathink-iso-27001.md` documenting the Quality Management and Information Security Management system certificates for Airqoon's parent company.
- Updated `index.md` to index the new sources.

## [2026-04-30] analysis | Airqoon Impact Assessment
- Created `wiki/analyses/impact-assessment.md` synthesizing the social, health, and environmental impacts of Airqoon's air quality monitoring systems.
- Highlighted topics including CAZ (Clean Air Zones), EPA/DSÖ health standards, AQI public awareness, and IAQ in schools.
- Updated `index.md` with the new analysis link.

## [2026-04-30] ingest | Ingested Ülkü Alver Şahin Projects from GDrive
- Copied project directories from Google Drive (`2024-Istanbul-Uni`, `2209b-Tubitak`, `2025-BC-CH4`, `2025-inegol`, `Balikligol`) into `raw/articles/UlkuAlverSahin/`.
- Executed `scratch_ingest.py` to extract text and analyze contents.
- Created `wiki/sources/ulku-alver-sahin-projects.md` to catalog the research papers, ADEP/1001 applications, and GHG sensor specifications (TDLAS CH4).
- Updated `index.md` to track the new source page.

## [2026-04-30] ingest | Ingested Teknopark Previous Projects (3 folders)
- Extracted text from all docx files in `raw/articles/Teknopark/` (1st, 2nd, 3rd project folders).
- Created `wiki/sources/teknopark-previous-projects.md` synthesizing all 4 STB projects:
  - **070382** — Akıllı Uç Bilişim (Edge Computing) at Marmara Tek
  - **076102** — IoT Analiz ve Görselleştirme Platformu (evolved into Airqoon Lens)
  - **085513** — Floresans Tabanlı Gaz Sensörü Mimarisi
  - **093950** — 4Blocks IoT Donanım Mimarisi at Teknopark İstanbul
- Documented company evolution timeline: Inovatink → İnovathink → Airqoon
- Updated `index.md` with the new source page.

## [2026-04-30] edit | Drafted AQ-CertAI Teknopark Project Proposal
- Created comprehensive "Kavramsal Tasarım ve Ön Analiz Çalışması" for new Teknopark project.
- Project: **AQ-CertAI** — AI-powered adaptive sensor calibration for CEN/TS 17660 Class 1 certification.
- Filled all 4 required sections: aims/scope, competitor comparison, R&D methodology, economic projections.
- Builds on all 4 previous STB projects as natural continuation.
- Artifact saved to conversation artifacts directory.

## [2026-05-01] edit | Revised Teknopark Proposal → AQ-Fusion
- Rewrote proposal based on user feedback: pivot from internal calibration to **sellable product**.
- New project: **AQ-Fusion** — Data Fusion + Dispersion Modeling Platform.
- Core R&D: Optimal Interpolation, Gaussian puff models, inverse dispersion, LSTM forecasting.
- Commercial output: 3 tiered SaaS products (Lens Fusion Kent/Endüstri/OSB).
- Removed university partnership. Added SKHKKY/HKKD compliance angle for Turkish market.

## [2026-05-01] edit | Enriched AQ-Fusion with ÇSED/SKDM/ESRS/TSRS
- Added SKDM/CBAM (1 Jan 2026 kesin rejim), ÇSED/ESIA (EBRD/IFC), ESRS E2, TSRS Scope 3 angles.
- New Section 4.5: Regülasyon Kaynaklı Talep Sürücüleri table.
- Added 5 new standards (SKDM, ESRS, TSRS, IFC PS3, WB EHS) to Section 3.3.

## [2026-05-01] edit | Created AQ-Fusion proposal as wiki article
- Saved proposal to `wiki/analyses/teknopark-aq-fusion-proposal.md` with proper frontmatter and cross-references.
- Updated `index.md` with the new analysis page.

## [2026-05-03] ingest | Ingested Cloud Architecture Diagram
- Saved original architecture diagram PNG to `raw/assets/airqoon-cloud-architecture-diagram.png`.
- Created `wiki/sources/airqoon-cloud-architecture.md` — comprehensive architecture document with:
  - Mermaid diagram mapping all components and data flows
  - Component inventory tables (ThingsBoard, DBs, queues, Lambdas, microservices, frontends)
  - Data flow summary (ingestion → processing → statistics → map → lens → reporting → alarms)
  - Infrastructure notes (DO K8s, Traefik, SigNoz, Garage S3)
- Updated `index.md` with the new source page.

## [2026-05-03] edit | Enhanced 23 GitHub repo stub pages
- Batch-updated 23 wiki/sources pages that had "Further synthesis is required" placeholder text.
- Each page now has: Role in Architecture, Tech Stack, and cross-references to Cloud Architecture page + relevant entity pages (Airqoon Map, Airqoon Lens, Unit L).
- This connects previously orphaned graph nodes to the architecture document.
- Pages updated: base-map-consumer, base-map-external-api, base-map-tile-server, base-map-ui, basic-map-api, widget-ui, data-external-projection, sim-feeder, alarm-worker, autoreporter, aqi-calculator, lens-api, lens-ui, acme_aq_simulator, AirqoonCalibrationToolBackend, cal-app, LCF, LCM, airqoon-su-fw, airqoon-su-local-fw, airqoon-ops-engine, airqoon-brief, aq-prov-app.

## [2026-05-03] edit | Merged raw/github_repos into wiki/sources
- Deleted 23 raw markdown files from `raw/github_repos/` — their content was already absorbed into the enhanced wiki/sources pages.
- Updated frontmatter `sources` field in all 23 wiki pages to remove broken `raw/github_repos/` references.
- This eliminates duplicate orphan nodes in Obsidian graph view.

## [2026-05-04] ingest | Maden Araştırma Raporu (Demir Export)
- Ingested technical evaluation report for underground mining gas monitoring.
- Created `wiki/sources/maden-arastirma.md`.
- Updated `wiki/entities/unit-l.md` with hardware hardening (IP67) and underground mining use case.
- Created entity pages for `demir-export.md`, `alphasense.md`, and `senseair.md`.
- Created concept page `wiki/concepts/underground-mining-air-quality.md`.
- Updated `index.md`.
