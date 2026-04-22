---
title: "Airqoon M Başlangıç Kılavuzu"
source: notion
notion_id: "15afb36e-07e7-801b-b53d-d4ee2296278b"
tags: ["Guides"]
created: 2024-12-12
last_edited: 2026-02-24
exported: 2026-04-22
---

# Airqoon M Başlangıç Kılavuzu

# Kurulum

Bu belge, Airqoon Sensör Ünitesi M'nin kurulum aşamasında takip edilmesi gereken adımları kolayca tamamlamanıza ve kontrol ekranlarını etkin bir şekilde takip etmenize yardımcı olmak üzere hazırlanmıştır.

Airqoon Sensör Ünitesi M, kapalı ortamlarda hava kalitesini ölçmek için tasarlanmıştır. Standart donanımda **PM2.5, PM10, Sıcaklık, Nem, Basınç, VOC ve NOx** ölçümü gerçekleştirir.

## Kutu İçeriği

Airqoon Sensör Ünitesi M kutusu; sensör ünitesi ana gövdesi, güç adaptörü, USB-C güç kablosu ve anten bileşenlerinden oluşur.

| **No** | **İsim** | **Adet** | **Açıklama** |
| --- | --- | --- | --- |
| 1 | Ana Gövde | 1 | Tüm elektronik bileşenleri ve sensörleri barındıran kompakt gövde. |
| 2 | Güç Adaptörü | 1 | Sensör ünitesine şebeke gücü sağlar. |
| 3 | USB-C Güç Kablosu | 1 | Güç adaptörü ile sensör ünitesi arasındaki bağlantıyı sağlar. |
| 4 | GSM Anteni | 1 | Sensör ünitesinin internet bağlantısını sağlar. |

**Uyarı:** **Montaja başlamadan önce sensör ünitesinin kapalı olduğundan emin olun.**

# Başlarken

Airqoon Sensör Ünitesi M, kullanıma hazır olarak gelir. Aşağıdaki adımları takip ederek kurulumu tamamlayabilirsiniz.

**Dikkat:** Sensör ünitesi üzerinde bulunan PM sensörünün girişine dokunmaktan kaçınınız. Sensör girişindeki toz veya kir, ölçüm doğruluğunu olumsuz etkileyebilir.

# Kurulum Adımları

## 1. Anten Bağlantısı

GSM antenini sensör ünitesinin üst kısmında bulunan anten soketine monte ediniz. Anten saat yönünde çevirilerek yerine sıkıca takılır. Anten montajı tamamlandıktan sonra antenin dik konumda olduğundan emin olunuz.

**Uyarı:** *Anteni çok kuvvetli sıkmayınız, soket dişlileri zarar görebilir.*

## 2. Güç Bağlantısı

USB-C güç kablosunun bir ucunu sensör ünitesinin güç girişine, diğer ucunu güç adaptörüne bağlayınız. Güç adaptörünü prize takınız.

**Uyarı:** *Yalnızca kutu içerisinde gelen orijinal güç adaptörünü ve kablosunu kullanınız. Farklı adaptör kullanımı cihaza zarar verebilir.*

# Kurulum Sonrası

## 1. Test

Yukarıdaki adımları tamamladıktan sonra sıra cihazınızı çalıştırıp bağlantı kontrolü yapmaya gelir. Güç kablosu bağlandıktan sonra sensör ünitesi otomatik olarak çalışmaya başlar. Cihazın durumunu anlık olarak takip etmek için üzerindeki LED göstergeyi takip edebilirsiniz. LED durum renkleri aşağıdaki gibidir.

[🔵](https://emojipedia.org/large-blue-circle) Mavi       -     Buluta bağlanıyor

[🟢](https://emojipedia.org/large-green-circle) Yeşil        -    Bağlantı kuruldu, normal çalışma

[🟡](https://emojipedia.org/large-yellow-circle) Sarı         -    Ölçümler buluta gönderildi, derin uyku moduna geçiş

[🟣](https://emojipedia.org/large-purple-circle) Mor         -    Yazılım güncellemesi

[⚪](https://emojipedia.org/white-circle) Gri          -    Ünite uyku/kapalı konumu

## 2. Yerleşim Noktası Seçimi

Airqoon Sensör Ünitesi M'nin doğru ölçüm yapabilmesi için kurulum konumu büyük önem taşır. Aşağıdaki kriterlere dikkat edilmesi tavsiye edilir.

**İç Mekan Hava Kalitesi Ölçümü için Dikkat Edilmesi Gereken Noktalar:**

1. **Hava Dolaşımı**: Sensör ünitesi, hava dolaşımının iyi olduğu bir konuma yerleştirilmelidir. Kapalı dolap, raf arası veya dar köşelerden kaçınınız. Ortamdaki havanın sensöre serbestçe ulaşabilmesi doğru ölçüm için kritiktir.
1. **Isı Kaynaklarından Uzaklık**: Sensör ünitesini radyatör, klima çıkışı, bilgisayar veya diğer ısı kaynaklarından en az **50 cm** uzağa yerleştiriniz. Bu kaynaklar sıcaklık ve nem ölçümlerini olumsuz etkileyebilir.
1. **Doğrudan Güneş Işığından Kaçının**: Sensörü doğrudan güneş ışığı alan bir konuma yerleştirmeyiniz. Güneş ışığı sıcaklık ölçümlerinde hata oluşturabilir.
1. **Montaj Yüksekliği**: En doğru sonuçlar için sensör ünitesini zemin ile tavan arasının ortasına yakın bir yüksekliğe, tercihen **1,5 - 2 metre** yüksekliğe yerleştiriniz. Bu yükseklik, solunum bölgesindeki hava kalitesini temsil eder.
1. **Güç Noktasına Yakınlık**: Sensör ünitesi şebeke gücü ile çalıştığından, bir prize kolayca ulaşabilecek mesafede konumlandırılmalıdır. Güç kablosunun bağlantı noktasından geçmeyeceği veya gerilmeyeceği bir konum tercih ediniz.
1. **Kirlilik Kaynaklarından Uzaklık**: Sensörü doğrudan boya, solvent, temizlik ürünleri veya yemek pişirme gibi anlık yoğun VOC kaynakların yakınına yerleştirmekten kaçınınız; aksi takdirde bu kaynakların doğrudan etkisi ölçüm ortalamasını bozabilir.
# Çevre Bulutu

## Kontrol Paneli

Airqoon Sensör Ünitesi M tarafından toplanan verilere erişmek için airqoon ekibi tarafından bir kullanıcı hesabı sağlanır. Herhangi bir hesap kimlik bilginiz yoksa lütfen [support@airqoon.com](mailto:support@airqoon.com) aracılığıyla bizimle iletişime geçiniz.

Giriş yaptıktan sonra sensör ünitelerinizi liste olarak ve harita üzerinde görebilirsiniz. Tek bir cihazdan veri almak isterseniz listelenen birimin sağ tarafındaki rapor simgesine tıklayarak geçmiş verileri görselleştirebilirsiniz.

Veriler, cihaz kontrol panelinden **CSV** veya **XLS** formatında dışa aktarılabilmektedir.

## Rapor Takibi

Airqoon Sensör Ünitesi M tarafından gerçekleştirilen ölçümlerin aylık raporlarına kontrol paneli üzerinden kolayca ulaşabilirsiniz. Raporlar; PM2.5, PM10, VOC, NOx, sıcaklık, nem ve basınç parametrelerinin zaman serisi analizlerini ve istatistiksel özetlerini içermektedir.
