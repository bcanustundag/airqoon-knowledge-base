---
title: "Analysis: AQ-Fusion Teknopark Project Proposal"
type: analysis
tags: [teknopark, aq-fusion, dispersiyon, data-fusion, saas, skdm, cbam, esrs, tsrs, csed]
created: 2026-05-01
updated: 2026-05-01
related:
  - "[[wiki/sources/teknopark-previous-projects|Teknopark Previous Projects]]"
  - "[[wiki/entities/airqoon|Airqoon]]"
  - "[[wiki/entities/airqoon-lens|Airqoon Lens]]"
  - "[[wiki/entities/unit-l|Unit L]]"
  - "[[wiki/concepts/en17660-standard|EN 17660 Standard]]"
  - "[[wiki/concepts/perimeter-monitoring|Perimeter Monitoring]]"
  - "[[wiki/concepts/competitors|Competitors]]"
  - "[[wiki/analyses/airqoon-use-cases|Airqoon Use Cases]]"
  - "[[wiki/analyses/impact-assessment|Impact Assessment]]"
---

# KAVRAMSAL TASARIM VE ÖN ANALİZ ÇALIŞMASI

## PROJE ADI
**Sensör Ağı Verisi ve Dispersiyon Modelleme Füzyonu ile Gerçek Zamanlı Hava Kalitesi Tahmin ve Kaynak Belirleme Platformunun Geliştirilmesi (AQ-Fusion)**

---

## 1. Projenin Ana Amacı, Hedefleri ve Kapsamı

### 1.1 Problem Tanımı

Hava kalitesi yönetiminde iki temel yaklaşım ayrı ayrı kullanılmaktadır:

1. **Ölçüm ağları** (sensörler, referans istasyonlar): Gerçek zamanlı veri sağlar, ancak yalnızca sensör bulunan noktalarda. Sensörsüz bölgeler "karanlık" kalır.
2. **Dispersiyon modelleri** (AERMOD, CALPUFF, Gaussian plume): Emisyon kaynaklarından kirliliğin yayılımını simüle eder, ancak statik girdi verileriyle çalışır, gerçek zamanlı değildir ve modelleme hatası yüksektir.

**Hiçbir mevcut ticari ürün bu iki yaklaşımı gerçek zamanlı olarak birleştirip müşteriye hazır, eyleme dönüştürülebilir bir platform olarak sunmamaktadır.** Mevcut çözümler ya sadece ölçüm (Oizom, Kunak, Bettair), ya sadece modelleme (BREEZE AERMOD, ADMS), ya da ikisinin akademik düzeyde entegrasyonudur (Envirosuite — yüksek maliyet, sınırlı erişim).

Türkiye'de SKHKKY (Sanayi Kaynaklı Hava Kirliliği Kontrol Yönetmeliği) kapsamında AERMOD kullanımı zorunlu olmakla birlikte, bu modeller statik ÇED raporları için kullanılmakta, **gerçek zamanlı operasyonel karar destek sistemi** olarak kullanılmamaktadır.

### 1.2 Projenin Amacı

Airqoon'un mevcut sensör ağı verilerini, meteorolojik veriler, uydu verileri (CAMS/Copernicus), trafik verileri ve emisyon envanterleri ile füzyon ederek:

- **Sensörsüz bölgelerde** yüksek çözünürlüklü (100m×100m) hava kalitesi haritaları üreten,
- **Kirletici kaynaklarını** (endüstriyel tesis, trafik, ısınma) otomatik olarak belirleyen ve katkı paylarını hesaplayan,
- **İleriye dönük tahmin** (24-72 saat) yaparak erken uyarı veren,
- Belediyeler ve endüstriyel tesislere **satılabilir bir SaaS ürün** olarak sunulan

bir **hibrit veri füzyonu ve dispersiyon modelleme platformu** geliştirmektir.

### 1.3 Hedefler

