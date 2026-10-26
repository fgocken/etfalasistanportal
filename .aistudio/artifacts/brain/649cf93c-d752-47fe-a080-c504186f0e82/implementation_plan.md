# Uygulama Planı: Bölgesel & Periferik Sinir Blokları Klinik Aracı (`nerve-blocks`)

Şişli Etfal Anesteziyoloji & Reanimasyon Portalı için modern USG rehberliğinde bölgesel anestezi, fasya plan blokları, interaktif duyu/dermatom anatomisi ve acil LAST (Lokal Anestezik Sistemik Toksisitesi) kurtarma protokolünü kapsayan yeni bir klinik araç geliştirilmesi.

---

## 1. Kullanıcı İhtiyacı ve Klinik Hedefler
- **Kapsam:** Tüm majör anestezi blok grupları (Üst Ekstremite, Alt Ekstremite ve Gövde/Fasya Plan Blokları).
- **LAST & LA Güvenliği:** Hastanın kilosuna göre seçilen lokal anesteziklerin (bupivakain, levobupivakain, ropivakain, lidokain ± adrenalin) maksimum güvenli dozlarının hesaplanması ve acil durumda hayat kurtarıcı **%20 İntralipid bolus + infüzyon** dozlarının anında görüntülenmesi.
- **İnteraktif Görselleştirme:** Blok seçildiğinde uyuşacak duyusal bölgelerin (dermatomlar, periferik kutanöz sinir alanları) ve motor etkilerin interaktif harita üzerinde gösterilmesi.
- **Entegrasyon:** Portal dashboard araç kartı, deep linking (`#arac=nerve-blocks`), 1-tıkla bağlantı paylaşımı ve portal arama motoru dizini.

---

## 2. Mimari ve Bileşen Yapısı

### A. Veri Modeli ve Blok Kütüphanesi (`src/data/nerveBlocksData.ts`)
Her blok için yapılandırılmış tıp literatürü (NYSORA, ESRA, ASRA yönergeleri) kaynaklı veri modeli:
- **Kimlik & Başlık:** `id`, `name`, `trName`, `region` (`upper` | `lower` | `trunk`), `targetNerves`
- **Ultrasonografi (USG) Rehberliği:** Prob tipi (Lineer / Konveks), hasta pozisyonu, prob oryantasyonu, iğne yönü (In-plane / Out-of-plane)
- **Hedef ve Anatomi:** Sonoanatomi belirteçleri (fasya, damarlar, kaslar), yayılım deseni
- **Önerilen İlaç & Hacim:** LA volüm aralığı (örn. ESP için 20-30 mL %0.25 bupivakain, ACB için 15-20 mL), konsantrasyon önerileri
- **Duyusal & Cerrahi Kapsam:** Hangi cerrahiler için uygun olduğu, uyuşan dermatomlar/kutanöz alanlar (omuz, ön kol, diz, toraks, batın ön duvarı vb.)
- **Klinik İpuçları & Tuzaklar ("Pearls & Pitfalls"):** Motor blok riski, plevra/damar ponksiyonu uyarısı, Horner sendromu riski, hemidiyafram paralizisi (frenik sinir) notları
- **Dahil Edilecek Bloklar:**
  1. **Üst Ekstremite:** İnterskalen (ISB), Supraklaviküler (SCB), İnfraklaviküler (ICB), Aksiller, Periferik bilek/el blokları (Median, Ulnar, Radial)
  2. **Alt Ekstremite:** Femoral, Adduktor Kanal (ACB), Popliteal Siyatik, Subgluteal Siyatik, PENG (Pericapsular Nerve Group), Fascia Iliaca (FICB)
  3. **Gövde & Fasya Plan Blokları:** Erector Spinae Plane (ESP - torasik ve lomber), Transversus Abdominis Plane (TAP), Rektus Kılıfı (Rectus Sheath), Quadratus Lumborum (QL), PECS I/II ve Serratus Anterior (SAP)

### B. Lokal Anestezik & LAST İntralipid Hesaplayıcısı (`src/components/nerve-blocks/LastCalculator.tsx`)
- **Kilo Girişi:** Yetişkin veya pediatrik hasta ağırlığı (kg)
- **Maksimum Güvenli Doz Tablosu:**
  - Bupivakain / Levobupivakain: 2 mg/kg (maks 150-175 mg)
  - Ropivakain: 3 mg/kg (maks 200-250 mg)
  - Lidokain (adrenalinsiz): 4.5 mg/kg (maks 300 mg)
  - Lidokain + Adrenalin: 7 mg/kg (maks 500 mg)
  - Prilokain: 6 mg/kg (maks 400 mg)
