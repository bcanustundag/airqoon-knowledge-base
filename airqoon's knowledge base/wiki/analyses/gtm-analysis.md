---
title: "Analysis: Airqoon Go-to-Market"
type: analysis
tags: [analysis, gtm, strategy, sales, marketing, pricing, channels, competitive]
created: 2026-05-08
updated: 2026-05-08
sources: [product-page.md, customer-success-scenarios.md, distributor-partnership-search.md, airqoon-vs-oizom-comparison.md, sales-funnel.md, satis-arastirma.md, outbound-marketing-linkedin-templates.md, marketing-content-calendar.md, partner-onboarding.md, target-sectors.md, claude-business-project-memory.md, claude-conv-helper-project-memory.md, 02-2026-Airqoon_Sunum.pdf, potential-lead-companies.md, sales-pipeline-active-leads.md, partnerships-crm.md]
---

# Analysis: Airqoon Go-to-Market

> Full audit of the vault's GTM-relevant content — strategy, channels, messaging, competitive positioning, pricing, partnerships, and content engine. Based on 20+ wiki/source/raw files.

---

## GTM Maturity Scorecard

| Dimension | Maturity | Notes |
|-----------|----------|-------|
| **Value Proposition** | 🟢 Strong | Clear, differentiated, well-documented across multiple pages |
| **ICP / Personas** | 🟡 Defined but shallow | 5 personas exist; no firmographic data, no buyer journey mapping |
| **Pricing & Packaging** | 🟡 Functional | USD pricing documented; no tiered bundles for EU market |
| **Sales Process** | 🔴 Ad-hoc | No documented sales playbook, qualification framework, or win/loss tracking |
| **Channel Strategy** | 🟡 Early | 13+ distributor contacts, but no formal partner program or enablement |
| **Content & Demand Gen** | 🟡 Active but scattered | 141-entry content calendar, "Hava Sohbetleri" podcast, blog — but mostly archived |
| **Competitive Intelligence** | 🟢 Strong | Deep analyses exist (vs. [[wiki/entities/oizom|Oizom]], [[wiki/entities/bettair|Bettair]], [[wiki/entities/kunak-technologies|Kunak]]) |
| **International Expansion** | 🟡 Exploratory | Contacts in 6+ countries; no country-specific GTM plans |

---

## 1. Value Proposition — What's Working

[[wiki/entities/airqoon|Airqoon]]'s value proposition is the **most thoroughly documented element** in the vault. It appears consistently across [[wiki/overview|overview]], [[wiki/entities/airqoon|airqoon entity]], [[wiki/sources/product-page|product-page]], and [[wiki/analyses/airqoon-use-cases|use cases analysis]]:

- **Cost leadership** → 40–60% cheaper ($2,500–5,500 vs. >$8,000)
- **Operational simplicity** → 5-minute deployment, modular cartridges, 14-day solar autonomy
- **Full-stack intelligence** → hardware + [[wiki/entities/airqoon-lens|Lens]] + [[wiki/entities/airqoon-map|Map]] + AI reports in one ecosystem
- **Community engagement** → public map + citizen complaints (unique differentiator)
- **Regulatory readiness** → [[wiki/concepts/en17660-standard|CEN/TS 17660]] aligned
- **Domestic manufacturer** → 15% Turkish public tender advantage (Law 4734)

**Gap:** The value prop is strong *when delivered by [[wiki/entities/baris-can-ustundag|Barış]] directly*. It hasn't been codified into repeatable sales enablement materials that a distributor or partner could deliver independently.

---

## 2. ICP & Personas — What Exists vs. What's Missing

### What's in the vault (from [[wiki/sources/customer-success-scenarios|customer-success-scenarios]])

| # | Persona | Primary Pain |
|---|---------|-------------|
| 1 | Facility Owner | Regulatory compliance, avoiding fines from Çevre İl Müdürlüğü |
| 2 | Government Regulator | Expanding monitoring network coverage |
| 3 | Municipality (Belediye) | Public health, smart city PR, citizen trust |
| 4 | OIZ Management | Source identification, tenant accountability |
| 5 | NGO / Research | Environmental impact projects, publishable data |

### What's missing