| #   | Hedef                                   | Ölçülebilir Başarı Kriteri                                                                                                            |
| --- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | Hibrit veri füzyon motoru               | Sensör + CAMS + meteo verilerini birleştiren Optimal Interpolation (OI) algoritması; sensörsüz noktalarda RMSE < %30 (referansa göre) |
| H2  | Gerçek zamanlı dispersiyon modeli       | Gaussian puff/plume tabanlı, rüzgâr alanı ile çalışan, 100m çözünürlükte yayılım haritası; güncelleme sıklığı ≤ 15 dk                 |
| H3  | Kaynak belirleme (source apportionment) | Rüzgâr yönü + konsantrasyon gradyeni analiziyle emisyon kaynağının konumunu ±200m doğrulukla tespit                                   |
| H4  | Tahmin modülü (24-72 saat)              | PM2.5 ve NO₂ için 24 saatlik tahminde R² ≥ 0.80, MAE < 8 µg/m³                                                                        |
| H5  | Müşteriye hazır SaaS platformu          | Airqoon Lens'e entegre, API + interaktif harita + otomatik rapor                                                                      |
| H6  | Endüstriyel kaynak katkı raporu         | SKHKKY uyumlu Hava Kirletici Katkı Değeri (HKKD) hesaplama ve raporlama                                                               |

### 1.4 Kapsam — İş Paketleri

**İP-1: Veri Füzyon Motoru (Ay 1-7)**
- Airqoon sensör ağı + CAMS/Copernicus uydu verisi + MGM meteoroloji verisi + referans istasyon verisi entegrasyonu
- Optimal Interpolation ve kriging algoritmaları ile sensörsüz bölgelerde ara-değer (interpolation) üretimi
- Çoklu veri kaynağı kalite değerlendirmesi ve ağırlıklandırma

**İP-2: Dispersiyon Modelleme Motoru (Ay 4-12)**
- Gaussian puff modeli ile rüzgâr alanına dayalı kirletici yayılım simülasyonu
- CFD (Computational Fluid Dynamics) basitleştirilmiş kentsel kanyon modeli — bina/arazi etkisi
- Ters modelleme (inverse modeling) ile kaynak belirleme — "kirlilik nereden geliyor?"
- Emisyon envanteri entegrasyonu (trafik, endüstri, ısınma kaynakları)

**İP-3: Tahmin ve Karar Destek Modülü (Ay 8-15)**
- LSTM/Transformer tabanlı 24-72 saat hava kalitesi tahmini
- Meteorolojik tahmin verileri ile dispersiyon modeli birleştirmesi
- Erken uyarı sistemi: "Yarın batı rüzgârı ile X tesisinden kaynaklı PM10 artışı bekleniyor"
- Otomatik SKHKKY uyumlu HKKD rapor üreteci

**İP-4: Platform Entegrasyonu ve Pilot Uygulama (Ay 12-18)**
- Airqoon Lens platformuna entegrasyon (harita katmanı, rapor modülü, API)
- Pilot uygulamalar:
  - **Kent ölçeği:** Bursa Büyükşehir (şehir geneli ağ) ve/veya Denizli Büyükşehir
  - **Endüstriyel:** Akçansa (BCM/CNK bölgeleri), Oyak Çimento, Çimsa veya Çimentaş tesisleri
  - **OSB:** İnegöl OSB (mevcut sensör ağı ve CFD çalışması verileri mevcut)
- Müşteri geri bildirimi ve ürün iterasyonu

---

## 2. Sektörde Mevcut Ürünler ile Kıyaslama

### 2.1 Ürün Kıyaslama Tablosu

