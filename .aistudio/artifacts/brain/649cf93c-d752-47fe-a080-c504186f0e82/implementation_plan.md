# Vazoaktif Ajanların Karşılaştırması ve Klinik Kılavuzu (İnteraktif İnfografik)

Yoğun bakım, anestezi ve acil ünitelerinde hemodinamik optimizasyon için 12 vazoaktif/inotrop ajanın reseptör profillerini, hemodinamik etkilerini, standart doz aralıklarını, klinik incilerini ve özel şok senaryolarını sunan birebir interaktif karşılaştırma infografiği.

## User Review & Critical Decisions

> [!IMPORTANT]
> Kullanıcı tercihleri doğrultusunda PDF içeriğinin tüm klinik verileri birebir interaktif tablo ve fonksiyonel sekmeli matris (Vazopresörler, İnotroplar, İnodilatörler, Karma/Puşe) mimarisiyle tasarlanmıştır.

- **Onaylanan Karar 1 (İçerik Yapısı)**: PDF'teki Tablo 1 (Reseptör ve Hemodinamik Doz Tablosu), Bölüm 2 (Klinik Karar Verme ve High-Yield İnciler) ve Bölüm 3 (Özel Şok Senaryoları) eksiksiz olarak interaktif tablo ve akordeon/kart yapısında sunulacaktır.
- **Onaylanan Karar 2 (Filtreleme & Sekmeler)**: İlaçlar fonksiyonel sekmeli matris ile filtrelenebilecek: `Tümü (12 Ajan)`, `Vazopresörler (Saf/Baskın)`, `İnotroplar`, `İnodilatörler`, `Karma / Periferik Puşe`.
- **Arama & Hızlı Erişim**: Hekimler ilaç ismine (örn. Noradrenalin, Milrinon) veya klinik endikasyona (örn. Septik Şok, RV Yetmezliği, Anafilaksi) göre anlık filtreleme yapabilecektir.

---

## 1. Overview & Core Concept

- **Ne İşe Yarar**: Yoğun bakım ve ameliyathanede kritik hemodinamik instabilite anında hekimlerin saniyeler içinde doğru ajanı, reseptör etkisini ($\alpha_1, \beta_1, \beta_2, D_1/V_1$), kardiyak debi (CO), sistemik vasküler rezistans (SVR), kalp hızı (HR) ve pulmoner vasküler rezistans (PVR) yanıtını incelemesini sağlar.
- **Hedef Kitle**: Anesteziyoloji ve Reanimasyon asistanları, uzmanları ve yoğun bakım hekimleri.
- **Temel Değer**: Statik PDF dokümanını; aranabilir, sekmelerle filtrelenebilir, satır detayları açılabilir, karanlık/aydınlık mod uyumlu ve derin bağlantı (deep-link) destekli profesyonel bir yatak başı klinik aracına dönüştürür.

---

## 2. User Experience & Visual Design

### Ana Kullanıcı Akışları
1. **İnfografikler Ana Ekranı**: `InfographicsView` üzerinde "Vazoaktif ve İnotropik Ajanlar" kartı yer alır (Kaynak: *Klinik Kılavuz & Karşılaştırma Matriksi*).
2. **Kapsamlı Karşılaştırma Matrisi**:
   - Üstte fonksiyonel kategori sekmeleri: `Tümü (12)`, `Vazopresörler`, `İnotroplar`, `İnodilatörler`, `Karma & Puşe`.
   - Dinamik arama kutusu: İlaç adı veya senaryo yazıldığında anında eşleşen satırlar listelenir.
   - Reseptör ve hemodinamik etki sütunları: Renk kodlu yön okları ($\uparrow\uparrow\uparrow, \downarrow\downarrow, \leftrightarrow$) ve reseptör afiniteleri ($++++, ++, 0$).
   - Satır genişletme: Tıklanan ilacın yarı ömrü, etki mekanizması ve pratik hazırlama notu satır altında detay kartı olarak açılır.
3. **High-Yield İnciler & Kritik Klinik Notlar**:
   - Noradrenalin: Splanknik venöz yataktan unstressed volume $\to$ stressed volume dönüşümü ve preload artışı.
   - Adrenalin: Düşük doz $\beta_2$ vazodilatasyon vs yüksek doz $\alpha_1$ vazokonstriksiyon; Tip B laktik asidoz ve hiperglisemi uyarısı.
   - Vazopressin: Asidozda ($pH < 7.15$) korunan $V_1$ duyarlılığı; PVR artırmadan SVR artırma (RV yetmezliği & HOCM).
   - Fenilefrin: Saf $\alpha_1$, baroreseptör refleks bradikardi, Fallot spell krizi ve HOCM.
   - Dobutamin vs Milrinon: Yarı ömür farkı (2 dk vs 2-3 saat) ve kronik $\beta$-blokerde Milrinon'un cAMP koruyucu üstünlüğü.
   - Levosimendan: $Ca^{2+}$ duyarlılaştırıcı (MVO$_2$ artırmaz) ve 7-9 gün süren aktif metabolit (OR-1896).
   - Ekstravazasyon Yönetimi: $\alpha_1$ nekrozunda kanül çekilmeden 3-5 mL aspirasyon + 5-10 mg Fentolamin (10 mL SF ile) subkutan infiltrasyon.
