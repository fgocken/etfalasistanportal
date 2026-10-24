# Uygulama Planı: "Tedaviler ve İlaçlar" Modülü & Magnezyum Replasmanı Hesaplayıcısı

Bu plan, Şişli Hamidiye Etfal Anesteziyoloji & Reanimasyon Asistan Portalı bünyesinde **"Tedaviler ve İlaçlar"** ana modülünün oluşturulmasını, gelecekte eklenecek protokoller için modüler bir mimari kurulmasını ve ilk klinik araç olarak **Magnezyum Replasmanı Hesaplayıcısı** ile **Hipomagnezemi Klinik & EKG İnfografiği**nin geliştirilmesini kapsamaktadır.

---

## 1. Mimari ve Modüler Yapı ("Tedaviler ve İlaçlar")

### 1.1 Modül Navigasyonu ve Kategori Mimarisi
Gelecekte yeni ilaç ve tedavi protokollerinin (örneğin Potasyum/Kalsiyum replasmanları, Sedoanaljezi infüzyonları, İnotrop/Vazoaktif titrasyonu, Antikoagülasyon reversal vb.) kolaylıkla eklenebilmesi amacıyla modüler bir kategori sekmesi tasarlanacaktır:
- **Kategoriler:**
  - ⚡ **Elektrolit & Sıvı Replasmanı** (İlk aktif araç: *Magnezyum Replasmanı*)
  - 💉 **İnfüzyon & Vazoaktif Protokolleri** *(Gelecek eklemeler için hazır modüler sekme)*
  - 🧠 **Sedoanaljezi & Nöromüsküler Blokaj** *(Gelecek eklemeler için hazır modüler sekme)*
  - 🩸 **Hemostaz & Kan Transfüzyonu** *(Gelecek eklemeler için hazır modüler sekme)*
- **Arama ve Entegrasyon:**
  - `PortalWorkspace.tsx` menüsüne `treatments` sekmesi ("Tedaviler ve İlaçlar", `Pill` / `FlaskConical` ikonu).
  - Global arama indeksine (`portalSearchIndex.ts`) Magnezyum replasmanı, ampul hesabı, eGFR, hipomagnezemi, Torsades de Pointes, MgSO4 terimleri eklenecektir.

---

## 2. Magnezyum Replasmanı Hesaplayıcısı

### 2.1 Klinik ve Farmakolojik Parametreler (Türkiye Standardı)
- **Standart Formülasyon:** Türkiye klinik pratiğindeki 10 mL'lik **%15 Magnezyum Sülfat ($MgSO_4$) ampulü**:
  - Hacim: **10 mL (10 cc)**
  - $MgSO_4$ Miktarı: **1.5 gram (1500 mg)**
  - Elementel Magnezyum: **~12 mEq** veya **~6 mmol** (146 mg elementel Mg)

### 2.2 Mathews et al. (2022) eGFR Kademeli Artış Modeli
*Kaynak: Mathews V, Paul J, Paul C, et al. A prospective observational study to identify the effectiveness of intravenous magnesium replacement in an intensive care setting. J Anaesthesiol Clin Pharmacol. 2022.*

Böbrek fonksiyonuna göre 1 Ampul (1.5 g) ve 1 Gram $MgSO_4$ artış katsayıları:
1. **Normal Renal Fonksiyon ($eGFR \ge 90\text{ mL/min}$):**
   - 1 Gram $MgSO_4$ $\rightarrow$ **+0.10 mg/dL** artış
   - 1 Ampul (1.5 g $MgSO_4$) $\rightarrow$ **+0.15 mg/dL** artış
2. **Hafif / Orta Böbrek Yetmezliği ($eGFR\ 30 - 89\text{ mL/min}$):**
   - 1 Gram $MgSO_4$ $\rightarrow$ **+0.15 mg/dL** artış
   - 1 Ampul (1.5 g $MgSO_4$) $\rightarrow$ **+0.22 mg/dL** artış
3. **Ağır Böbrek Yetmezliği ($eGFR < 30\text{ mL/min}$):**
   - 1 Gram $MgSO_4$ $\rightarrow$ **+0.19 mg/dL** artış
   - 1 Ampul (1.5 g $MgSO_4$) $\rightarrow$ **+0.28 mg/dL** artış

### 2.3 Hesaplama Akışı ve Kullanıcı Girdileri
- **Girdiler:**
  - **Mevcut Serum Mg:** $mg/dL$ (birim dönüşüm seçeneği: $mmol/L$ ve $mEq/L$).
  - **Hedef Serum Mg:** $mg/dL$ (hızlı hedef butonları: *2.0 mg/dL*, *2.2 mg/dL*, *2.5 mg/dL* ve serbest giriş).
  - **Böbrek Fonksiyonu / eGFR Kademesi:** 3 seviyeli seçim (Normal, Hafif/Orta, Ağır).
- **Çıktılar & Hesaplama:**
  - $\Delta Mg = \text{Hedef Mg} - \text{Mevcut Mg}$
  - **Gereken Ampul Sayısı:** $\Delta Mg / \text{Ampul Başı Artış}$ (Örn: $0.6\text{ mg/dL} / 0.15 = 4\text{ ampul}$)
  - **Toplam $MgSO_4$ Dozu:** $\text{Ampul Sayısı} \times 1.5\text{ gram}$ ($mg$ ve $g$ cinsinden)
  - **Toplam Elementel Magnezyum:** $mEq$ ve $mmol$ değerleri
  - **Önerilen Klinik Doz:** Güvenli tam ampule yuvarlama ve seans bölme uyarısı (örn. 4 ampulden fazla dozlarda 2 ayrı seansa bölme tavsiyesi).