| Özellik | Airqoon (Mevcut) | BREEZE AERMOD | Envirosuite | Clarity Movement | **AQ-Fusion (Hedef)** |
|---------|-----------------|---------------|-------------|-----------------|----------------------|
| **Yaklaşım** | Sensör ağı + IDW heatmap | Dispersiyon modelleme | Sensör + model hibrit | Sensör ağı + analitik | **Sensör + dispersiyon + uydu füzyonu** |
| **Gerçek zamanlı** | ✅ (sensör verisi) | ❌ (statik simülasyon) | ✅ (sınırlı) | ✅ (sensör verisi) | **✅ (tam hibrit)** |
| **Sensörsüz bölge tahmini** | ❌ (yalnızca IDW) | ✅ (model tabanlı) | ✅ | ❌ | **✅ (OI + dispersiyon)** |
| **Kaynak belirleme** | Basit rüzgâr gülü | ✅ (baca bazlı) | ✅ | ❌ | **✅ (ters modelleme + sensor)** |
| **24-72 saat tahmin** | ❌ | ❌ | Sınırlı | ❌ | **✅ (LSTM + meteo)** |
| **SKHKKY / HKKD raporu** | ❌ | ✅ (manuel) | ❌ | ❌ | **✅ (otomatik)** |
| **Donanım gereksinimi** | Airqoon Unit L/M | Yok (yazılım) | 3. parti sensör | Clarity Node | **Airqoon Unit L/M** |
| **Fiyat modeli** | Donanım + SaaS | Lisans ($10K-50K+/yıl) | Enterprise ($50K+/yıl) | Donanım + SaaS | **Donanım + SaaS (katmanlı)** |
| **Türkiye pazarı** | ✅ (aktif) | İthal yazılım | ❌ (Türkiye yok) | ❌ (Türkiye yok) | **✅ (yerli)** |

### 2.2 Yenilikçi Yönler

1. **Hibrit veri füzyonu — sektörde boşluk:** Mevcut piyasada düşük maliyetli sensör verisi + uydu verisi + dispersiyon modeli birleştiren, müşteriye hazır SaaS ürün bulunmamaktadır. AERMOD statik raporlar üretir; sensör platformları yalnızca ölçüm noktalarında veri sunar. AQ-Fusion bu ikisini birleştirir.

2. **Ters dispersiyon modelleme ile kaynak tespiti:** Rüzgâr alanı + sensör gradyenleri kullanılarak "bu kirlilik neden ve nereden kaynaklanıyor?" sorusuna gerçek zamanlı yanıt — endüstriyel tesisler için kritik rekabet avantajı.

3. **Mevzuat uyumlu otomatik raporlama:** SKHKKY kapsamında HKKD hesabının otomatik üretimi — Türkiye'de bu hizmeti sunan dijital platform yok. Çevre danışmanlık firmaları bunu yılda 1 kez manuel olarak yapmaktadır.

4. **Modüler donanım + yazılım ekosistemi:** Airqoon'un mevcut Unit L/M donanımı + Lens platformu üzerine inşa edilecek — rakipler ya sadece yazılım (AERMOD) ya sadece donanım (Clarity) sunmaktadır.

5. **Türkiye'de yerli üretim avantajı:** Kamu ihalelerinde %15 fiyat avantajı; ithal AERMOD lisanslarına alternatif yerli çözüm.

6. **ÇSED / SKDM / ESRS uyumluluk altyapısı:** Platform, EBRD/IFC fonlu projelerin gerektirdiği Çevresel ve Sosyal Etki Değerlendirmesi (ÇSED) için temel veri kaynağı olarak konumlanacaktır. AB SKDM (CBAM) kapsamında çimento ve demir-çelik sektörlerinin gömülü emisyon raporlaması, ve ESRS E2 (Kirlilik) / TSRS kapsamındaki Scope 3 emisyon beyanları için sürekli, doğrulanabilir çevresel veri sağlayacaktır.

### 2.3 Ulusal ve Uluslararası Bağlam

