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
