---
title: "Airqoon Başlangıç Kılavuzu v4"
source: notion
notion_id: "199fb36e-07e7-80e8-a28b-dd05abd3bd5b"
tags: ["Guides"]
language: "TR"
created: 2025-02-13
last_edited: 2025-04-07
exported: 2026-04-22
---

# Airqoon Başlangıç Kılavuzu v4

<!-- unsupported block type: table_of_contents -->

# Kurulum

Bu belge, Airqoon Sensör Ünitesi L’nin kurulum aşamasında takip edilmesi gereken adımları kolayca tamamlamanıza ve kontrol ekranlarını etkin bir şekilde takip etmenize yardımcı olmak üzere hazırlanmıştır.

## Kutu İçeriği


Airqoon Sensör Ünitesi L, ana gövdeye kurulu olarak gelen iki kutu, sensörler, bir anten, iki çift duvar montaj adaptörü, bir güneş paneli, bir güneş paneli bağlantı ayağı, solar panel ara bağlantı soketi ve montaj için gerekli civatalardan oluşur. Sensör seçiminize bağlı olarak, sensör kutusu gaz, ortam ve partikül sensörlerini barındırır.



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/b743f8b5-61f8-4a16-81c1-52f300ebf380/airqoon_v2_blueprint_1x1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=a7d08e08d2e4f14c82e5495d9ca923fb7b68e5a851f9f7098cbb5318721f49a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



| **No** | **İsim** | **Adet** | **Açıklama** |
| --- | --- | --- | --- |
| 1 | Ana Gövde | 1 | Bütün bileşenleri birbirine bağlayan ve koruyan gövde parçasıdır. |
| 2 | Ön Panel | 1 | Ana Gövdeye 6 ve 7 numaralı bileşenlerle bağlanır.  |
| 3 | Solar Panel | 1 | Sensör ünitesine enerjiyi sağlar. 4 numaralı parçaya 8 ve 9 numaralı bileşenler yardımıyla monte edilir. |
| 4 | Solar Panel Montaj Plakası | 1 | Solar Panelin bir direğe en verimli çalışacağı açıda monte edilmesini saplayan montaj parçasıdır.  |
| 5 | Direk Montaj Adaptörü | 4 | Sensör Ünitesinin ve solar panelin saha kurulumu esnasında bir direğe bağlanabilmesine yarar. Adaptörlerden 2 tanesi sensör ünitesine, 2 tanesi solar panel montaj plakasına bağlanacak şekilde tasarlanmıştır. 8 ve 9 numaralı bileşenler yardımıyla ana gövdenin ve solar panel montaj plakasının arka paneline montajlanır. |
| 6 | M6 Düz Pul | 4 | Ön paneli ana gövdeye bağlamak içindir. |
| 7 | M6x12mm Allen Civata  | 4 | Ön paneli ana gövdeye bağlamak içindir. |
| 8 | m4 Düz Pul | 12 | Solar panel ve duvar montaj adaptörlerinin montajında kullanılır. |
| 9 | m4x12mm Allen Civata | 12 | Solar panel ve duvar montaj adaptörlerinin montajında kullanılır. |
| 10 | Solar panel ara kablo | 1 | Solar panel güç kablosunun core box üzerine bağlanmasını sağlayan, ara dönüştürücü kablo |
| 11 | Kelepçe | 4 | 5 Numaralı direk montaj adaptörlerinin bağlantısı sırasında kullanılacak kelepçeler. |
| 12 | Anten | 1 | Sensör ünitesinin internet bağlantısını sağlamaya yarar. |
| 13 | Plastik Kutu | 2 | İçerisinde elektronik donanımları barındırır. |



**Core kutusu;** pili, core devre kartını ve interconnect devre kartını barındırır. **Sensör kutusu** sensörleri ve sensor devre kartını barındırır. Ana gövde, ön panel ve arka panel olmak üzere iki parçadan oluşur.

**Uyarı:**** *****Montaja başlamadan önce, düğmeyi 0 durumuna getirerek sensör ünitesinin kapalı olduğundan emin olun.***

# Başlarken

Airqoon Sensor Ünitesi L; ana gövde, solar panel, bağlantı ayakları ve anten olarak demonte halde gelir. Sensör ünitesi solar panelli ise panel demonte şekilde kutunun alt tarafında konumlandırılmıştır. Aşağıdaki adımları takip ederek kurulumu tamamlayabilirsiniz. 

