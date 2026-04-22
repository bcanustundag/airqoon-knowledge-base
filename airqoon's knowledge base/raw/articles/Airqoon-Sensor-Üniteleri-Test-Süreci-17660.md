---
title: "Airqoon Sensor Üniteleri Test Süreci 17660"
source: notion
notion_id: "8d433ede-be33-453c-80a5-2b0dd04dd86a"
tags: ["Domain", "Instructions"]
language: "TR"
created: 2024-07-23
last_edited: 2024-08-23
exported: 2026-04-22
---

# Airqoon Sensor Üniteleri Test Süreci 17660

- Eğer kalibrasyon ihtiyacı varsa test sürecinde önce yapılmalı. Eğer test süreci rutin kalibrasyon ihtiyacı ile çakışıyorsa test verisi kullanılmadan yapılabilir. (5.1)
- Test aşamaları:(5.3)
  - Test aşamaları için aşağıdaki iki yoldan biri izlenmeli
    - *Laboratory Pre-Tests → Extended Field Tests*
    - *Laboratory Pre-Tests → Laboratory Tests (Extended) + Short Field Tests*
- Test Kapsamı:(5.8)
  - Laboratory Pre Tests:
    - Response Time
    - Lack of Fit
    - Repeatablity
  - Laboratory Tests
    - Long Term Drift
    - Interferences Effect
    - Temperature Effect
    - Humidty Effect 
    - Memory Effect for Main Pollutant
    - Memory Effect for Temperature and Humidity
    - Wind Velocity Effect *(Zorunlu değil)*
    - Pressure Effect *(infrared absorption tabanlı sistemler için zorunlu)*
    - Electromagnetic Effect *(Zorunlu değil)*
  - Short Field Test
    - uncertainty etc.
  - Extended Field Test (x2 Shrt Fld Test)
    - uncertainty etc.
- Dinamik Seyreltme sistemi referans olarak kullanılıyorsa iki methodun da yıllık karşılaştırması yapılmalı ve uncertainty raporlanmalı (5.5) (iki method ne bilmiyorum)
- Sensör Ünitesinde bir değişiklik olursa bildirilmeli (5.7)
- Response Time ve Warm Up sürelerinin en uzunu bildirilmeli (7.1.3)
- Exposure Chamber:(7.2)
  - Referans Methodla ölçüm yapılmalı
  - Gazlar ve Interference’lar için %2 SD
  - Zero test için ; NO,NO2,SO2,O3 3 nmol/mol ve CO 0.1umol/mol
  - Sıcaklık +/-1 C
  - Nem +/- %5 RH
  - Basınç +/- 1 kPa
  - Rüzgar Hızı 0.5 m/s 0.3 m/s (anlamadım)
  - İçerideki hava homojen olmalı
  - Karşılaştırma yapılırken sadece SU ve Ref dikkate alınacak
  - Ref, SU’dan hızlı ya da eşit hızda sample almalı
