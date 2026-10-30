# Çoklu Ay Excel Nöbet Takvimi Yükleme & Sunucu Kalıcılığı Uygulama Planı

## Özet
Kullanıcının bir sonraki ayın (örneğin Kasım 2026 ve devamı) nöbet takvimini Excel formatında frontend üzerinden yükleyebilmesi, sistemin yüklenen Excel'deki ay/yıl ve nöbetçi doktor dağılımını (Seyrantepe 1-6, Sarıyer 1-4) otomatik olarak tanıması, takvimin tüm ziyaretçiler için sunucu tarafında kalıcı olarak saklanması ve aylar arasında (Ekim 2026, Kasım 2026 vb.) kesintisiz geçiş yapılabilmesini sağlayan uçtan uca mimari.

---

## Kullanıcı İncelemesi & Kritik Kararlar (Clarifying Decisions)

Planlama aşamasında kullanıcı ile netleştirilen 3 temel gereksinim ve mimari kararlar:

1. **Excel Şablon Formatı**:
   - **Kullanıcı Yanıtı**: Mevcut şablon sütun formatında (`TARİH`, `GÜN`, `SEYRANTEPE 1..6`, `SARIYER-1..4`).
   - **Mimari Karar**: `DutyRosterService.ts` içerisindeki XLSX ayrıştırma motoru güçlendirilecek; tarih hücrelerinden (`01.11.2026` veya ISO tarih) ve başlık metinlerinden ("KASIM AYI", "ARALIK AYI" vb.) ay ve yılı otomatik tespit edecek, 28/29/30/31 günlük ayları dinamik gün sayılarıyla ve hafta sonu kurallarıyla hatasız işleyecek.

2. **Sunucu Tarafı Kalıcılık (Global Persistence)**:
   - **Kullanıcı Yanıtı**: Evet, sunucuda saklanıp tüm ziyaretçilerde güncellensin.
   - **Mimari Karar**: Yalnızca tarayıcının yerel `localStorage`'ına bağımlı kalınmayacak. Full-stack mimari standartlarına uygun olarak `server.ts` Express sunucusuna `/api/roster` uç noktaları eklenecek. Yüklenen nöbet verisi sunucu tarafında (`data/rosters.json`) güvenli biçimde depolanacak; herhangi bir cihazdan (telefon, hastane bilgisayarı) siteye giren tüm intern ve asistan hekimler yeni ayı anında görecek. Yerel önbellek (localStorage) ise çevrimdışı fallback olarak çalışmaya devam edecek.

3. **Aylar Arası Seçim ve Geçiş (Month Switcher)**:
   - **Kullanıcı Yanıtı**: Evet, aylar arası seçim ve geçiş butonu olsun.
   - **Mimari Karar**: Tek bir statik ay yerine `Record<string, MonthDutyRoster>` (ör. `'2026-10'`, `'2026-11'`) çoklu ay sözlüğü tutulacak. `DutyRosterToolView` ve `DutyRosterModal` bileşenlerine profesyonel, şık bir ay seçici (Segmented Switcher / Ay Seçim Butonları) eklenecek. Excel yüklendiği anda aktif görünüm doğrudan yeni yüklenen aya odaklanacak.

---

## Bölüm 1: Genel Bakış & Temel Konsept

Klinik nöbet listeleri her ayın son günlerinde başhekimlik veya klinik koordinatörü tarafından Excel formatında yayımlanır. Sistem;
1. Kullanıcının bilgisayar veya mobilden yeni ayın Excel dosyasını seçmesine / sürükleyip bırakmasına imkan tanır.
2. Excel'i tarayıcıda `xlsx` kütüphanesiyle satır satır ve sütun sütun çözümler.
3. Hangi ay ve yıl olduğunu tarih değerlerinden (`Date` nesnesi, gün sayısı, ay adı) tespit eder.
4. Yeni ayın şemasını sunucuya (`POST /api/roster`) göndererek kalıcılaştırır.
5. Arayüzde anında yeni ayı seçili hale getirerek takvim ve tablo görünümlerini yeniler.

---

## Bölüm 2: Kullanıcı Deneyimi & Görsel Tasarım

- **Ay Geçiş Kontrolü (Month Navigation Bar)**:
  - Nöbet aracının en üst başlık alanında, kliniğin resmi kurumsal kimliğine uygun segmented kontrol:
    `[ 2026 Ekim ] [ 2026 Kasım (Aktif/Yeni) ] [ + Yeni Ay Yükle ]`
  - Çok sayıda ay yüklendiğinde temiz ve modern yatay kaydırılabilir buton şeridi veya seçici menü.
- **Excel Yükleme Deneyimi (Smart Upload Modal & Dropzone)**:
  - Sürükle-bırak veya tek tıkla dosya seçme alanı.
  - Şablon uyumluluk kontrolü: Sütun başlıkları (`Tarih`, `Seyrantepe`, `Sarıyer`) eşleştiğinde yeşil doğrulama göstergesi.
  - Başarılı yükleme bildirim kutusu: *"2026 Yılı Kasım Ayı (30 Gün) Nöbet Listesi başarıyla yüklendi ve tüm klinik için yayına alındı."*
