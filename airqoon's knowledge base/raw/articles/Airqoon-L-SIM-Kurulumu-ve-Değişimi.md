---
title: "Airqoon L SIM Kurulumu ve Değişimi"
source: notion
notion_id: "23efb36e-07e7-80b0-b644-f7e35441fe6c"
tags: ["Guides", "Instructions"]
created: 2025-07-28
last_edited: 2025-07-28
exported: 2026-04-22
---

# Airqoon L SIM Kurulumu ve Değişimi

## Başlangıç

Bu kılavuz, Airqoon Sensör Ünitesi L’nin SIM kart değişimi için adım adım talimatlar sunar. Prosedür, kesintisiz bağlantı ve çevresel veri iletimini sağlamak amacıyla sensör kalibrasyonunu veya ölçüm doğruluğunu etkilemeden güvenli bir şekilde tamamlanacak şekilde tasarlanmıştır.

**Başlamadan Önce:**

- Aktif veri planına sahip uyumlu 4FF (Nano SIM) kartınızın bulunduğundan emin olun.
- Tüm prosedür için yaklaşık 10-15 dakika süre ayırın.
- Cihazın hassas bileşenlerini korumak için tüm güvenlik önlemlerini takip edin.
> ⚠️ ***Güvenlik Uyarısı:**** Herhangi bir bakım prosedürüne başlamadan önce cihazı tamamen kapatın. Bu hem ekipmanı korur hem de teknisyen güvenliğini sağlar.*

### **Gerekli Malzemeler**

- **M4 Allen anahtarı** (kutunun civatalarını söküp takmak için)
- **4FF (Nano SIM) kart** (aktif ve veri hattı açık)
- **Temiz ve tozsuz bir çalışma alanı**
- ***İnce uçlu plastik çubuk veya cımbız**** (opsiyonel - SIM kartı yuvasından çıkarmak için)*
- ***Gerekirse eldiven**** (opsiyonel - statik elektriğe karşı koruma amaçlı)*
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/030c6790-2860-4fb2-b640-916301189b57/c8e4d272-795e-4d30-8109-a2a73f0f45a4.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WI6QPOIX%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQClh3PHtixv376y6%2BGHiS5wKRzSZrGLqhJTv7Cobh%2BdAgIgO4YeCfCmTtSVrluRYEicoqjQ3CeM34MTw6OGvElRLfcq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDDEq7Yfc9K3z0jy6hircAzPN7XpXqxoSAvH3P%2BsIVkkx223OckVkuKGrZ16RGF4jOJne9JPMEEmV60ikYL%2F8uVHbtDODb1epH0JiO6noe9EscHDSyXm88Gi%2FhGVkaTx7BnS%2FGOpd4W0VE1axAO%2BHm4anllnhzTb6%2B5JbMHM1l9hEmmoM6i1KT1cCvn3WEXvPiFJAdrQq7MJa8xIGGKOU7xj%2Fdf7wCaxFCUIkgJqeaaUYaNwGS2tJ%2BCEOJH5YUueCWZqOAm%2FoFXmPvbPNIbU52KwjYMQJvAcWazmcdV5R%2BBEejJiSE74jWcTvktFNwhfmGbTRCoh0fBqDDmtWyNjT3vCVTVmC9Iq8Yffcr4XRi79NcPt853RsQ6ulzo%2B6K1yDZkEoOJrEp3CteWqpRZ%2BQJaFzotayLWn3ZOurUlIPmvvT7gjPCyEOlo257O5ebGc8IlzQ1lRZrGrefN561H6XDyi3ga1%2Fh9ZCPNacwdxuk1soAftX6dpVyl3NstiasBaLB1XF%2Fv98esiLhe0jQ44dEs21SThPvZ6YKfcNxFmOrnvSIbi%2B52qmhD6xIwfdTVqm3i3WHJIqTOaWLG%2BSDwyZ2FI38iqyKWgNtNITytTF9lvS3Hf1dJOF8M6f20d79%2FGiSahSSdlUNGcwlfKeMMyppM8GOqUB34kOxmmS3gYezEfzZE4dP76hiuwBJx2d8MkEuKrTFKqe6WM5STlET8M01pHPTgADRlLClB%2F6VhGInn8gIhfOTCg1hVBAmNjbf45fdRPsz%2BP1V6vfQuJ%2BXiEAld5gSvOAryN43nMWklcsEX1JnzRnc1uZ6%2BJ3yZrflaA7dKMMcUN2YO052GYyIO50wl%2ByUwGV58nl8j6KYENERYJXzbmWlaZZkujd&X-Amz-Signature=3c7f960f953fbd24c52ea941d8409d62558db2823cb4028e0c10f521a61f32e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