- (3.9, 3.10)
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/0b9183f7-0dfa-44ef-a9b7-fe07a25500dc/Embedded_Development_Pipeline-4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663REI6GFO%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC8XymsnpvcYzsJDhGvoR%2BRW3XfMyYGyz%2FE%2BsSmtRcpXQIgUhWA4GdYkhEU661w0xngxRwAFs8xBDIZhU1t3D1qaoEq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDLpSOiUogQZnEZOWCSrcA6wzvpyYZqyDnt%2ButpFMk1wVKQMoGDI9CVnWl4zAJylzNRsZ20%2BVQMD6uEofUGJngQ6ie%2BtKRApGDpuqgZRsfBOS2DZaibNmgVFgxkbul4OD2rvbYaW2Nk4nrZAxngQJ5P143WKtb8ImYcipT5YfI91l94W4VAHER2ffersr6xpimjofSAna%2BlTA3zANYurGPoNocpRP34fMsUUzgeECRTiCtC5TyZge1lm19nRCkSD%2BGRPA2fXWOV1YqmNIcR7jNy50Xj6dgOBbQq0TJeh3Fc4sa5GxYSxLl%2FNFO9%2Bf0T7Tae4QPm3mBrTiNOnt3%2FB3PzfHqdxwkHePC%2F4MOFzUFn2puusTJj9oSD3hyzewWjxTKAFANqRT4HTTEtxvaWnWJpmzb6fLA%2FS4ggekWAq3DZQOsJLCETF%2BDokFRrK39afEFRJRXnXlSz1mnmRDoQOXKcnq6QfmpStxxzD3ZmQztYnlxIQR6tfHoap5QX%2F531zZDb2OQRwUseHX%2Bircw0QtDhDCJdHESWbpLWgVu0po7JYgW3Rdt3Au6UDUbTydR7dxdRh3eYVrj4p%2FGyGED90kYrQaziPcz6wbS1l9RJ2G1pDNdGOAdHQVGHleuc5dHLihkK5DtfcfHdg3gpX8MOimpM8GOqUBPNowfqyVn5yiGKbB4YkaXeuGJmivVqvmcFTwN%2Fdevy8NxgeVZ9XYZFKldeIBESmAMsl5nPQzuiWVI9tGyk%2BLM4NpF5zdfYZjbNRdndSZdru95AZsrXetYsvSkd1r9X4Rhjg3EsZDKdZ5%2Fgt%2FnIxLyt29ZqXxzi8Vl%2FZLl6V67loQTyf15JQ7aJCxGZXncTdFYwj4rT8o2ZFDc3qcA%2FB4ER%2BLMby3&X-Amz-Signature=3893b4979201360a1c6ffbe56cf79f1bda5022c7ea5feb48cdfeb289edec8f9b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- (7.3)
  - Teste başlamadan önce veriler stabil olmalı bu yüzden bir independent measurement süresi kadar beklenmeli.
  - Her bir stepte ortalaması alınmış 3 individual measurement olmalı.
  - Eğer response time 5 dakikadan küçükse, her bir individual measurement, 5 dakika ile independent measurement süresi arasında en uzun süre kadar, uzatılmalı.
    ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/550710b0-8d7c-4ef1-a734-e97471c1d6b4/Embedded_Development_Pipeline-5.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TLMEWIMC%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195950Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAcVBkQNueB49bITLmT%2BVy8foemXr98IyNm1uoWvor91AiEAxhm1GMITqsdqnvjPSpgCSjL3ovJLPP3%2FP7irXP0%2BaGgq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDKckqQ1M2ymHUtvaXyrcA5M2inv6YJZKsBXqlGt%2FUEztE%2B1zrVKIcygL4XmBsF1wyHAQAWDvn7myaRcRmJkhgv9RJAyj%2FFE%2FbgBWGqAPTBBNUPIXYH1opFVzIaNHuLJIo6JEa0PwzwD5F5t0KyfN2Hb3ozPb7ioGycCJUdXjWUH7j%2FYEeNB3TvXPNY3EbsxHQ6tgSiMb%2B7erZP4F%2F%2F3PLSIaqHX7me3flqSOEqROm2P7DokCN%2BUe%2BPkWeOTBhrG%2BLGyCS%2FgZMBqTmPM9Szi1GOaHNdojaATAk8q75HHspOnFLOMZRFb4F64szTB3MGDsBN7tmaxWDba6Yn8Fz74qW3imaUr%2F%2Bba5vaFqal72DBpN%2FwkpXt3iDRWGxjFuw8aioQTesfbaKjcyx72subDpun4P0W6nqAHkRvPOMr3SoPWL%2Bg%2FMUzSAhHXxGQ%2BWbi6GL0MOQrB0NlLXGGAN6n3iFreAEx%2Fqt1AiEwx2145RUJlijjUmEvXzcZfclK5iX8jMaWAI0ozRVPPaRBjHj%2BkDvS9%2FpWgTgzMXZtuXYL67ASwJxf2%2BMlToOsDWr8mpHSaAScwmFe9757BQvTFyjtbb%2Fd1Z3YgCrKyH91rUb%2BO50vvUaPPMWG3b7IFjWh95xaaU6wS9sqdtZPoykNajMNCtpM8GOqUBhkRjGqg%2FAm82JO%2BdL0h9%2B2UfEX5Mg%2BtOFF%2BoRp2%2BS2o0uX6ilPhhSGZh%2Fh1egLmMpSK3CyawDw83ONlylyjCUoqCjVYRgmOv3wdLutfYlrS6LS%2BGpDeGXc7mPnrMbPd67udeJWB0moQ%2FlPE1VV0RsqBlMXXY1YoleLN45%2Fm81GWd1E6564KnWejcRDPq%2BlEmh%2BH62rd3%2F%2Fu0xtIBixfsFpbxbGCf&X-Amz-Signature=1fe96f37b9e1c7b46edc716ba44cea33ad74971c6160a461e23be1311d93a6a3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- (5.8)
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/82631905-2ea9-4fa6-b489-535f1e326ee1/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YMYPFIZ2%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIA0EkdB%2BUoZHHqLf%2F%2FzY2jiORmfei%2BG2qIij4%2FO3k5hvAiEA%2BB%2F6S6fAse85UAOpC4%2BmJLW2H%2BwKmTmgFQ3GkuFE8woq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDCJEqA0X%2FVpZeH0JDyrcAy8c%2BlM%2BNBRW9r%2FwnL%2FVlVf6f7bUOyz9AC1BMpYKRfSH5frP9m%2BetTVlK%2BGpkO6CqGl1vloKAVel8%2BUY81dSI3FjBsJ9SypykV%2BgGX4U0Gex4Bun99dLHMWLEnaep6ujIofazrh4Yb9cudSI5Mr6zLYG%2BuVTZQt%2FVyz8GATVZwfOb3cetuy3PwOQuLuTvTkou9PVGR6ACkEOwGgPr4Y7cHb7jlVIQezOXuWJzj79diH2Rg6VJfPlEvuFF%2FYv0mASmEKiKuaqSDfelVr1oeMwaTkWNnbDIMrJLldQioZyjqS7hkhvQktDF85oYFHmjJk2pi6R%2BohDAHH1FUOTf82fAYkw12vtZklRKrnfH6F0%2BIWF82%2B708m5MVb%2BHknslOvs1NRmV3r7cXXHKh%2BlDYUINKy2XcD4%2BCh6WQw5JH2NAi4uTuNPaKS801A47EtDLYU6L%2FVdBzejcHqDUjiMIVRV3Cv0SZCJZ%2BB0I%2FCDBTtCD7qqJF7qpC5zO7UncxIE0zgxAXFUe3IkwSJwuuEgO25SDYsRIRGo2yUeSpeZ5H9pi58mfCHIOP6HYDmvw9xJi7eRfVJ1w%2F59ujhGG%2FVCb5Sonx1hmYIUc0r%2FjOBc4NRohGB%2BrSsOOmn9RwdPt6%2BqMKOtpM8GOqUBvZ16g58KimWV6NXc8XHbrLAwYuHnTQP1j55qRaidmv06k7S3qq6EEtm9J2vYb2XejHPphiCuTcWotcekx1p1ZvL7S3dS26di2Zdl%2BX8Kss4CJ37XiKycdSxxlAxOKZ%2Bo8vxOv0nx5b9RgPp0Xn0OtOWhlq1zrZOBywP2eSduWxwOch5QPnSGyraCZmVFkejUUsYApDRBLzgM4yT42%2F89A8b9%2BXHL&X-Amz-Signature=af7500b21469a732e1e407f0f95e313c0b6c2ac5ea4ed9d9ed3a313b89fb6227&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- (8.1)
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/b594d163-57aa-4c79-b9c2-e23d63081176/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CRQJRAI%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDY8O7oKY%2BW%2FH%2FjUzC7AUWgqLPraCAaL4EiZX2EpLUA2QIgPqSaRV4UxCs6UqqTZ84mQE%2BlmBPJNhVG9e%2FqpYgCtgkq%2FwMIUxAAGgw2Mzc0MjMxODM4MDUiDNQow7LKbnua2Z1E3CrcA72u%2Fie98CNYB591VWCDujWvhORmi2SUBlSce5CbfzPDRKMKQGqHQP%2Bc6dYLAmzQBwATkyAXCdbP8%2BrxIm6F3gCd3kjk8tqfK%2BGx0vv4j7kMvDIKVy04vTVHW5QTBWUs098Xp8RrjBwfLAEn4%2FqzOpxjAF9NCgwuudcbr7kPoNePzTaQGO8k9TBr8Z%2Fg%2FBr98NBKkOoCYzO7LV42JG2qyRFLr2Yfd43Q6isYglxJsYkJNJrM5p4yZsSi3P3WmS14o6adQAIWXIcLwDXttJa5xibCVpsvOCmGvK%2F1GudYS8UL9WmQHfRwrAm3EwWWnkUSgYLu7Hf8YungmyK65zBk%2BCcIZEpg%2FNHn9szajh6Rp3BLqCK6lyruI0t%2B18SH38sKI0Q9loZ3fzpqy2Y%2FUUhR9MmA8zMOlVMXi1ZDls8XWY7QhuvZCgQs5UTuikrEfFeG%2FcWzc40egbTjfZnII24imE079x0av6lu3pvZTYwrKhD6J%2BOJw0RoKlE29V61wJAnwbCXqYco%2BZxeIYGJaK%2FLXYhy3quIYcTZBMEQpZn7jVtZUigjU304ue5Dsq0QYw6tEdm9jN7nXvmoYSwS%2BO7AfhXmmOFajreyLjc35Qz7oCDDJgkYb0jMBizBdbLGMLORpM8GOqUBlk95CtPNF2vGqAGXADOn5lGdNDl5djKHVbYGbMLDjLc2cJ6F0J4hq1U8CX8Tn5VadiUUelS0NxdwtQreBhqwQMK6Rom1kpfIOEDlZSCUsCgpL1g4BgX2M3fv9WZhN79wvHoX4ht9zpW7%2F9JRI1XbY7w9kn7mxU6YwtmDbuGCfY03G9BnqXkjoXGPK8B7x8ndD7EbDGq%2Fzww2qlrLJCiSvKz7U9g5&X-Amz-Signature=a08386a283a8c6621b95af6284f33dca46f8a5b3b1146001950456a6bde15d7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Response Time (t90): Sensör sisteminin keskin konsantrasyon değişimleri sonrası stabil değere %90 oranında ulaşması için gereken süre (8.2.1)
  - Sensör sisteminin hızlı ölçüm yapması ve referans cihazın uygun bir response time ile ölçümleme yapması gerekmekte
  - Ek olarak referans değere gerek yok (analamadım)
  - Sıfırdan en yüksek seviyeye gaz geçişi en hızlı şekilde bir kaç dakika içinde yapılmalı
