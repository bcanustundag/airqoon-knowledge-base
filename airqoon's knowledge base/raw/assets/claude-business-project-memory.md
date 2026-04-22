Purpose & context
Barış Can Üstündağ is Co-founder & CEO of Airqoon (operating under İNNOVATHİNK MÜHENDİSLİK SANAYİ VE TİCARET A.Ş.), an Istanbul-based full-stack environmental monitoring company. Airqoon manufactures IoT-based air quality and noise monitoring hardware (Unit L outdoor, Unit M indoor), operates the Airqoon Lens cloud analytics platform with GenAI-powered reporting, and provides calibration services. Deployments span 30+ cities across 5+ countries in the EMEA region, serving municipalities, industrial clients (cement, mining, oil & gas, energy), and research institutions.
Core business objectives: expand into European markets (France prioritized), win public tenders, grow industrial fenceline monitoring, pursue EU R&D funding (MELTEM TÜBİTAK-GSRI 2+2 bilateral project with Boğaziçi University, University of Crete/GETMAP active), and establish Airqoon as the authoritative environmental intelligence source in Turkey (via Airqoon Brief: brief.airqoon.com).
Company is based at Marmara Üniversitesi Teknoloji Geliştirme Bölgesi, Maltepe, Istanbul. Tax number: 4780562315. Has completed İBB Tech Istanbul Growth program. Holds Teknopark status (zero corporate tax advantage). AWS account: 609451622444. Alibaba account: bariscan@inovatink.com.
Key people & relationships

Internal team: Orhun Hazneci (technical/operations), Gülkan Güner (support/service), Cem Çıkrıkçıoğlu (Megaworks import partner)
Academic partners: Prof. Dr. Ülkü Alver Şahin (Istanbul University-Cerrahpaşa, close collaborator), Prof. Fatma Öztürk (Boğaziçi/MELTEM), Assoc. Prof. Burçak Kaynak Tezel (İTÜ), Prof. Dr. Kadir Alp (ITU emeritus), University of Crete/GETMAP team (Nikos)
Suppliers: Alphasense/AMETEK (Steve = order processing, Victoria = accounts, Andy Dickinson = account manager), Cubic Sensor (Allan Yang, TDLAS CH4), AethLabs/Ivan (MA350 black carbon), Check Up S.r.l. (Francesco Tacchini), Lorenzo (European supplier), Liang (noise sensors, Alibaba)
Partners/BD contacts: Amir Shariff at BCN Smart Tech (Malaysia), Theodora Sykara Lekaki at mageba Group, Mahmoud Hassan at DOME (UAE), Kamalraj at Niraltek (Qatar)
Municipal clients: Bursa Büyükşehir Belediyesi, İnegöl, Kadıköy, Mudanya, Denizli, Avcılar municipalities
Industrial clients: Akçansa, Oyak Çimento, Çimsa, Çimentaş, TÜPRAŞ, Enerjisa Üretim
Regulatory contacts: Martine Van Poppel (VITO), Nicole Perschau (VDI/DIN, CEN/TC 264 Secretariat), Caroline van Hoek (NEN)

Current state
Active priorities:

CEN/TS 17660-1 accreditation gap: No ISO/IEC 17025-accredited lab exists in Europe to certify under this standard. Martine Van Poppel (VITO) has confirmed this in writing and committed to raising a formal WG 42 statement. Baris is building a documentation trail for use in tenders. VITO is running a DG ENV project with accreditation to follow, but cannot conduct tests in Q2–Q3 currently.
Airqoon Unit L Certificate of Performance: Draft v4 (Airqoon_Unit_L_Certificate_of_Performance_v4.docx) exists with Class 1 certification under CEN/TS 17660-1 (Step 1 + Step 4 protocol). Placeholders remain for uncertainty percentages, serial numbers, firmware/algorithm versions, slope correction factors, test dates, reference instrument details, and sensor shelf life values.
MELTEM presentation: 18-slide PowerPoint deck at /mnt/user-data/outputs/MELTEM_Presentation.pptx with source script at /home/claude/meltem.js.
Airqoon Brief: Live at brief.airqoon.com, JSON API at /v1/brief, daily 06:00 UTC publication for all 81 Turkish provinces. robots.txt and llms.txt configured to allow LLM crawlers. LLM discoverability strategy in progress.
Megaworks account transition: Orders being migrated from Innovathink account to Megaworks as import entity for Alphasense (order ref Q8474-KAJ). First orders under Megaworks will be proforma terms.
EBRD/Çimsa Mersin tender: Baris intends to lead as Project Director in a consortium with academic partners. Direct Çimsa contact exists.
Azerbaijan market entry: Research and 5-slide opportunity deck completed; Ministry-level contacts exist; strategy defined around post-COP29 momentum and Green Climate Fund project.
n8n sales automation: Apollo Lead Capture & Qualification workflow and Sales Follow-up Reminder System built for Notion pipeline; uses Ollama qwen3:32b, marketing@airqoon.com inbound, daily 9 AM follow-up report to bariscan@airqoon.com.

On the horizon

SCEWC (Smart City Expo World Congress) speaker application deadline: April 16 — flagged as urgent
ASIC 2026 conference: Abstract accepted for platform presentation (spatiotemporal PM assessment in industrial cities); virtual presentation being negotiated with Clare/Jenna due to visa constraints
Pollutec Lyon: Biennial, must-attend; planning underway
ChangeNOW Paris (March 30–April 1 at Grand Palais): Attended; networking in progress with RESPOND Accelerator, Carbon13, Urban Impact, Gentian, Choose Paris Region contacts
CEM Asia: Co-exhibit approach with Amir/BCN Smart Tech being considered
EU consortium proposals: MELTEM full proposal deadline April 16, 2026 if Stage 1 successful; other Horizon Europe/LIFE/Interreg opportunities being tracked
France market entry: Regulatory tailwinds from EU Air Quality Directive 2024/2881 transposition; cleantech clusters identified
N₂O ambient monitoring: Evaluating Aeris Sensors (OA-ICOS technology, contact David Chauvel) and Senseair K96 (NDIR — verify N₂O support before advancing)
CH4/TDLAS: Axetris sensor (~4,700–5,000 CHF/unit) under evaluation; Cubic Gasboard 2502 in procurement
Noise sensor calibration compliance: Rika encapsulated design is dealbreaker (no ISO 17025 calibration possible); CESVA TA150 used for Type 1 (IEC 61672-1 Class 1) applications
Pollen monitoring: Multiple municipalities have requested this; Pollen Sense partnership conversation being re-engaged
Investment round: Pre-seed/bootstrapped; ₺9M ($200k) new investment under discussion; cap table involves Sinan (10% Innovathink angel), Deniz and Orkun (8 Bitiz, working capital support). Teknopark structure recommended to preserve tax advantage.

Key learnings & principles

CEN/TS 17660-1 has three performance classes (not two); the standard's Notes section is mandatory under specific clauses, not optional
SPS30 (MCERTS-certified) is the first mass-production PM sensor with MCERTS, but PM10 performance is weak in independent testing (R² 0.10–0.25) because PM10 is derived from PM2.5 — must manage through reference station calibration
Airqoon's value proposition is ambient/immissions monitoring, not stack emissions (SEÖS/SAİS) or carbon accounting — positioning must reflect this distinction clearly
Teknopark tax advantage is significantly more valuable than structural simplicity; staying in Innovathink entity is strategically superior to NewCo
NDIR sensors (e.g., Senseair K96) may have limited sensitivity to N₂O at ambient ppb levels — verify before advancing
Third-party sensor integration (Milesight, Hongyuv, Modbus/MQTT devices) not currently supported in Airqoon Lens — treat as future upsell, not current commitment
DigitalOcean Frankfurt/Amsterdam data storage may conflict with Turkish public sector data residency requirements (Cumhurbaşkanlığı Dijital Dönüşüm Ofisi) — flag proactively with public clients
ISO/IEC 27001 certification: Referenced in tender submissions and client documentation
Procurement collusion assumption should not be made without clear evidence — multiple independent quotes is standard practice
Sensor pricing is in USD; invoicing in TRL at Airqoon's currency risk is an Akçansa-specific concession and a negotiating point