### **SIM Kart Değişimi**

1. Cihazın üzerindeki ON/OFF butonunu “OFF” konumuna getirin.
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/f1ab1013-2356-40c6-bd44-69ef0d50cb72/aee9c110-69fd-45f4-b7be-b625fec6223d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XFDCLOW%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSgS1UYeu1IS9qcVw9QBl2qtOFg726VsB7mSRweC4VdgIhANG6K06bG%2BMx%2FmTEgqh7s99suQiRh%2B70WRj%2BgBcYm8adKv8DCFMQABoMNjM3NDIzMTgzODA1IgykDdQQfyJz2Zejku8q3AOkQmVNP3jdEBoY96ChSa%2FU%2FJfRz8D4r0QYHxcByxrfCZu71GYo7ofNLHwlNgTLmCwmyk4tD1SydMhUn7VDJhBQhKgjTZ9WCt7q%2B8F%2FqeHffDJIsA45%2B0fIQhe2cUp%2FtObYMSrLh1pWUwxQRypb4r3xAZXNk%2F0e4loHRi5r0Nk7yAn8%2FfswzELHSsmY9ici1f%2B5%2FsbWRyGdPOIomWATlF1GUW4P19U2vv9G6EA%2FQSWe2o9Btf6%2BvysFzfBlrIeciuz4mfjFmJBgHdjwLj4JRwZbU%2FFp3hrnpq%2BuzA%2BJzW1KJDCEF16kNqNUWytRvD4IbxVJvqdylGVFqMQiE6upm2nWQsLmjHSBlQIE0J9Gi5JcZEWDyKu4wlzaCReynyV5SBX3dHyz%2B35egCj%2FGDOWEj35aGUmt0K8y75rW%2BkvCF4AeZ600wm5vZTQpc7%2BGhuWjQKH%2F%2FIP8WtIldDxTEYog8%2BjPjNzn6KUELcZCKLZDTH%2By8uCzBAyNZ2RCAsTmTEWqMWNKZiJGONX%2FWqeAIeWEj8rgzt4PhYP8yS6LFqONBXXtTuCkX3qZteQdNwjir1Z95WSkFOGhaHBvpmlQU0McZyR5m8XfuJjTxv6sU%2BxrV1GrO%2BBCD%2Fcop8OSwKGMjD1j6TPBjqkAcJ6JLl%2FRA1uH0bEYt%2FAtdU8OE%2F4i97J4Lc3nHWVXB6k1icyxmedIb%2BgStQ%2BwpLyOhU3CwMwcaeQqOPYJoiGlmsMBMZTtLBgWy5mAJGxukC%2BC2bTs9rVpPV1kQ8SNqYPR84cc8hBxnREbkxvtBv3jXZL4k5w0RInNKaeQu8KNsGJ6xj1c2duqWEjxrqGP0kxHJQrADIVnkgwzzM54JGbVgUJNnoH&X-Amz-Signature=85f8137fac481cd82e3220e3fbc4caeed74dcc68773f418ee8bb73ea6b311263&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. Güç adaptörünün bağlantısını kesin, kutuya enerji gelmediğinden emin olun.
1. Üst kapakta yer alan 4 adet M4 Allen civatayı sökün.
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/2d3ca484-f44d-49aa-8c91-b0be4742aae4/53ce3177-1562-4e05-91ee-c4b15dd11b2d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675NX4ZY7%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCVrJc%2FuDk98g7ZNuikZ0b2JrlGds%2BmrXCw8F1fcw9IcgIgB3CBAMaOsMTKsgMxkDTk95LMXUvFOeXSFalg9flwk%2Fwq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDLgaX%2FSigx1MBJTeTSrcA2W4m6sxxam5mRpMt2FJGogHyEmY9af4D2Sc%2FeK99uFb%2B0AXFTT3tkPMcdEzChNTreOjuPkVfnrFb%2F1D%2FB9KaUNBNOrqIBqt%2B1GLMDZ6tgAWbIgU2k%2F7i18vhxJMUX87fPNTmyLGrBUn6ijTcUG4Czb5SkiX1rgUZil15d51vbg9M3%2FBLs1fb%2F0jVkaFvZjSlgeq4I83g%2BT5P9MO3ZH1jEy1dqsAT%2F76EQ63XFL2FhoeNgyTkD96acdZEPIdj4Rtc5tpdJtwweU9FVFUEGE2OekKvo%2B1OJNJQPHiqcq75DSLBOBVm4kOhmB8MKdgnwMAxuKJrNl7CV9seWLpg%2FKwKXfvzYg9%2BEZiCDWFmhyFQ2gh6ZjDt3EFji7LJbTVxEnbe0%2F3xgTRvDgoJf2kxaTWzhHteBahKQcDA%2FERXEAfMtY5FCnWpBwViP8oDE%2FgriaU2ljRF7tK8KrugGoQK2OP2oX2XWIWICQAfXj1u%2BOdqhEZZgBIEJP60a%2FdWt1z8arhzg%2Byq3uyevwExF36mkXCPYIYeTBUDpxjeSVUQUF0A5xGDCznnxYmo5M2NTWj9YM1KUEmevn8iZzer1Rii8YnWqal7LN2KfpcWpbgKs%2B4NQtWbnvYiOVfXj1ds02tMLyopM8GOqUBLwdfwX9nb5R1R9bYNHOgdHsCyWteuZ4EXYAiIRKNWop6yesk787kJa8mt5QDlISX5onTPJxsjNm3KhIxMExZAzjL7hb1RrT2jjYPbGGDs%2FZZQv7z4PIuag5cxvMIzEsWjUM9PVYO4OfswPE%2FPkOgZuOnJZRWzJp7vr1S0Bniug%2Bml3B1sVWgjnA00FxHNyI81nigNAGuU5XHx9IMZpiLp3mjwzwV&X-Amz-Signature=e51f2d463366cb071a86766e7dc1d119ce356baae1de201c9c45547686836aad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. Kapağı dikkatlice kaldırarak kutuyu açın.
> ℹ️ ***Not:**** Daha kolay erişim ve gelişmiş güvenlik için, SIM kart işlemlerini gerçekleştirmeden önce ana modül kutundan tamamen çıkarılabilir. Bu yaklaşım daha iyi görüş sağlar ve iç bileşenlere yanlışlıkla zarar verme riskini azaltır.*

