# Deksmedetomidin (Precedex) ve Gelecek İlaçlar İçin "Altın Standart" Klinik İlaç Monografisi & Hesaplayıcı Planı

Kullanıcının talebi doğrultusunda, bu geliştirme sadece Deksmedetomidin için bir hesaplayıcı değil; **ileride sisteme eklenecek tüm ilaçlar için referans alınacak modüler, kapsamlı ve kanıta dayalı "Klinik İlaç Monografisi ve İnteraktif Doz Hesaplayıcı Şablonu"** olarak yapılandırılmıştır.

---

## 1. Mimari ve Sayfa Akış Şeması (Hiyerarşik Sıralama)

Yeni bileşen hiyerarşisi tam olarak kullanıcının belirttiği klinik ve farmakolojik sıralamayı izleyecektir:

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. BAŞLIK, FARMAKOLOJİK KATEGORİ & ETKİ MEKANİZMASI                    │
│    (Selektif Santral Alfa-2 Agonisti, Locus Coeruleus, NREM benzeri)   │
├────────────────────────────────────────────────────────────────────────┤
│ 2. FARMAKOKİNETİK BÖLÜMÜ [Tıklayınca Açılan Akordiyon - Varsayılan Kapalı]│
│    (Başlangıç, pik, t1/2, dağılım hacmi, protein bağlama, metabolizma) │
├────────────────────────────────────────────────────────────────────────┤
│ 3. KONTRENDİKASYONLAR                                                  │
│    (Mutlak: 2-3. derece AV blok, aşırı duyarlılık / Rölatif: Bradikardi)│
├────────────────────────────────────────────────────────────────────────┤
│ 4. ENDİKASYONLAR & OFF-LABEL KULLANIMLAR                               │
│    (YBÜ mekanik ventilasyon, uyanık sedasyon vs. Deliryum, Shivering)   │
├────────────────────────────────────────────────────────────────────────┤
│ 5. UYGULAMA YOLLARI, ERİŞKİN VE PEDİATRİK DOZ REJİMLERİ                │
│    (IV İnfüzyon, Sublingual/Buccal, İntranazal; Erişkin & Çocuk dozu)  │
├────────────────────────────────────────────────────────────────────────┤
│ 6. BÖBREK YETMEZLİĞİNDE DOZ REVİZYONU                                  │
│    (GFR Kademeleri, Haftada 3 Gün Hemodiyaliz, Periton Diyalizi, CRRT) │
├────────────────────────────────────────────────────────────────────────┤
│ 7. KARACİĞER YETMEZLİĞİNDE DOZ REVİZYONU                               │
│    (Child-Turcotte-Pugh Class A, B ve C Doz Kılavuzu)                  │
├────────────────────────────────────────────────────────────────────────┤
│ 8. ÖNEMLİ OLUMSUZ ETKİLER (ADVERSE EFFECTS)                            │
│    (Bradikardi, hipotansiyon, bifazik kan basıncı, rebound taşikardi)  │
├────────────────────────────────────────────────────────────────────────┤
│ 9. KLİNİSYENİN DİKKAT ETMESİ GEREKEN ÖZEL KLİNİK DURUMLAR              │
│    (Hipovolemi, otonom yetmezlik, pacemaker'sız blok, eşzamanlı ilaçlar)│
├────────────────────────────────────────────────────────────────────────┤
│ 10. IV UYGULAMA VE SULANDIRMA / HAZIRLAMA ŞEKİLLERİ                    │
│     (200 mcg/50 mL, 400 mcg/100 mL, Ampul seyreltme, SF/D5W uyumu)    │
├────────────────────────────────────────────────────────────────────────┤
│ 11. İLAÇ GÜVENLİĞİ VE YÜKSEK RİSKLİ İLAÇ (HIGH-ALERT) UYARILARI        │
│     (ISMP High-Alert, Ses benzerliği, Gebelik/Laktasyon)               │
├────────────────────────────────────────────────────────────────────────┤
│ 12. İLAÇ ETKİLEŞİMİ SORGULAMA DIŞ BAĞLANTISI (EXTERNAL LINK)           │
│     (Drugs.com & Medscape Drug Interaction Checker hızlı sorgulama)    │
├────────────────────────────────────────────────────────────────────────┤
│ 13. İNTERAKTİF İNFÜZYON VE DOZ HESAPLAYICISI                           │
│     (Kilo, Hacim Seçici/Özel Hacim, Opsiyonel Bolus, mcg/kg/sa -> mL/sa)│
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Bölüm Detayları ve Klinik Veri İçeriği

### Bölüm 1: Farmakolojik Kategori & Etki Mekanizması (En Üst)
- **Farmakolojik Kategori:** Santral Selektif Alfa-2 Adrenerjik Reseptör Agonisti (Alfa-2 / Alfa-1 seçicilik oranı: 1620:1, klonidine göre 8 kat daha selektif).
- **Etki Mekanizması:** Beyin sapındaki *Locus Coeruleus* çekirdeğinde postsinaptik ve presinaptik alfa-2A reseptörlerini aktive ederek santral sempatolitik etki gösterir. GABAerjik yolağı değil endojen uyku yolaklarını (NREM evre 3 benzeri) uyararak hastanın kolayca uyandırılabilir, kooperatif ve komutlara yanıt verebilir olmasını sağlar. Kortikal ve medüller solunum merkezlerini baskılamaz (solunum depresyonu yapmaz).

### Bölüm 2: Farmakokinetik (Tıklayınca Açılan Akordiyon - Varsayılan Kapalı)
- **Etki Başlangıcı (Onset):** IV infüzyonla 5–15 dakika.
- **Pik Etki:** 15–30 dakika.
- **Etki Süresi:** İnfüzyon kesildikten sonra 1–2 saat.
- **Dağılım Hacmi ($V_d$):** Yaklaşık 118 L (~1.3–2.1 L/kg).
- **Plazma Protein Bağlanması:** %94 (esas olarak albümin ve alfa-1 asit glikoprotein).
- **Metabolizma:** Karaciğerde neredeyse tamamen glukuronidasyon (UGT2B10, UGT1A4) ve sitokrom P450 (CYP2A6) hidroksilasyonu ile inaktif metabolitlerine dönüştürülür.
- **Eliminasyon Yarı Ömrü ($t_{1/2}$):** Dağılım fazı ~6 dakika; terminal eliminasyon yarı ömrü ~2.1 – 2.5 saat (karaciğer yetmezliğinde 7.4 saate kadar uzayabilir).
- **Klirens:** Yaklaşık 39 L/saat.
- **Atılım:** %95 renal (idrarla inaktif metabolitler halinde), %4 fekal. Değişmemiş aktif ilaç atılımı <%1.

### Bölüm 3: Kontrendikasyonlar
- **Mutlak Kontrendikasyonlar:**
  - Deksmedetomidine veya bileşenlerine karşı bilinen aşırı duyarlılık.
  - Kalıcı pacemaker'ı olmayan ileri derece kalp bloğu (2. veya 3. derece AV blok, Sinüs Düğüm Disfonksiyonu / Sick Sinus).
- **Rölatif Kontrendikasyonlar / Yüksek Risk:**
  - Belirgin bradikardi (KTA < 50 bpm).
  - Düzeltilmemiş kontrolsüz hipovolemi ve şiddetli hipotansiyon (MAP < 60 mmHg).
  - Şiddetli ventriküler disfonksiyon / ileri evre kalp yetmezliği (EF < %30).

### Bölüm 4: Endikasyonlar ve Off-Label Kullanımlar
- **Ruhsatlı (Onaylı) Endikasyonlar:**
  - Yoğun bakım ünitesinde başlangıçta entübe ve mekanik ventilasyondaki kritik hastaların sedasyonu (ekstübasyon sürecinde ve sonrasında güvenle sürdürülebilir).
  - Ameliyathanede veya girişimsel odalarda entübe olmayan erişkin hastaların tanısal/cerrahi işlemler öncesinde ve/veya sırasında sedasyonu (Prosedürel sedasyon).
- **Off-Label / Kanıta Dayalı Kullanımlar:**
  - Yoğun bakım deliryumunun tedavisi ve önlenmesi (PADIS Kılavuzu: Deliryumda benzodiazepin yerine ilk tercih sedatif).
  - Ventilatörden ayırma (weaning) başarısızlığı ve ekstübasyon ajitasyonu.
  - Alkol ve madde yoksunluk sendromunda adjuvant sedasyon (sempatik fırtınayı baskılama).
  - Uyanık kraniyotomi ve fiberoptik zor havayolu entübasyonu sedasyonu.
  - Pediatrik girişimsel sedasyon (MRI, BT, Eko) ve premedikasyon.
  - Postoperatif titreme (shivering) tedavisi ve prevansiyonu.
  - Bariatrik ve genel anestezide opioid koruyucu (opioid-sparing) multimodal anestezi.

### Bölüm 5: Uygulama Yolları, Erişkin ve Pediatrik Dozları
- **Uygulama Yolları:**
  - **IV İnfüzyon:** YBÜ ve anestezi pratiğinde standart yol (periferik veya santral venöz yol).
  - **Sublingual / Buccal:** Şizofreni veya Bipolar bozukluk ilişkili hafif-orta ajitasyonda FDA onaylı film formu (Igalmi: 120 mcg veya 180 mcg sublingual; *IV formu bu endikasyonda kullanılmaz!*).
  - **İntranazal (IN):** Özellikle pediatrik premedikasyonda iğnesiz atomizer (MAD) ile (1–2 mcg/kg).
- **Erişkin Doz Rejimleri:**
  - *YBÜ Sedasyonu:* 0.2 – 1.4 mcg/kg/saat sürekli IV infüzyon. Hedef RASS: -1 ila -2. (Hemodinamik stabilite için yükleme dozu yapılmaması önerilir).
  - *Prosedürel / Girişimsel Sedasyon:* İsteğe bağlı 0.5 – 1.0 mcg/kg bolus (10 dakikada yavaş), ardından 0.2 – 1.0 mcg/kg/saat idame.
  - *Weaning & Ekstübasyon:* 0.2 – 0.7 mcg/kg/saat, ekstübasyon anında kesilmesine gerek yoktur.
  - *Genel Anestezi Adjuvantı:* 0.2 – 0.8 mcg/kg/saat.
- **Pediatrik Doz Rejimleri (Off-Label / YBÜ & Anestezi Kılavuzları):**
  - *Pediatrik YBÜ Sedasyonu:* 0.2 – 1.4 mcg/kg/saat (yenidoğan ve infantlarda klirens düşüktür; 0.1–0.2 ile başlanıp titre edilir).
  - *Preoperatif Sedasyon / Premedikasyon:* 1 – 2 mcg/kg İntranazal (işlemden 30–45 dk önce).
  - *Postoperatif Ajitasyon / Deliryum:* 0.2 – 0.5 mcg/kg/saat IV veya tek doz 0.5 mcg/kg yavaş IV bolus (5–10 dk).

### Bölüm 6: Böbrek Yetmezliğinde Doz Revizyonları
Tablo formatında net klinik yönlendirme:
- **GFR $\ge$ 50 mL/dk:** Doz revizyonu gerekmez.
- **GFR 30–49 mL/dk (Evre 3):** Doz revizyonu gerekmez. Sedasyon düzeyi izlenerek titre edilir.
- **GFR 15–29 mL/dk (Evre 4):** Doz revizyonu gerekmez. İnaktif glukuronid metabolitleri birikebilir; klinik etki değişmez ancak sedasyon derinliği yakın takip edilmelidir.
- **GFR < 15 mL/dk (Evre 5 / Diyaliz dışı):** Doz revizyonu gerekmez. Titrasyon adımları dikkatle izlenir.
- **Haftada 3 Gün Hemodiyaliz (HD):** Doz revizyonu gerekmez. Plazma proteinlerine yüksek oranda (%94) bağlandığı için hemodiyalizle temizlenmez (diyaliz sonrası ek doza gerek yoktur).
- **Periton Diyalizi (PD):** Doz revizyonu gerekmez.
- **Sürekli Renal Replasman Tedavisi (CRRT / CVVH / CVVHDF):** Doz revizyonu gerekmez. Filtre tarafından önemli ölçüde uzaklaştırılmaz.

### Bölüm 7: Karaciğer Yetmezliğinde Doz Revizyonları
Deksmedetomidin neredeyse tamamen hepatik yolla temizlendiğinden, karaciğer fonksiyon bozukluğunda klirens belirgin azalır ve eliminasyon yarı ömrü 7.4 saate kadar uzar:
- **Child-Turcotte-Pugh Class A (Hafif Yetmezlik):** Standart doz aralığının alt sınırları tercih edilebilir (0.2–0.5 mcg/kg/saat ile başlama). Doz artırım aralığı daha uzun tutulmalıdır.
- **Child-Turcotte-Pugh Class B (Orta Yetmezlik):** Başlangıç ve idame dozları **%25 – %50 oranında azaltılmalıdır**. Titrasyon yavaş yapılmalı ve birikme riski izlenmelidir.
- **Child-Turcotte-Pugh Class C (Şiddetli Yetmezlik):** Doz **%50 veya daha fazla azaltılmalıdır** (örn. 0.1–0.2 mcg/kg/saat). Ciddi birikme, uzamış sedasyon ve derin bradikardi riski nedeniyle sıkı klinik monitörizasyon şarttır.

### Bölüm 8: Önemli Olumsuz Etkiler (Adverse Effects)
- **Kardiyovasküler:**
  - *Bradikardi:* Olguların %25–40'ında görülür. Sinüs bradikardisi, nodal ritim, nadiren sinüs arresti.
  - *Hipotansiyon:* Olguların %30–50'sinde santral sempatolitik etkiyle vazodilatasyon.
  - *Bifazik Kan Basıncı Yanıtı:* Özellikle hızlı yükleme (bolus) verildiğinde periferik vasküler düz kas alfa-2B reseptör uyarımı ile ani geçici vazokonstrüksiyon ve hipertansiyon, ardından santral alfa-2A inhibisyonuyla kalıcı hipotansiyon ve bradikardi gelişir.
- **Ani Kesilme (Withdrawal) Sendromu:**
  - 48–72 saatten uzun süre yüksek dozda (>1.0 mcg/kg/saat) kullanımın aniden durdurulması durumunda klonidin benzeri yoksunluk: Rebound hipertansiyon, taşikardi, ajitasyon, terleme ve tremor. (Önlem: Doz 24–48 saatte kademeli azaltılarak kesilmelidir).
- **Diğer Etkiler:** Ağız kuruluğu (%3–4), bulantı, uzamış sedasyon.

### Bölüm 9: Klinisyenin Dikkat Etmesi Gereken Özel Klinik Durumlar
- **Hipovolemik Hastalar:** Damar içi hacmi yetersiz hastalarda deksmedetomidin başlandığında derin hipotansiyon gelişebilir; ilaç öncesi volüm replasmanı tamamlanmalıdır.
- **Eşzamanlı Bradikardizan İlaç Kullananlar:** Beta blokerler, non-dihidropiridin kalsiyum kanal blokerleri (diltiazem, verapamil), digoksin veya amiodaron alan hastalarda bradikardi riski katlanır.
- **Kardiyak İleti Bozukluğu:** Birinci derece AV blok veya dal bloğu olan hastalarda ileri derece bloğa ilerleme riski.
- **Otonom Nöropati ve Yaşlılar:** Sempatik tonusu zaten düşük olan yaşlı veya diyabetik hastalarda hemodinamik yanıtlar daha abartılıdır.

### Bölüm 10: IV Uygulama ve Sulandırma Şekilleri Bilgisi
- **Piyasa Formları:**
  - Hazır İnfüzyon Çözeltisi Flakonu: **200 mcg / 50 mL** (4 mcg/mL)
  - Hazır İnfüzyon Çözeltisi Flakonu: **400 mcg / 100 mL** (4 mcg/mL)
  - Konsantre Flakon / Ampul: **200 mcg / 2 mL** (100 mcg/mL)
- **Sulandırma Protokolü:**
  - 2 mL (200 mcg) ampul çekilir, 48 mL %0.9 NaCl (SF) veya %5 Dekstroz ile sulandırılarak toplam 50 mL'ye tamamlanır (**Nihai Konsantrasyon: 4 mcg/mL**).
  - Sıvı kısıtlaması olan veya santral venöz yolu bulunan kritik hastalarda 2 mL (200 mcg), 23 mL SF ile 25 mL'ye tamamlanarak **8 mcg/mL** konsantrasyonda da hazırlanabilir.
- **Kritik Uygulama Kuralları:**
  - **KESİNLİKLE konsantre (sulandırılmamış 100 mcg/mL) formda direkt IV puşe/enjeksiyon YAPILMAZ!**
  - Daima hassas bir **elektronik infüzyon pompası** (veya şırınga pompası) ile uygulanmalıdır.
  - Çözelti hazırlandıktan sonra oda sıcaklığında 24 saat stabildir.

### Bölüm 11: İlaç Güvenliği ve High-Alert Durumları
- **ISMP Yüksek Riskli İlaç (High-Alert):** Hatalı doz veya hızlı uygulama ölümcül kardiyovasküler kollapsa yol açabilir. Çift kontrol (double-check) ile uygulanmalıdır.
- **İsim Benzerliği Karışıklıkları:** *Precedex* (Deksmedetomidin) ile *Prevacid* (Lansoprazol) ve *Peridex* (Klorheksidin) isim benzerliğine dikkat edilmelidir.
- **Gebelik ve Laktasyon:** Gebelik Kategorisi C. Plasentayı geçer; ancak acil sezaryen veya anestezi yönetiminde fayda/zarar oranıyla kullanılabilir. Anne sütüne çok düşük miktarda geçer; 24 saat emzirmeye ara verilmesi önerilir.

### Bölüm 12: İlaç Etkileşimi Dış Bağlantısı (Drug Interactions)
Kullanıcının klinik anında doğrudan ilaç etkileşimini sorgulayabilmesi için iki güvenilir uluslararası farmakolojik dış bağlantı butonu:
- **Drugs.com Drug Interactions Checker:** `https://www.drugs.com/drug-interactions/dexmedetomidine-index.html`
- **Medscape Drug Interaction Checker:** `https://reference.medscape.com/drug-interactionchecker`

### Bölüm 13: İnteraktif İnfüzyon ve Doz Hesaplayıcısı
- **Giriş Parametreleri:**
  - Hasta Ağırlığı ($kg$)
  - Klinik Endikasyon Seçimi (YBÜ Sedasyonu, Weaning, Deliryum, Girişimsel Sedasyon, Genel Anestezi)
  - Hedef RASS Skoru (-1 uykulu, -2 hafif sedasyon, 0 sakin/uyanık)
  - Çözelti Hazırlama Seçimi:
    - *200 mcg / 50 mL Hazır Flakon (4 mcg/mL)*
    - *400 mcg / 100 mL Hazır Flakon (4 mcg/mL)*
    - *200 mcg / 2 mL Ampul + Serbest Sıvı Hacmi (kullanıcı mL girer, konsantrasyon otomatik hesaplanır)*
    - *Özel Konsantrasyon (mcg/mL serbest giriş)*
  - Opsiyonel Yükleme Dozu (Bolus) Anahtarı:
    - Kapalı (YBÜ için önerilen No-Bolus)
    - Açık (0.5 – 1.0 mcg/kg, 10–20 dakikada infüzyon hızı mL/saat)
  - İdame Dozu Girişi: $0.2 - 1.4\text{ mcg/kg/saat}$ (slider ve $\pm 0.05$ hassas butonlar)
- **Hesaplama Çıktıları:**
  - İnfüzyon Pompası Hızı ($mL/saat$)
  - 24 Saatlik Toplam Doz ($mcg$) ve Sıvı Hacmi ($mL$)
  - 24 Saatte Gereken Flakon / Ampul Adedi
  - Pratik Pompa Kurulum Emri (kopyalanabilir özet)
  - Dinamik Hemodinamik Güvenlik Göstergesi (Bradikardi/Hipotansiyon risk eşikleri)

---

## 3. Kod Dosyaları ve Uygulama Adımları

1. **`src/components/treatments/DexmedetomidineProtocol.tsx`**:
   - Bahsedilen tüm 13 bölümü içeren kapsamlı, modüler ve zengin bileşen.
   - Farmakokinetik akordiyon mekanizması (`useState<boolean>(false)` ile varsayılan kapalı).
   - Böbrek ve karaciğer yetmezliği için renk kodlu ve net doz revizyon tabloları.
   - Dış etkileşim sorgulama butonları.
   - İnteraktif infüzyon pompası hesaplayıcısı.
2. **`src/components/treatments/TreatmentsWorkspace.tsx`**:
   - `PROTOCOL_CARDS` içerisine `id: 'dexmedetomidine'`, `category: 'sedation'` kartının eklenmesi.
   - 4 Temel Protokol Parametresi (YBÜ dozu, hazırlama, solunum avantajı, kardiyovasküler izlem).
   - `activeCategory === 'sedation'` seçildiğinde kartın listelenmesi ve tıklandığında `activeProtocolId === 'dexmedetomidine'` görünümüne geçiş.
3. **Derleme ve Doğrulama:**
   - `compile_applet` ve `lint_applet` ile sıfır hata garantisi.