- **No firmographic profiles** — What size municipality buys? Which OIZs? What revenue thresholds for industrial buyers?
- **No buyer journey maps** — Who are the decision-makers vs. influencers? What's the typical sales cycle length?
- **No persona-to-content mapping** — Which content pieces serve which persona at which funnel stage?
- **"Çevre Laboratuvarları" persona is unresolved** — flagged with "?" in the original document
- **No international personas** — the 5 personas are heavily Turkey-centric; EU and MENA buyers have different regulatory drivers

**Critical gap:** The vault has no record of actual deal data — no win rates, no average deal size, no sales cycle duration, no churn data. Without these, GTM optimization is guesswork.

---

## 3. Sales Process & Funnel

### What exists

The `sales-funnel.md` (raw Notion export) documents a **3-stage funnel**:

**Top of Funnel:** Social Media, Blog, airqoon.com
**Middle of Funnel:** Landing Pages (Cement, Cities, Mining, Oil&Gas), Forms (Formcarry, Unbounce), Lead Scoring (Apollo.io, LinkedIn, HubSpot), CRM (HubSpot, Apollo.io)
**Bottom of Funnel:** Smart CTAs (undefined — "?"), Mailing (undefined), Workflows (undefined — "?")

**The bottom of the funnel is undefined.** Both "Smart CTAs" and "Workflows" are marked with "?" — meaning there's no documented process for converting qualified leads into deals.

### What's actually happening (from [[wiki/sources/claude-business-memory|claude-business-memory]])

- **Apollo.io + n8n + Notion CRM + Ollama (qwen3:32b)** — automated LinkedIn outreach
- **Consultative sales style** — [[wiki/entities/baris-can-ustundag|Barış]] handles calls personally
- **Calendly** for scheduling
- No documented playbook, objection handling, or competitive battle cards

### Key finding

The sales process is essentially **founder-led sales** with automation tools bolted on. This is normal at Airqoon's stage (~$200K investment, 20+ customers), but it creates a **bottleneck**: Barış is the only person who can close deals, and partners/distributors have no enablement materials to sell independently.

---

## 4. Pricing & Packaging

### Current model (from [[wiki/entities/airqoon|airqoon entity]])

| Revenue Stream | Price | Notes |
|---------------|-------|-------|
| Hardware (Unit L/M) | $2,500–5,500 | One-time sale or rental |
| Lens Standard SaaS | $500–800/yr | Dashboard, alarms, reports |
| Lens Fusion (planned) | $3K–20K/yr | Dispersion modeling (roadmap) |
| T1 Operations Service | ~$70/unit/yr | Maintenance baseline |
| Partner Commission | 20–25% | Revenue share for distributors |

### Competitive pricing threat (from [[wiki/analyses/airqoon-vs-bettair|airqoon-vs-bettair]])

[[wiki/entities/bettair|Bettair]]'s "Zero Maintenance Cost" model is a **direct strategic threat**:

| Bettair's Approach | Airqoon's Current Approach |
|-------------------|---------------------------|
| Software bundled "free" with cartridge purchases | Software charged separately ($500–800/yr) |
| EU SIM/connectivity included | SIM cost separate |
| Single OPEX line item | Multiple line items (HW + SW + SIM + maintenance) |

**Recommendation (already in vault):** Create a "Bettair-style" bundled SKU for the EU market wrapping software + connectivity into an annual cartridge replacement fee. This has not been implemented yet.

---

## 5. Channel Strategy & Partnerships

### Distribution network (from [[wiki/sources/distributor-partnership-search|distributor-partnership-search]])

- 🇪🇬 **Egypt:** HAK Automation, ELS, Gemica Engineering
- 🇸🇦 **Saudi Arabia:** REDA Safe
- 🇦🇺 **Australia:** Alpha Scientific, Connected IoT
- 🇪🇺 **Europe:** Codico, Calectro, Atlantik Elektronik, Casella Solutions
- 🇫🇮 **Finland:** Stick Wahlstrom
- 🇲🇾 **Malaysia:** BCN Smart Tech

### Channel gaps

1. **No formal partner program** — `partner-onboarding.md` contains only an NDA template link. No partner tiers, no co-marketing agreements, no training materials.
2. **No partner enablement kit** — No battle cards, no demo scripts, no pricing calculators that a partner could use independently.
3. **Outreach strategy is minimal** — 3-touch LinkedIn sequence (intro → 4-day follow-up → 2-week content share). No multi-channel nurture.
4. **Strategic partnerships under-explored** — The `satis-arastirma.md` lists 20+ consulting/certification firms (Bureau Veritas, DNV, TÜV SÜD, Big 4) contacted via InMail, but no recorded outcomes or partnership frameworks.

