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
