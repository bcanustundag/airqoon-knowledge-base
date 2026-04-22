---
title: "IoT Tabanlı Hava Kalitesi İzleme Sistemleri ile Kentlerde Emisyon Yönetimi: Bursa Örneği"
source: notion
page_id: 261fb36e07e780d2b38cc7db94d43e47
extracted: 2026-04-22
---

# IoT Tabanlı Hava Kalitesi İzleme Sistemleri ile Kentlerde Emisyon Yönetimi: Bursa Örneği

**Özet**

Bu çalışma, IoT tabanlı hava kalitesi izleme sistemlerinin kentsel emisyon yönetimindeki rolünü Bursa ili örneği üzerinden incelemektedir. Airqoon sensör teknolojisi kullanılarak 2023-2025 döneminde Bursa'nın çeşitli bölgelerinde gerçekleştirilen pilot uygulamalar, gerçek zamanlı veri toplama, analiz ve politika geliştirme süreçlerindeki etkinliği göstermektedir. Çalışma, TRL5 seviyesinde doğrulanmış teknolojinin kentsel hava kalitesi yönetiminde nasıl dönüşümsel bir rol oynadığını ortaya koymaktadır.

1. **Giriş**
**1.1 Kentsel Hava Kirliliği: Küresel ve Ulusal Perspektif**

Dünya Sağlık Örgütü verilerine göre, küresel nüfusun %99'u WHO hava kalitesi yönergelerini aşan kirliliğe maruz kalmaktadır (WHO, 2023). Hava kirliliği, küresel olarak kaçınılabilir ölüm nedenlerinin başında gelmekte; dış ortam hava kirliliğine bağlı olarak yılda yaklaşık 3,7 milyon kişi yaşamını yitirmektedir (WHO, 2016). Özellikle partikül maddeler, Uluslararası Kanser Araştırmaları Ajansı (IARC) tarafından akciğer kanseri nedeni olarak sınıflandırılmıştır (WHO, 2013).

Türkiye'de bu durum daha da kritik boyutlardadır. Temiz Hava Hakkı Platformu'nun 2024 Kara Raporu'na göre, 2022 yılında 30 yaş üstü doğal nedenlerle olan ölümler içinde hava kirliliğine atfedilen ölümlerin sayısal olarak en fazla olduğu üçüncü il Bursa'dır. 2021 yılında sadece Bursa'da hava kirliliği nedeniyle 2.223 kişinin hayatını kaybettiği tahmin edilmektedir.

**1.2 Bursa: Sanayi Merkezinde Hava Kalitesi Sorunu**

Türkiye'nin en önemli sanayi merkezlerinden biri olan Bursa, 40.18° kuzey paraleli ile 29.06° doğu meridyeninin kesiştiği noktada, Marmara Bölgesi'nde konumlanmaktadır. 2022 yılı verilerine göre 3 milyonu aşan nüfusu ile Türkiye'nin dördüncü en kalabalık şehri olan Bursa (TÜİK, 2022), sanayi, turizm, ticaret ve tarım açısından gelişmiş bir metropol olarak sürekli göç almaktadır.

İldeki endüstriyel yoğunluk oldukça dikkat çekicidir. Toplam 18 adet Organize Sanayi Bölgesi, 1 adet Teknoloji Geliştirme Bölgesi ve 1 adet Serbest Bölge bulunmakta, bunlara ek olarak 13 adet Küçük Sanayi Sitesi'nde toplam 6.254 işyeri faaliyet göstermektedir (BEBKA, 2018). Şehrin coğrafi konumu, endüstriyel tesislerin yerleşiminde kritik bir rol oynamaktadır. Kuzeyinde Demirtaş OSB, kuzey batısında Bursa ve Nilüfer OSB'leri, doğusunda Kestel, Uludağ ve Barakfakih OSB'leri, batısında ise Hasanağa ve Kayapa OSB'leri yer almakta olup, şehrin üç tarafı organize sanayi bölgeleri ile çevrilidir.

Bu endüstriyel yoğunluk, şehrin topografik özelliklerinin de etkisiyle hava kalitesi üzerinde olumsuz etkiler yaratmaktadır. Şehrin yüzde 35'i dağlarla, yüzde 17'si ise ovalarla kaplıdır. Güneyinde Uludağ'ın varlığı ve kış aylarında rüzgarların azalması, atmosferik dispersiyon koşullarını olumsuz etkileyerek hava kirliliğinin daha fazla hissedilmesine neden olmaktadır. Hakim rüzgar yönü kuzey ve kuzey doğu olup, bu durum kirleticilerin sanayi bölgelerinden şehir merkezine taşınmasını kolaylaştırmaktadır.

İldeki hava kirliliğinin temel kaynaklarını evsel ısınma (en büyük kaynak), sanayi kaynaklı emisyonlar ve trafik kaynaklı kirlilik oluşturmaktadır. 2005-2006 döneminde başlayan doğal gaz dağıtım çalışmaları önemli bir ilerleme kaydetmiş olmasına rağmen, doğalgaz kullanımında yüzde yüz geçişin sağlanamamış olması ve sık sık yaşanan inversiyon olayları nedeniyle hava kirliliği sorunu devam etmektedir.