**Note:** The France market is prioritized for EU entry (per [[wiki/sources/claude-business-memory|claude-business-memory]]), but there is no France-specific partner or GTM plan in the vault.

---

## 6. Content & Demand Generation

### Content assets

| Asset Type | Status | Count |
|-----------|--------|-------|
| Blog posts (TR) | Mostly archived | ~15 published, ~80+ empty shells |
| "Hava Sohbetleri" podcast | Active | 10+ episodes with prominent academics |
| LinkedIn templates | Documented | 10+ sector-specific templates |
| Airqoon Brief | Active (daily) | 81 provinces, auto-published 06:00 UTC |
| Product datasheets | Current | v2.2 (EN), v1.2 (TR) |
| Sales deck | Current | Feb 2026 municipal presentation |
| White paper | Archived | Referenced but unclear status |
| Case studies | **Missing** | Reference cities mentioned but no formal write-ups |

### Content strategy assessment

**Strengths:**
- **Airqoon Brief** is a unique content moat — daily AQ intelligence for all 81 Turkish provinces builds brand authority
- **Hava Sohbetleri** podcast with professors builds credibility in the academic/government space
- SEO keyword strategy documented in [[wiki/sources/product-page|product-page]] (Turkish keywords)

**Gaps:**
- **No English-language content strategy** — critical for EU/MENA expansion
- **No case studies** — [[wiki/entities/bursa-buyuksehir-belediyesi|Bursa]], [[wiki/entities/denizli-buyuksehir-belediyesi|Denizli]], İnegöl, Akçansa are mentioned as success stories but never written up as formal, downloadable case studies
- **Marketing Content Calendar is mostly empty** — of 141 entries, the vast majority are empty "Blog Post" placeholders with no title or deadline
- **No ROI calculator or TCO comparison tool** — competitors like [[wiki/entities/bettair|Bettair]] offer simplified OPEX narratives

---

## 7. Competitive Positioning — Strengths & Blind Spots

### The vault's competitive intelligence is excellent

Detailed analyses exist for all three primary competitors:

| vs. | Key Airqoon Advantage | Key Competitor Advantage | Strategic Risk |
|-----|----------------------|-------------------------|----------------|
| **[[wiki/entities/oizom|Oizom]]** | 40–60% cheaper, [[wiki/entities/airqoon-lens|Lens AI]], [[wiki/entities/airqoon-map|Public Map]] | Higher IP66, wider temp range, more connectivity | Low — Airqoon wins on cost and software |
| **[[wiki/entities/bettair|Bettair]]** | Lower cost, full-stack, Turkey manufacturing | Class 1 [[wiki/concepts/en17660-standard|CEN/TS 17660]] certified, bundled pricing | **High** — certification gap disqualifies Airqoon from EU tenders |
| **[[wiki/entities/kunak-technologies|Kunak]]** | Cost advantage, Map platform | Transparent co-location data, MCERTS certified | **High** — trust gap in professional/government market |

### The certification gap is the #1 GTM risk

This is flagged across multiple vault pages:

- [[wiki/overview|overview]]: "No ISO/IEC 17025-accredited lab exists in Europe to certify under CEN/TS 17660"
- [[wiki/sources/claude-business-memory|claude-business-memory]]: "Building a documentation trail (Certificate of Performance v4) for tenders"
- [[wiki/analyses/airqoon-vs-bettair|airqoon-vs-bettair]]: "Airqoon must accelerate formal certification"

Until Airqoon achieves formal [[wiki/concepts/en17660-standard|CEN/TS 17660]] certification, it is **structurally excluded** from a growing number of EU municipal tenders where [[wiki/entities/bettair|Bettair]] and [[wiki/entities/kunak-technologies|Kunak]] are pre-qualified.

---

## 8. International Expansion — State of Play