- (8.2.2)
  ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/ba69d859-8c4a-41c0-ada1-5454763b04c6/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XBXNYFX%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195952Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAl9ouBIgifB2kN6ma7o17T7ZsROHoLumhbYqC6BlcH9AiEA99wZqVQnrl%2BZNli4jqB8KvFyX9YmIuzowsatluVrycYq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDBJXPSW3KV2dhMzySSrcA%2BStguPncj0k9QyHnWaFKpd2Vjp8mRHv5sFg889M32p04pk2WPhwJRGY8DEWOcRmCfMB3Ha9r82NCbwZ2fRHy0GETYzXOnCWetsWhOqf4zJWl54e0o1dSZamM%2Ffr1oISvSSmsnOTyIUz6HhsJlieVRkg%2Bu1KbTPGv7kdil5rpBxfpn1Ury2LJZ9JOdYx8YYjFNcULCO4lTMRrzQ%2FR6KrLpolCMJfQ5jbepwTbyO%2FF3HyENiSwqX%2FZtxawwpp7w1EpnnjRWlyAPtpLqnSaQyJHsr6Np93Gu2%2B2Y0Af%2F9LHZnbfvdl89VCNfzbanxXW8LAH%2B6%2BK8tZSGmCqY5q8eL7NVHd5ggrLvX0uSdqoYto62t3w3AZ39OSanpROfxw2LqfsL%2BpW9YLpQ2YKEGUCoXofS4NqLrlhwQBI30mPqKcPopl5HbPR26cJ8wnN6r0mCXDeMET%2BPaobJpp%2FiU%2BKWnyktTzGaTKFub%2Bg4QPwC4yZbmboegQpoAwwMjtfNrAsRMO6fuS2ntsyO2SdxFSO6y3C2j5I21l3fQh%2BkDun0vz2fyaFuJLYUlX1CgnAGnfO%2BANzlm8m7M0JuxeJixoaISXk6%2BNPY4MdGQlG5EnLlwljQEbyLYAQRPLbfPFivosMNaupM8GOqUBj9YMjwvv%2FavX1VPxMSVly8eieCJhzOeaAT1JXAPUM3XXyhfuXPl%2F22k1nBDfDGa2wAFxUuJue41FdyAf84ZbNK1dLofgTCQRVE3YIKpb1J63%2FJsmIyTpNOsWICvIl3rBghlfANLd8XHUFa3eMM6jeeZRyxWcqCPSkhbrfogCY7oVqF6pyVjNh%2FgQbgcG8CvZqXq99IWSo5%2BEIabZJ2prvI0BERkV&X-Amz-Signature=998e8cedcf1f1efbea6c8721ba70ff69655c3728588867855bdbf95292d656eb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

  - Figure 3’teki 1-7  response time hesaplamak içindir. (8.2.2)
  - 7-18 (anlamadım)
  - Gaz seviyeleri table 2’dedir. (8.2.2)
  - 3 adımdaki “lag time + rise time”ların ortalaması ve “lag time + fall time”ların ortalaması alınır. Yani response time (rise) ile response time (fall) ın ayrı ayrı ortalamsı alınır. En büyük olan response time kabul edilir. (8.2.2)
  - Table 4’deki kriterler sağlanmalıdır (8.2.2)
  - Response time uncertainty’ye katkıda bulunmaz (8.2.2)
- Lack of Fit (8.3)
  - Test seviyeleri için table 2 kullanılır (8.3.1)
  - Figure 3’teki 7-13 aralığı regresyon’un (lineer) lack of fit’ini hesaplamak içindir. (8.3.2)
  - Sıfırlar dahil tüm ölçüm noktaları hesaba katılır. (8.3.2)
- Repeatability (8.4)
  - Figure 3’teki 19-24  repeatability hesaplamak içindir.(8.4.1)
  - Sensör Ünitesi’nin repeatability’si 6 x individual measurement’in standart sapmasını hesaplayarak elde edilir. (8.4.1)
  - Exposure Chamber’deki sensör sisteminin ölçümlerini etkileyen diğer parametreler göz ardı edilmez(8.4.2) (tam anlamadım)@Baris Can Ustundag 