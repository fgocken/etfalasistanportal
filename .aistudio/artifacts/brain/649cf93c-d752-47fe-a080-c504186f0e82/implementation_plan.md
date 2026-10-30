# Haftalık Çalışma Programı & Günlük Post-op Hekim Gösterimi

Haftalık mesai programının (Pazartesi - Cuma ameliyathane salonları, yoğun bakımlar ve poliklinik görev yerleri) PDF'ten çekilerek klinik araçlar arasına eklenmesi, sunucu senkronizasyonu ile admin şifreli yönetimi ve mesai günlerinde karşılama sayfasındaki nöbet şeridi altında günün Seyrantepe & Sarıyer Post-op hekimlerinin şık rozetler halinde görüntülenmesini sağlayan mimari plan.

---

## Kullanıcı İncelemesi & Kritik Kararlar (Confirmed Decisions)

> [!IMPORTANT]
> Kullanıcı ile 1. Aşamada netleştirilen kararlar ve mimari tercihler:

- **Aracın Başlığı ve Odak Noktası**: **"Haftalık Çalışma Programı"** olarak adlandırılacak; sade, gereksiz açıklamalardan arındırılmış, haftalık gün sütunları (Pazartesi-Cuma) ve salon/birim satırlarından oluşan bir matris ile hekim bazlı hızlı arama sunulacak.
- **Haftalık Programın Güncellenmesi**: Admin şifresi (`furkan1825`, SHA-256 doğrulamalı) ile yeni haftalık PDF yükleme (`.pdf` / `.xlsx`) ve arayüz üzerinden gerektiğinde manuel hücre düzenleme / takas imkanı sağlanacak.
- **Karşılama Sayfasında Post-op Gösterimi**: Nöbet şeridinin (`DutyRosterTickerBar`) hemen altında, **yalnızca mesai günlerinde (Pazartesi - Cuma)** Seyrantepe Post-op (`POST-OP YBÜ` satırındaki hekim) ve Sarıyer Post-op (`SARIYER -1 YBÜ` satırındaki hekim) yan yana rozetler halinde zarif ve dikkat çekici şekilde görüntülenecek. Hafta sonu veya resmi tatil günlerinde otomatik olarak gizlenecektir.

---

## 1. Genel Bakış & Temel Konsept

Klinikte her hafta yayınlanan mesai programında dikey sütunlar günleri (ör. 26.10.2026 - 30.10.2026), yatay sütunlar ise cerrahi ameliyathane salonlarını ve klinik birimlerini (Genel Cerrahi, NRŞ, KVC, YBÜ, Post-op YBÜ, Dış Anestezi, Sarıyer Yerleşkesi vb.) temsil eder. Resmi tatil günlerinde (ör. 29 Ekim Cumhuriyet Bayramı) sütunda hekim ismi yer almaz ve "TATİL" ibaresi bulunur.

Bu sistem iki kritik ihtiyacı çözer:
1. **Karşılama Ekranında Anlık Bilgilendirme**: Mesai saatlerinde kliniğe giren asistan, uzman ve intern hekimler nöbet şeridinin hemen altında o günün **Seyrantepe Post-op** ve **Sarıyer Post-op** hekimlerini saniyeler içinde öğrenir.
2. **Klinik Araç Portalı**: Asistanlar veya cerrahi ekipler "Haftalık Çalışma Programı" aracını açarak tüm haftanın dağılımını inceleyebilir, hekim adına göre arama yaparak ilgili hekimin hangi gün hangi salonda çalıştığını tek bakışta görebilir.

---

## 2. Kullanıcı Deneyimi & Görsel Tasarım

### A. Karşılama Sayfası Post-op Rozet Şeridi (`WelcomeScreen.tsx`)
- **Konum**: Nöbet şeridinin (`DutyRosterTickerBar`) hemen altı, film şeridi konteynerinin üstü.
- **Görsel Dil**: 
  - İki adet yüksek kontrastlı, sade ve kompakt klinik rozet:
    - `[Seyrantepe Post-op: DR. EREN]` (Teal / Turkuaz tıbbi ton)
    - `[Sarıyer Post-op: DR. BERKAN]` (Amber / Sarıyer klinik tonu)
  - Tek tıkla "Haftalık Çalışma Programı" detayını açma affordance'ı.
  - Hafta sonlarında (Cumartesi / Pazar) veya resmi tatillerde temiz bir şekilde gizlenir (`null` döner, yer kaplamaz).

### B. "Haftalık Çalışma Programı" Klinik Aracı (`WeeklyScheduleToolView.tsx`)
- **Portal Entegrasyonu**: `PortalWorkspace.tsx` içindeki araç menüsüne (`ALL_CLINICAL_TOOLS.schedule`) eklenir. İkon: `Clock` / `CalendarRange`.
- **Üst Eylem Çubuğu**:
  - Sol tarafta hafta tarih aralığı (ör. *26 Ekim - 30 Ekim 2026 Çalışma Programı*).
  - Orta alanda **Hekim Arama Çubuğu**: İsim yazıldığında (ör. "BERKAY", "FATMA", "YAKUP") o hekimin bulunduğu tüm hücreler anında vurgulanır.
  - Sağ tarafta **PDF Yükle** butonu (Admin şifresi kilitli) ve **Düzenleme Modu** butonu.