| Market | Status | Evidence in Vault |
|--------|--------|-------------------|
| 🇹🇷 Turkey | **Active, anchor market** | 30+ cities, 20+ customers, strong municipal pipeline |
| 🇦🇿 Azerbaijan | Active | Dedicated raw file (18 KB) |
| 🇮🇶 Iraq | Active | Dedicated raw file (5.8 KB) |
| 🇪🇬 Egypt | Prospecting | 3 distributor contacts made |
| 🇫🇷 France | Prioritized | **No dedicated plan in vault** |
| 🇦🇺 Australia | Prospecting | 2 distributor contacts |
| 🇸🇦 Saudi Arabia | Prospecting | 1 contact (REDA Safe) |
| 🇪🇺 EU (general) | Aspirational | Events list, MELTEM project |

**No international market has a structured GTM plan** — no localized pricing, no regulatory mapping beyond Turkey, no local reference customers, no partner SLAs.

---

## Strategic Recommendations

### 🔴 Urgent (blocks revenue growth)

1. **Create a Sales Playbook** — Document the buyer journey for the top 2 personas (Municipality + Industrial Facility), including qualification criteria (BANT/MEDDIC), objection handling, and competitive battle cards vs. [[wiki/entities/bettair|Bettair]]/[[wiki/entities/kunak-technologies|Kunak]].

2. **Build 3 Case Studies** — [[wiki/entities/bursa-buyuksehir-belediyesi|Bursa]] (municipal network), Akçansa (industrial perimeter), [[wiki/sources/pace-projesi|PACE Hatay]] (disaster response). Formal downloadable PDFs with metrics.

3. **Close the Certification Loop** — Track VITO's [[wiki/concepts/en17660-standard|CEN/TS 17660]] lab accreditation timeline. In the meantime, publish co-location performance data (R², uncertainty) to match [[wiki/entities/kunak-technologies|Kunak]]'s transparency strategy.

### 🟡 Important (unlocks scale)

4. **Design a Partner Enablement Kit** — Demo environment access, sales deck in English, pricing calculator, NDA + reseller agreement templates, technical FAQ. Without this, the 13+ distributor contacts remain cold.

5. **Create an EU Bundled SKU** — Package hardware + software + connectivity + annual cartridge replacement into a single annual fee to neutralize [[wiki/entities/bettair|Bettair]]'s pricing model.

6. **Build an English Content Engine** — Translate top 5 Turkish blog posts, create a landing page per sector (Cement, Mining, Cities, Oil & Gas), target EU/MENA keywords.

### 🟢 Strategic (builds moat)

7. **Formalize the Consulting Partnership Model** — Pick 3 firms from the 20+ explored (e.g., DNV, Bureau Veritas, one Big 4) and create a structured "monitoring-as-a-service" partnership.

8. **Launch an ROI / TCO Calculator** — Interactive web tool comparing costs vs. reference stations and vs. competitors.

9. **Track Deal Data** — Start logging: lead source, deal size, sales cycle duration, win/loss reason, competitor encountered. Foundation for all future GTM optimization.

---

## Vault Housekeeping Notes

Several GTM-relevant raw files in `raw/articles/notion/` remain **un-ingested** (no wiki source page):

| Raw File | Content | Priority |
|----------|---------|----------|
| `sales-funnel.md` | 3-stage funnel definition | High |
| `outbound-marketing-linkedin-templates.md` | 10+ sector templates | Medium |
| `marketing-content-calendar.md` | 141-entry calendar | Medium |
| `satis-arastirma.md` | Sales research — 20+ consulting firms | High |
| `target-sectors.md` | 8 target sectors listed | Medium |
| `gathering-testimonials.md` | Testimonial collection notes | Low |
| `merhaba-iletisim.md` | Contact templates | Low |
| `partnerships-crm.md` | Empty (166 bytes) | — |
| `potential-lead-companies.md` | Empty (166 bytes) | — |
| `sales-pipeline-active-leads.md` | Empty (207 bytes) | — |

**Note:** 3 Notion databases exported as empty shells (`partnerships-crm`, `potential-lead-companies`, `sales-pipeline-active-leads`). These likely contained structured data in Notion that wasn't captured by the export. Re-exporting with database rows would fill significant GTM gaps.

---

*See also: [[wiki/overview]], [[wiki/entities/airqoon|Airqoon]], [[wiki/analyses/airqoon-use-cases|Use Cases]], [[wiki/analyses/airqoon-vs-bettair|vs. Bettair]], [[wiki/concepts/competitors|Competitors]]*