1. Modül üzerindeki işaretli SIM kart yuvasından, mevcut SIM kartı sağdan sola doğru nazikçe iterek çıkarın. (İnce uçlu bir çubuk kullanabilirsiniz. SIM kart yuvasına zarar vermemeye dikkat edin. Takılı kart yoksa bu adımı atlayın.)
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/8a32817b-9afa-485f-be2b-1bf628d0e9bd/Embedded_Development_Pipeline.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46662JCM2OU%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDCQn23%2BdakaKV3NXP8YAmL4Dew45geyuQJkyy9MOqMZAIgO3%2F1WmpgbgivU7xlmGUXGyvRCroNohSIhihPurYmRyUq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDPbfuuSDX0YLxMQ8JircA75MYXXPTGPi1H%2BFhizaHNvMSGI5SlODT0RpJxJXVeiEzIcx8ZuDNBoRfe97mJhTBbF9ER4x1woYrczXGa2cxsS4oKGJ78%2FZVFtyf5%2FK2j26olMkntHo28emvLL%2BCunPmYjTI0Ep3OHvnpB8tYcvd3xoPrBrF%2BZjJrdopbmTKpSyjh3gUhdrgOuI58PFcsmtUZ9ver%2BIVIIYUvuDC2LsNerE2T8i1wQ2azs7GaRw9ZHx1UkQ5ZkTK%2Ft5TL6crexu03uKQLvFFYkIF%2B%2FQsef541ys7IbdXIHjxfnPTvSSlviEpiTvvatDC4V7kdjb9I2lBrCOri8Ee9auZN9O8ajLKVSrZAlmPq5PD8wnVZ1ukPSZOOoA2EL%2F6JUF8BYOsrE%2FJAqMrxGrkNkiCucdLz2KCIMjn934TSAGfCb4K2nozCWS1ibqvi6%2FcXHE8opBN2GTY5CWZgN7VCDLp2%2BJ8K4zTJyUpCTAO7ILHiDBM6x%2BKQf5CL%2FVpYGtTlhvuVfl3QLit8DRRg3ISFU1e%2BcWfHEFAnJfCDwwpn%2BktqMAaqKkacey2XJFF9W3je5ZdmwxBdcLaD%2BzAkYBpeuQPYyvzGbRa0BVLPrxeSO7lh1AWQmiF3hZMLFWKtoF7ywSHnryMPGvpM8GOqUBBEsVUeobhOgBRCra42la6vYTyRt%2BJy2iTL7QRakxoi73aYpHLidkx6Nzp8AMgoSyFS0YBEvQU3mGI%2FQ9B8eUMEwaHUXDO7p%2F2sgcD7PeiXcRhhMF0jOYtmtPHLGfw80Xei4HO%2FDiI%2BMNqSIQTveCkbrJw8dBYvgypB%2BLoamUxox5opzH%2FOYBB1bIFpDCaEMOKdn9Nc6gBpC1hjVBya1PSrxeq0SN&X-Amz-Signature=cf949f1ecad84489409544dc0e61b848709b71c3bc1f03320d79f869133fae1e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. Yeni SIM kartı, görseldeki gibi kesik köşesi sağ üstte kalacak şekilde yuvasına yerleştirin.
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/cd7a4869-9a83-4405-a12b-04ccaa5770d7/4c043856-159f-45e6-8707-510eb745ef04.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UMHKVITI%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBAaYWUpimg2wrxuKv6IFjZP5Ggs8g%2FHGGYenBKD9C6HAiEA87pk%2FgRjdNuwdVPdbzOZ9FHwvD50gGMWTQMHHk7vnq4q%2FwMIUhAAGgw2Mzc0MjMxODM4MDUiDOA6UMHHAm3qfHzzGSrcA%2Fil12arKZt6ljYEXLpAZOrfJv%2BrIvqaJzVWcBXarVj3Pnn5211PDfCUFW5%2BeBlmhUQOl1Xh7PVx3Om4SokgCBysNmGVlgOQKrB2jTgCncWEwzTGuP1Q8e%2BLsrcACO79LpOgltnLXqDAm0z1vP81UlBVLjeevACjd2jIA8BSKUVgRT%2Fejgi1P%2FtXGQml9h8jCeilOV2dMz0OQGbYIu9beD7KO4AwllLnA0ioX515baoqb%2FahBFWI5maooMmWNh%2BzvD2%2BbUeIknrc%2Fc3gWAD5fV1%2BBkrhgiBnok6hHVc7DNgTza6Ru0Yv0XSx1fqyVKW38OPxQL2U53Ysb9qbkADrtoRQ5csosDvjBpe7b02wxnoV4Q5qFd3zufOXNWxlDS%2FzdR6rxOt9UcLJpaD01v8XKNWU%2Fy6eFUiOBro2%2FamtXU5eWXUH%2FLrVfljtlwbWYAcRIbohqUlOZ7WeL%2Bre1XznaOttoMRWaKHVTJlnc2SvRKzj5CvQBgqP%2FD6hycKiFHhnvwMkozLT2gn4fihHq39I6aQ0PSj1eukEYR%2BJMP4AW17InAxNNsL6awESRa0fh%2BD6cbti4LVESlsKFVHAuCNHgomZ7bpL01Q6LxnxpychOkguUcC7WyEtox5irvyjMKL4o88GOqUBBP51rPa2o6ee6H3PtKvWBZyifuMavrTPYTAsTfPIBwfkhpwqnTuKfVGapsjtPlz%2BJhT69w%2Bm5%2FvY6BFyUMq6rMyhe3Bbawt9Ndb6HmHXxPLNawSl6aCVfT3oTtmH3ceJkeNlzsWbW6Ne1izSyEMU3pOc%2BGnxsMUddb71B9cuO6S60pnkL7jpdvSEncVYjgYsORw3JzFRD2FHS%2Fg0c0tIEOE6HhPV&X-Amz-Signature=07de5e78a3e6e08c43b358666d213d632cef9d4446c3c3994e5e774d1823757f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