**Ulusal:**
- Türkiye'de dispersiyon modelleme tamamen ithal yazılımlara (AERMOD, CALPUFF) bağımlıdır. Bu yazılımlar statik ÇED raporları için kullanılır, gerçek zamanlı operasyonel karar desteği sağlamaz.
- 81 ilin tamamında Çevre İl Müdürlükleri hava kalitesi yönetimi için bu araçlara ihtiyaç duymaktadır. 300+ OSB'nin çevre yönetimi için kaynak belirleme ve katkı payı analizi kritik ihtiyaçtır.
- **SKDM (CBAM) etkisi:** 1 Ocak 2026 itibarıyla AB SKDM tam uygulamaya geçmiştir. Türkiye'nin çimento, demir-çelik ve alüminyum ihracatçıları, ürünlerindeki gömülü karbon emisyonlarını doğrulanmış verilerle raporlamak ve CBAM sertifikası satın almak zorundadır. Bu durum, tesis bazlı sürekli emisyon izleme ve kaynak belirleme ihtiyacını kritik düzeye çıkarmıştır.
- **TSRS yükümlülüğü:** KGK tarafından yayımlanan Türkiye Sürdürülebilirlik Raporlama Standartları (TSRS 1 ve TSRS 2), ISSB IFRS S1/S2 ile uyumlu olup Scope 1, 2 ve 3 sera gazı emisyon beyanlarını zorunlu kılmaktadır. İlk raporlar 2025'te sunulmuş olup kapsam her yıl genişlemektedir.

**Uluslararası:**
- AB Direktif 2024/2881 ile PM2.5 limit değeri 25'ten 10 µg/m³'e düşecek, indikatif izleme talebi katlayacaktır.
- **ESRS E2 (Kirlilik):** AB'de faaliyet gösteren veya AB müşterilerine tedarik zincirinde yer alan firmalar, ESRS E2 kapsamında hava kirletici emisyonlarını (NOx, SOx, PM) raporlamak durumundadır.
- **EBRD/IFC fonlu projeler:** Türkiye'deki büyük altyapı ve enerji projelerinin önemli bir kısmı EBRD, IFC ve Dünya Bankası fonlarıyla finanse edilmektedir. Bu kurumlar, ulusal mevzuatın ötesinde ÇSED (ESIA), Dünya Bankası EHS Kılavuzları ve DSÖ hava kalitesi değerlerine uyum aramaktadır. Sürekli çevresel izleme, ESMP (Çevresel ve Sosyal Yönetim Planı) kapsamında zorunludur.
- Global çevre yazılımı pazarı ~$4B (2025), CAGR %12.

---

## 3. Ar-Ge Sürecinde Kullanılacak Çözüm Yöntemleri ve Teknolojiler

### 3.1 Analitik / Deneysel Yöntemler

| Yöntem | Açıklama | Kullanım |
|--------|----------|----------|
| **Optimal Interpolation (OI)** | İstatistiksel veri asimilasyonu; gözlem ve arka plan (model/uydu) verisini hata kovaryans matrisleri ile birleştirir | Sensörsüz bölgelerde yüksek doğruluklu konsantrasyon haritası |
| **Gaussian Puff/Plume Modeli** | Atmosferik yayılımı rüzgâr, kararlılık sınıfı ve karışım yüksekliğine göre hesaplayan fizik tabanlı model | Endüstriyel kaynaklardan kirletici dağılımı |
| **Ters Modelleme (Inverse Dispersion)** | Sensör ağındaki konsantrasyon gradyenlerinden geriye doğru kaynağa ulaşma | Bilinmeyen/kaçak emisyon kaynaklarının tespiti |
| **Kriging / IDW** | Jeo-istatistiksel interpolasyon yöntemleri | Mekânsal hava kalitesi haritaları |
| **Ko-lokasyon Testi** | CEN/TS 17660 uyumlu sensör-referans karşılaştırması | Sensör verisi kalite güvencesi |
| **CFD (basitleştirilmiş)** | Kentsel kanyon ve bina etkilerinin rüzgâr alanı üzerindeki etkisi | Şehir içi dispersiyonda bina etkisi düzeltmesi |

### 3.2 Kullanılacak Teknolojiler

