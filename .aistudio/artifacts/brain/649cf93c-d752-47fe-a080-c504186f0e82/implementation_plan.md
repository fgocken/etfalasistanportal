# Sistematik Prosedür Bazlı Anestezi Yönetimi (Revize Klinik Uygulama Planı)

Bu plan, kullanıcının **"Prosedürleri hazır değil, tek tek chat yaparak eklemek istiyorum, hepsini kontrol etmek gerekiyor"** direktifi doğrultusunda güncellenmiştir. Sistemde önceden doldurulmuş varsayımsal prosedürler bulunmayacak; araç mükemmel bir modüler altyapı, branş filtreleri, anlık arama ve 5 bölümlü akordeon/sekme şablonuyla hazırlanacak ve her bir prosedür kullanıcının chat üzerinden vereceği klinik direktiflerle sırayla eklenecektir.

---

## Kullanıcı İncelemesi & Revize Edilen Kararlar

> [!IMPORTANT]
> **Revizyon Notu (Kullanıcı Talebiyle Güncellendi):**
> - **Toplu / Otomatik Veri Eklenmeyecek:** Cerrahi prosedürlerin klinik içeriği kritik önem taşıdığından, içerikler yapay zeka tarafından rastgele üretilmeyecek; kullanıcı ile birebir chat yapılarak tek tek, aşama aşama eklenecek ve hekim kontrolünden geçecektir.
> - **İlk Aşama Hedefi:** Aracın iskeleti, cerrahi branş mimarisi, 5 ana bölümlü (1..5) görsel şablonu, arama motoru ve ilk örnek/pilot prosedür (veya kullanıcının ilk belirleyeceği prosedür) arayüzde çalışır hale getirilecek.
> - **Sonraki Süreç:** Kullanıcı her mesajında yeni bir prosedürün verilerini veya revizyonunu ilettikçe, sistem aynı tedavi/ilaç modülündeki gibi genişletilecektir.

---

## 1. Genel Bakış ve Temel Konsept

* **Ne İşe Yarar:** Anestezi hekimlerinin cerrahi branşlara göre kategorize edilmiş prosedürleri inceleyebileceği, her prosedür için 5 temel aşamayı (Tanım/Süre, Anestezi Teknikleri, Pre-op, İntra-op, Post-op / ERAS / PROSPECT) içeren modüler klinik karar destek aracı.
* **Prosedür Ekleme Yöntemi:** Hekim kontrollü, chat üzerinden adım adım genişleyen cerrahi anestezi kütüphanesi.
* **Kaynak Uyumu:**
  1. Jaffe, R. A., & Schmiesing, C. I. *Anesthesiologist's Manual of Surgical Procedures (5th ed.)*
  2. ERAS Society Protokolleri
  3. PROSPECT Kanıta Dayalı Analjezi Rehberleri
  4. İlgili güncel klinik kılavuzlar

---

## 2. Kullanıcı Deneyimi ve Arayüz Tasarımı

### 1) Liste ve Keşif Arayüzü (Procedure Catalog)
- **Cerrahi Branş Sekmeleri:**
  - Tümü
  - Genel Cerrahi
  - Ortopedi ve Travmatoloji
  - Kadın Hastalıkları ve Doğum
  - Kalp ve Damar Cerrahisi (KVC)
  - Üroloji
  - Kulak Burun Boğaz (KBB)
  - Beyin ve Sinir Cerrahisi (Nöroşirürji)
  - Plastik, Rekonstrüktif ve Estetik Cerrahi
  - Göğüs Cerrahisi
  - Çocuk Cerrahisi
  - Göz Hastalıkları
- **Hızlı Arama Motoru:** Prosedür adı, branş adı, endikasyon veya cerrahi kısaltma ile anlık arama (örn. "kolesistektomi", "protez", "sezaryen").
- **Prosedür Kartları:** Prosedürün adı, branşı, tahmini süresi ve birincil anestezi yöntemini özetleyen sade klinik kartlar.
- **"Yeni Prosedür Ekleme Rehberi":** Kullanıcının chat üzerinden hangi şablonda veri sağlayabileceğini gösteren bilgilendirici hızlı yardım kartı.

### 2) Prosedür Detay Arayüzü (5 Aşamalı Rehber Şablonu)
Kullanıcı bir prosedüre tıkladığında açılan detay görünümü, kullanıcının belirlediği tam şablona sadık kalır:

- **1) Genel Tanım ve Endikasyonlar:**
  - Prosedür Adı & Branşı
  - Cerrahi Tanım
  - Temel Endikasyonlar
  - Tahmini Ortalama Prosedür Süresi (dk / saat)
- **1.5) Beklenen Kanama ve Transfüzyon Profili (Yeni Standart Blok):**
  - Tahmini Ortalama Kan Kaybı (EBL)
  - Kanama Risk Derecesi (Minimal / Düşük / Orta / Yüksek / Potansiyel Masif)
  - Kan Ürünü & Cross-Match / Tip-Tarama (Type & Screen) Hazırlığı
  - Transfüzyon İhtimali (%)
  - Potansiyel Majör Kanama Odakları & Vasküler Risk Noktaları
  - Hemostaz ve Hasta Kan Yönetimi (PBM) Stratejileri
