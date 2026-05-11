---
title: "Analysis: AQ-Fusion Teknopark Project Proposal"
type: analysis
tags: [teknopark, aq-fusion, dispersiyon, data-fusion, saas, skdm, cbam, esrs, tsrs, csed]
created: 2026-05-01
updated: 2026-05-11
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

Hava kalitesi yönetiminde üç temel yaklaşım ayrı ayrı kullanılmaktadır:

1. **Ölçüm ağları** (sensörler, referans istasyonlar): Gerçek zamanlı veri sağlar, ancak yalnızca sensör bulunan noktalarda. Sensörsüz bölgeler ölçüm boşluğunda kalır.
2. **Dispersiyon modelleri** (AERMOD, CALPUFF, Gaussian plume): Emisyon kaynaklarından kirliliğin yayılımını simüle eder, ancak çoğunlukla statik girdi verileriyle çalışır, operasyonel olarak gerçek zamanlı değildir ve girdi belirsizlikleri nedeniyle hata payı yüksektir.
3. **Uzaktan algılama** (uydu görüntüleme, MODIS AOD, Sentinel-5P/TROPOMI): Geniş alanı kapsar ancak görece düşük mekânsal/zamansal çözünürlükte sunulur ve yer doğrulaması olmadan güvenilirliği sınırlıdır.

Bu üç yaklaşımı — yer sensörleri, dispersiyon modelleme ve uydu uzaktan algılama — gerçek zamanlı olarak birleştiren ticari çözümler global ölçekte sınırlı sayıdadır (örneğin Envirosuite Aware kurumsal müşterilere yönelik yüksek fiyat segmentinde konumlanmıştır). Türkiye pazarında ise erişilebilir fiyatla sunulan, SKHKKY uyumlu, otomatik HKKD raporlaması yapan tam entegre bir çözüm bulunmamaktadır. Mevcut çözümler ya yalnızca ölçüm (Oizom, Kunak, Bettair, Clarity), ya yalnızca modelleme (BREEZE AERMOD, ADMS) sunmaktadır.

Türkiye'de SKHKKY (Sanayi Kaynaklı Hava Kirliliği Kontrol Yönetmeliği) kapsamında AERMOD kullanımı zorunlu olmakla birlikte, bu modeller ağırlıklı olarak statik ÇED raporları için kullanılmakta, gerçek zamanlı operasyonel karar destek sistemi olarak yaygın biçimde devreye alınmamaktadır. Uydu verileri (MODIS MAIAC AOD, Sentinel-2 optik, Sentinel-5P tropösferik kolon verileri) sistematik olarak yer ölçümleriyle füzyon edilerek yerel kullanıma sunulmamaktadır.

### 1.2 Projenin Amacı

Airqoon'un mevcut sensör ağı verilerini; ERA5/MERRA-2 meteorolojik, çoklu uydu verileri (MODIS MAIAC AOD, Sentinel-5P/TROPOMI, Sentinel-2, CAMS/Copernicus) ve emisyon envanterleri ile füzyon ederek:

- **Sensörsüz bölgelerde** yüksek çözünürlüklü (100m×100m) hava kalitesi haritaları üreten,
- **Kirletici kaynaklarını** (endüstriyel tesis, trafik, ısınma) otomatik olarak belirlemeye katkı sağlayan ve katkı paylarını hesaplayan (**EPA-PMF reseptör modelleme** + ters dispersiyon),
- **Trajektori analizi** (HYSPLIT ileri/geri) ile kirletici taşınım yollarını belirleyen,
- **Uydu arşiv analizi** ile toz/kirletici plüm alanını ve optik derinliğini zamanlı olarak takip eden (timelapse change detection),
- **Partikül boyut dağılımı** (PNSD) modelleme ve OPC yer doğrulaması ile kaba/ince fraksiyon ayrımı yapan,
- **İleriye dönük tahmin** (24-72 saat) yaparak erken uyarı veren,
- Belediyeler ve endüstriyel tesislere **satılabilir bir SaaS ürün** olarak sunulan

bir **hibrit veri füzyonu, dispersiyon modelleme ve trajektori analiz platformu** geliştirmektir.

### 1.3 Hedefler