**Veri Kaynakları:**
- Airqoon sensör ağı (PM1/2.5/10, NO₂, O₃, SO₂, CO, VOC, T/RH/P, rüzgâr)
- CAMS/Copernicus Atmosphere Monitoring Service (uydu tabanlı hava kalitesi reanaliz verileri)
- Bakanlık referans istasyon verileri
- OpenStreetMap / bina yükseklik verileri (kentsel morfoloji)
- Trafik yoğunluk verileri (belediye API'leri)

**Yapay Zekâ / Makine Öğrenmesi:**
- **Algoritmalar:** LSTM, Temporal Fusion Transformer (TFT) — zaman serisi tahmini; XGBoost — kaynak sınıflandırma
- **Veri Asimilasyonu:** Ensemble Kalman Filter (EnKF), 3D-Var
- **Model sıkıştırma:** Edge inference için TensorFlow Lite (uç cihaz üzerinde basit tahmin)

**Yazılım / Platform:**
- **Kodlama:** Python (modelleme, ML, veri pipeline), TypeScript (Lens entegrasyonu), C/C++ (gömülü yazılım)
- **Veritabanı:** PostgreSQL + PostGIS (coğrafi sorgular), TimescaleDB (zaman serisi), Redis (önbellek)
- **Harita:** MapLibre GL JS, Mapbox Vector Tiles (mevcut Airqoon Map altyapısı)
- **MLOps:** MLflow (deney takibi), Airflow/Prefect (veri pipeline orkestrasyonu)
- **Hesaplama:** Fourier dönüşümleri, Kalman filtresi, Bayes optimizasyonu
- **CI/CD:** GitHub Actions, Docker, Kubernetes (mevcut altyapı)
- **Lisanslar:** Tüm kullanılan yazılımlar açık kaynak — ek lisans maliyeti yok

### 3.3 İlgili Standartlar

| Standart | Kullanım |
|----------|----------|
| SKHKKY (Sanayi Kaynaklı HK Kontrol Yönetmeliği) | HKKD hesaplama zorunluluğu |
| HKDYY (Hava Kalitesi Değerlendirme ve Yönetim Yönetmeliği) | Limit değerler ve izleme gereksinimleri |
| CEN/TS 17660-1/2 | Sensör kalibrasyon ve doğrulama |
| Directive 2024/2881 (AB) | Yeni limit değerler (PM2.5: 10 µg/m³) |
| US EPA AERMOD metodolojisi | Dispersiyon modelleme referans yaklaşımı |
| ISO 14001 | Çevre yönetim sistemi uyumu |
| SKDM / CBAM (AB Reg. 2023/956) | Gömülü karbon emisyon raporlama — çimento, demir-çelik |
| ESRS E1 (İklim) / E2 (Kirlilik) | AB sürdürülebilirlik raporlama — Scope 1/2/3 emisyon, hava kirletici |
| TSRS 1 / TSRS 2 (KGK) | Türkiye sürdürülebilirlik raporlama — sera gazı beyanları |
| IFC Performance Standard 3 | Kaynak Verimliliği ve Kirlilik Önleme — EBRD/IFC fonlu projeler |
| Dünya Bankası EHS Kılavuzları | ÇSED kapsamında hava kalitesi baz çalışması ve izleme |

---

## 4. Ekonomik Öngörüler, Gelir Modeli ve Pazar Bilgileri

### 4.1 Satılabilir Ürün Katmanları

| Ürün / Hizmet | Açıklama | Fiyat |
|---------------|----------|-------|
| **Unit L/M Donanım** | Fiziksel sensör ünitesi (mevcut) | $2,500-5,500 |
| **Lens Standard SaaS** | Gerçek zamanlı dashboard, alarm, rapor (mevcut) | $500-800/yıl |
| **🆕 Lens Fusion — Kent** | Şehir genelinde hava kalitesi haritası, sensörsüz bölge tahmini, 24-72 saat öngörü, halk sağlığı erken uyarı | $5,000-15,000/yıl (belediye lisansı) |
| **🆕 Lens Fusion — Endüstri** | Tesis çevresi dispersiyon haritası, kaynak katkı analizi, otomatik HKKD raporu, uyum takibi | $3,000-10,000/yıl (tesis lisansı) |
| **🆕 Lens Fusion — OSB** | Çok kiracılı kaynak belirleme, kiracı bazlı katkı raporu, OSB çevre KPI'ları | $8,000-20,000/yıl (OSB lisansı) |
| **🆕 Fusion API** | 3. parti entegrasyon: dispersiyon verileri, tahmin, kaynak analizi API | $2,000-5,000/yıl |

### 4.2 Gelir Modeli (3 Yıl Projeksiyon)

| Gelir Kalemi | 1. Yıl | 2. Yıl | 3. Yıl |
|-------------|--------|--------|--------|
| Donanım satışı (80-120 adet) | $300K-500K | $800K-1.4M | $2M-3.5M |
| Lens Standard SaaS | $80K-120K | $200K-350K | $400K-600K |
| **🆕 Fusion Kent lisansları** | $25K-60K | $150K-300K | $400K-750K |
| **🆕 Fusion Endüstri lisansları** | $30K-80K | $200K-400K | $500K-1M |
| **🆕 Fusion OSB lisansları** | $15K-40K | $80K-200K | $250K-500K |
| **🆕 Fusion API** | $5K-10K | $30K-60K | $80K-150K |
| **TOPLAM** | **$455K-810K** | **$1.46M-2.71M** | **$3.63M-6.5M** |

> [!IMPORTANT]
> **Yazılım gelirinin toplama oranı:** 1. Yıl ~%17 → 3. Yıl ~%40. Donanım satışından yazılım ağırlıklı gelir modeline geçiş — sürdürülebilir tekrarlayan gelir (ARR).

### 4.3 Hedef Pazar ve Müşteri Sayıları

**Birincil Pazarlar:**
- **Türkiye — Belediyeler:** 30 büyükşehir belediyesi hedef. Mevcut müşteriler: Bursa Büyükşehir (şehir geneli), Denizli, Kadıköy, Mudanya, İnegöl, Avcılar belediyeleri.
- **Türkiye — Çimento Sektörü:** Akçansa (mevcut müşteri — BCM/CNK), Oyak Çimento, Çimsa, Çimentaş, TÜPRAŞ ve diğer ağır sanayi tesisleri. Sektörde ~50+ büyük tesis SKHKKY kapsamında HKKD raporu ihtiyacı duymaktadır.
- **Türkiye — OSB'ler:** 300+ OSB'nin çevre yönetimi için kaynak belirleme ve kiracı bazlı katkı analizi kritik ihtiyaçtır.
- **AB:** Direktif 2024/2881 ile genişleyen indikatif izleme pazarı (Doğu Avrupa, Balkanlar)

**İkincil Pazarlar:** Orta Doğu (Azerbaycan, Irak, S. Arabistan), Kuzey Afrika (Mısır), Avustralya

| Segment | 1. Yıl | 2. Yıl | 3. Yıl |
|---------|--------|--------|--------|
| Belediyeler (Fusion Kent) | 3-5 | 10-20 | 25-50 |
| Endüstriyel Tesisler (Fusion Endüstri) | 8-12 | 25-40 | 50-80 |
| OSB'ler (Fusion OSB) | 2-4 | 8-15 | 20-35 |
| API müşterileri | 2-3 | 8-12 | 15-25 |
| **Toplam Fusion müşteri** | **15-24** | **51-87** | **110-190** |

### 4.4 Rekabet Avantajı Özeti

1. **Hibrit yaklaşım:** Tek platformda sensör + model + uydu — rakipler bunu ayrı ayrı sunar
2. **Fiyat:** Fusion Kent $5K-15K/yıl vs Envirosuite $50K+/yıl — 70-90% maliyet avantajı
3. **Yerli üretim:** Kamu ihalelerinde %15 fiyat avantajı; AERMOD lisansına alternatif
4. **Donanım + yazılım ekosistemi:** Müşteri kilitlenmesi (lock-in) — donanım alan müşteri yazılım SaaS'ına geçer
5. **Mevcut müşteri tabanı:** 20+ aktif müşteri, 200+ saha noktası — çimento sektöründe (Akçansa, Oyak Çimento, Çimsa, Çimentaş) ve belediyelerde (Bursa şehir geneli, Denizli, Kadıköy, İnegöl) hemen pilot uygulama yapılabilir
6. **SKHKKY uyumu:** Otomatik HKKD raporu — Türkiye'de dijital olarak sunan ilk platform

### 4.5 Regülasyon Kaynaklı Talep Sürücüleri

| Regülasyon | Etkilenen Sektör | AQ-Fusion Değer Önerisi |
|-----------|-----------------|------------------------|
| **SKDM / CBAM** | Çimento, demir-çelik, alüminyum ihracatçıları | Tesis çevresinde sürekli emisyon izleme ve kaynak katkı raporları — doğrulanabilir gömülü emisyon verisi |
| **ÇSED / ESIA (EBRD/IFC)** | Enerji, altyapı, maden projeleri | Baz çalışması (baseline), inşaat/işletme dönemi izleme, ESMP kapsamında sürekli veri — uluslararası fon şartlarına uyum |
| **ESRS E1/E2** | AB'ye ihracat yapan veya AB tedarik zincirindeki firmalar | Scope 3 emisyon verisi (downstream), hava kirletici beyanları (ESRS E2), doğrulanabilir çevresel performans verisi |
| **TSRS 1/2** | BİST şirketleri, büyük işletmeler (genişleyen kapsam) | Sera gazı emisyon beyanları (Scope 1/2/3), çevresel risk ve fırsat analizi, iklim senaryosu verisi |
| **SKHKKY** | Tüm endüstriyel tesisler | Otomatik HKKD raporu, dispersiyon modelleme, kaynak belirleme |
| **HKDYY** | Belediyeler, Çevre İl Müdürlükleri | Kent geneli hava kalitesi haritası, limit aşım takibi, erken uyarı |

> [!IMPORTANT]
> **Neden şimdi?** SKDM'nin 1 Ocak 2026'da kesin rejime geçmesi, TSRS raporlamanın kapsamının genişlemesi ve EBRD/IFC'nin Türkiye'deki yeşil dönüşüm fonlamasını artırması, sürekli ve doğrulanabilir çevresel izleme verisine olan talebi tarihsel olarak en yüksek seviyeye çıkarmıştır. AQ-Fusion, bu regülasyon dalgasına tam zamanında yanıt veren bir ürün olarak konumlanmaktadır.

---

> [!NOTE]
> **Önceki Projelerle Süreklilik**
>
> - **070382 — Akıllı Uç Bilişim:** Edge computing altyapısı → Bu projede uç cihazda basit tahmin modeli
> - **076102 — Analiz ve Görselleştirme:** Lens platformu → Bu projede Fusion harita katmanları ve raporlar
> - **085513 — Floresans Sensör:** Sensör Ar-Ge uzmanlığı → Bu projede sensör veri kalite değerlendirmesi
> - **093950 — 4Blocks:** Modüler donanım → Bu projede anemometre ve çevre sensör modülleri
>
> **Proje süresi:** 18 ay | **Ekip:** 4-6 Ar-Ge mühendisi (ML/veri, gömülü yazılım, bulut/platform, atmosfer modelleme)
> **Pilot lokasyonlar:**
> - *Kent:* Bursa Büyükşehir (şehir geneli ağ), Denizli Büyükşehir
> - *Endüstri:* Akçansa (BCM/CNK), Oyak Çimento, Çimsa, Çimentaş
> - *OSB:* İnegöl OSB (mevcut sensör ağı + CFD çalışması verileri)
> **Sertifikalar:** ISO 9001:2015 ve ISO 27001:2022 (İnovathink A.Ş.)