Han ve arkadaşları (2024) tarafından yayınlanan çalışma, Kuzey Çin'de fosil yakıt kullanılmamasını amaçlayan Temiz Isıtma Planı'nın devreye sokulması ile birlikte hava kirletici emisyon miktarlarında yüzde 17,3 düşüş yaşandığını göstermekte ve bu tür sistemlerin hava kirliliğinin azaltılmasında etkili bir önlem haline gelebileceğini ortaya koymaktadır.

**1.3 Geleneksel İzleme Sistemlerinin Sınırlılıkları**

Bursa'da hava kalitesi izleme faaliyetleri, Çevre ve Şehircilik Bakanlığı'nın Marmara Temiz Hava Merkezi Müdürlüğü'ne ait altı adet hava kalitesi ölçüm istasyonu aracılığıyla yürütülmektedir. Bu istasyonlar Uludağ Üniversitesi, Kültürpark, Beyazıt, Kestel, İnegöl ve Bursa istasyonlarından oluşmaktadır.

Mevcut sistem, Federal Equivalent Method (FEM) esaslı sabit istasyonlara dayanmakta olup, çeşitli operasyonel ve metodolojik sınırlılıklar içermektedir. En kritik sorun, üç milyonluk bir metropoliten alan için sadece altı istasyonun şehrin heterojen kirlilik profilini yeterince temsil edememesidir. Bu durum, Bursa Büyükşehir Belediyesi'nin "her ilçede en az iki adet sanayi ve kentsel kirliliğin tespiti için istasyon kurulmalı" şeklindeki değerlendirmesiyle de örtüşmektedir.

Mevcut istasyon ağının bir diğer önemli eksikliği, sanayi bölgelerinden kaynaklı kirliliğin tespiti için hakim rüzgar yönüne göre stratejik konumlandırılmış istasyonların bulunmamasıdır. Bu durum, emisyon kaynak analizi ve etki değerlendirmesinde ciddi boşluklar yaratmakta, şehrin üç tarafını çeviren organize sanayi bölgelerinin hava kalitesi üzerindeki etkisinin tam olarak anlaşılmasını engellemektedir.

Ayrıca, her istasyonda bütün parametrelerin ölçülmesi sağlanamamakta, bu da kirlilik profilinin bütüncül anlaşılmasında eksikliklere neden olmaktadır. FEM esaslı sabit istasyonların istasyon başına 100.000-500.000 Euro arasında yatırım gerektirmesi de istasyon sayısının artırılmasında önemli bir engel teşkil etmektedir. Bunlara ek olarak, mevcut sistem geç raporlama ve analiz süreçleri nedeniyle acil durum müdahalelerinde yetersiz kalmakta, gerçek zamanlı karar alma süreçlerini destekleyememektedir.

Bu sınırlılıkları gözeten Bursa Büyükşehir Belediyesi, mevcut sistemi entegre olan alternatif teknolojik çözümlere yönelmiş ve Airqoon ile işbirliği geliştirerek entegre günümüzde kentte otuz adetten fazla sensör ile hava kalitesi takibi gerçekleştirmektedir.

**1.4 IoT ve Akıllı Şehir Teknolojilerinin Yükselişi**

Internet of Things (IoT) ekosistemi, kentsel hava kalitesi izleme alanında paradigmal bir dönüşüm potansiyeli taşımaktadır. Düşük maliyetli sensör teknolojileri, kablosuz iletişim altyapısı ve bulut tabanlı analitik platformların konverjansı, geleneksel izleme yaklaşımlarının sınırlılıklarını aşan "hiper-lokal" hava kalitesi izleme ağlarının kurulmasını mümkün kılmaktadır.

IoT sensörleri, geleneksel istasyonların kırkta bir maliyetiyle mahalle düzeyinde ölçüm yapabilme kapasitesi sunmakta, böylece çevre adaletsizliği konularının ele alınmasında kritik bir araç haline gelmektedir. Temporal çözünürlük açısından ise, dakika bazında veri toplama kapasitesi emisyon kaynaklarının gerçek zamanlı tanımlanmasını ve dinamik müdahale stratejilerinin geliştirilmesini sağlamaktadır.

Adaptif izleme konsepti, IoT teknolojilerinin sunduğu bir diğer önemli avantajdır. Hareketli sensör üniteleri ile kirlilik odaklarının (hot-spot) tespiti ve dinamik deployment stratejilerinin uygulanması mümkün olmaktadır. Bu esneklik, kentsel hava kalitesi yönetiminde proaktif yaklaşımları desteklemektedir.

Büyük veri analitiği kapsamında ise, machine learning algoritmaları aracılığıyla kaynak belirleme (source apportionment), emisyon tahminlemesi (emission forecasting) ve politika etki değerlendirmesi (policy impact assessment) gibi ileri analiz tekniklerinin uygulanması gerçekleştirilebilmektedir.