### 2.4 Hazırlama, Sıvı Seçimi ve Damar Yolu Güvenliği (Flebit Koruması)
- **Taşıyıcı Sıvı:** %0.9 NaCl (SF) veya %5 Dextroz (100 mL, 250 mL, 500 mL torba seçimi).
- **Derişim Güvenlik Kontrolü:**
  - Periferik Venöz Yol Sınırı: **Maksimum %20 (200 mg/mL)** (Klinik pratikte flebiti önlemek için %1-3 civarında seyreltme hedeflenir).
  - Santral Venöz Yol (CVP) Sınırı: **Maksimum %50 (500 mg/mL)**.
  - Hesaplanan derişim otomatik kontrol edilir ve güvenli yeşil/uyarı göstergesi verilir.
- **İnfüzyon Hızı ve Süresi:**
  - Kural: 1 ampul (1.5 g) için **en az 1.5 - 2 saat** yavaş infüzyon.
  - Otomatik infüzyon pompası hızı hesaplayıcısı ($mL/\text{saat}$).

### 2.5 Yoğun Bakım ve Reanimasyon Pratik İpuçları Kutusu
- **a) İntraselüler Şift:** Vücut magnezyumunun %99'u hücre içi ve kemikte yer alır. İnfüzyondan hemen sonra bakılan kan gazında "yalancı yüksek pik" görülür. Gerçek bazal düzeyi görmek için kontrol kanı **12-24 saat sonra (veya ertesi sabah)** alınmalıdır.
- **b) Uygulama Hızı ve Renal Klirens:** Hızlı bolus verilmesi böbreklerden hızla atılmasına yol açar. Hücresel dolum için yavaş infüzyon şarttır (preeklampsi krizleri hariç).
- **c) Magnezyum Düşüklüğünün Eşlikçileri:** Dirençli hipokalemi (ROMK kanal inhibisyonunun kalkması) ve dirençli hipokalsemi (PTH salınım baskılanması) bağlantısı.

---

## 3. Hipomagnezemi Klinik Bulguları ve EKG İnfografiği

Kullanıcının paylaştığı klinik referans şemasına (`https://share.gemini.google/MLIWWEui1Kkk`) ve güncel yoğun bakım literatürüne uygun olarak tasarlanacak interaktif infografik:

### 3.1 Vücut Sistemleri Kartları (İnteraktif & Filtrelenebilir)
1. **Kardiyovasküler Sistem:**
   - Aritmi riski (VT, VF, Prematür ventriküler atımlar - PVC)
   - Torsades de Pointes (Polimorfik VT) duyarlılığı
   - Dijital / Digoksin toksisitesine artmış miyokardiyal hassasiyet
   - Vazospazm ve hipertansiyon eğilimi
2. **Elektrokardiyografi (EKG) Bulguları İnfografiği:**
   - Dinamik EKG dalga çizimi:
     - **PR Uzaması**
     - **QT / QTc Uzaması** (Torsades tetikleyicisi)
     - **ST Depresyonu**
     - **T Dalga Düzleşmesi veya İnversiyonu**
     - Şiddetli vakalarda genişlemiş QRS
3. **Nöromüsküler & Santral Sinir Sistemi:**
   - Kas seğirmeleri, tremor, fasikülasyonlar
   - Karpopedal spazm, tetani
   - **Chvostek Belirtisi** (Fasiyal sinir vurusuyla yüz kaslarında kasılma)
   - **Trousseau Belirtisi** (Tansiyon manşonu şişirilince elde ebe eli spazmı)
   - Hiperaktif derin tendon refleksleri (Hiperrefleksi)
   - İleri evrede jeneralize konvülsiyonlar, ajitasyon, deliryum veya letarji
4. **Metabolik & Elektrolit Bağlantıları (Klinik Tuzaklar):**
   - **Refrakter Hipokalemi:** Magnezyum eksikliği ROMK böbrek potasyum kanallarının fizyolojik inhibisyonunu bozar, potasyum idrarla kaybedilir. Magnezyum düzeltilmeden potasyum yükseltilemez!
   - **Refrakter Hipokalsemi:** Magnezyum eksikliğinde Paratiroid Hormon (PTH) sentez/salınımı azalır ve hedef kemik/böbrek dokusu PTH'ya yanıtsızlaşır. Magnezyum verilmedikçe kalsiyum düzelmez.
5. **Solunum & Gastrointestinal Sistem:**
   - Solunum kas güçsüzlüğü (weaning başarısızlığı ve hipoventilasyon riski)
   - Disfaji, anoreksi, bulantı ve kusma

---

## 4. Dosya Değişiklikleri ve Yol Haritası

1. **Yeni Bileşenler:**
   - `/src/components/treatments/TreatmentsWorkspace.tsx`: Tedaviler ana paneli, kategori tabları ve modül seçici.
   - `/src/components/treatments/MagnesiumCalculator.tsx`: Mathews et al. eGFR modelli, Türkiye %15 10 mL ampul hesaplayıcısı, taşıyıcı sıvı ve flebit koruması.
   - `/src/components/treatments/HypomagnesemiaInfographic.tsx`: İnteraktif vücut sistemleri, EKG görselleştirmesi ve refrakter elektrolit mekanizmaları.
2. **Mevcut Dosya Güncellemeleri:**
   - `/src/components/PortalWorkspace.tsx`: `treatments` sekmesini araç menüsüne entegre etme.
   - `/src/data/portalSearchIndex.ts`: Arama indeksine magnezyum replasmanı ve tedaviler anahtar kelimelerini ekleme.
3. **Doğrulama:**
   - `lint_applet` ve `compile_applet` ile sıfır TypeScript/Vite hatası doğrulama.

---

Bu planı onayladığınızda kodlama aşamasına geçilecek ve "Tedaviler ve İlaçlar" modülü hemen kullanıma hazır hale getirilecektir.