| #   | Hedef                                   | Ölçülebilir Başarı Kriteri                                                                                                            |
| --- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| H1  | Hibrit veri füzyon motoru               | Sensör + uydu (MODIS AOD, Sentinel-5P, CAMS) + ERA5 meteo verilerini birleştiren Optimal Interpolation (OI) algoritması; sensörsüz noktalarda RMSE iyileştirmesi (basit IDW'ye göre en az %30 azalma) |
| H2  | Gerçek zamanlı dispersiyon modeli       | Gaussian puff/plume tabanlı, rüzgâr alanı ile çalışan, 100m çözünürlükte yayılım haritası; güncelleme sıklığı ≤ 1 saat                |
| H3  | Kaynak belirleme (source apportionment) | EPA-PMF reseptör modelleme + ters dispersiyon ile emisyon kaynağının konumunu şehir bloğu ölçeğinde (≈±500m) tespit; kaynak katkı paylarını istatistiksel güven aralıkları ile raporlama |
| H4  | Tahmin modülü (24-72 saat)              | PM2.5 ve NO₂ için 24 saatlik tahminde R² ≥ 0.65, MAE pilot sahalarda referans istasyonla kıyasla literatür ortalamasının altında        |
| H5  | Müşteriye hazır SaaS platformu          | Airqoon Lens'e entegre, API + interaktif harita + otomatik rapor                                                                      |
| H6  | Endüstriyel kaynak katkı raporu         | SKHKKY uyumlu Hava Kirletici Katkı Değeri (HKKD) hesaplama ve raporlama                                                               |
| H7  | Trajektori analiz modülü                | HYSPLIT ileri/geri trajektori hesabı; 72 saatlik taşınım yolu haritası; güncelleme ≤ 1 saat. CWT/PSCF kaynak bölgesi analizi geriye dönük (aylık/mevsimsel) ayrı bir analiz modülü olarak sunulur. |
| H8  | Uydu plüm takip ve değişim tespiti      | Sentinel-2/MODIS arşivinden toz plüm alanı ve AOD zaman serisi; ≥1 yıllık geriye dönük timelapse; otomatik plüm tespiti F1 ≥ 0.70 (pilot saha doğrulaması ile) |

### 1.4 Kapsam — İş Paketleri

**İP-1: Veri Füzyon Motoru ve Uydu Entegrasyonu (Ay 1-7)**
- Airqoon sensör ağı (OPC partikül sayım + PM kütle, gazlar) + referans istasyon verisi entegrasyonu
- **Uydu veri pipeline'ı:**
  - MODIS MAIAC AOD (500m, günlük):  bölgesel aerosol yükü
  - Sentinel-5P/TROPOMI (NO₂, SO₂, CO tropösferik kolon): gaz dağılımı
  - Sentinel-2 multispektral (10m, 5 günde bir): toz plüm optik tespiti ve alan hesabı
  - CAMS/Copernicus analiz: arka plan konsantrasyon tahmini
- **Meteorolojik analiz:** ERA5 (0.25°, saatlik) ve MERRA-2: rüzgâr alanı, kararlılık sınıfı, karışım yüksekliği, sıcaklık profili
- Çoklu veri kaynağı kalite değerlendirmesi ve ağırlıklandırma
- **Partikül boyut dağılımı (PNSD) modelleme:** OPC yer verisi ile ERA5 meteoroloji füzyonu; kaba (>2.5µm) vs ince (<2.5µm) fraksiyon ayrımı

**İP-2: Dispersiyon Modelleme ve Dağılım Yolu (Trajectory) Analiz Motoru (Ay 4-12)**
- **Partikül dispersiyon modelleme:** Kaba vs ince fraksiyon ayrımında farklı çökelme hızları ve taşınım mesafeleri
- **HYSPLIT dağılım yolu analizi:**
  - İleri: Belirli bir kaynaktan kirletici nereye taşınıyor? (72 saat)
  - Geri: Yüksek konsantrasyon ölçülen noktaya kirletici nereden geliyor? (72 saat)
- **Ters modelleme (inverse dispersion):** Sensör ağındaki konsantrasyon gradyenlerinden geriye doğru kaynak konumuna yaklaşma

**İP-3: Uydu Arşiv Analizi, Tahmin ve Karar Destek Modülü (Ay 8-15)**
- **Uydu zaman serisi plüm takibi (Timelapse Change Detection):**
  - Sentinel-2 + MODIS arşivinden ≥3 yıllık geriye dönük toz/kirletici plüm alanı ve AOD zaman serisi
  - Otomatik plüm tespiti (ML tabanlı segmentasyon) ve alan/yoğunluk trendleri
- **ML tabanlı çok kaynaklı füzyon modeli:**
  - Girdi: uydu görüntüleme, yer sensör verileri, ERA5 meteoroloji, proses/trafik verileri
  - Çıktı: kaynak atıfı (source attribution) ve katkı payları
  - Algoritmalar: LSTM, Temporal Fusion Transformer (TFT), XGBoost
- LSTM/Transformer tabanlı 24-72 saat hava kalitesi tahmini
- Meteorolojik tahmin verileri ile dispersiyon modeli birleştirmesi
- Erken uyarı sistemi: "Yarın batı rüzgârı ile X tesisinden kaynaklı PM10 artışı bekleniyor"
- Otomatik SKHKKY uyumlu HKKD rapor üreteci

**İP-4: Platform Entegrasyonu ve Pilot Uygulama (Ay 12-18)**
- Airqoon Lens platformuna entegrasyon (harita katmanı, rapor modülü, API)
- Yeni Lens katmanları: dispersiyon haritası, trajektori haritası, uydu plüm timelapse, kaynak katkı pie-chart, PNSD dağılım grafiği
- Pilot uygulamalar:
  - **Kent ölçeği:** Bursa Büyükşehir (şehir geneli ağ) ve/veya Denizli Büyükşehir
  - **Endüstri:** Çimento ve ağır sanayi tesisleri (mevcut müşteri ilişkileri çerçevesinde)
  - **OSB:** İnegöl OSB (mevcut sensör ağı ve CFD çalışması verileri mevcut)
  - **Maden/Taşocağı:** Toz kaynağı haritalama ve hassas alıcı (yerleşim) etki analizi
- Müşteri geri bildirimi ve ürün iterasyonu

---

## 2. Sektörde Mevcut Ürünler ile Kıyaslama

### 2.1 Ürün Kıyaslama Tablosu

| Özellik | Airqoon (Mevcut) | BREEZE AERMOD | Envirosuite | Clarity Movement | **AQ-Fusion (Hedef)** |
|---------|-----------------|---------------|-------------|-----------------|----------------------|
| **Yaklaşım** | Sensör ağı + IDW heatmap | Dispersiyon modelleme | Sensör + model hibrit | Sensör ağı + analitik | **Sensör + dispersiyon + uydu + trajektori füzyonu** |
| **Gerçek zamanlı** | ✅ (sensör verisi) | ❌ (statik simülasyon) | ✅ (sınırlı) | ✅ (sensör verisi) | **✅ (tam hibrit)** |
| **Sensörsüz bölge tahmini** | ❌ (yalnızca IDW) | ✅ (model tabanlı) | ✅ | ❌ | **✅ (OI + dispersiyon + uydu)** |
| **Kaynak belirleme** | Basit rüzgâr gülü | ✅ (baca bazlı) | ✅ | ❌ | **✅ (ters modelleme + EPA-PMF + sensör)** |
| **Trajektori analizi** | ❌ | ❌ | Sınırlı | ❌ | **✅ (HYSPLIT ileri/geri + CWT/PSCF batch)** |
| **Uydu plüm takibi** | ❌ | ❌ | Sınırlı | ❌ | **✅ (Sentinel-2/MODIS timelapse)** |
| **PNSD modelleme** | ❌ | ❌ | ❌ | ❌ | **✅ (OPC + ERA5 füzyon)** |
| **24-72 saat tahmin** | ❌ | ❌ | Sınırlı | ❌ | **✅ (LSTM/TFT + meteo)** |
| **SKHKKY / HKKD raporu** | ❌ | ✅ (manuel) | ❌ | ❌ | **✅ (otomatik)** |
| **Donanım gereksinimi** | Airqoon Unit L/M | Yok (yazılım) | 3. parti sensör | Clarity Node | **Airqoon Unit L/M** |
| **Fiyat segmenti** | Donanım + SaaS | Lisans tabanlı | Kurumsal/yüksek | Donanım + SaaS | **Donanım + SaaS (katmanlı, erişilebilir)** |
| **Türkiye pazarı** | ✅ (aktif) | İthal yazılım | Yerel temsilcilik yok | Yerel temsilcilik yok | **✅ (yerli üretim)** |

### 2.2 Yenilikçi Yönler

1. **Türkiye pazarına özgü entegre çözüm:** Düşük maliyetli sensör verisi + çoklu uydu verisi (AOD, TROPOMI, multispektral) + dispersiyon modelini birleştiren, SKHKKY/HKDYY uyumlu, otomatik HKKD raporlaması yapan ve Türkiye pazarına erişilebilir fiyatla sunulan tam entegre bir SaaS ürün bulunmamaktadır. AERMOD ticari yazılımı statik ÇED raporları üretir; mevcut sensör platformları (Clarity, Oizom, Kunak) yalnızca ölçüm noktalarında veri sunar; Envirosuite Aware ise yüksek fiyat segmentinde kurumsal müşterilere yöneliktir. AQ-Fusion bu boşluğu yerli üretim donanım + yazılım ekosistemiyle doldurmaya yöneliktir.

2. **HYSPLIT trajektori analizinin operasyonel platforma entegrasyonu:** HYSPLIT NOAA tarafından yaygın kullanılan açık bir akademik araçtır; ancak ticari hava kalitesi izleme platformlarına gerçek zamanlı operasyonel modül olarak entegrasyonu yaygın değildir. İleri/geri trajektori hesabı ile birlikte CWT/PSCF batch analizi, kirletici kaynaklarının bölgesel "parmak izi" haritasını çıkartmayı sağlar.

3. **EPA-PMF reseptör modelleme + ters dispersiyon birleşimi:** OPC boyut dağılımı ve çok bileşenli gaz verisinden istatistiksel kaynak profili çıkarma (PMF) ile ters dispersiyon (konumsal tespit) yöntemlerinin tek platformda otomatik ve operasyonel olarak entegre edilmesi yaygın bir ticari özellik değildir.

4. **Partikül boyut dağılımı (PNSD) modelleme:** OPC yer verisi ile ERA5 meteoroloji füzyonu; kaba vs ince fraksiyon ayrımı ve farklı çökelme/taşınım modellemesi — özellikle endüstriyel toz kaynakları (taşocağı, çimento, maden) için kritik.

5. **Ters dispersiyon modelleme ile kaynak tespiti:** Rüzgâr alanı + sensör gradyenleri kullanılarak "bu kirlilik neden ve nereden kaynaklanıyor?" sorusuna gerçek zamanlı yanıt — endüstriyel tesisler için kritik karar destek özelliği.

6. **Modüler donanım + yazılım ekosistemi:** Airqoon'un mevcut Unit L/M donanımı + Lens platformu üzerine inşa edilecek — rakiplerin önemli bir kısmı ya yalnızca yazılım (AERMOD) ya yalnızca donanım (Clarity) sunmaktadır.

7. **ÇSED / SKDM / ESRS uyumluluk altyapısı:** Platform, uluslararası finans kuruluşları fonlu projelerin gerektirdiği Çevresel ve Sosyal Etki Değerlendirmesi (ÇSED) için temel veri kaynağı olarak konumlanacaktır. AB SKDM (CBAM) kapsamında çimento ve demir-çelik sektörlerinin gömülü emisyon raporlaması ve ESRS E2 (Kirlilik) / TSRS kapsamındaki Scope 3 emisyon beyanları için sürekli, doğrulanabilir çevresel veri sağlayacaktır.

### 2.3 Ulusal ve Uluslararası Bağlam

**Ulusal:**
- Türkiye'de dispersiyon modelleme büyük ölçüde ithal yazılımlara (AERMOD, CALPUFF) bağımlıdır. Bu yazılımlar ağırlıklı olarak statik ÇED raporları için kullanılır, gerçek zamanlı operasyonel karar desteği yaygın biçimde sunulmaz.
- 81 ilin tamamında Çevre, Şehircilik ve İklim Değişikliği İl Müdürlükleri hava kalitesi yönetimi için bu tür araçlara ihtiyaç duymaktadır. 300'ü aşkın OSB'nin çevre yönetimi için kaynak belirleme ve katkı payı analizi giderek artan bir ihtiyaçtır.
- **SKDM (CBAM) etkisi:** AB SKDM 2023-2025 geçiş dönemini takiben 1 Ocak 2026'da tam uygulamaya geçmiştir. Türkiye'nin çimento, demir-çelik ve alüminyum ihracatçıları, ürünlerindeki gömülü karbon emisyonlarını doğrulanmış verilerle raporlamak ve SKDM sertifikası satın almak durumundadır. Bu durum, tesis bazlı sürekli emisyon izleme ve kaynak belirleme ihtiyacını belirgin biçimde artırmıştır.
- **TSRS yükümlülüğü:** KGK tarafından yayımlanan Türkiye Sürdürülebilirlik Raporlama Standartları (TSRS 1 ve TSRS 2), ISSB IFRS S1/S2 ile uyumlu olup Scope 1, 2 ve 3 sera gazı emisyon beyanlarını kapsamaktadır. İlk raporlar yayımlanmış olup kapsam yıllar içinde genişlemektedir.

**Uluslararası:**
- AB Direktif 2024/2881 ile PM2.5 limit değeri 25'ten 10 µg/m³'e düşürülecek; bu durum indikatif izleme talebini önemli ölçüde artıracaktır.
- **ESRS E2 (Kirlilik):** AB'de faaliyet gösteren veya AB müşterilerine tedarik zincirinde yer alan firmalar, ESRS E2 kapsamında hava kirletici emisyonlarını (NOx, SOx, PM) raporlamak durumundadır.
- **Uluslararası finans kuruluşları fonlu projeler:** Türkiye'deki büyük altyapı ve enerji projelerinin önemli bir kısmı uluslararası finans kuruluşları (EBRD, IFC, Dünya Bankası) fonlarıyla finanse edilmektedir. Bu kurumlar, ulusal mevzuatın ötesinde ÇSED (ESIA), Dünya Bankası EHS Kılavuzları ve DSÖ hava kalitesi değerlerine uyum aramaktadır. Sürekli çevresel izleme, ESMP kapsamında zorunludur.

---

## 3. Ar-Ge Sürecinde Kullanılacak Çözüm Yöntemleri ve Teknolojiler

### 3.1 Analitik / Deneysel Yöntemler

| Yöntem | Açıklama | Kullanım |
|--------|----------|----------|
| **Optimal Interpolation (OI)** | İstatistiksel veri asimilasyonu; gözlem ve arka plan (model/uydu) verisini hata kovaryans matrisleri ile birleştirir | Sensörsüz bölgelerde yüksek doğruluklu konsantrasyon haritası |
| **Gaussian Puff/Plume Modeli** | Atmosferik yayılımı rüzgâr, kararlılık sınıfı ve karışım yüksekliğine göre hesaplayan fizik tabanlı model | Endüstriyel kaynaklardan (nokta, alan, fugitif) kirletici dağılımı |
| **HYSPLIT Trajektori Analizi** | NOAA'nın Hybrid Single-Particle Lagrangian Integrated Trajectory modeli; ileri/geri hava kütle hareketi hesabı | Kirletici taşınım yolları, kaynak bölgesi tespiti (CWT/PSCF batch analiz) |
| **EPA-PMF Reseptör Modelleme** | Positive Matrix Factorization; çok değişkenli kimyasal/fiziksel parmak izi verisinden istatistiksel kaynak profili çıkarma | Kaynak katkı payları hesaplama (source apportionment) |
| **Ters Modelleme (Inverse Dispersion)** | Sensör ağındaki konsantrasyon gradyenlerinden geriye doğru kaynak konumuna yaklaşma | Bilinmeyen/kaçak emisyon kaynaklarının konumsal tespiti |
| **Partikül Boyut Dağılımı (PNSD)** | OPC partikül sayım verisi ile meteoroloji füzyonu; kaba (>2.5µm) vs ince (<2.5µm) fraksiyon ayrımı | Toz kaynağı tipine göre farklı çökelme/taşınım modellemesi |
| **Uydu Plüm Kantifikasyonu** | Sentinel-2 multispektral + MODIS AOD arşivinden toz plüm alanı ve optik derinlik zaman serisi | Timelapse değişim tespiti, mevsimsel trend analizi |
| **Kriging / IDW** | Jeo-istatistiksel interpolasyon yöntemleri | Mekânsal hava kalitesi haritaları |
| **Ko-lokasyon Testi** | CEN/TS 17660 uyumlu sensör-referans karşılaştırması | Sensör verisi kalite güvencesi |
| **CFD (basitleştirilmiş)** | Kentsel kanyon ve bina etkilerinin rüzgâr alanı üzerindeki etkisi | Şehir içi dispersiyonda bina etkisi düzeltmesi |

### 3.2 Kullanılacak Teknolojiler

**Veri Kaynakları:**
- Airqoon sensör ağı (OPC partikül sayım + PM1/2.5/10 kütle, NO₂, O₃, SO₂, CO, VOC, T/RH/P, rüzgâr)
- **Uydu verileri:**
  - MODIS MAIAC AOD (500m, günlük), bölgesel aerosol optik derinliği
  - Sentinel-5P/TROPOMI (NO₂, SO₂, CO tropösferik kolon), gaz dağılım haritası
  - Sentinel-2 multispektral (10m, 5 günde bir),  toz plüm optik tespiti
  - CAMS/Copernicus Atmosphere Monitoring Service,  analiz konsantrasyon
- **Meteorolojik analiz:** ERA5 (0.25°, saatlik), MERRA-2,  rüzgâr, kararlılık, karışım yüksekliği
- Bakanlık referans istasyon verileri
- Endüstriyel proses verileri (opsiyonel — tesis sahibi tarafından paylaşılan üretim/söndürme/bakım verileri)

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
- **Lisanslar:** Kullanılan ana yazılım bileşenleri açık kaynak — ek lisans maliyeti minimuma indirilmektedir

### 3.3 İlgili Standartlar

| Standart | Kullanım |
|----------|----------|
| SKHKKY (Sanayi Kaynaklı HK Kontrol Yönetmeliği) | HKKD hesaplama zorunluluğu |
| HKDYY (Hava Kalitesi Değerlendirme ve Yönetim Yönetmeliği) | Limit değerler ve izleme gereksinimleri |
| CEN/TS 17660-1/2 | Sensör kalibrasyon ve performans doğrulama |
| Directive 2024/2881 (AB) | Yeni limit değerler (PM2.5: 10 µg/m³) |
| US EPA AERMOD metodolojisi | Dispersiyon modelleme referans yaklaşımı |
| ISO 14001 | Çevre yönetim sistemi uyumu |
| SKDM / CBAM (AB Reg. 2023/956) | Gömülü karbon emisyon raporlama — çimento, demir-çelik |
| ESRS E1 (İklim) / E2 (Kirlilik) | AB sürdürülebilirlik raporlama — Scope 1/2/3 emisyon, hava kirletici |
| TSRS 1 / TSRS 2 (KGK) | Türkiye sürdürülebilirlik raporlama — sera gazı beyanları |
| IFC Performance Standard 3 | Kaynak Verimliliği ve Kirlilik Önleme — uluslararası finans kuruluşları fonlu projeler |
| Dünya Bankası EHS Kılavuzları | ÇSED kapsamında hava kalitesi baz çalışması ve izleme |
| EU IED 2010/75/EU | Endüstriyel Emisyon Direktifi — çimento, enerji, atık tesisleri |
| BAT Conclusions (2013/163/EU) | BAT 5 (izleme), BAT 14–18 (toz kontrol) — çimento/kireç/MgO |

---

## 4. Ekonomik Öngörüler, Gelir Modeli ve Pazar Bilgileri

### 4.1 Satılabilir Ürün Katmanları

| Ürün / Hizmet | Açıklama |
|---------------|----------|
| **Unit L/M Donanım** | Fiziksel sensör ünitesi (mevcut) |
| **Lens Standard SaaS** | Gerçek zamanlı dashboard, alarm, rapor (mevcut) |
| **🆕 Lens Fusion — Kent** | Şehir genelinde hava kalitesi haritası, sensörsüz bölge tahmini, 24-72 saat öngörü, halk sağlığı erken uyarı |
| **🆕 Lens Fusion — Endüstri** | Tesis çevresi dispersiyon haritası, kaynak katkı analizi, otomatik HKKD raporu, uyum takibi |
| **🆕 Lens Fusion — Endüstri Pro** | Endüstri + HYSPLIT trajektori + uydu plüm timelapse + EPA-PMF + PNSD modelleme + DMP desteği |
| **🆕 Lens Fusion — OSB** | Çok kiracılı kaynak belirleme, kiracı bazlı katkı raporu, OSB çevre KPI'ları |
| **🆕 Fusion API** | 3. parti entegrasyon: dispersiyon verileri, tahmin, kaynak analizi API |

### 4.2 Gelir Modeli (3 Yıl Projeksiyon)

| Gelir Kalemi | 1. Yıl | 2. Yıl | 3. Yıl |
|-------------|--------|--------|--------|
| Lens Standard SaaS (mevcut) | $60K-90K | $120K-180K | $200K-300K |
| **🆕 Fusion Kent lisansları** | $10K-25K | $50K-120K | $150K-280K |
| **🆕 Fusion Endüstri lisansları** | $15K-35K | $80K-180K | $200K-400K |
| **🆕 Fusion OSB lisansları** | $0-15K | $30K-80K | $80K-180K |
| **🆕 Fusion API** | $0-5K | $10K-25K | $30K-70K |
| **TOPLAM** | **$85K-170K** | **$290K-585K** | **$660K-1.23M** |

> [!NOTE]
> Projeksiyonlar uygun tabanda hesaplanmıştır. Projenin ilk 12 ayı Ar-Ge ve pilot uygulama dönemini kapsadığından, 1. yıl Fusion gelirleri pilot/referans müşteri seviyesindedir.

### 4.3 Hedef Pazar ve Müşteri Sayıları

**Birincil Pazarlar:**
- **Türkiye — Çimento ve Ağır Sanayi:** Sektörde 50'yi aşkın büyük tesis SKHKKY kapsamında HKKD raporu ihtiyacı duymaktadır. Çimento sektörü öncelikli hedef segmenttir.
- **Türkiye — OSB'ler:** 300'ü aşkın OSB'nin çevre yönetimi için kaynak belirleme ve kiracı bazlı katkı analizi büyüyen bir ihtiyaçtır.
- **Türkiye — Belediyeler:** Türkiye'de 30 büyükşehir belediyesi hava kalitesi yönetim ihtiyacına sahiptir; orta vadede bu pazarın %20-30'una ulaşma stratejisi izlenmektedir. Mevcut belediye müşteri ilişkileri Bursa, Denizli, Kadıköy, Mudanya, İnegöl, Avcılar gibi referanslara dayanmaktadır.
- **AB:** Direktif 2024/2881 ile genişleyen indikatif izleme pazarı (özellikle Doğu Avrupa, Balkanlar).

**İkincil Pazarlar:** Orta Doğu (BAE, Azerbaycan, Suudi Arabistan), Kuzey Afrika (Mısır), Avustralya.

| Segment | 1. Yıl | 2. Yıl | 3. Yıl |
|---------|--------|--------|--------|
| Belediyeler (Fusion Kent) | 1-3 (pilot) | 4-8 | 10-18 |
| Endüstriyel Tesisler (Fusion Endüstri) | 2-5 (pilot) | 8-15 | 20-35 |
| OSB'ler (Fusion OSB) | 0-2 (pilot) | 3-6 | 8-15 |
| API müşterileri | 0-1 | 3-6 | 8-12 |
| **Toplam Fusion müşteri** | **3-11** | **18-35** | **46-80** |

### 4.4 Rekabet Avantajı Özeti

1. **Entegre hibrit yaklaşım:** Tek platformda sensör + dispersiyon modeli + uydu + dağılım yolu,  Türkiye pazarında bu bileşenleri SKHKKY uyumlu otomatik raporlama ile birleştiren erişilebilir fiyatlı çözüm sınırlıdır.
2. **Erişilebilir fiyat segmenti:** Fusion Kent ve Fusion Endüstri lisansları KOBİ, orta ölçekli belediyeler ve OSB'ler için erişilebilir bir fiyat aralığında konumlandırılacaktır, kurumsal ölçekli rakiplerle kıyaslandığında belirgin bir maliyet avantajı.
3. **Donanım + yazılım ekosistemi:** Müşteri ilişkisinin derinleşmesi (lock-in), donanım alan müşteri yazılım SaaS'ına geçer; cross-sell ve up-sell potansiyeli.
4. **Mevcut müşteri tabanı:** Türkiye'de 30'u aşkın şehirde aktif kurulumlar, çimento sektöründe ve büyükşehir belediyelerinde referans müşteriler, pilot uygulamalar için doğrudan saha erişimi.
5. **SKHKKY uyumu:** Otomatik HKKD raporu — Türkiye'de dijital sürekli izleme verisi ile otomatik üretim sunan sınırlı sayıdaki çözümden biri olma potansiyeli.
6. **Trajektori + PMF entegrasyonu:** HYSPLIT operasyonel modülü + EPA-PMF reseptör modellemenin ticari platforma entegrasyonu, yaygın bulunmayan bir bileşim.
7. **Uydu timelapse:** ≥3 yıllık geriye dönük plüm timelapse ile operasyonel etki kanıtlama — ruhsat/denetim süreçlerinde değerli destek dokümanı.

### 4.5 Regülasyon Kaynaklı Talep Sürücüleri

| Regülasyon | Etkilenen Sektör | AQ-Fusion Değer Önerisi |
|-----------|-----------------|------------------------|
| **SKDM / CBAM** | Çimento, demir-çelik, alüminyum ihracatçıları | Tesis çevresinde sürekli emisyon izleme ve kaynak katkı raporları — doğrulanabilir gömülü emisyon verisi |
| **ÇSED / ESIA** | Enerji, altyapı, maden projeleri | Baz çalışması (baseline), inşaat/işletme dönemi izleme, ESMP kapsamında sürekli veri — uluslararası fon şartlarına uyum |
| **ESRS E1/E2** | AB'ye ihracat yapan veya AB tedarik zincirindeki firmalar | Scope 3 emisyon verisi (downstream), hava kirletici beyanları (ESRS E2), doğrulanabilir çevresel performans verisi |
| **TSRS 1/2** | BİST şirketleri, büyük işletmeler (genişleyen kapsam) | Sera gazı emisyon beyanları (Scope 1/2/3), çevresel risk ve fırsat analizi, iklim senaryosu verisi |
| **SKHKKY** | Tüm endüstriyel tesisler | Otomatik HKKD raporu, dispersiyon modelleme, kaynak belirleme |
| **HKDYY** | Belediyeler, Çevre İl Müdürlükleri | Kent geneli hava kalitesi haritası, limit aşım takibi, erken uyarı |

> **Pazar zamanlaması:** SKDM'nin 1 Ocak 2026'da tam uygulamaya geçmesi, TSRS raporlamanın kapsamının genişlemesi ve uluslararası finans kuruluşlarının Türkiye'deki yeşil dönüşüm fonlamasını artırması, sürekli ve doğrulanabilir çevresel izleme verisine olan talebi belirgin biçimde artırmaktadır. AQ-Fusion bu regülasyon ortamına yönelik bir ürün olarak konumlanmaktadır.

---

> [!NOTE]
> **Önceki Projelerle Süreklilik**
>
> - **070382 — Akıllı Uç Bilişim:** Edge computing altyapısı → Bu projede uç cihazda basit tahmin modeli.
> - **076102 — Analiz ve Görselleştirme:** Lens platformu → Bu projede Fusion harita katmanları ve raporlar.
> - **085513 — Floresans Sensör:** Sensör Ar-Ge uzmanlığı → Bu projede sensör veri kalite değerlendirmesi.
> - **093950 — 4Blocks:** Modüler donanım → Bu projede anemometre ve çevre sensör modülleri.
>
> **Proje süresi:** 18 ay | **Ekip:** 4-6 Ar-Ge mühendisi (ML/veri, gömülü yazılım, bulut/platform, atmosfer modelleme)
> **Pilot lokasyonlar:**
> - *Kent:* Bursa Büyükşehir (şehir geneli ağ), Denizli Büyükşehir
> - *Endüstri:* Çimento ve ağır sanayi tesisleri (mevcut müşteri ilişkileri çerçevesinde)
> - *OSB:* İnegöl OSB (mevcut sensör ağı + CFD çalışması verileri)
> - *Maden/Taşocağı:* Toz kaynağı haritalama ve hassas alıcı etki analizi
> **Sertifikalar:** ISO 9001:2015 ve ISO 27001:2022 (İnovathink A.Ş.)