- **Anlık Nöbet Ticker Bar Entegrasyonu (`DutyRosterTickerBar`)**:
  - Türkiye saatine (Europe/Istanbul) göre bugünün tarihi kontrol edilir.
  - Eğer takvimde bugünün ayı yüklüyse otomatik olarak o ayın nöbetçileri nöbet devir saatine göre (hafta içi 08:00, hafta sonu 09:00) kayan bilgi bandında gösterilir.
  - Kullanıcı gelecek aya ait nöbet listesini detaylı araçta veya modalda incelerken aktif takvim seçimi bağımsız olarak gezilebilir.

---

## Bölüm 3: Temel Ürün Kararları & Mimari Tercihler

| Karar Alanı | Seçilen Yaklaşım | Tercih Nedeni |
|---|---|---|
| **Veri Saklama** | Full-Stack Express `/api/roster` + `data/rosters.json` | Sitenin canlıda tüm kullanıcılar tarafından ortak görülmesi istendiği için sunucu kalıcılığı zorunludur. |
| **Çevrimdışı / Hızlı Başlangıç Fallback** | `localStorage` + Gömülü Ekim 2026 | Sunucuya erişimde ağ kesintisi olsa dahi internler nöbet listesiz kalmaz. |
| **Ay Ayrıştırma Stratejisi** | Dinamik Tarih & Sütun Algoritması | Kullanıcı Kasım, Aralık, Ocak vb. herhangi bir ayı yüklediğinde dosya adı veya tarih sütunundaki `YYYY-MM-DD` / `DD.MM.YYYY` hücrelerinden ay anahtarı (`2026-11`) hatasız türetilir. |
| **Görünüm Seçicisi** | Segmented Tab Switcher | Kullanıcının önceki ay ile yeni ay arasında tek tıkla karşılaştırma yapabilmesi ve nöbet değişimlerini inceleyebilmesi. |

---

## Bölüm 4: Teknik Mimari & Veri Akışı

```
[Kullanıcı Excel Yükler (.xlsx / .xls)]
             │
             ▼
[Frontend: DutyRosterService.parseExcelRoster(file)]
  ├─ 1. Tarih sütununu analiz et (ör. 01.11.2026 -> Yıl: 2026, Ay: 11)
  ├─ 2. Günleri yapılandır (1..30 gün, Seyrantepe 1-6, Sarıyer 1-4)
  ├─ 3. Hafta içi / hafta sonu bayraklarını hesapla
  └─ 4. MonthDutyRoster nesnesi oluştur (`2026-11`)
             │
             ├─────────────────────────────────────────────┐
             ▼                                             ▼
[POST /api/roster]                                [Yerel state & localStorage]
  │ (Sunucuya Gönderim)                            │ (Anında UI Güncellemesi)
  ▼                                                ▼
[server.ts: Express API]                  [DutyRosterToolView & Modal]
  │                                                │
  ▼                                                ▼
[data/rosters.json dosyasında kalıcı kayıt]   [Seçili Ay: '2026-11' olarak güncellenir]
  │                                           [Tablo ve Takvim Yeni Ayı Gösterir]
  ▼
(Diğer tüm ziyaretçiler açtığında /api/roster GET ile yeni ayı otomatik alır)
```

### Yapılacak Somut Değişiklikler:
1. **`server.ts`**:
   - Express sunucusu yapılandırılacak.
   - `GET /api/roster`: Kayıtlı tüm ayları döndürecek.
   - `POST /api/roster`: Yeni yüklenen ayın `MonthDutyRoster` verisini alıp `data/rosters.json` dosyasına yazacak.
   - Vite middleware mode entegre edilecek (`npm run dev` -> `tsx server.ts`).
2. **`package.json`**:
   - Dev komutu `"dev": "tsx server.ts"` olarak güncellenecek.
3. **`src/components/roster/DutyRosterTypes.ts`**:
   - Çoklu ay registry tipi: `export type RosterRegistry = Record<string, MonthDutyRoster>;`
4. **`src/components/roster/DutyRosterService.ts`**:
   - `getAllRosters()` (API'den ve yerel önbellekten çoklu ay okuma).
   - `saveRosterToServer(roster)` (Sunucuya POST isteği).
   - `parseExcelRoster(file)` geliştirmesi: Gelecek aylar (Kasım ve sonrası) için otomatik ay adı ("2026 YILI KASIM AYI ASİSTAN NÖBET LİSTESİ") ve dinamik tarih yapılandırması.
5. **`src/components/roster/DutyRosterToolView.tsx` & `DutyRosterModal.tsx`**:
   - Çoklu ay seçici buton grubu (`Ekim 2026`, `Kasım 2026`, `+ Yeni Ay`).
   - Excel yükleme sonrasında otomatik olarak yeni yüklenen aya geçiş yapılması.
6. **Doğrulama**:
   - `compile_applet` ve `lint_applet` ile tip ve derleme kontrolleri.