4. **Özel Klinik Senaryolarda Ajan Seçim Tablosu**:
   - Septik Şok, Kardiyojenik Şok, Sağ Ventrikül (RV) Yetersizliği, HOCM / SAM Obstrüksiyonu, Anafilaktik Şok, Denerve Kalp (Kalp Nakli).
   - Her senaryo için: *İlk Tercih Ajanlar*, *Kaçınılması Gereken Ajanlar* ve *Fizyolojik Gerekçe*.

### Görsel Kimlik ve Tipografi
- **Renk Paleti**: Medikal hassasiyet odaklı; nötr zemin (`slate-900` / `slate-50`), vazopresör mavisi/laciverti, inotropik teal (`teal-600`), inodilatör moru (`purple-600`), uyarı rozetleri (`rose-500`, `amber-500`).
- **Tipografi**: Başlık ve etiketlerde `Plus Jakarta Sans`, sayısal doz ve etki göstergelerinde `font-mono tabular-nums`.
- **Anti-Slop & Sıfır-Pill Disiplini**: Statik metinler kutucuklara hapsedilmeyecek; temiz tablo sınırları, saç çizgisi (hairline) bölücüler ve okunaklı sembolik etki göstergeleri kullanılacaktır.

---

## 3. Key Product Decisions & Trade-Offs

- **Karar 1: Tek Bileşende Eksiksiz İçerik vs Çoklu Sayfa**:
  - *Seçim*: Tüm kılavuz `VasoactiveAgentsInfographic.tsx` bileşeni içinde 3 ana bölümlü (1. Reseptör & Doz Tablosu, 2. Klinik İnciler, 3. Özel Şok Senaryoları) tek bir akıcı sayfada sunulacaktır.
  - *Neden*: Acil ameliyathane veya yoğun bakımda hekimin sayfalar arasında kaybolmadan tek dokunuşla ilgili tabloya veya senaryoya ulaşması hayatidir.
- **Karar 2: Derin Bağlantı (Deep-Link) & Paylaşım Desteği**:
  - *Seçim*: `#infographics/vasoactive-agents` hash rotası ile doğrudan açılabilme ve `ShareLinkButton` ile klinik personeline doğrudan link gönderebilme.
  - *Neden*: Asistanlar veya uzmanlar vaka sırasında doğrudan bu infografiğin linkini paylaşabilmelidir.

---

## 4. Technical Architecture & Data Strategy

### Bileşen Hiyerarşisi

```
┌─────────────────────────────────────────────────────────────┐
│                     InfographicsView                        │
│   (Koleksiyon Listesi & Seçili İnfografik Router'ı)         │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌─────────────────────────┐           ┌─────────────────────────────┐
│  Mevcut İnfografikler   │           │ VasoactiveAgentsInfographic │
│ (RSI, Fasting, Aldrete) │           │ (YENİ - Vazoaktif Kılavuz)  │
└─────────────────────────┘           └──────────────┬──────────────┘
                                                     │
         ┌───────────────────────────┬───────────────┴───────────────────────────┐
         ▼                           ▼                                           ▼
┌─────────────────┐       ┌────────────────────────┐                 ┌──────────────────────┐
│ Kategori Filtre │       │ Reseptör & Doz Tablosu │                 │ Şok Senaryoları &    │
│ (Vazo, İnotrop, │       │ (12 Ajan, Hemodinamik, │                 │ High-Yield İnciler   │
│  İnodil, Karma) │       │  Etki Okları, Dozlar)  │                 │ (Fentolamin, SAM...) │
└─────────────────┘       └────────────────────────┘                 └──────────────────────┘
```

### Veri Modelleri
- `VasoactiveAgent`: İlaç kimliği, kategorisi, $\alpha_1, \beta_1, \beta_2, D_1/V_1$ skorları, CO, SVR, HR, PVR etkileri, standart doz aralığı, pratik klinik notları.
- `ClinicalScenario`: Senaryo adı, 1. tercih ajanlar, kaçınılması gereken ajanlar, fizyolojik mekanizma gerekçesi.
- `ClinicalPearl`: Ajan bazlı kritik inciler (Unstressed volume, Tip B laktik asidoz, V1 asidoz stabilitesi, ekstravazasyon protokolü).

### Entegrasyon Noktaları
- `src/components/infographics/VasoactiveAgentsInfographic.tsx`: Yeni bileşen dosyası.
- `src/components/infographics/InfographicsView.tsx`: Koleksiyon dizisine `vasoactive-agents` kartı ekleme ve render koşulu sağlama.
- `src/data/portalSearchIndex.ts`: Global komut paleti ve arama motoruna vazoaktif ajanlar ve şok kılavuzu anahtar kelimelerini ekleme.