---

### **Test Aşaması**

1. Antenin cihaza düzgün şekilde takılı olduğunu kontrol edin.
1. ON/OFF butonunu “ON” konumuna getirin.
1. Cihazın bağlantı kurma sürecini izleyin.
---

### **Kurulumun Tamamlanması**

1. ON/OFF butonunu “OFF” konumuna getirin.
1. Kutu kapağını kapatın ve 4 adet M4 Allen civatayı yerine takarak sıkıca vidalayın.
### Video

<!-- unsupported block type: video -->

## Sonuç

SIM kart değişim prosedürünün başarıyla tamamlanmasının ardından, Airqoon Sensör Ünitesi L sürekli hava kalitesi izleme operasyonlarına devam etmeye hazırdır. Cihaz otomatik olarak Airqoon Bulut Platformu ile bağlantı kuracak ve kesintisiz veri iletimi ile gerçek zamanlı çevresel zeka sunumunu sağlayacaktır.

**Kurulum Sonrası Doğrulama:**

- Cihaz durum göstergelerinin aktif bağlantıyı gösterdiğini onaylayın.
- 5-10 dakika içinde Airqoon kontrol panelinize veri iletimini doğrulayın.
- Tüm izlenen parametrelerin (PM, gazlar, meteorolojik veriler) doğru şekilde raporlandığını kontrol edin.


Bu prosedür, sensör ünitenizin hava kalitesi yönetimi için bilinçli karar almayı destekleyen doğru ve güvenilir çevresel veri sağlamaya devam etmesini sağlar. Teknik yardım veya ek destek için [support@airqoon.com](mailto:support@airqoon.com) üzerinden ekibimizle iletişime geçin.