- **2) Olası Anestezi Yönetimi Teknikleri:**
  - Birincil Teknikler (Genel Anestezi, Spinal/Epidural, Kombine, Rejyonel Blok)
  - Alternatif Teknikler & Klinik Tercih Gerekçeleri
- **3) Pre-operatif Hazırlık (Akordeon Paneller):**
  - `3a)` Varsa prosedür spesifik dikkat edilmesi gereken konsültasyonlar
  - `3b)` Varsa prosedür spesifik anamnez ve fizik muayenede dikkat edilmesi gerekenler
  - `3c)` Varsa prosedür spesifik kan ve laboratuvar sonuçlarında dikkat edilmesi gerekenler
- **4) İntra-operatif Yönetim (Akordeon Paneller):**
  - `4a)` Varsa prosedür spesifik monitörizasyon (İnvaziv arter, CVP vb.)
  - `4b)` Varsa prosedür spesifik gerekli vasküler erişimler (Geniş lümenli IV, santral kateter vb.)
  - `4c)` Hasta pozisyonu (Supine, Prone, Litotomi, Trendelenburg, Lateral vb.)
  - `4d)` Prosedür bazlı anestezi yönetimi (İndüksiyon, idame, kas gevşetici stratejisi)
  - `4e)` Prosedür bazlı hava yolu yönetimi (ETT, Video laringoskopi, LMA, Fiberoptik)
  - `4f)` Prosedür spesifik dikkat edilmesi gereken kritik karar noktaları ve cerrahi aşamaları (Klempaj, insüflasyon, turnike açılışı, kanama riski vb.)
  - `4g)` Uyandırmada (emergence) dikkat edilmesi gerekenler (Derin/uyanık ekstübasyon, havayolu ödemi, nöromusküler blok geri dönüşümü)
- **5) Post-operatif Yönetim (Akordeon Paneller):**
  - `5a)` Ağrı yönetimi (Multimodal analjezi, rejyonel teknikler, PCA vb.)
  - `5b)` Varsa PROSPECT rehber önerileri
  - `5c)` Varsa ERAS rehberi önerileri
- **Kaynaklar Bölümü:** Jaffe 5. Baskı sayfa referansı, ERAS ve PROSPECT atıfları.

---

## 3. Veri Mimarisi ve Dosya Yapısı

* `src/types/procedures.ts`: 5 ana bölümü ve tüm alt maddeleri eksiksiz içeren TypeScript veri modeli.
* `src/data/procedures/`: Prosedürlerin branş branş veya tek tek kaydedileceği modüler veri dizini (tıpkı `src/components/treatments/` gibi).
* `src/data/procedures/index.ts`: Kayıtlı tüm onaylanmış prosedürleri dışa aktaran merkezi kayıt kütüphanesi.
* `src/components/procedures/ProceduresWorkspace.tsx`: Cerrahi branş sekmeleri, arama motoru, prosedür listesi.
* `src/components/procedures/ProcedureDetailView.tsx`: 5 aşamalı sekmeler ve akordeon paneller ile prosedür detay görünümü.
* `src/components/PortalWorkspace.tsx` & `src/components/WelcomeScreen.tsx`: Yeni klinik aracın menüye ve dashboard'a eklenmesi.

---

## 4. Teknik Mimari Diyagramı

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PortalWorkspace / App                           │
│  - ToolTabId: 'procedures'                                             │
│  - Deep Link: #arac=procedures(&prosedur=...)                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      ProceduresWorkspace                               │
│  ├── SpecialtyFilterTabs (11 Branş + Tümü)                             │
│  ├── Live Search Bar                                                   │
│  └── List View: Kayıtlı Prosedür Kartları                              │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Prosedür Seçimi)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      ProcedureDetailView                               │
│  ├── Header: İsim, Branş, Süre, Geri Dön Butonu                       │
│  ├── 5 Aşamalı Sekmeler [1..5]                                         │
│  │   ├── Bölüm 1: Tanım, Endikasyonlar, Ortalama Süre                  │
│  │   ├── Bölüm 2: Olası Anestezi Teknikleri (Birincil / Alternatif)    │
│  │   ├── Bölüm 3: Pre-op Hazırlık (3a Kons, 3b Anamnez/FM, 3c Lab)   │
│  │   ├── Bölüm 4: İntra-op (4a Mon, 4b Vasküler, 4c Poz, 4d Anestezi, │
│  │   │            4e Havayolu, 4f Kritik Anlar, 4g Uyandırma)          │
│  │   └── Bölüm 5: Post-op (5a Ağrı, 5b PROSPECT, 5c ERAS)             │
│  └── Kaynaklar: Jaffe 5th ed, ERAS, PROSPECT                           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Uygulama Aşamaları

1. **Adım 1:** Veri modelini (`src/types/procedures.ts`) ve bileşen iskeletini oluşturmak.
2. **Adım 2:** Kullanıcının kontrol etmesi ve şablonu görmesi için örnek 1 adet prototip prosedür (örn. Laparoskopik Kolesistektomi) ile arayüzü yayına almak.
3. **Adım 3:** Kullanıcının onayından sonra, chat üzerinden ileteceği prosedürleri sırayla kütüphaneye eklemek.