- **Matris Tablo Görünümü**:
  - Dikey sütunlar: Pazartesi, Salı, Çarşamba, Perşembe (Tatil rozeti), Cuma.
  - Yatay satırlar: Görev yerleri (GC, NRŞ, Ortopedi, KBB, Plastik, Üroloji, KVC, YBÜ, Post-op YBÜ, Dış Anestezi, Poliklinik, Sarıyer YBÜ, Sarıyer -1 YBÜ vb.).
  - Günün sütunu hafifçe vurgulu (bugünkü mesai günü).
  - Resmi tatil günü (`29.10.2026`) dikey sütunu sütun boyunca temiz bir tatil bandı olarak gösterilir.
- **Tasarım Kuralları**: Sıfır yapay zeka jargonu, kutu içine kutu karmaşası yok, net tipografi (`Plus Jakarta Sans` + `font-mono tabular-nums`), tam karanlık ve aydınlık tema uyumu.

---

## 3. Temel Ürün Kararları & Mimari Tercihler

| Karar Alanı | Seçilen Yaklaşım | Gerekçe & Avantaj |
|---|---|---|
| **Veri Yapısı** | Haftalık şema modeli (`WeeklyWorkSchedule`) | Tarih, gün adı, tatil durumu ve birim bazlı görevli hekim dizisi (`unitName`, `assignedDoctor[]`). |
| **Kalıcılık** | Full-Stack Express `/api/schedule` + `data/weekly_schedule.json` | Sunucuya kaydedildiğinde hastanedeki veya nöbetteki tüm hekimlerin ekranlarında otomatik senkronize olur. |
| **Varsayılan Veri** | 26-30 Ekim 2026 PDF verisi gömülü | Uygulama açılır açılmaz kullanıcının yüklediği PDF'teki tüm hekim yerleşimleri (Sayfa 1, 2 ve 3) hazır gelir. |
| **Güvenlik** | SHA-256 Şifre Koruması (`furkan1825`) | Nöbet yükleme ile birebir aynı standart; yetkisiz program bozulmalarını önler. |
| **PDF Ayrıştırma** | PDF / Metin ayrıştırıcı & esnek Excel içe aktarıcı | Gelecek haftalarda yeni PDF veya şablon Excel yüklendiğinde otomatik çözümleme yapılır. |

---

## 4. Teknik Mimari & Veri Stratejisi

```
┌────────────────────────────────────────────────────────────────────────┐
│                        İstemci Katmanı (React)                          │
├───────────────────────────────────┬────────────────────────────────────┤
│         WelcomeScreen.tsx         │        PortalWorkspace.tsx         │
│  ┌─────────────────────────────┐  │  ┌──────────────────────────────┐  │
│  │    DutyRosterTickerBar      │  │  │   ALL_CLINICAL_TOOLS.schedule│  │
│  └──────────────┬──────────────┘  │  └──────────────┬───────────────┘  │
│                 ▼                 │                 ▼                  │
│  ┌─────────────────────────────┐  │  ┌──────────────────────────────┐  │
│  │    TodayPostOpBadgeBar      │  │  │  WeeklyScheduleToolView.tsx  │  │
│  │ (Seyrantepe & Sarıyer Post-op) │  │  │ (Haftalık Matris & Arama)    │  │
│  └─────────────────────────────┘  │  └──────────────────────────────┘  │
└─────────────────────────────────┬─┴────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  WeeklyScheduleService (State & Cache)                 │
│  - getWeeklySchedule(): WeeklyWorkSchedule                             │
│  - getTodayPostOpDoctors(): { seyrantepe: string, sariyer: string }    │
│  - saveScheduleToServer(schedule): Promise<boolean>                    │
└─────────────────────────────────┬──────────────────────────────────────┘
                                  │
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Express Sunucusu (server.ts)                       │
│  - GET  /api/schedule  ──> data/weekly_schedule.json dosyasını oku     │
│  - POST /api/schedule  ──> data/weekly_schedule.json dosyasına yaz     │
└────────────────────────────────────────────────────────────────────────┘
```

### Yapılacak Uygulama Adımları:
1. **`src/types/weeklySchedule.ts`**:
   - `WeeklyWorkSchedule`, `WorkDaySchedule`, `UnitAssignment`, `PostOpStatus` tiplerinin tanımlanması.
2. **`src/services/weeklyScheduleService.ts`**:
   - 26-30 Ekim 2026 PDF'inden çıkarılan tüm birim/gün/hekim eşleşmelerinin varsayılan veri olarak eklenmesi.
   - `getTodayPostOpDoctors(date?)` fonksiyonu: Eğer mesai günüyse `POST-OP YBÜ` (Seyrantepe) ve `SARIYER -1 YBÜ` (Sarıyer) hekimlerini döner.
   - Sunucu GET/POST API senkronizasyon fonksiyonları.
3. **`server.ts`**:
   - `/api/schedule` endpoint'lerinin eklenmesi ve `data/weekly_schedule.json` kalıcılığı.
4. **`src/components/schedule/TodayPostOpBadgeBar.tsx`**:
   - Karşılama sayfasında nöbet şeridi altına yerleşen, mesai günlerinde iki post-op hekimini şık rozetler halinde sunan kompakt bileşen.
5. **`src/components/schedule/WeeklyScheduleToolView.tsx`**:
   - Dikey gün sütunları, yatay birim satırları, hekim arama çubuğu ve admin şifreli yönetim butonları ile temiz haftalık program aracı.
6. **`PortalWorkspace.tsx` & `WelcomeScreen.tsx` Entegrasyonu**:
   - Yeni klinik aracın araç menüsüne eklenmesi ve karşılama sayfasına `TodayPostOpBadgeBar`'ın dahil edilmesi.
7. **Doğrulama**:
   - `lint_applet` ve `compile_applet` testleri ile sıfır hata onayı.