- **%20 İntralipid (Lipid Rescue) Acil Protokolü:**
  - **Bolus:** 1.5 mL/kg İV (2-3 dakikada hızlı infüzyon)
  - **İdame İnfüzyonu:** 0.25 mL/kg/dk (kardiyovasküler stabilite sağlanana kadar)
  - **Dirençli Durum:** Bolus tekrarı (maks 2 kez) ve infüzyon hızının 0.5 mL/kg/dk'ya yükseltilmesi
  - **Maksimum Kümülatif Doz:** İlk 30-45 dakikada 10-12 mL/kg üst limit uyarısı
  - **Acil Müdahale Adımları:** FiO2 1.0, hiperventilasyondan kaçınma (asidoz ve PaCO2 artışı LAST toksisitesini artırır), düşük doz epinefrin (<1 mcg/kg), propofol ve vazopressinden kaçınma.

### C. İnteraktif Duyu & Kapsama Haritası (`src/components/nerve-blocks/SensoryMapViewer.tsx`)
- Seçilen bloğa göre anatomik vücut bölgelerinin (omuz, kol, ön kol, el, kalça, uyluk, diz, bacak, ayak, göğüs, batın) kutanöz/dermatom dağılımının renkli ve interaktif vurgulanması.
- Tersine arama: Kullanıcı cerrahi bölgeyi (örn. "Diz Artroplastisi" veya "Omuz Artroskopisi") seçtiğinde uygun sinir bloklarının otomatik önerilmesi.

### D. Ana Çalışma Alanı (`src/components/nerve-blocks/NerveBlocksWorkspace.tsx`)
- Üst filtre çubuğu: Kategori seçimi (Tümü, Üst Ekstremite, Alt Ekstremite, Gövde Blokları), cerrahi arama kutusu.
- İki panelli düzen:
  - Sol/Orta Panel: Detaylı blok kartları, USG görüntüleme rehberi, teknik adımlar, volüm ve ilaç önerileri.
  - Sağ Panel / Açılır Sekme: Hızlı LAST & LA Doz Hesaplayıcısı ve İnteraktif Duyu Kapsama Haritası.
- Her blok kartında **"Bağlantıyı Kopyala"** (`ShareLinkButton`) desteği (`#arac=nerve-blocks&blok=isb`).

---

## 3. Sistem Entegrasyonu & Yönlendirme
1. **`src/utils/deepLink.ts`:**
   - `VALID_TOOL_IDS` listesine `'nerve-blocks'` eklenmesi.
   - Hash ayrıştırma ve güncelleme mantığının desteklenmesi.
2. **`src/components/PortalWorkspace.tsx`:**
   - `ToolTabId` tipine `'nerve-blocks'` eklenmesi.
   - `ALL_CLINICAL_TOOLS` nesnesine yeni araç kartının tanımlanması (Özel ikon, mor/indigo tema rengi, "Yeni Araç" rozeti).
   - Çalışma alanı görünümünde `NerveBlocksWorkspace` bileşeninin render edilmesi.
3. **`src/data/portalSearchIndex.ts`:**
   - Tüm bloklar, LAST protokolü, USG terimleri ve cerrahi endikasyonların global hızlı arama motoruna (CommandPalette / Dashboard Search) dizinlenmesi.

---

## 4. Doğrulama ve Test Adımları
1. **Kod Bütünlüğü & TypeScript Derlemesi:** `compile_applet` ile sıfır derleme hatası kontrolü.
2. **LAST Hesaplama Doğruluğu:** Kilo bazlı LA dozları ve İntralipid bolus/infüzyon değerlerinin tıp kılavuzlarıyla birebir matematiksel doğrulanması.
3. **İnteraktivite:** Blok seçimi, anatomik bölge vurgulaması, filtreleme ve arama testleri.
4. **Deep Linking:** `#arac=nerve-blocks` ve `#arac=nerve-blocks&blok=adductor-canal` gibi URL paylaşımlarının doğrudan hedeflenen bloğa sorunsuz açılmasının testi.