![Kutu görünümü](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/1c3427a0-3b20-4c33-a0ab-289e5c586a30/kutu.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=8fda8746de366feaaf26862571b14352de14cfe249b9f999e52e04302728154a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



**Dikkat:** Sensör kutusu üzerinde bulunan gaz sensörleri çok hassastır, lütfen temastan kaçınınız. Cihazınız gaz sensörüne sahip olmayabilir.

![Gaz Sensörleri](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/7a846945-4ca7-435a-8ef3-aac267cc3df0/sensorler.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=2f7acff3538f3c267b679c6027b1d9dd9845adb114f0796cdc9b394a809b2431&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

# Kurulum Adımları





## 1. Direk Montaj Ayakları



![Arka panele duvar montaj ayaklarının monte edilmesi](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/a4ddf78a-0c25-482c-bce6-ae2e904e776c/Balant_aya_2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=4dbb128d43f13c5e3b1c94a352763f2515e418804710b4bb22fe80464f6ece22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

Kutu içerisinden çıkan m4x12mm imbus civatalar ve düz pullar m3 allen anahtar kullanılarak panel üzerindeki yuvalarına monte edilmelidir. 



![Arka panel](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/f4201e96-1e10-466d-821f-a655bdb0c6b5/alu_body_3d_core_v7.1.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=a0ac996728ab9a5e2d540f1ca56d3eec97e4a97e7bc4e40086004dfa4bff3290&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)





## 2. Güneş Paneli Montajı

*Eğer güneş paneli ile çalışan bir airqoon Sensör Ünitesi L’ye sahipseniz aşağıdaki adımları gerçekleştiriniz. Adaptör opsiyonu ile ilerliyorsanız bu adımı atlayabilirsiniz.*



![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/2726bb7d-b7d9-4f00-8723-e233e145881f/solar_panel_ayak_balant.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=fd196dcd15465ac60a8cc787e10e8a4f0dd380ef233bbb7733f8afcba7c90722&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

Görselde görüldüğü gibi solar panel ve direk bağlantı adaptörlerini m4 allen civata ve pulları 3mm allen anahtar kullanarak solar panel montaj plakası üzerindeki deliklere monte ediniz.



## 3. Güç Bağlantısı

Airqoon Sensör Üniteleri enerjisini entegre solar panel ya da harici adaptörden alabilir.

### 3.1 Solar Panel Ara Bağlantısı

Setin içerisinde solar panelden gelen konnektörün core box üzerine bağlanabilmesini sağlayan bir ara kablo bulunur. Görsellerdeki gibi ara kablonun uygun ucunu core box üzerindeki power girişine bağlayınız. Diğer uçta kalan ip68 konnektör ucu ana gövde arkasındaki delikten dışarı çıkartarak boşta bırakınız, bu konnektör solar panel ve sensör ünitesinin direk montajı tamamlandıktan sonra solar panelden gelen konnektör ile birleştirilecek. 

![Solar panel - Core box ara kablo](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/2c986595-7514-4963-93f2-96efcad8af2d/core_box_-_solar_panel_ara_kablo.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=01d0f3ee6939bbefbea0e59c24de1802fb3006135b45c72ae87ec4b745060291&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)





![Solar panel güç kablosu bağlantısı 2](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/2ff9bf87-e589-4584-8507-3adc69c60551/solar_panel_soket_balant.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=8154b521362b9801180e2473d430704394daaa1c4ae410782e7fdfeb0d480704&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



![Solar panel ara kablo arkadan görünüm.](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/ac32a9ff-e401-4efb-83d7-4b40b037e3b1/core_box_-_solar_panel_ara_kablo_k.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=dfa4e783fddd93536f031403a24ae01efc7c4c9362e104e3ffb965c9df511d74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)




**Uyarı: *****Soketin tam oturduğundan emin olunuz.***



## 4. Ön Panel Bağlantısı

Airqoon Sensör Ünitesi L’nin güç bağlantısını tamamladıktan sonra sıra ön paneli monte etmeye gelir. Airqoon Sensör Ünitesi L ile birlikte gelen m6x15mm imbus civata ve pullar 5mm allen anahtar yardımıyla görseldeki gibi ana gövdeye monte edilir. 

![Ön panel bağlantısı](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/a0261fdf-dba0-4585-b40e-4c7352943f9a/big_case_4_delik_kapak_baglant.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195848Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=d7ce6ae521df8d2f55dc02729724c42e4059358928449ae36b34dc9a3811c074&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



## 5.  Anten Bağlantısı

Ön panel montajını gerçekleştirdikten sonra GSM antenini ana gövdenin sağ tarafındaki anten soketine monte etmek gerekir. Anten saat yönünde çevirilerek yerine takılır. Anten montajı bittikten sonra görseldeki gibi antenin dik konumda olduğundan emin olunuz.

![GSM Anteni](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/f403af36-fd81-4077-b43e-fa6a642d4053/anten.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=2ced5b4013206e3866b2ed310b1f6ce5925fe8ac21c1b954cb7dc0487f0cd0bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

## 6.  Gürültü Sensörü 

*Gürültü sensörü opsiyonel olarak seçilir. Eğer gürültü sensörlü bir airqoon Sensör Ünitesi L’ye sahipseniz aşağıdaki adımları gerçekleştiriniz. *

### 6.1 Bağlantı Ayağı Montajı

Gürültü sensörü ile birlikte gelen bağlantı ayağını ana gövdenin sağ üst kısmında bulunan bağlantı noktasına görseldeki gibi monte ediniz. Kutu içerisinden çıkan m4x12mm imbus civatalar ve düz pullar m3 allen anahtar yardımıyla monte edilir. Civatalar önce pul sonrasında bağlantı ayağından geçirilerek ana gövde üzerinde bulunan yuvalara sıkılmalıdır.

![Gürültü sensörü bağlantı ayağı montaj aşaması.](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/9e9b76f4-3380-4a20-8bc5-10748a2b08e1/alu_v2_noise_sensor3.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=69e8f5bcaa13bb2c23da79e53f12a9aba953536edc399ddecd5d9e330bc97955&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

### 6.2 Sensör Montaj Hazırlığı

Gürültü sensörü montajına başlarken ilk olarak sensörün alt tarafında bulunan somunun aşağıdaki görsellerdeki gibi sökülmesi gerekir. 

<!-- unsupported block type: column_list -->

### 6.3 Sensör Montajı

Gürültü sensörü alt kısmında bulunan somun söküldükten sonra bağlantı ayağı üzerinde bulunan delikten geçirilir ve somun tekrar yerine sıkılır. 

<!-- unsupported block type: column_list -->

### 6.4 Soket Bağlantısı

Ana gövdenin arka tarafından gelen gürültü sensörü soketi görseldeki gibi yerine bağlanır. Soket yerine yerleştirirken soket ve sensör üzerindeki karşılığının hizasına dikkat edilmelidir. Soket oturtulduktan sonra üzerineki bağlantı somunu saat yönünde çevirilerek sabitlenir.

<!-- unsupported block type: column_list -->

## Kurulum Sonrası

### 1. Test

Yukarıdaki adımları tamamladıktan sonra sıra cihazınızı çalıştırıp, bağlantı kontrolü yapmaya gelir. Sensör ünitesinin güç butonu arka panelde bulunan deliğin iç tarafına konumlandırılmıştır, buradan butonu açık konuma getirerek cihazı çalıştırabilirsiniz. Sensör ünitesi çalışmaya başladıktan sonra durumunu anlık olarak takip etmek için ana gövdenin sağ tarafından içeri doğru bakarak core kutusunun üzerine yerleştirilmiş ledi takip edebilirsiniz. Led durum renkleri aşağıdaki gibidir.

[**🔵**](https://emojipedia.org/large-blue-circle)Mavi       -     Bulut bağlanma
[**🟢**](https://emojipedia.org/large-green-circle)Yeşil        -    Bağlantı kuruldu, normal çalışma
[**🟡**](https://emojipedia.org/large-yellow-circle)Sarı         -    Ölçümler buluta gönderildi ve derin uyku moduna geçiş
[**🟣**](https://emojipedia.org/large-purple-circle)** **Mor        -   Yazılım güncellemesi

[**⚪**](https://emojipedia.org/white-circle)Gri          -    Ünite uyku/kapalı konumu



### 2. Saha Montajı

Airqoon Sensör Ünitesi L’nın saha montajında ölçüm noktası seçimi çok önemlidir. Kurulum yapılacak ölçüm noktası ihtiyaçlara göre özel olarak belirlenmelidir.



- **Dış mekan hava kalitesi ölçüm noktaları**:
  - **Yakın çevre**: Mobil cihazlarla yakın çevredeki kaynaklardan alınan hava verileri.
  - **Ortam**: Genel dış mekan havası.
  - **Arka plan**: Dış mekandaki genel havadan daha uzak noktalardan alınan veriler.
- **İç mekan hava kalitesi ölçüm noktaları**:
  - **Mesleki**: İş yerlerindeki hava kalitesi.
  - **Konut**: Konut alanlarında alınan hava verileri.


![Hava kalitesi ölçüm noktaları. Ref: EPA - The Enhanced Air Sensor Guidebook 2022 ](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/0ca1afdf-9219-49a2-9add-761a2a87c023/hava_kalitesi_lm_konumlar.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=8ab4d8f491c754a3e40eb45fd6e0855c81d6ab5aed3f7e179e5615939e6a34e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

Yukarıdaki ölçüm noktaları içerisinden ihtiyaç duyulan alanda uygun bir bağlantı noktası seçilerek bu noktaya kurulum sağlanmalıdır. Seçilen kurulum noktası, hedeflenilen ölçüm şeklini temsil etmelidir.  Trafik yoğunluğu, endüstri bölgeleri veya yeşil alanlar gibi farklı bölgelerde sensörler farklı sonuçlar verebilir. Örneğin, trafik yoğunluğu olan bir caddenin yanına yerleştirilen sensör, trafik kaynaklı kirliliği doğru ölçebilir.



**Hava Kalitesi Sensörü Kurulumu İçin Dikkat Edilmesi Gereken Noktalar:**

1. **Konut Mesafesi**:
  - Sensör ünitesi, en az **5 metre** uzaklıkta bir konuttan yerleştirilmelidir. Bu, konut kaynaklı hava kirliliğinin sensör verilerini etkilemesini önler.
1. **Sabit Kirlilik Kaynakları**:
  - Sensörün kurulacağı bölgede sabit bir hava kirliliği kaynağı olmamalıdır. Örneğin, fabrika bacaları veya trafik yoğunluğu olan bölgelerden uzakta olmalıdır. Eğer belirli bir kirleticiyi ölçmek istemiyorsak, bu kaynağın sensörün ölçümünü etkilemeyeceğinden emin olmalıyız.
1. **Engeller ve Gölgeler**:
  - Sensör ünitesinin ölçüm yapmasını engelleyecek herhangi bir engel olmamalıdır. Örneğin, çok yakında olan bir ağaç, sensöre ortamdaki kirliliğin doğru miktarda ulaşmasını engelleyebilir ve yanlış ölçüm sonuçlarına yol açabilir.
1. **Solar Panel Yönü **
  - Güneş panelini maksimum performansında kullanmak için, üniteyi güneş paneli çoğunlukla doğrudan güneşe maruz kalacak şekilde yerleştirin. 
  - Güneş panelleri, güney yönüne bakmalıdır. Bu yön, gün boyunca ve kış aylarında güneşin gökyüzünde daha düşük olduğu zamanlarda en fazla güneş ışığını yakalar.
  - Gölgeleme: Güneş panelleri için seçilen konumun ağaçlar, binalar veya diğer engellerden kaynaklanan gölgelemeden arınmış olmasına dikkat edin, özellikle güneş ışığının en yoğun olduğu saatlerde (genellikle sabah 9 ile öğleden sonra 3 arası).




Airqoon Sensör Ünitesi L ve solar panel arka düzlemdeki duvar adaptörleri ve kutu içerisindeki kelepçeler aracılığıyla bir elektrik direğine monte edilmelidir. Güvenlik nedeniyle, ünitenin kolayca erişilemeyeceği yüksek bir yere monte edilmesi önerilmektedir. Önerilen yükseklik 4-6 metre arasındadır. 

![Aiqoon Sensör Ünitesi L direk bağlantısı 1](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/84a4325a-4f5d-420d-9e12-a948f85c1617/malezya_sunum_2.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=f23038ebd690429a446b215933826f412531c992dea6d14855dd2fc7f936b4c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



![Aiqoon Sensör Ünitesi L direk bağlantısı 1](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/8c2ef467-c480-4577-b20c-c39675e7002f/malezya_sunum4.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=a6188c7bd40df891b2f39b3a4c678b793b8c6f3645a65cf0a1cc43bae29566f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



Aiqoon Sensör Ünitesi L ve Solar panel montajı tamamlandıktan sonra sıra solar panel güç bağlantısını yapmaya gelir. Solar panelden gelen konnektör ve Airqoon Sensör Ünitesi’nden gelen konnektörler bağlanarak güç bağlantısı tamamlanır. Konnektörler uç uca geçirildikten sonra solar panalden gelen konnektörün ucundaki mavi kısım saat yönünde çevirilerek sensör ünitesinden gelen konnektörle tamamen bağlanmış olur.


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/565d93ae-d124-4151-a9a4-4614297e83ec/malezya_sunum6.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=e003b8ec0a3fc1fb1430dae8b872d528becb5d14f4205127636c1a902751b114&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/7b7a52a8-e4a0-4e22-8870-8637839d97a4/malezya_sunum7.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFYKKZQ3%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIApWasnSHhKkdKARoyj%2BfVIA7TINUIjmn%2Bj8YytWfdovAiAdlsR7h2ePemiSM%2Fqkd6Y09mMIToet3aIj2wQ0nVJTnir%2FAwhTEAAaDDYzNzQyMzE4MzgwNSIMPdbs7o%2FWinJsg2nkKtwDHI9zpvtFAgWA9t8pRh2e6iWD7NJQS%2BR%2FAUCjICNiTQOP98MPgCV3il9jjC1AJYo%2BOls6mUmwN2aznaLCzsEaguTIQeX6qX00B%2BFlsBKhrAVa5CnHq1LBXsmIzHc9xcJl0lh8MPbDAuWb93weCxG7YfZzl6LG0vThbXWiBVF3dfhOyMsfKfjYCCnzCkeRhLsofU15nQSlujfRbcxRz2J3KP4iCBeFhaz0Sst4TknUJvhWGx9dEHxjkBFebuxumLxuNSlyv4ZKx3Go7qZlkiLIES59xDvthWfy8C9gvnYB6vQkd9vQUnd9veOd3qlNHJhOMJVi800FBsh1ysNiarAuMCYZGZxNkKmLUd50LFGhn0yLGBGI%2FEzBq4kQ1HNyRS4B1jJgflKznTPFaw8bEs35PKdxKGJhXWlkVQFhjNuxRqtrwMEK09ypvhWljj613JdQexZvCWT3OnxXLAgW6Knqa3vXCtaYjzYdER96YwO1xWNVyzvXMly6SibHSSPS5bxEyCVwylqxBKjxdu4ImIaPc%2FOnoO5YJeqvUKHLjJtHWqPf7DLjEmhY7mZ7EFiwWN53WSge9NBotxtd5MtYZ9fiFgJWaKg0lvFIGrhGDt%2FPirWGCF8uhOaFrmh7yggwsKKkzwY6pgHAad7%2BZNaJIcyRAkj3XKQWTqBEQY05mNPPdmNSC8oXbl75IpC6igLZvCHf1LfJFqOh2ulEFo4kBif1H747FZp4b8ieP8DJ4GdVuu1FUxbbHIryf2qzZs%2F7XNX82pxXGOlnB5FCbf0wcNz535%2FKE0IGWcek6gJVW8cJFP1zmCqSgJHqdLlGJ848i%2Fi8zvOdC7SOERDz%2BbsxrHZSn8o%2BXNxVmIK4BXg7&X-Amz-Signature=e5d87ade4c1e4a891b35fc20a2e1fee97ed03388c8851624e676045e77f3d035&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

# Çevre Bulutu 

## Kontrol Paneli

Airqoon Sensör Ünitesi L tarafından toplanan verilere erişmek için airqoon ekibi tarafından bir kullanıcı hesabı sağlanır. Herhangi bir hesap kimlik bilgileriniz yoksa, lütfen [support@airqoon.com](mailto:support@airqoon.com) aracılığıyla bize ulaşın.

Giriş yaptıktan sonra, sensör ünitelerinizi bir liste olarak ve harita üzerinde görebilirsiniz. Tek bir cihazdan veri almak isterseniz, listelenen birimin sağ tarafındaki rapor simgesine tıklayabilir ve geçmiş verileri görselleştirebilirsiniz.

Veriler, cihaz kontrol panelinden “csv” veya “xls” olarak dışa aktarılabilmektedir.

![Sensör ünitelerinin listesini içeren Ana Kontrol Paneli](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/4c33a5b4-34a5-4913-b598-ab17ad453a13/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SBDCYRY%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0fjZle6Jmh8KYUCdndLuz7vQMnHRtTmvkC%2BAzdEf%2BegIgLR5jJ%2BxA4CgRTwTVXA4BlzbABT4AH0%2FvLhCCMV3zGQYq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDDLT4UAGN%2FTW%2B0TJFCrcAyF%2BVGG9oZaJWxzDRHb7eetf%2FGhahXjuTsQX5g5wcPFAiLNqzD3b4XNi%2BHHQ0rZVTMWm0CHhuc0QxA8HTF32txIZcOChzzejVv2ImRbPbK3DB9Us2G%2Fq0BJKOSAD%2BFqKWd%2FyymLcXAxMF%2FYzrbmFIN5h2WdZLI8rTAt50%2FXsEc2SbDe7zQbbgPDwMqJvKTmeDmkSHIglTMyIqGmIbdv23t4mSVHvLLnZO3xWo%2B21JF6Q8BKhQOoKPmd2ekUesiYHJRbiA6YJwjm6dXUKBoWbHIgfv6ancVRJskS21KXkgF745dzNwKbhtGt84E2V%2FZeGuZGAy3nTWN4iBKkCR%2BCak8iOIyhCj4%2FBwcrB0WHYYOdYvo47AJXTOdl1VjbewJOdqPOAf060SL7wtCr3Cv2zQaV2eQrj4yLax%2FwFwpl9aJsVfIc%2FqhjfouBRknUkAZBMWv6dv%2FWynLnORp5KaIwc53bctz72o%2BFHSbQdI9IDpSOfddu51niTn5s23OBzKAZkJhf0MDs8vufEutNO2URWpXYL4gEz%2Fhm8CFoeXEQpWrvFlfJj3VUz3mBcsTSm%2FOTsjYbTC5UBxJ9en2PrFwETEz3stetAglg0jU8fQLW7FohzBUyaH4FGyjcTjacKMPmqpM8GOqUB9SObrqU0EadKl8Pbr%2Bt4%2F838h2TSHPeXTO0KCCRfaurB%2BV%2BSYPyCxAfLbxniYDSEFbIUIyCsQlvu7%2Byhh3yPrWFyxRI5G7htNEwqPv41SslfuMGkin23OihaIOMCRT5TW78w6QTcuQcRZdxwTVcuSsG%2FT5xbMuIFfTILoFDPNFVg3MckDErfCCwe125pq0o7UHEms0zyrGGarM2L6f0q38DmOBWJ&X-Amz-Signature=dd3fb32230157a40c7795f8ded78c82c57cec86505fe652e0ec0b7dcf7825463&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

![Tek sensör ünitesi için geçmiş ölçümlerin ayrıntılı grafiği](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/8739b481-25a5-4b60-ad6a-ff596201a133/Untitled2.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SBDCYRY%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0fjZle6Jmh8KYUCdndLuz7vQMnHRtTmvkC%2BAzdEf%2BegIgLR5jJ%2BxA4CgRTwTVXA4BlzbABT4AH0%2FvLhCCMV3zGQYq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDDLT4UAGN%2FTW%2B0TJFCrcAyF%2BVGG9oZaJWxzDRHb7eetf%2FGhahXjuTsQX5g5wcPFAiLNqzD3b4XNi%2BHHQ0rZVTMWm0CHhuc0QxA8HTF32txIZcOChzzejVv2ImRbPbK3DB9Us2G%2Fq0BJKOSAD%2BFqKWd%2FyymLcXAxMF%2FYzrbmFIN5h2WdZLI8rTAt50%2FXsEc2SbDe7zQbbgPDwMqJvKTmeDmkSHIglTMyIqGmIbdv23t4mSVHvLLnZO3xWo%2B21JF6Q8BKhQOoKPmd2ekUesiYHJRbiA6YJwjm6dXUKBoWbHIgfv6ancVRJskS21KXkgF745dzNwKbhtGt84E2V%2FZeGuZGAy3nTWN4iBKkCR%2BCak8iOIyhCj4%2FBwcrB0WHYYOdYvo47AJXTOdl1VjbewJOdqPOAf060SL7wtCr3Cv2zQaV2eQrj4yLax%2FwFwpl9aJsVfIc%2FqhjfouBRknUkAZBMWv6dv%2FWynLnORp5KaIwc53bctz72o%2BFHSbQdI9IDpSOfddu51niTn5s23OBzKAZkJhf0MDs8vufEutNO2URWpXYL4gEz%2Fhm8CFoeXEQpWrvFlfJj3VUz3mBcsTSm%2FOTsjYbTC5UBxJ9en2PrFwETEz3stetAglg0jU8fQLW7FohzBUyaH4FGyjcTjacKMPmqpM8GOqUB9SObrqU0EadKl8Pbr%2Bt4%2F838h2TSHPeXTO0KCCRfaurB%2BV%2BSYPyCxAfLbxniYDSEFbIUIyCsQlvu7%2Byhh3yPrWFyxRI5G7htNEwqPv41SslfuMGkin23OihaIOMCRT5TW78w6QTcuQcRZdxwTVcuSsG%2FT5xbMuIFfTILoFDPNFVg3MckDErfCCwe125pq0o7UHEms0zyrGGarM2L6f0q38DmOBWJ&X-Amz-Signature=23f0602a8891ef3c7f8b218cc0ff50620ba240edfbd5e15550f3168cd0e3d159&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



## Rapor Takibi

Airqoon Sensör Ünitesi tarafından gerçekleştirilen ölçümlerin aylık raporlarına kolayca ulaşabilirsiniz.

![Rapor ekranı](https://prod-files-secure.s3.us-west-2.amazonaws.com/d9a623c6-af34-4160-8ce1-2b83b1ba4d7e/f39c5778-254a-4805-a27a-be9af796c1a7/ss-lens.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666SBDCYRY%2F20260422%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260422T195849Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0fjZle6Jmh8KYUCdndLuz7vQMnHRtTmvkC%2BAzdEf%2BegIgLR5jJ%2BxA4CgRTwTVXA4BlzbABT4AH0%2FvLhCCMV3zGQYq%2FwMIVBAAGgw2Mzc0MjMxODM4MDUiDDLT4UAGN%2FTW%2B0TJFCrcAyF%2BVGG9oZaJWxzDRHb7eetf%2FGhahXjuTsQX5g5wcPFAiLNqzD3b4XNi%2BHHQ0rZVTMWm0CHhuc0QxA8HTF32txIZcOChzzejVv2ImRbPbK3DB9Us2G%2Fq0BJKOSAD%2BFqKWd%2FyymLcXAxMF%2FYzrbmFIN5h2WdZLI8rTAt50%2FXsEc2SbDe7zQbbgPDwMqJvKTmeDmkSHIglTMyIqGmIbdv23t4mSVHvLLnZO3xWo%2B21JF6Q8BKhQOoKPmd2ekUesiYHJRbiA6YJwjm6dXUKBoWbHIgfv6ancVRJskS21KXkgF745dzNwKbhtGt84E2V%2FZeGuZGAy3nTWN4iBKkCR%2BCak8iOIyhCj4%2FBwcrB0WHYYOdYvo47AJXTOdl1VjbewJOdqPOAf060SL7wtCr3Cv2zQaV2eQrj4yLax%2FwFwpl9aJsVfIc%2FqhjfouBRknUkAZBMWv6dv%2FWynLnORp5KaIwc53bctz72o%2BFHSbQdI9IDpSOfddu51niTn5s23OBzKAZkJhf0MDs8vufEutNO2URWpXYL4gEz%2Fhm8CFoeXEQpWrvFlfJj3VUz3mBcsTSm%2FOTsjYbTC5UBxJ9en2PrFwETEz3stetAglg0jU8fQLW7FohzBUyaH4FGyjcTjacKMPmqpM8GOqUB9SObrqU0EadKl8Pbr%2Bt4%2F838h2TSHPeXTO0KCCRfaurB%2BV%2BSYPyCxAfLbxniYDSEFbIUIyCsQlvu7%2Byhh3yPrWFyxRI5G7htNEwqPv41SslfuMGkin23OihaIOMCRT5TW78w6QTcuQcRZdxwTVcuSsG%2FT5xbMuIFfTILoFDPNFVg3MckDErfCCwe125pq0o7UHEms0zyrGGarM2L6f0q38DmOBWJ&X-Amz-Signature=be87093a6dfe5c528c09c10818ac6fc1127a5b5c067e34070c799910b770025c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)