Approach & patterns
Communication style: Consistently prefers short, direct, warm-but-not-pushy emails. Explicitly corrects overly formal, verbose, or AI-sounding drafts. Signs off with first name only ("Barış"). Uses Calendly (https://calendly.com/airqoon/45min) for scheduling. For known contacts: collegial and easy-toned. For cold outreach: traction-first, no explicit fundraising signals. For Turkish-language official docs: plain Turkish, minimal English jargon.
Sales & BD patterns: Relationship-first positioning. Leads with Airqoon's traction and capabilities rather than asks. Uses EMEA framing rather than Turkey-specific when pitching internationally. Consultative approach for industrial prospects (understand their problems before pitching). Apollo.io cold email campaigns with "Bulut from Marketing" persona for outbound. Notion-based CRM pipeline with n8n automation.
Tender/proposal approach: Builds documentation trails strategically. Understands clause-level detail of Turkish procurement law (4734). Knows how to frame technical specifications to favor Airqoon's capabilities without naming the company explicitly. Domestic manufacturer certificate provides 15% price advantage in Turkish public tenders.
Pricing: USD-denominated for international; TRL for Turkish clients with currency risk absorbed. T1 operations service ~$70/unit/year baseline. Rental model common in industrial sector (device payback ~18 months, cost recovery ~5 months). Commission structure for partners: 20–25% revenue for sales partners; tiered approach recommended for rental deals.
Technical documentation: Prefers clean certificate-style documents over marketing material. References competitor documents (e.g., Kunak AIR Pro MCERTS cert) as benchmarks for tone and structure.
Tools & resources

Platforms: Airqoon Lens (SaaS, Kubernetes on AWS + DigitalOcean), GitHub Actions CI/CD, GitHub Container Registry, SigNoz (self-hosted centralized logs), Dependabot (activated for vulnerability scanning)
Connectivity: MQTT over TLS port 8883 (bidirectional — telemetry, config updates, RPC), cellular 4G/NB-IoT
Sales automation: Apollo.io, n8n, Notion CRM, Ollama qwen3:32b
Document tools: LaTeX (proposals, quotations, T&Cs), python-pptx (slide generation), pptxgenjs, LibreOffice conversion, Word (.docx) for certificates
Key sensors: Alphasense electrochemical (NO2B43F, O3A431, CO-B4, SO2-B4), Sensirion SPS30 (PM), Sensirion SCD4x (CO2), AethLabs MA350 (black carbon), Cubic Gasboard 2502 (CH4/TDLAS), CESVA TA150 (Class 1 noise)
Standards in use: CEN/TS 17660-1:2021 (gas, Class 1), CEN/TS 17660-2 (PM), IEC 61672-1 Class 1 (noise), ISO/IEC 27001, ISO 17025 (calibration reference)
Regulatory frameworks tracked: EU Air Quality Directive 2024/2881, Turkish Çevresel Gürültü Yönetmeliği, Turkish Industrial Emissions Management Regulation, BİG (Bilgi ve İletişim Güvenliği Rehberi), CBAM, EU IED updates
Banking/logistics: QNB Bank (talimat@talimat.qnb.com.tr), DHL/UPS accounts for imports, Revolving Confirmed L/C as preferred payment instrument with suppliers; BACS not accessible (no UK bank account)
Podcast/content: "Hava Sohbetleri" YouTube series (https://www.youtube.com/playlist?list=PLDIc3QZJH-a7fly1rBL5GEkCNldEhdMkM); Airqoon Brief for Turkey air quality intelligence