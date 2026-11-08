# Anestezi Acilleri: Patofizyoloji Modeli Özgünleştirme & Mimari Reform

## Gerçekleştirilen Mimari Reform

Tüm acil senaryolarındaki patofizyoloji bölümü, yapay ve mekanik 5 basamaklı kalıptan tamamen kurtarılmış; her hastalığın gerçek klinik ve biyolojik tabiatına (kısır döngü, hücresel-sistemik eksen veya bifazik kaskat) kavuşturulmuştur.

### 1. Veri Modeli ve Tip Mimarisi (`src/data/emergenciesData.ts`)

- `pathophysiology` arayüzü organik ve dinamik hale getirildi:
  ```ts
  pathophysiology: {
    molecularBasis: string;
    geneticMutations?: string[];
    stepsTitle?: string;
    flowType?: 'cascade' | 'vicious-cycle' | 'biphasic' | 'cellular-systemic' | 'dual-axis';
    cycleWarning?: string;
    cascadeSteps?: {
      phase: string;
      mechanism: string;
      badge?: string;
      color?: 'purple' | 'red' | 'amber' | 'cyan' | 'rose' | 'emerald';
    }[];
    summaryText: string;
  };
  ```

### 2. Kullanıcı Arayüzü & Görselleştirme (`src/components/emergencies/EmergencyProtocolDetailView.tsx`)

- **Dinamik Model Rozetleri:** `flowType`'a göre `🔄 KISIR DÖNGÜ (FEEDBACK LOOP)`, `⚡ BİFAZİK MEKANİZMA`, `🔬 HÜCRESEL & SİSTEMİK EKSEN` veya `🧬 DOĞAL PATOLOJİK KASKAT` dinamik etiketleri.
- **Kısır Döngü (Feedback Loop) Uyarısı:** Pulmoner emboli gibi tablolarda döngünün kendisini ve aşırı sıvının ölümcül etkisini vurgulayan özel kırmızı alarm kutusu.
- **Döngüsel Akış İpuçları:** Son adımda `↺ Başa Döner` geri besleme indikatörü.
- **Adaptif Grid Düzeni:** 2 basamakta `md:grid-cols-2`, 3 basamakta `md:grid-cols-3`, 4 basamakta `md:grid-cols-4`, 5 basamakta `md:grid-cols-5`.

---

## 3. Protokol Bazında Yeni Biyolojik Yapılar

| Acil Protokolü | Model Tipi (`flowType`) | Gerçek Doğal Yapısı |
|---|---|---|
| **Pulmoner Embolizm (`pe`)** | `vicious-cycle` | **Sağ Ventrikül Ölüm Döngüsü (RV Death Spiral):** PVR artışı $\rightarrow$ RV dilatasyonu $\rightarrow$ Septal shift $\rightarrow$ LV dolumunun kesilmesi ve hipotansiyon $\rightarrow$ Sağ koroner iskemi $\rightarrow$ Döngünün başına dönüş. |
| **Lokal Anestezik Toksisitesi (`last`)** | `cellular-systemic` | **3 Doğal Eksen:** Nav1.5 sodyum kanalı "Fast-in, slow-out" kilitlenmesi $\rightarrow$ Mitokondriyal karnitin ve ATP iflası $\rightarrow$ Kortikal GABAerjik inhibisyon kaybı (nöbet $\rightarrow$ apne). |
| **İntraoperatif Anafilaksi (`anaphylaxis`)** | `cellular-systemic` | **3 Doğal Eksen:** Mast hücresi/bazofil mediyatör degranülasyonu $\rightarrow$ Masif NO vazoplejisi ve kapiller kaçak (%35-50 plazma kaybı) $\rightarrow$ Kounis sendromu (koroner vazospazm). |
| **Venöz Hava Embolisi (`vae`)** | `cascade` | **3 Gerçek Boyut:** Subatmosferik hidrostatik giriş gradyenti $\rightarrow$ RVOT "Air-Lock" mekanik tıkacı $\rightarrow$ Pulmoner mikrovasküler ARDS ve PFO paradoksal şantı. |
| **Malign Hipertermi (`mh`)** | `cascade` | **3 Biyolojik Evre:** RYR1 kalsiyum kaçağı $\rightarrow$ SERCA pompası hipermetabolik tüketim yangını (ATP iflası) $\rightarrow$ Sarkolemma yıkımı ve rabdomiyoliz. |
| **İntraoperatif Bronkospazm (`bronchospasm`)** | `cascade` | **3 Doğal Süreç:** Kolinerjik vagal M3 tetikleme $\rightarrow$ Poiseuille yasası katastrofisi ($R \propto 1/r^4$) $\rightarrow$ Dinamik hiperinflasyon (Oto-PEEP) ve venöz preload çöküşü. |
| **Laringospazm (`laryngospasm`)** | `cascade` | **3 Organik Basamak:** Superior laringeal sinir refleks glottik kapanması $\rightarrow$ Kapalı glottise karşı inspirasyon (Mueller manevrası) $\rightarrow$ Negatif Basınçlı Pulmoner Ödem (NPPE). |
| **CICO (`airway-crisis`)** | `cascade` | **3 Kritik Eşik:** FRC oksijen deposunun tükenmesi $\rightarrow$ Hipoksik vagal bradikardi $\rightarrow$ Geri dönüşümsüz nöronal anoksi ve beyin ölümü eşiği. |
| **Hava Yolu Obstrüksiyonu (`airway-obstruction`)** | `cascade` | **3 Temel Süreç:** Mekanik darlık ve Bernoulli dinamik kollapsı $\rightarrow$ Ekstrem intratorasik negatif basınç $\rightarrow$ Alveoler asfiksi ve kardiyak arrest. |
| **Pulmoner Aspirasyon (`aspiration`)** | `biphasic` | **Bifazik Akciğer Hasarı:** Akut kimyasal asit yanığı ve sürfaktan denatürasyonu (ilk saatler) $\rightarrow$ Nötrofilik enflamatuar fırtına ve eksüdatif ARDS (4-24. saat) $\rightarrow$ Partiküler mekanik tıkanma. |

---

## 4. Acil Ekipman Arabası & Kiti Başlıkları İzolasyonu

- **Tespit Edilen Kök Neden:** `EmergencyProtocolDetailView.tsx` dosyasındaki Bölüm 7 (Önleme ve Hazırlık) donanım listesi başlığında, daha önce eklenen yeni protokoller (`pe`, `vae`, `last`, `anaphylaxis`) için ternary kontrol dalları bulunmadığından varsayılan (fallback) değer olarak `'Malign Hipertermi Acil Arabası (MH Cart) Asgari Donanım Listesi:'` metni dönmekteydi. Benzer şekilde başlık hızlı ağırlık hesaplayıcısında kontrolsüz bir Dantrolen fallback'i mevcuttu.
- **Yapılan Düzeltmeler:**
  1. **Model Düzeyi (`src/data/emergenciesData.ts`):** `preventionAndPreparedness` arayüzüne `cartTitle?: string;` eklendi ve tüm 10 protokolün veri modellerine kendilerine özel kriz arabası/kiti başlıkları doğrudan tanımlandı.
  2. **Görünüm Düzeyi (`src/components/emergencies/EmergencyProtocolDetailView.tsx`):** Bölüm 7'deki başlık alanı `protocol.preventionAndPreparedness.cartTitle || (protokol id eşleşmeleri) || '${protocol.title} Acil Ekipman & Donanım Listesi:'` dinamik ve güvenli yapısına kavuşturuldu; hiçbir acil artık MH Cart metnini devralamaz hale getirildi.
  3. **Hızlı Hesaplayıcı İzolasyonu:** Hızlı kilo hesaplayıcısının yalnızca `protocol.id === 'mh' || protocol.quickCalculatorType === 'dantrolene'` durumunda Dantrolen göstermesi garanti altına alındı.

---

## 5. Anestezi Troubleshooting Klinik Aracı (`src/components/troubleshooting/`)

- **Konumlandırma ve Sıralama:** Kullanıcı isteği doğrultusunda **Klinik İnfografikler** (`infographics`) aracının hemen ardına yerleştirildi (`infographics` $\rightarrow$ `troubleshooting` $\rightarrow$ `schedule`).
- **İçerik Durumu:** Kullanıcı direktifi ("içeriği bomboş olsun") uyarınca tüm hazır senaryo şablonları kaldırıldı; `TROUBLESHOOTING_ITEMS` tamamen boş bir dizi (`[]`) olarak ayarlandı.
- **Arayüz:** Temiz, zarif ve sakin bir karşılama/hazırlık tuvali oluşturuldu. Kategori yapısı (*Ventilatör & Solunum*, *Hemodinami*, *Monitörizasyon*, *İlaç & İnfüzyon*, *Metabolik & Isı*) ve veri tipi mimarisi hazır tutularak kullanıcının aşamalı olarak ekleyeceği protokolleri karşılayacak şekilde bırakıldı.
- **Entegrasyonlar:** `PortalWorkspace.tsx` (`DEFAULT_TOOL_ORDER`, storage key `v18` otomatik migrasyonu), `deepLink.ts` (`#arac/troubleshooting`) ve `portalSearchIndex.ts` güncellendi.

---

## 6. Yeni Prosedür: Anterior Fusion/Fixation of the Upper Cervical (C1-C2) Spine

- **Klinik Tanım & Branş:** Beyin ve Sinir Cerrahisi (`norosirurji`) / Spinal Nöroşirürji & Kraniyoservikal Bileşke.
- **Dosya:** `src/data/procedures/anteriorUpperCervicalFusion.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Cervical Spine Procedures, pp. 450-456), AANS/CNS servikal travma rehberleri, CSRS ve SNACC konsensusları uyarınca yapılandırıldı.
  - **Hava Yolu Altın Standardı:** Boyunda fleksiyon/ekstansiyon yapılmaksızın **Uyanık Esnek Fiberoptik Entübasyon (AFOI)**; Spiral (Zırhlı) ETT tercihi ve transoral olgularda nazotrakeal yaklaşım.
  - **İONM & TIVA Protokolü:** Transkraniyal Motor (tcMEP) ve Somatosensoriyel (SSEP) uyarılmış potansiyellerin korunması için kas gevşeticisiz idame ve TIVA (Propofol + Remifentanil TCI).
  - **Spinal Kord Perfüzyonu:** MAP $\ge 85\text{ mmHg}$ hedefi, invaziv A-line (tragus seviyesinde sıfırlanmış).
  - **Anatomik Riskler:** A. vertebralis laserasyonu, retrofaringeal derin venöz pleksus kanaması, çift C-kollu (Biplanar AP/Lateral) floroskopi hizalaması.
  - **Postoperatif Hayati Uyarı:** Retrofaringeal/laringeal ödeme karşı zorunlu **Kaf Kaçak Testi (Cuff Leak Test)**; riskli olgularda YBÜ'de entübe takip ve Deksametazon protokolü.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 7. Yeni Prosedür: Posterior Fusion/Fixation of the Upper Cervical Spine

- **Klinik Tanım & Branş:** Beyin ve Sinir Cerrahisi (`norosirurji`) / Spinal Nöroşirürji & Kraniyoservikal Bileşke.
- **Dosya:** `src/data/procedures/posteriorUpperCervicalFusion.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Cervical Spine Procedures, pp. 456-463), Harms & Melcher (2001), CSRS, AANS/CNS ve SNACC konsensus raporları referans alındı.
  - **Prone Pozisyon & Çevirme Manevrası:** Mayfield 3-noktalı çivili başlık ile nötralde sabitleme; supin pozisyondan prone pozisyona 4-5 kişilik deneyimli ekiple eşzamanlı **Log-roll çevirme**; çevirme öncesi ve sonrası İONM bazal sinyallerinin doğrulanması.
  - **Göz Güvenliği (ION Riski):** Prone pozisyonda göz kürelerine bası olmaması (İskemik Optik Nöropati ve santral retinal arter oklüzyonu önlemi) ve her 20-30 dakikada bir fiziksel göz kontrolü.
  - **Hava Yolu Güvenliği:** Uyanık Esnek Fiberoptik Entübasyon (AFOI); baş fleksiyondayken lümen oklüzyonunu önlemek için **Spiral (Zırhlı / Wire-reinforced) ETT** zorunluluğu.
  - **İONM & TIVA Protokolü:** SSEP ve tcMEP sinyalleri için TIVA (Propofol + Remifentanil TCI); indüksiyon sonrası kas gevşetici kullanımının kesin kontrendikasyonu.
  - **Vasküler & Anatomik Riskler:** A. vertebralis V3 segmenti (sulcus arteriae vertebralis ve C1-C2 eklem komşuluğu) laserasyonu ve suboksipital venöz pleksus kanamaları; MAP $\ge 85\text{ mmHg}$ hedefi.
  - **Ekstübasyon Stratejisi:** Prone venöz göllenmeye bağlı yüz/laringeal ödem değerlendirmesi, **Kaf Kaçak Testi (Cuff Leak Test)** ve dört ekstremite acil motor muayenesi.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 8. Yeni Prosedür & İsimlendirme Kuralı: Kraniyotomi - İntrakraniyel Vasküler Malformasyon Cerrahisi (AVM ve Kavernom)

- **Kullanıcı Direktifi:** Kullanıcı İngilizce başlık verse dahi sistemdeki prosedür isimleri Türkçe olarak yazılacaktır.
- **Uygulanan Türkçe İsimler:**
  - *Craniotomy for Intracranial Vascular Malformations* $\rightarrow$ **Kraniyotomi: İntrakraniyel Vasküler Malformasyon Cerrahisi (AVM ve Kavernom Rezeksiyonu)**
  - *Anterior Fusion/Fixation of the Upper Cervical Spine* $\rightarrow$ **Üst Servikal (C1-C2) Anterior Füzyon ve Odontoid Vida Tespiti**
  - *Posterior Fusion/Fixation of the Upper Cervical Spine* $\rightarrow$ **Üst Servikal (C1-C2 / O-C2) Posterior Füzyon ve Enstrümantasyon**
- **Dosya:** `src/data/procedures/craniotomyVascularMalformation.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Vascular Procedures: Resection of Arteriovenous Malformation, pp. 440-446), AHA/ASA Brain AVM kılavuzları ve SNACC konsensus raporları referans alındı.
  - **Normal Perfüzyon Basıncı Çöküşü (NPPB / Spetzler Fenomeni):** Nidus çıkarıldıktan sonra komşu kronik vazoparalitik parankimde hiperemi ve masif kanamayı önlemek için **post-rezeksiyon kontrollü hipotansiyon** (MAP 65-75 mmHg, sistolik KB < 110-120 mmHg) titrasyonu.
  - **Oklüzif Hiperemi Kuralı:** Besleyici arterler kapatılmadan drenaj veninin kesinlikle kesilmemesi; erken venöz oklüzyonda nidal patlama riski.
  - **Anestezi Stratejisi:** TIVA (Propofol + Remifentanil TCI) + İONM (MEP/SSEP ve Faz Ters Dönmesi [Phase Reversal] kortikal haritalama).
  - **Hemostaz ve Kan Hazırlığı:** 4 Ünite ES, 2-4 Ünite TDP, Cell-Saver ve acil masif transfüzyon protokolü (MTP).
  - **Pürüzsüz Uyanma (Smooth Emergence):** Öksürme ve ıkınmayı önlemek için Esmolol/Labetalol/Deksmedetomidin infüzyonu eşliğinde hipertansiyonsuz uyanma.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 9. Yeni Prosedür: Kraniyotomi - Ekstrakraniyel-İntrakraniyel Revaskülarizasyon (EC-IC Bypass / STA-MCA)

- **Kullanıcı İsteği:** Craniotomy for Extracranial-Intracranial Revascularization (EC-IC BYPASS).
- **Türkçe İsimlendirme Kuralı:** **Kraniyotomi: Ekstrakraniyel-İntrakraniyel Revaskülarizasyon (EC-IC Bypass / STA-MCA)**
- **Dosya:** `src/data/procedures/craniotomyEcIcBypass.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Vascular Procedures: Extracranial-Intracranial Bypass, pp. 446-450), AHA/ASA Moyamoya Hastalığı Yönetimi Kılavuzu, International Stroke Conference Konsensusu, SNACC ve ERAS Society Nöroşirürji kılavuzları referans alındı.
  - **4 Vazgeçilmez Anestezi İlkesi:**
    1. **Hiperventilasyondan Kesin Kaçınma (PaCO2 38 - 42 mmHg Normokapni Şartı):** Hipokapni Moyamoya hastalarında narin kollateralleri büzerek iskemiye ("ters Robin Hood / çalma fenomeni") ve akut enfarkta yol açar.
    2. **Geçici Kliplemede İndüklenmiş Hipertansiyon:** Alıcı M4 kortikal dalı anastomoz için geçici mikroklips ile kapatıldığında (25-45 dk), leptomeningeal kollateral akımı desteklemek için MAP %10-20 artırılarak 90-100 mmHg'ye çıkarılır.
    3. **Anastomoz Sonrası Sıkı Tansiyon Kontrolü (CHS Önlemi):** Mikrovasküler lümen açıldığında, perfüzyon otoregülasyonunu yitirmiş parankimde **Serebral Hiperperfüzyon Sendromu (CHS)**, akut serebral ödem ve intrakraniyel kanamayı önlemek amacıyla tansiyon derhal normotansif düzeye (Sistolik KB < 130-140 mmHg, MAP 75-85 mmHg) indirilir.
    4. **Gevşek Skalp Pansumanı Kuralı:** Operasyon sonunda temporal donör STA pedikülünün kompresyonunu önlemek için sargı gevşek tutulur, dairesel sıkı elastik bandaj kesinlikle uygulanmaz.
  - **İntraoperatif Doğrulama:** Mikroskop altı İndosiyanin Yeşili (ICG) video-anjiyografi ve transit-time Charbel ultrasonik debi ölçümü (20-50 mL/dk hedef).
  - **İONM & TIVA Protokolü:** SSEP/MEP ve EEG frekans izlemi için TIVA (Propofol + Remifentanil TCI).
  - **Antiagregan Yönetimi:** Donör STA lümen açıklığı için Aspirin kesilmez, cerrahi sabahı devam edilir; geçici klipleme öncesi düşük doz heparinizasyon (30-50 IU/kg).
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına başarıyla entegre edildi.

---

## 10. Yeni Prosedür: Kraniyotomi - Supratentoryal Beyin Tümörü Rezeksiyonu (Gliom, Menenjiyom ve Metastaz Cerrahisi)

- **Kullanıcı İsteği:** Craniotomy for Tumor ekle.
- **Türkçe İsimlendirme Kuralı:** **Kraniyotomi: Supratentoryal Beyin Tümörü Rezeksiyonu (Gliom, Menenjiyom ve Metastaz Cerrahisi)**
- **Dosya:** `src/data/procedures/craniotomyTumor.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Supratentorial Neoplasm, pp. 416-422), SNACC Konsensus Raporları, ERAS Society Nöroşirürji Onkoloji Kılavuzları ve 2021 WHO SSS Tümör Sınıflaması referans alındı.
  - **Beyin Tümörü Cerrahisinde Anestezinin Altın Üçgeni:**
    1. **Cerrahi İçin Gevşek / Rahat Beyin (Slack Brain) Sağlamak:** İnsizyonla eşzamanlı %20 Mannitol (0.5-1.0 g/kg) veya %3 Hipertonik Salin (2-3 mL/kg), hafif kontrollü hiperventilasyon (PaCO2 32-35 mmHg), baş ve gövde 20-30° elevasyonu, internal juguler ven basısını engelleyen serbest boyun pozisyonu, N2O kontrendikasyonu ve TIVA ile CMRO2/CBF baskılanması.
    2. **İntraoperatif Nöromonitörizasyon (İONM) Güvenliği:** MEP/SSEP ve motor şeritte kortikal Faz Ters Dönmesi (Phase Reversal) kayıtlarının bozulmaması için indüksiyon sonrası kas gevşeticisiz TIVA (Propofol + Remifentanil TCI) idamesi.
    3. **Pürüzsüz Uyanma (Smooth Emergence) ve Sıkı Tansiyon Kontrolü:** Ekstübasyon sırasında öksürme, ıkınma ve hipertansif ataklar tümör lojundaki frajil neovasküler yatakta intrakraniyel hematom felaketine yol açar. IV Lidokain (1.5 mg/kg), Esmolol veya Deksmedetomidin ile sempatik blokaj sağlanarak sistolik KB < 140 mmHg, MAP 75-85 mmHg aralığında pürüzsüz ekstübasyon yapılır.
  - **Cerrahi Aşamalar ve Hemostaz:** CUSA (kitle içi selektif kavitasyon), dural sinüs kanamaları ve venöz hava embolisi (VAE) önlemleri, dura açılışında gergin beyin (tense brain) yönetim algoritması, kapanış öncesi gizli venöz kaçakları yakalamak için 25-30 cmH2O hava yolu basıncıyla Valsalva manevrası.
  - **ERAS & Ağrı Yönetimi:** Preop/postop 5 sinirli Skalp Bloğu (supraorbital, supratroklear, aurikulotemporal, oksipital majör ve minör), intraop Deksametazon + Ondansetron ikili antiemetik rejimi, Levetirasetam (Keppra) nöbet profilaksisi.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına başarıyla kaydedildi.

---

## 11. Yeni Prosedür: Acil Kraniyotomi ve Kraniektomi - Akut Kafa Travması Cerrahisi (Epidural, Subdural Hematom ve Dekompresyon)

- **Kullanıcı İsteği:** Craniotomy for Trauma ekle.
- **Türkçe İsimlendirme Kuralı:** **Acil Kraniyotomi ve Kraniektomi: Akut Kafa Travması Cerrahisi (Epidural, Subdural Hematom ve Dekompresyon)**
- **Dosya:** `src/data/procedures/craniotomyTrauma.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Trauma: Craniotomy for Trauma, pp. 433-439), Brain Trauma Foundation (BTF 4. Baskı) Şiddetli Travmatik Beyin Hasarı Kılavuzları, ATLS 10. Baskı, ERC/AHA Resüsitasyon rehberleri ve CRASH-3 çalışması referans alındı.
  - **Nörotravma Anestezisinin 5 Ölümcül Kuralı:**
    1. **Hipotansiyondan Kesinlikle Kaçınmak:** SBP < 100-110 mmHg (veya MAP < 80 mmHg) altına tek bir düşüş bile mortaliteyi ikiye katlar! Hedef: SBP ≥ 100-110 mmHg, MAP ≥ 80-90 mmHg, CPP (MAP - ICP) ≥ 60-70 mmHg. Noradrenalin ve kristalloid/kan ile anında müdahale.
    2. **Hipoksiden Kaçınmak:** SpO2 < %90 veya PaO2 < 60 mmHg mortaliteyi iki katına çıkarır. Hedef PaO2 80-120 mmHg, SpO2 ≥ %95.
    3. **Aşırı Hiperventilasyondan Kaçınmak:** Kafa travmasında ilk 24 saatte serebral kan akımı (CBF) yarı yarıya azalmıştır; PaCO2 < 30 mmHg derin parankimal iskemiye yol açar. Hedef normokapni (PaCO2 35-38 mmHg); yalnızca herniasyon anında kemik açılana kadar geçici 30-32 mmHg.
    4. **Servikal Omurga Koruması & MILS ile RSI:** Tüm travma hastaları dolu mide ve instabil servikal omurgalı kabul edilir; boyun fleksiyon/ekstansiyonu engellenerek Manuel Hat İçi Stabilizasyon (MILS) ve videolaringoskopi ile hızlı seri indüksiyon (RSI) uygulanır.
    5. **Dura Açıldığında Akut Dekompresyon Yönetimi:** Tamponad aniden kalktığında sistemik vazodilatasyon/hipotansiyon, malign beyin kabarması (bulging brain) veya kontralateral hematom açığa çıkışı riskine karşı hazırlıklı olunur.
  - **Ozmotik Terapi Seçimi:** Politravmalı ve hipovolemik olgularda Mannitol dehidratasyon ve şoku derinleştireceğinden **%3 Hipertonik Salin (2-3 mL/kg)** ilk tercihtir.
  - **MTP ve Koagülopati Yönetimi:** 1:1:1 Dengeli Masif Transfüzyon Protokolü, antikoagülan hızlı geri çevirme (PCC, İdarusizumab, Andexanet Alfa), erken Fibrinojen ve TXA stratejisi.
  - **Emergence:** Travma kraniyotomisi hastaları ameliyathanede ekstübe EDİLMEZ; entübe, sedatize ve stabilize olarak doğrudan Nöro-Yoğun Bakım Ünitesine transfer edilir.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 12. Yeni Prosedür: Kraniyotomi - Kranyal Sinir Mikrovasküler Dekompresyonu (MVD - Trigeminal, Fasiyal ve Glossofaringeal)

- **Kullanıcı İsteği:** Microvascular Decompression of Cranial Nerve ekle.
- **Türkçe İsimlendirme Kuralı:** **Kraniyotomi: Kranyal Sinir Mikrovasküler Dekompresyonu (MVD - Trigeminal, Fasiyal ve Glossofaringeal)**
- **Dosya:** `src/data/procedures/craniotomyMicrovascularDecompression.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Cranial Nerve Decompression, pp. 427-433), Jannetta P.J. literatürü, AANS/CNS, SNACC ve ERAS Kafa Tabanı Kılavuzları referans alındı.
  - **MVD Cerrahisinde Anestezinin 4 Hayati Kuralı:**
    1. **Kas Gevşeticisiz TIVA İdamesi:** Fasiyal sinir serbest EMG (Free-run EMG), Lateral Spread Response (LSR) ve alt kranyal sinir kas yanıtlarını güvenilir izlemek için entübasyon sonrası nöromusküler blokör tekrarlanmaz.
    2. **Beyin Sapı İşitsel Uyarılmış Potansiyelleri (BAEP / ABR) ile CN VIII Koruması:** Serebellar ekarte basısında akustik sinir gerilirse Dalga V latansında > 1.0 ms uzama veya amplitüdde > %50 düşüş işitme kaybı alarmıdır; cerrah derhal ekartörü gevşetir ve papaverin uygular.
    3. **Otonomik Reflekslerin Yönetimi:** CN V diseksiyonunda Trigemino-Kardiyak Refleks (TCR) veya CN IX/X diseksiyonunda glossofaringeal-vagal refleks ile ani asistoli, derin bradikardi veya hipotansiyon gelişebilir; anında cerrahi durdurulur ve Atropin hazır tutulur.
    4. **Arka Çukur İçin Pürüzsüz Uyanma (Smooth Emergence):** Arka çukur dar ve rijit bir kompartmandır; öksürme/ıkınma beyin sapına bası yapan ölümcül hematoma yol açar; IV Lidokain (1.5 mg/kg), Esmolol/Deksmedetomidin ile tansiyon sistolik < 130-140 mmHg tutulur.
  - **Pozisyon Güvenliği:** Park-Bench veya modifiye lateral dekübitus; ipsilateral juguler ven basısını ve serebellar venöz infarktı önlemek için çene-sternum arası en az 2 parmak mesafe korunur; aksiller rulo ile brakial pleksus korunur.
  - **BOS Kaçağı & Alt Kranyal Sinir Takibi:** Su sızdırmaz dural tamir için Valsalva manevrası; CN IX/X cerrahilerinde oral beslenme öncesi zorunlu yutma/öğürme (gag) testi.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına başarıyla kaydedildi.

---

## 13. Yeni Prosedür: Bifrontal Kraniyotomi - BOS Fistülü ve Rinore Onarımı (Ön Kafa Kaidesi Rekonstrüksiyonu)

- **Kullanıcı İsteği:** Bifrontal Craniotomy for CSF Leak ekle.
- **Türkçe İsimlendirme Kuralı:** **Bifrontal Kraniyotomi: Beyin Omurilik Sıvısı (BOS) Fistülü ve Rinore Onarımı (Ön Kafa Kaidesi Rekonstrüksiyonu)**
- **Dosya:** `src/data/procedures/bifrontalCraniotomyCsfLeak.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Cranial Approaches: Bifrontal Craniotomy for CSF Leak, pp. 422-427), North American Skull Base Society (NASBS), SNACC ve ERAS Kafa Kaidesi Kılavuzları referans alındı.
  - **Bifrontal BOS Fistülü Onarımında 5 Hayati Anestezi Kuralı:**
    1. **Nazal Girişimler Kesinlikle Yasaktır (Nazogastrik Tüp / Airway Kontrendikasyonu):** Ön kafa kaidesi kırıklarında nazal tüp kribriform platodan intrakraniyel kompartmana (beyin parankimine) penetre olabilir. Mide dekompresyonu için doğrudan görüş altında sadece **Oral Orogastrik Tüp (OGT)** kullanılır.
    2. **Azot Protoksit (N2O) Kesinlikle Kontrendikedir:** Açık kafa tabanı ve pnömosefali mevcudiyetinde N2O gazı intrakraniyel hava hacmini hızla büyüterek **Tansiyon Pnömosefalisi** ve herniasyona yol açar.
    3. **Frontal Gevşeme (Slack Frontal Lobes) ve Anozmi Önlemi:** Frontal lob kontüzyonu ve olfaktör sinir avülsiyonunu (kalıcı anozmi) önlemek için Lomber Drenaj (LD) ile 30-60 mL BOS çekilmesi, Mannitol/Hipertonik Salin ve hafif hiperventilasyon (PaCO2 32-35 mmHg).
    4. **İntratekal Flöresein Güvenliği:** Kaçak yerini mikroskop altında sarı-yeşil saptamak için çok düşük doz (%5 solüsyondan 0.1-0.2 mL BOS ile seyreltilerek) 10-15 dakikada çok yavaş verilmeli; kimyasal menenjit ve nöbet riskine karşı Levetirasetam (Keppra) profilaksisi uygulanmalıdır.
    5. **Pürüzsüz Uyanma ve Sümkürme Yasağı:** Ekstübasyonda ıkınma ve öksürme yeni dural grefti ve fibrin yapıştırıcıyı patlatır; uyanma sempatolitiklerle (Lidokain, Esmolol) pürüzsüz yapılmalı, hastaya kesinlikle burnunu sümkürmemesi tembihlenmeli ve CPAP/BiPAP uygulanmamalıdır.
  - **Cerrahi Aşamalar:** Bikoronal flep diseksiyonu, vaskülarize galeoperikranyal flep, A. ethmoidalis kanama kontrolü (retrobulbar hematom riski), frontal sinüs kranializasyonu ve su sızdırmazlık için 25-30 cmH2O ile Valsalva manevrası.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına başarıyla kaydedildi.

---

## 14. Yeni Prosedür: Transsfenoidal Hipofiz Tümörü Rezeksiyonu (Endoskopik Endonazal Hipofiz Cerrahisi)

- **Kullanıcı İsteği:** Transsphenoidal Resection of Pituitary Tumor ekle.
- **Türkçe İsimlendirme Kuralı:** **Transsfenoidal Hipofiz Tümörü Rezeksiyonu (Endoskopik Endonazal Hipofiz Cerrahisi)**
- **Dosya:** `src/data/procedures/transsphenoidalPituitaryResection.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Pituitary Surgery: Transsphenoidal Resection of Pituitary Tumor, pp. 427-433), The Endocrine Society & Pituitary Society Kılavuzları, SNACC ve ERAS Kafa Tabanı Kılavuzları referans alındı.
  - **Transsfenoidal Cerrahide Anestezinin 5 Vazgeçilmez İlkesi:**
    1. **Hava Yolu Güvenliği & Akromegali:** Akromegali olgularında makroglossi, prognatizm, laringeal hipertrofi ve subglottik darlık nedeniyle **şiddetli zor hava yolu** riski mevcuttur; videolaringoskop ve standarttan 0.5-1.0 numara küçük spiral/güney RAE tüp hazır tutulur.
    2. **Nazal Adrenalin Yanıtı:** Cerrahın mukozal hemostaz için enjekte ettiği epinefrinli solüsyon (1:100.000 veya 1:200.000) masif kan basıncı fırlaması ve aritmileri tetikleyebilir; Esmolol hazır tutulur.
    3. **Karotid Arter (ICA) Koruma Hazırlığı:** Sella tursika lateralinde Kavernöz İnternal Karotid Arter laserasyonu ameliyatın en ölümcül komplikasyonudur; acil masif kanama protokolü (MTP) ve çift geniş damar yolu hazır olmalıdır.
    4. **Suprasellar Tümörün İndirilmesi İçin Valsalva Manevrası:** Kraniyotomilerin aksine hipofiz cerrahisinde Mannitol veya hiperventilasyon **istenmez**; suprasellar tümörün kiazmadan ayrılıp sellaya inmesi için anestezi ekibince 20-30 cmH2O pozitif inspirasyon basıncı uygulanır.
    5. **Boğaz Tamponu (Throat Pack) Güvenlik Kuralı & Diyabetes İnsipidus (DI):** Yutulan kanı önleyen farengeal tampon ekstübasyondan önce **kesinlikle çıkarılmalıdır**. Arka hipofiz hasarına bağlı gelişebilecek saatlik > 300 mL/saat masif poliüri (DI) için Desmopressin (DDAVP) ve intraop stres dozu Hidrokortizon hazır bulundurulur.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 15. Yeni Prosedür: Ventriküler Şant Girişimleri - Ventriküloperitoneal ve Ventriküloatrial Şant Cerrahisi (VP / VA Şant)

- **Kullanıcı İsteği:** Ventricular Shunt Procedures ekle.
- **Türkçe İsimlendirme Kuralı:** **Ventriküler Şant Girişimleri: Ventriküloperitoneal ve Ventriküloatrial Şant Cerrahisi (VP / VA Şant)**
- **Dosya:** `src/data/procedures/ventricularShuntProcedures.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Pediatric & Adult: Ventricular Shunt Procedures, pp. 463-468), AANS/CNS Pediatrik ve Erişkin Hidrosefali Rehberleri, SNACC ve ERAS Kılavuzları referans alındı.
  - **Şant Cerrahisinde Anestezinin 5 Kritik Klinik İlkesi:**
    1. **Subkütan Tünelleme Sırasında Ağrı ve Sempatik Deşarj:** Trokar baş bölgesinden boyun, klavikula ve göğüs duvarını geçip batına ilerletilirken şiddetli hipertansif atak ve taşikardi gelişebilir; hat lokal anestezikle bloke edilmeli veya derin anestezi/opioid bolusu sağlanmalıdır.
    2. **Laparoskopi ve Pnömoperitoneumun KİBAS Etkisi:** Batına CO2 insüflasyonu (10-14 mmHg) diyaframı yükseltip CVP ve intratorasik basıncı artırarak intrakraniyel venöz dönüşü engeller ve ICP'yi yükseltir; insüflasyon basıncı düşük (< 8-10 mmHg) tutulmalı, dakika ventilasyonu artırılarak PaCO2 35-38 mmHg dengelenmelidir.
    3. **Aşırı Hızlı BOS Boşalması (Overdrainage) Riski:** Ventriküle girildiğinde serbest BOS uzun süre akıtılırsa beyin parankimi aniden çökerek kortikal köprü venlerini yırtabilir ve akut subdural hematom/higroma gelişebilir.
    4. **VA Şantta Hava Embolisi ve Aritmi:** Kateter V. jugularis üzerinden sağ atriyuma girerken Trendelenburg ile hava embolisi önlenmeli; atriyal mekanik irritasyona bağlı ektopik atımlar EKG ile izlenmelidir.
    5. **Katı Sterilite Protokolü:** Şant enfeksiyonu (Staphylococcus epidermidis/aureus) en ağır komplikasyondur; profilaktik antibiyotik kesiden 15-30 dk önce verilmiş olmalı ve ameliyathane trafiği asgariye indirilmelidir.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına başarıyla kaydedildi.

---

## 16. Yeni Prosedür: Kraniyoservikal Dekompresyon - Chiari Malformasyonu Cerrahisi (Foramen Magnum Dekompresyonu ve Duraplasti)

- **Kullanıcı İsteği:** Craniocervical Decompression (Chiari Malformation) ekle.
- **Türkçe İsimlendirme Kuralı:** **Kraniyoservikal Dekompresyon: Chiari Malformasyonu Cerrahisi (Foramen Magnum Dekompresyonu ve Duraplasti)**
- **Dosya:** `src/data/procedures/craniocervicalDecompressionChiari.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Pediatric & Adult: Craniocervical Decompression, pp. 468-474), AANS/CNS Chiari Konsensus Kılavuzları, SNACC ve ERAS Society Nöroşirürji Rehberleri referans alındı.
  - **Chiari Dekompresyonunda Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Hava Yolunda Servikal Fleksiyon Tehlikesi:** Entübasyon sırasında boyna aşırı fleksiyon veya ekstansiyon verilmesi foramen magnumdaki tonsilleri servikomedüller bileşkeye sıkıştırarak akut solunum arresti ve kuadriplejiye yol açabilir; entübasyon nötral eksende videolaringoskop veya AFOI ile Spiral (Zırhlı) ETT kullanılarak gerçekleştirilir.
    2. **Prone Pozisyonda Çene-Göğüs Güvenlik Aralığı (En Az 2 Parmak):** Kraniyoservikal alanı açmak için başa apeks fleksiyonu verilirken çene ile sternum arasında **en az 2 parmak mesafe** korunmalıdır; aşırı fleksiyon internal juguler venleri sıkıştırarak masif serebellar venöz göllenmeye ve beyin fıtıklaşmasına yol açar.
    3. **İONM ve Beyin Sapı Korunması:** Transkraniyal MEP/SSEP ve alt kranyal sinir (vokal kord EMG) kayıtlarının kesintisiz alınabilmesi için entübasyon sonrasında kas gevşeticisiz TIVA uygulanır; foramen magnum açılırken ve tonsiller manipüle edilirken oluşabilecek bradikardi, asistoli veya hipertansiyon anında cerraha bildirilir.
    4. **Venöz Hava Embolisi (VAE) Takibi:** Prone pozisyonda cerrahi alan kalp seviyesinin üzerinde kaldığından dural marjinal sinüslerden hava embolisi riski mevcuttur; sürekli EtCO2 ve prekordiyal Doppler izlemi yapılır.
    5. **Ekstübasyonda Santral Hipoventilasyon & Apne Riski:** Chiari hastalarında bazal santral uyku apnesi, körelmiş hiperkapnik solunum dürtüsü ve alt kranyal sinir disfonksiyonu riski yüksektir; hasta ameliyathanede tam uyanık, tidal volümü güçlü ve öğürme/öksürük refleksleri tam olmadan ekstübe edilmez.
  - **Cerrahi Aşamalar:** Suboksipital kraniektomi, C1 arka arkus laminektomisi (vertebral arter koruması), Y-dural açılış, ektopik tonsillerin bipolar küçültülmesi ve su sızdırmazlık için 25-30 cmH2O ile Valsalva manevrası eşliğinde genişletici duraplasti.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 17. Yeni Prosedür: Stereotaktik Beyin Biyopsisi (Çerçeveli ve Çerçevesiz Tanısal Girişimler)

- **Kapsam:** Jaffe 5. Baskı (Section II: Neurosurgery - Stereotactic Procedures, pp. 474-477).
- **Türkçe İsimlendirme Kuralı:** **Stereotaktik Beyin Biyopsisi (Çerçeveli ve Çerçevesiz Tanısal Nöroşirürji Girişimleri)**
- **Dosya:** `src/data/procedures/stereotacticNeurosurgery.ts`
- **Klinik Odak:** Derin, elokent veya inoperabl intrakraniyel kitlelerin (lenfoma, gliom, metastaz, apse) trepanasyon deliğinden milimetrik koordinatlarla doku örneklemesi; Ommaya rezervuarı ve kist aspirasyonu; stereotaktik çerçeve acil hava yolu yönetimi, dural koagülasyon, beyin şifti önlemi ve sıkı kan basıncı kontrolü.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 18. Yeni Prosedür: Stereotaktik Fonksiyonel Girişimler - Derin Beyin Stimülasyonu (DBS), Pallidotomi ve Talamotomi

- **Kullanıcı İsteği:** Stereotactic Procedures: Deep Brain Stimulation, Pallidotomy, and Thalamotomy ekle.
- **Türkçe İsimlendirme Kuralı:** **Stereotaktik Fonksiyonel Girişimler: Derin Beyin Stimülasyonu (DBS), Pallidotomi ve Talamotomi**
- **Dosya:** `src/data/procedures/stereotacticDbsPallidotomyThalamotomy.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Stereotactic Procedures: Deep Brain Stimulation, Pallidotomy, and Thalamotomy, pp. 477-482), WSSFN, MDS, ASSFN, SNACC ve ERAS Society Fonksiyonel Nöroşirürji Kılavuzları referans alındı.
  - **DBS, Pallidotomi ve Talamotomide 5 Temel Anestezi Kuralı:**
    1. **MER ve Klinik Test Fazında Sıfır Sedasyon:** Propofol, benzodiazepinler ve yüksek doz opioidler STN/GPi/Vim nöronal deşarjlarını ve beta frekanslarını yok eder. Mikroelektrot kaydı ve test stimülasyonu / lezyonlama öncesinde (20-30 dk önce) Deksmedetomidin tamamen kesilir; hasta uyanık, koopere ve L-Dopa "Off" durumunda test edilir.
    2. **Radyofrekans (RF) Lezyonlama Güvenliği (Pallidotomi/Talamotomi):** Önce 42-45°C'de 60 saniye geri dönüşümlü test lezyonlaması yapılır (tremorun/rijiditenin durduğu, kapsüler veya optik yan etki olmadığı kanıtlanır); ardından 70-80°C'de 60 saniye kalıcı doku koagülasyonu uygulanır.
    3. **Optik Traktus ve Kapsüla İnterna Sınırları:** GPi hedeflendiğinde optik traktus komşuluğu nedeniyle görme alanı (fosfen/ışık çakması) testi; STN ve Vim hedeflendiğinde kapsüla interna komşuluğu nedeniyle yüzde çekilme, motor kasılma ve disartri testleri uyanık hastada anestezi baskısı olmadan teyit edilir.
    4. **Çerçeveli Hastada Acil Hava Yolu Eylem Planı:** Leksell/CRW çerçevesi ağız açıklığını engeller; videolaringoskop, fiberoptik, LMA ve çerçevenin 4 vidasını saniyeler içinde sökecek Leksell alyan anahtarı başucunda hazır tutulur.
    5. **Beyin Şifti (Brain Shift) ve Tansiyon Kontrolü:** Burr-hole açıldığında hava girişini önlemek için baş elevasyonu düşük (10-15°) tutulur, delik fibrin süngerle kapatılır; parankim penetrasyonunda sistolik KB < 130-140 mmHg tutulur.
  - **Faz II Yönetimi:** DBS hastalarında çerçeve çıkarıldıktan sonra subklaviküler pil (IPG) implantasyonu ve tünelleme genel anestezi (GETA/LMA) altında konforlu şekilde tamamlanır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 19. Yeni Prosedür: Vagal Sinir Stimülasyonu (VNS) - Sol Vagus Siniri Stimülatörü İmplantasyonu (Dirençli Epilepsi Tedavisi)

- **Kullanıcı İsteği:** Vagal Nerve Stimulation ekle.
- **Türkçe İsimlendirme Kuralı:** **Vagal Sinir Stimülasyonu (VNS): Sol Vagus Siniri Stimülatörü İmplantasyonu (Dirençli Epilepsi Tedavisi)**
- **Dosya:** `src/data/procedures/vagalNerveStimulation.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Vagal Nerve Stimulation, pp. 482-486), American Epilepsy Society (AES), International League Against Epilepsy (ILAE), SNACC ve ERAS Society Nöromodülasyon Kılavuzları referans alındı.
  - **VNS İmplantasyonunda Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Daima Sol Vagus Siniri Kuralı (Kardiyak Güvenlik):** Sağ vagus siniri sinoatriyal (SA) düğümü yüksek yoğunlukta innerve eder; sağ vagus uyarımı veya manipülasyonu derin bradikardi, tam AV blok ve kardiyak arreste yol açar. Sol vagus siniri ise atriyoventriküler (AV) düğümü innerve eder ve ağırlıklı olarak afferent duyusal lifleri NTS'ye taşır. Bu nedenle stimülasyon elektrodu istisnasız **SOL vagus sinirine** implante edilir.
    2. **Karotis Kılıfı Diseksiyonu ve Vagal Traksiyon Bradikardisi/Asistolisi:** Servikal insizyondan karotis kılıfı açılırken vagus sinirine veya karotis sinüsüne traksiyon yapılması ani bradikardiye, asistoliye veya hipotansiyona yol açabilir. Traksiyon anında cerrah uyarılmalı ve cerrahi durdurulmalıdır; düzelmezse Atropin (0.5-1.0 mg) veya Glikopirolat uygulanır.
    3. **İntraoperatif Elektrot Testi (Lead Interrogation) ve EKG Takibi:** Cerrah helezon elektrotları sol vagusa sarıp jeneratöre (IPG) bağladığında tanısal lead empedans ve test stimülasyonu (1 mA, 20-30 Hz) uygular. Bu sırada anestezist monitörde EKG ritmini (akut bradikardi veya disritmi var mı?) izler ve eşzamanlı olarak cerrah veya anestezist laringeal palpasyon / vokal kord seğirmesi (laringeal titreşim) ile sol rekürren laringeal sinir uyarımını doğrular.
    4. **Subkutan Tünelleme ve Analjezi:** Boyun insizyonundan sol subklaviküler/aksiller jeneratör cebine uzanan tünelleme işlemi ağrılıdır ve vagal/sempatik uyarılmaya yol açabilir; geçiş hattına lokal anestezik infiltrasyonu (Bupivakain/Levobupivakain + Epinefrin) yapılır ve anestezi derinliği geçici olarak artırılır.
    5. **Pürüzsüz Ekstübasyon ve Servikal Hematom Riski:** Boyundaki zengin venöz ağ (internal juguler ven komşuluğu) nedeniyle ameliyat sonunda öksürme, ıkınma ve hipertansiyon servikal kanamaya yol açabilir. Genişleyen bir boyun hematomu trakeaya dıştan bası yaparak akut hava yolu obstrüksiyonuna neden olur. İntravenöz Lidokain (1.0-1.5 mg/kg) ile öksürük baskılanır ve hasta pürüzsüz ekstübe edilir.
  - **Antiepileptik Tedavi (AED) Sürekliliği:** Hastanın düzenli kullandığı tüm antiepileptik ilaçlar cerrahi sabahı dahil aksatılmadan verilmelidir; ani ilaç kesilmesi perioperatif status epileptikus riskini tetikler.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 20. Yeni Prosedür: Cerrahi Analjezik Yöntemler - Omurilik Stimülasyonu (SCS), İntratekal İlaç Pompaları ve Motor Korteks Stimülasyonu (MCS)

- **Kullanıcı İsteği:** Surgical Analgesics: Spinal Cord Stimulation, Intrathecal Pumps, and Cortical Stimulation ekle.
- **Türkçe İsimlendirme Kuralı:** **Cerrahi Analjezik Yöntemler: Omurilik Stimülasyonu (SCS), İntratekal İlaç Pompaları ve Motor Korteks Stimülasyonu (MCS)**
- **Dosya:** `src/data/procedures/surgicalAnalgesicsStimulationPumps.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Surgical Analgesics: Spinal Cord Stimulation, Intrathecal Pumps, and Cortical Stimulation, pp. 486-492), NACC, PACC, INS, ASRA/ESRA ve SNACC rehberleri referans alındı.
  - **Cerrahi Analjezik ve Nöromodülasyon Yöntemlerinde Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **SCS'de İntraoperatif Parestezi Testi ve Hasta Kooperasyonu:** Perkütan lead yerleştirilirken cerrah test uyarımı verir; hastanın elektrot stimülasyonunun ağrılı bölgeyi %80-100 oranında kapsadığını ("parestezi örtüşmesi") net olarak ifade etmesi şarttır. Aşırı derin sedasyon hastanın cevabını bozar; test sırasında hasta tam uyanık olmalıdır (Deksmedetomidin / düşük doz remifentanil titre edilir). Açık paddle lead girişimlerinde ise SSEP/MEP kollizyon testi için kas gevşeticiler antagonize edilmiş olmalıdır.
    2. **Prone Pozisyonda Karın Basıncı ve Epidural Kanama:** Prone pozisyonda batın serbest bırakılmalıdır (Wilson çerçevesi veya göğüs-pelvis yastıkları); batına binen dış bası Vena Cava Inferior'u sıkıştırarak Batson epidural venöz pleksusunda masif konjesyona ve cerrahiyi imkansız kılan epidural kanamalara yol açar.
    3. **İntratekal Pompalarda Baklofen ve Opioid Akut Doz Aşımı ve Yoksunluk Tehlikesi:** Pompa dolumu, cerrahi test veya kazara yüksek doz verilmesinde akut Baklofen/Opioid toksisitesi (şiddetli hipotansiyon, bradikardi, flaksid paralizi, hipotermi, koma ve solunum arresti) gelişebilir (Eylem: Lomber BOS aspirasyonu, mekanik ventilasyon, destek tedavi). Tam tersi, pompanın aniden durması veya kateter tıkanması ölümcül Baklofen Yoksunluk Fırtınasına (hipertermi, masif rijidite, rabdomiyoliz, nöbet, multiorgan yetmezliği) yol açar.
    4. **Motor Korteks Stimülasyonunda Faz Dönüşümü (Phase Reversal) ve Ameliyat Masasında Nöbet Kontrolü:** M1 motor şeridinin tespiti için SSEP N20/P20 faz dönüşümü ve doğrudan kortikal elektrik uyarımı yapılır. Kortikal stimülasyon fokal/jeneralize nöbeti tetikleyebilir; kortekse dökmek üzere buzlu soğuk serum fizyolojik (cold saline) ve IV Propofol/Levetirasetam anında hazır olmalıdır.
    5. **Tünelleme Ağrısı ve Katı Antikoagülasyon / Enfeksiyon Protokolü:** Lomber/kranyal alandan abdominal/subklaviküler cebe uzanan subkütan tünel oluşturulması şiddetli ağrılıdır; lokal infiltrasyon yapılır. ASRA/NACC antikoagülan kesilme sürelerine (epidural hematom ve parapleji riskine karşı) harfiyen uyulmalıdır. İmplante edilen yabancı cisimlerin (IPG, pompa, lead) enfeksiyonu tüm sistemin eksplantasyonunu gerektirdiğinden cerrahi öncesi Vankomisin/Sefazolin zorunludur.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 21. Yeni Prosedür: Epilepsi Cerrahisi - Rezektif Cerrahi, Amigdalohipokampektomi ve Elektrokortikografi (ECoG) Eşliğinde Odak Rezeksiyonu

- **Kullanıcı İsteği:** Epilepsy Surgery ekle.
- **Türkçe İsimlendirme Kuralı:** **Epilepsi Cerrahisi: Rezektif Cerrahi, Amigdalohipokampektomi ve Elektrokortikografi (ECoG) Eşliğinde Odak Rezeksiyonu**
- **Dosya:** `src/data/procedures/epilepsySurgery.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Epilepsy Surgery, pp. 492-498), ILAE, AES, SNACC ve ERAS Society Nöroşirürji Kılavuzları referans alındı.
  - **Epilepsi Cerrahisinde Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **ECoG Kaydına Anestezik Ajanların Etkisi:** Volatil anestezikler (> 0.5 MAC) ve propofol bolusları/benzodiazepinler kortikal epileptojenik diken deşarjlarını siler veya "burst suppression" oluşturur. ECoG kaydından 15-20 dakika önce volatil ajanlar kapatılmalı veya < 0.3 MAC'a çekilmeli, TIVA (Remifentanil + titre Propofol) rejimine geçilmelidir.
    2. **İntraoperatif Akut Nöbet Yönetimi (Buzlu Soğuk SF Masada Hazır Olmalı):** Kortikal stimülasyon haritalaması ameliyat masasında fokal/jeneralize nöbet tetikleyebilir. Kortekse dökülmek üzere 4°C buzlu soğuk serum fizyolojik (cold saline) steril masada hazır olmalıdır; durmazsa IV Propofol (30-50 mg) veya Midazolam uygulanır.
    3. **Kronik AED Farmakokinetik Etkileşimleri:** Fenitoin, Karbamazepin ve Fenobarbital hepatik CYP enzimlerini indüklediğinden Rokuronyum ve Vekuronyum klirensi hızlanır; etki süreleri belirgin kısalır ve daha sık/yüksek doz gerekir. AED'ler cerrahi sabahı dahil kesintisiz sürdürülür.
    4. **Amigdalohipokampektomide Kritik Vasküler ve Görme Yolu Anatomisi:** Hipokampus çıkarılırken A. choroidea anterior hasarı kontralateral hemiplejiye; Meyer lupu hasarı superior homonim kuadrantanopsiye ("pie in the sky") yol açar. MAP > 75-80 mmHg tutulmalıdır.
    5. **Pürüzsüz Ekstübasyon (Smooth Emergence):** Rezeksiyon kavitesinde hematom gelişimini önlemek için öksürme, ıkınma ve hipertansiyon IV Lidokain (1.5 mg/kg) ile engellenir.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 22. Yeni Prosedür: Spastisite Cerrahisi - Selektif Dorsal Rizotomi (SDR), DREZ Lezyonlama ve Periferik Nörotomi

- **Kullanıcı İsteği:** Surgery for Spasticity ekle.
- **Türkçe İsimlendirme Kuralı:** **Spastisite Cerrahisi: Selektif Dorsal Rizotomi (SDR), DREZ Lezyonlama ve Periferik Nörotomi**
- **Dosya:** `src/data/procedures/surgeryForSpasticity.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Surgery for Spasticity, pp. 498-502), AACPDM, SNACC, EPNS ve ERAS Society Nöroşirürji Kılavuzları referans alındı.
  - **Spastisite Cerrahisinde (SDR) Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Sıfır Nöromusküler Blokaj (Kas Gevşetici Yasaktır!):** L2-S2 dorsal kökçüklerinin elektrofizyolojik stimülasyonu ve EMG yanıtlarının değerlendirilmesi ameliyatın temelidir. Entübasyonda kısa etkili gevşetici kullanılsa dahi cerrahi başlamadan önce TOF 4/4 (%100) olmalı ve ameliyat boyunca kesinlikle kas gevşetici verilmemelidir; anestezi TIVA (Propofol + Remifentanil) ile idame edilir.
    2. **Prone Pozisyonda Kontraktürler ve Bası Koruması:** Serebral palsili çocuklarda kalça/diz fleksiyon kontraktürleri ve skolyoz sıktır. Kontraktürlü eklemler zorlanmadan altlarına silikon pedler konur; göğüs-pelvis yastıkları ile batın serbest bırakılır (epidural pleksus kanamasını önlemek için), gözler ve yüz sıfır basıda korunur.
    3. **Pediatrik Hipotermi ve Açık BOS Maruziyeti:** Saatler süren laminektomi ve dural açılışta açık subaraknoid mesafeden soğuk irrigasyon hızla hipotermiye yol açar. Vücut sıcaklığı < 35.5°C olduğunda EMG refleks eşikleri bozulur ve koagülopati başlar. Aktif hava ısıtıcı battaniye, sıvı ısıtıcıları ve 37°C ısıtılmış yıkama sıvıları zorunludur.
    4. **İntraoperatif Sfinkter Koruması (S2-S4 Pudendal Kökler):** S1-S2 kökçükleri uyarılırken anal sfinkter EMG yanıtları sürekli izlenir; anal sfinkter yanıtı veren kökçükler kalıcı fekal ve üriner inkontinansı önlemek için kesinlikle kesilmez.
    5. **Postoperatif Şiddetli Spazm ve Ağrı Yönetimi:** Dorsal deafferentasyon ve laminoplasti şiddetli nosiseptif ağrıya ve paradoksal kas spazmlarına yol açar. Kapanışta epidural kateter / kaudal blok ve multimodal analjezi (IV Parasetamol, düzenli Diazepam/Baklofen ve kontrollü opioidler) derlenme odasından itibaren kesintisiz uygulanır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 23. Yeni Prosedür: Trigeminal Nevraljide Perkütan Girişimler - Radyofrekans Rizotomi (RFT), Balon Mikrokompresyonu ve Gliserol Rizolizisi

- **Kullanıcı İsteği:** Percutaneous Procedures for Trigeminal Neuralgia ekle.
- **Türkçe İsimlendirme Kuralı:** **Trigeminal Nevraljide Perkütan Girişimler: Radyofrekans Rizotomi (RFT), Balon Mikrokompresyonu ve Gliserol Rizolizisi**
- **Dosya:** `src/data/procedures/percutaneousTrigeminalNeuralgia.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Stereotactic Procedures & Functional Neurosurgery: Percutaneous Procedures for Trigeminal Neuralgia, pp. 502-506), AANS, CNS, SNACC ve EAN Kılavuzları referans alındı.
  - **Trigeminal Perkütan Girişimlerde Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Trigeminokardiyak Refleks (TCR) Alarmı (Masif Bradikardi ve Asistoli):** Foramen ovale kılıfı geçilirken, Meckel mağarasında ganglion manipüle edilirken veya özellikle balon şişirilirken trigeminal afferentler üzerinden ani ve derin bradikardi, hipotansiyon veya asistoli gelişir (%50-70 sıklıkta). Eylem: Cerrah anında uyarılır, manipülasyon durdurulur/balon indirilir; Atropin (0.5-1.0 mg IV) masada hazır enjektörde tutulur.
    2. **RFT'de "Uyut-Uyandır-Uyut" Hassas Sedasyon Protokolü:** İğne foramen ovaleden geçerken derin sedasyon (Propofol 0.5-1.0 mg/kg), ardından hasta uyandırılarak 50 Hz duyu uyarımında parestezinin hedef dalda (V2/V3) olup olmadığı teyit edilir (2 Hz'de masseter motor testi). 60-80 saniyelik 65-75°C termal lezyon oluşturulurken hasta tekrar derin uyutulmalıdır.
    3. **Kornea Refleksinin Korunması (V1 Koruması):** V1 lifleri aşırı koagüle edilirse kornea anestezisi ve nörotrofik keratit gelişerek körlüğe yol açabilir; lezyonlama öncesi ve sonrası kornea refleksi kontrol edilir.
    4. **İç Karotid Arter (ICA) ve Pterigoid Pleksus Kanaması:** İğnenin aşırı mediyale yönelmesi ICA ponksiyonuna ve karotiko-kavernöz fistüle (CCF) yol açabilir; kanülden arteriyel kan gelirse iğne çekilip 15 dk yanak kompresyonu yapılır.
    5. **Ameliyat Sonu Sempatik Deşarj ve Hipertansiyon:** TCR sonrası reaktif sempatik aktivasyon sistolik KB > 160-180 mmHg yapabilir; Labetalol/Esmolol ile kontrol altına alınır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 24. Yeni Prosedür: Orta ve Alt Servikal Omurga Anterior Füzyon ve Fiksasyonu - Anterior Servikal Diskektomi ve Füzyon (ACDF / ACCF)

- **Kullanıcı İsteği:** Anterior Fusion/Fixation of The Mid and Lower Cervical Spine ekle.
- **Türkçe İsimlendirme Kuralı:** **Orta ve Alt Servikal Omurga Anterior Füzyon ve Fiksasyonu: Anterior Servikal Diskektomi ve Füzyon (ACDF / ACCF)**
- **Dosya:** `src/data/procedures/anteriorMidLowerCervicalFusion.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Anterior Fusion/Fixation of the Mid and Lower Cervical Spine, pp. 506-512), CSRS, NASS, SNACC ve ERAS Society Omurga Cerrahisi Kılavuzları referans alındı.
  - **Anterior Servikal Füzyonda (ACDF/ACCF) Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **İnstabil Boyunda Hava Yolu ve MILS Entübasyonu:** Miyelopati ve servikal instabilitede doğrudan laringoskopiyle boyna ekstansiyon verilmesi kordu sıkıştırarak kuadriplejiye yol açar; Manuel İn-Line Stabilizasyon (MILS) eşliğinde Videolaringoskop veya AFOI ile nötral eksende entübe edilir.
    2. **Ekartör Basısı ve Rekürren Laringeal Sinir (RLN) Koruması (Kaf Deflasyonu!):** Cerrahi ekartörler açıldığında endotrakeal tüp kafı trakea mukozasını ve RLN'yi krikoid kıkırdağa sıkıştırır; ekartör açılır açılmaz anestezi uzmanı kafı tamamen söndürüp sadece kaçak kesilene dek (20 cmH2O) yeniden şişirmelidir.
    3. **İntraoperatif Nöromonitörizasyon (MEP/SSEP) ve TIVA:** Spinal kord fonksiyonu için Transkraniyal MEP ve SSEP izlenir; entübasyon sonrası kas gevşetici verilmez (TOF 4/4) ve TIVA (Propofol + Remifentanil) uygulanır.
    4. **Spinal Kord Perfüzyon Basıncı (MAP > 80 mmHg):** İskemik hasarı önlemek için dekompresyon ve greft çakılması esnasında ortalama arter basıncı (MAP) > 80-85 mmHg tutulur; hipotansiyona izin verilmez.
    5. **Postoperatif Ölümcül Hava Yolu Hematomu Alarmı:** Cerrahi sonrasında hastada stridor veya solunum sıkıntısı gelişirse re-entübasyon beklenmeden DERHAL YATAKBAŞINDA YARA DİKİŞLERİ SÖKÜLEREK hematom boşaltılmalı ve trakea basıdan kurtarılmalıdır; yatakbaşında acil sütür seti ve krikotirotomi kiti hazır tutulur.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 25. Yeni Prosedür: Orta ve Alt Servikal Omurga Posterior Füzyon ve Fiksasyonu - Laminektomi, Laminoplasti ve Lateral Mas / Pedikül Vidalama (C3-T1)

- **Kullanıcı İsteği:** Posterior Fusion/Fixation of the Mid and Lower Cervical Spine ekle.
- **Türkçe İsimlendirme Kuralı:** **Orta ve Alt Servikal Omurga Posterior Füzyon ve Fiksasyonu: Laminektomi, Laminoplasti ve Lateral Mas / Pedikül Vidalama (C3-T1)**
- **Dosya:** `src/data/procedures/posteriorMidLowerCervicalFusion.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Posterior Fusion/Fixation of the Mid and Lower Cervical Spine, pp. 512-518), CSRS, NASS, SNACC ve ERAS Society Omurga Cerrahisi Kılavuzları referans alındı.
  - **Posterior Orta ve Alt Servikal Füzyonda Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **İnstabil Servikal Omurgada Prone Dönüşü (Log-Roll) ve Mayfield Çivi Basıncı:** Mayfield 3 çivili başlık takılırken lokal anestezik infiltrasyonu zorunludur (şiddetli hipertansif krizi önlemek için). Prone çevirme 4-5 kişilik koordineli ekip ve MILS eşliğinde nötral eksende yapılmalı; aşırı fleksiyon veya hiperekstansiyondan kaçınılmalıdır.
    2. **Sıfır Oküler Bası ve Postoperatif Görme Kaybı (POVL) Koruması:** Prone pozisyonda göz kürelerine binen dış bası Santral Retinal Arter Oklüzyonuna (CRAO) veya İskemik Optik Nöropatiye (ION) yol açarak geri dönüşsüz körlük yaratır; gözler her 15-30 dakikada bir kontrol edilir, orbital bası sıfır tutulur, derin hipotansiyondan kaçınılır.
    3. **İntraoperatif Nöromonitörizasyon (tcMEP/SSEP) ve Kas Gevşetici Disiplini:** Kord iskemisi ve sinir kökü gerilimi için tcMEP ve SSEP izlenir; entübasyon sonrası nöromusküler bloker verilmez (TOF 4/4) ve anestezi TIVA (Propofol + Remifentanil) ile sürdürülür. MAP > 80-85 mmHg korunur.
    4. **Lateral Mas Vidalamasında Vertebral Arter ve C5 Kök Koruması:** C3-C6 lateral mas vidaları (Magerl tekniği: 25° lateral, 25° kranyal) yerleştirilirken foramen transversariumdaki vertebral arter ve sinir kökü korunur; açı hatası masif arteriyel kanamaya veya C5 felcine (deltoid/biseps zaafiyeti) yol açar.
    5. **Prone Hipotermi, Yüz/Larinks Ödemi ve Kaf Kaçak Testi:** Uzun prone cerrahide yerçekimi venöz stazı larinks ve dilde masif ödeme yol açar. Ekstübasyon öncesinde Kaf Kaçak Testi (Cuff Leak Test) ile pozitif hava kaçağı duyulmadan hasta kesinlikle ekstübe edilmez. Pürüzsüz uyanma için IV Lidokain (1.5 mg/kg) uygulanır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 26. Yeni Prosedür: Anterior Servikotorasik Omurga Cerrahisi - Transsternal / Manubriotomi Yaklaşımı İle C7-T3 Dekompresyon ve Rekonstrüksiyon

- **Kullanıcı İsteği:** Anterior Cervicothoracic Spine Surgery ekle.
- **Türkçe İsimlendirme Kuralı:** **Anterior Servikotorasik Omurga Cerrahisi: Transsternal / Manubriotomi Yaklaşımı İle C7-T3 Dekompresyon ve Rekonstrüksiyon**
- **Dosya:** `src/data/procedures/anteriorCervicothoracicSpineSurgery.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Anterior Cervicothoracic Spine Surgery, pp. 518-524), CSRS, NASS, SNACC ve ERAS Society Kompleks Omurga Cerrahisi Kılavuzları referans alındı.
  - **Anterior Servikotorasik Cerrahide Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Mediasten Büyük Damarları ve Sol Radyal Arter Kanülasyonu Kuralı:** Brakisefalik (innominate) arter T1-T3 korpuslarının önünden transvers geçer. Ekartör artere bası yaptığında sağ koldaki arteriyel nabız ve tansiyon tamamen sıfırlanabilir; bu nedenle arteriyel kateter KESİNLİKLE SOL RADYAL veya femoral artere takılmalıdır.
    2. **Rekürren Laringeal Sinir (RLN) ve Duktus Torasikus Tehlikesi:** Sağ ve sol RLN servikotorasik bileşkede trakeoözofageal olukta seyreder; ekartör basısı iki taraflı vokal kord felcine yol açabileceğinden kaf basıncı 20 cmH2O'da tutulur. Sol taraflı yaklaşımlarda duktus torasikus yaralanması şilotoraks riski yaratır.
    3. **Plevral Kubbe (Kupula) Yaralanması ve Pnömotoraks:** Akciğer apekleri klavikulanın 2-3 cm üzerine kadar uzanır; cerrahi disseksiyonda plevra delinirse tansiyon pnömotoraks gelişebilir, ameliyat sonunda göğüs tüpü hazırlığı bulundurulmalıdır.
    4. **Spinal Kord Su Ayırıcı (Watershed) İskemisi ve MAP > 85 mmHg:** C7-T3 anterior spinal arter dolaşımının kritik sınır (watershed) bölgesidir; mikrovasküler kord iskemisini engellemek için MAP > 85-90 mmHg tutulmalıdır. İONM (MEP/SSEP) eşliğinde kürarsız TIVA sürdürülür.
    5. **Manubriotomi Sonrası Havayolu Güvenliği ve Gecikmiş Ekstübasyon:** Sternal ayrışma ve derin retrosternal retraksiyon masif larinks ve trakea ödemine yol açar. Hasta çoğunlukla ameliyathanede ekstübe edilmez; entübe olarak Yoğun Bakıma transfer edilir ve yatakbaşında acil sternal tel açma kiti hazır tutulur.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 27. Yeni Prosedür: Anterior Torasik Omurga Cerrahisi - Torakotomi / VATS Yaklaşımı İle Torakal Diskektomi, Korpektomi ve Enstrümentasyon (T3-T12)

- **Kullanıcı İsteği:** Anterior Thoracic Spine Surgery ekle.
- **Türkçe İsimlendirme Kuralı:** **Anterior Torasik Omurga Cerrahisi: Torakotomi / VATS Yaklaşımı İle Torakal Diskektomi, Korpektomi ve Enstrümentasyon (T3-T12)**
- **Dosya:** `src/data/procedures/anteriorThoracicSpineSurgery.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Anterior Thoracic Spine Surgery, pp. 524-530), SRS, NASS, SNACC, EACTA ve ERAS Society Kompleks Omurga Cerrahisi Kılavuzları referans alındı.
  - **Anterior Torasik Cerrahide Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Tek Akciğer Ventilasyonu (OLV) ve DLT Bronkoskopik Teyidi:** Cerrahi görüş ve akciğer ekarte hasarını önlemek için sol DLT (Double Lumen Tube) ile tek akciğer ventilasyonu zorunludur. DLT pozisyonu supin takıldıktan sonra fiberoptik bronkoskopi (FOB) ile doğrulanmalı, hasta lateral dekübitüs pozisyonuna alındıktan sonra FOB ile KESİNLİKLE YENİDEN KONTROL EDİLMELİDİR.
    2. **Adamkiewicz Arteri ve Parapleji Riski (İONM & MAP > 85 mmHg):** Medulla spinalisin alt 2/3'ünü besleyen Adamkiewicz arteri %75 solda ve T8-L1 aralığında çıkar; segmental damarlar bağlanırken veya korpektomide bu arterin feda edilmesi anterior kord sendromuna ve kalıcı paraplejiye yol açar. Segmental ligasyonda tcMEP/SSEP izlenmeli ve MAP kesinlikle > 85-90 mmHg tutulmalıdır.
    3. **Lateral Dekübitüs Fizyolojisi ve Aksiller Rulo Koruması:** Altta kalan göğüs duvarına, aksilla apeksinin 2-3 parmak altına aksiller rulo yerleştirilerek brakiyal pleksus basısı önlenir. Alttaki göz, kulak ve peroneal sinir basıdan korunur.
    4. **Büyük Damar Kanaması ve Hızlı Transfüzyon Hazırlığı:** Torasik aort, azigos venleri ve interkostal damarlar omurgaya yapışıktır; bir interkostal arter foramen içine retraksiyon yaparsa masif kanama gelişir. En az 2 geniş damar yolu, hızlı infüzyon pompası ve Cell Saver hazır tutulur.
    5. **Post-Torakotomi Şiddetli Ağrı ve Solunum Koruması:** Torakotomi en ağrılı cerrahilerdendir; Torasik Epidural Kateter, Paravertebral Blok (PVB) veya Erektör Spina Blok (ESPB) multimodal ağrı yönetiminin merkezinde yer almalıdır. Kapanışta göğüs tüpü bağlanıp nazik recruitment ile akciğer re-ekspanse edilir.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 28. Yeni Prosedür: Posterior Torasik Omurga Cerrahisi - Laminektomi, Kostotransversektomi ve Enstrümente Füzyon (Pedikül Vidaları ve Osteotomiler)

- **Kullanıcı İsteği:** Posterior Thoracic Spine Surgery ekle.
- **Türkçe İsimlendirme Kuralı:** **Posterior Torasik Omurga Cerrahisi: Laminektomi, Kostotransversektomi ve Enstrümente Füzyon (Pedikül Vidaları ve Osteotomiler)**
- **Dosya:** `src/data/procedures/posteriorThoracicSpineSurgery.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Posterior Thoracic Spine Surgery, pp. 530-536), SRS, NASS, SNACC ve ERAS Society Kompleks Omurga Cerrahisi Kılavuzları referans alındı.
  - **Posterior Torasik Cerrahide Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Prone Pozisyonda Karın Boşluğu ve Batson Pleksus Kanaması:** Karına binen en ufak bası Vena Cava Inferior'u sıkıştırarak kanı Batson epidural venöz pleksusuna şantlar ve cerrahi sahada masif venöz kan gölüne yol açar. Batın Jackson masasında tamamen serbest asılı tutulmalıdır.
    2. **Sıfır Oküler Bası ve Postoperatif Görme Kaybı (POVL) Savunması:** Uzun cerrahi süre, prone pozisyon, kan kaybı ve hipotansiyon İskemik Optik Nöropati (ION) ve retinal arter oklüzyonu ile kalıcı körlük yaratır; gözler her 15-30 dakikada bir kontrol edilir, hematokrit > %25-28 ve MAP > 75-80 mmHg korunur.
    3. **Torakal Kord İskemisi, Adamkiewicz ve İONM Disiplini:** T4-T8 watershed ve alt torakal kord iskemisi hızla paraplejiye yol açar; deformite düzeltme manevralarında ve osteotomilerde tcMEP ve SSEP kesintisiz izlenir, kürarsız TIVA sürdürülür ve MAP > 80-85 mmHg tutulur.
    4. **Kostotransversektomide Gizli Plevral Delinme ve Pnömotoraks:** Kosta başı ve transvers proçes çıkarılırken parietal plevra delinebilir; sinsi tansiyon pnömotoraks veya hemotoraks gelişebilir. Ventilatör tepe basınçları (Ppeak) izlenir, pozitif basınçlı Valsalva ile hava kaçağı test edilir.
    5. **Masif Kanama, Traneksamik Asit (TXA) ve Cell Saver:** Çok seviyeli dekortikasyon ve osteotomilerde masif kanama riski yüksektir; indüksiyonda 10-30 mg/kg yükleme ve 1-5 mg/kg/saat TXA infüzyonu uygulanır, Cell Saver hazır tutulur.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 29. Yeni Prosedür: Anterior Lomber ve Lumbosakral Omurga Cerrahisi - Retroperitoneal Yaklaşımla ALIF, OLIF ve Korpektomi (L1-S1)

- **Kullanıcı İsteği:** Anterior Lumbar/Lumbosacral Spine Surgery ekle.
- **Türkçe İsimlendirme Kuralı:** **Anterior Lomber ve Lumbosakral Omurga Cerrahisi: Retroperitoneal Yaklaşımla ALIF, OLIF ve Korpektomi (L1-S1)**
- **Dosya:** `src/data/procedures/anteriorLumbarLumbosacralSpineSurgery.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Anterior Lumbar/Lumbosacral Spine Surgery, pp. 536-542), NASS, ISASS, SNACC ve ERAS Society Kompleks Omurga Cerrahisi Kılavuzları referans alındı.
  - **Anterior Lomber ve Lumbosakral Cerrahide Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Sol Ana İliak Ven Avülsiyonu ve Masif Kanama Acil Eylem Protokolü:** Sol ana iliak ven L4-L5 disk mesafesini tam üzerinden çaprazlar; aşırı ekartör traksiyonu veya diske yapışıklık venin avülsiyonuna (yırtılmasına) ve saniyeler içinde 1-2 litre masif pelvik kanamaya yol açar. Masada 4-0 Prolene sütürler, vasküler Satinsky klempleri, Surgicel/Floseal ve Cell Saver hazır tutulmalı; 2 adet geniş lümenli damar yolu ve Belmont hızlı infüzyon sistemi kurulmalıdır.
    2. **Süperior Hipogastrik Pleksus Koruması ve Retrograd Ejakülasyon:** L5-S1 disk mesafesi ve aort bifurkasyonunun ön yüzünde mesane boynu sfinkterini inerve eden sempatik süperior hipogastrik pleksus lifleri bulunur. Bu bölgede KESİNLİKLE MONOPOLAR KOTER KULLANILMAZ; termal veya mekanik hasar erkek hastalarda %2-%10 oranında kalıcı retrograd ejakülasyona ve infertiliteye (kısırlık) yol açar.
    3. **Çift Taraflı Ayak Nabız Oksimetresi ve Ekartör İskemisi Takibi:** İliak arterlerin lateral ekartasyonu alt ekstremite kan akımını durdurabilir. Her iki ayak başparmağına sürekli pulse oksimetre probu takılır; pletismografik dalga formu silinirse cerraha haber verilerek ekartör gevşetilir, böylece distal bacak iskemisi ve kompartman sendromu önlenir.
    4. **Transpsoas Lomber Pleksus Koruması ve Kürarsız Nöromonitörizasyon:** OLIF ve lateral yaklaşımlarda psoas majör kası içinden geçen lomber pleksus (özellikle femoral sinir L2-L4) risk altındadır. Hasarı önlemek için psoas ekartasyonu 20-30 dakikayı aşmamalıdır; tetiklenmiş EMG (triggered EMG) takibi için entübasyon sonrası KAS GEVŞETİCİ KESİNLİKLE KULLANILMAZ (TOF 4/4) ve TIVA uygulanır.
    5. **Retroperitoneal Diseksiyon İleusu, Erken Mobilizasyon ve VTE Koruması:** Retroperitoneal sempatik pleksus manipülasyonu şiddetli paralitik ileusa neden olur. Postoperatif erken sakız çiğneme (gum chewing) ve kademeli oral hidrasyon başlatılır; derin pelvik venöz staza bağlı DVT riskine karşı aralıklı pnömotik kompresyon (IPC) ve erken mekanik/farmakolojik profilaksi uygulanır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 30. Yeni Prosedür: Posterior Lomber Omurga Cerrahisi - Laminektomi, Diskektomi, Foraminotomi ve Enstrümente Füzyon (TLIF, PLIF, Pedikül Vidaları L1-S1)

- **Kullanıcı İsteği:** Posterior Lumbar Spine Surgery ekle.
- **Türkçe İsimlendirme Kuralı:** **Posterior Lomber Omurga Cerrahisi: Laminektomi, Diskektomi, Foraminotomi ve Enstrümente Füzyon (TLIF, PLIF, Pedikül Vidaları L1-S1)**
- **Dosya:** `src/data/procedures/posteriorLumbarSpineSurgery.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Posterior Lumbar Spine Surgery, pp. 542-548), NASS, ISASS, SNACC ve ERAS Society Kompleks Lomber Omurga Cerrahisi Kılavuzları referans alındı.
  - **Posterior Lomber Cerrahide Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Prone Pozisyonda Karın Boşluğu ve Batson Epidural Venöz Pleksusu Dekompresyonu:** Hasta prone pozisyona (Jackson masası / Wilson çerçevesi) alınırken batın kesinlikle hiçbir yere bası yapmamalı, boşlukta sarkıtılmalıdır. Karına binen en ufak bası Vena Cava Inferior'u tıkayarak venöz dönüşü vertebral Batson epidural pleksusuna şantlar; bu durum cerrahi sahada durdurulamaz bir venöz kan gölüne yol açarak cerrahın dural keseyi ve kökleri görmesini engeller ve cerrahi komplikasyonları katlar.
    2. **Pedikül Vidalarında Tetiklenmiş EMG (Triggered EMG) ve Kürarsız TIVA:** Lomber pedikül vidaları gönderilirken vidanın medial pedikül korteksini delmesi L1-S1 sinir köklerine veya kauda ekuinaya doğrudan temas yaratır. Vida başına monopolar cerrahi prob dokundurulup akım verildiğinde eşik değer < 6-8 mA ise vida omurilik kanalına taşmıştır ve derhal düzeltilmelidir. Bu uyarılmış EMG yanıtını alabilmek için entübasyon sonrasında KAS GEVŞETİCİ KESİNLİKLE KULLANILMAZ (TOF 4/4) ve anestezi TIVA (Propofol + Remifentanil) ile yürütülür.
    3. **Sıfır Oküler Bası ve Postoperatif Görme Kaybı (POVL) Koruması:** Prone pozisyonda saatler süren cerrahide göz küresine binen dış orbital bası Santral Retinal Arter Oklüzyonuna (CRAO), intraoperatif kanama ve derin hipotansiyon ise İskemik Optik Nöropatiye (ION) yol açarak kalıcı körlük yaratır. Baş ProneView aynalı kaskına veya nöral yüz yastığına yerleştirilir, her 15-30 dakikada bir orbital bası kontrol edilir, MAP > 75-80 mmHg tutulur ve hematokrit > %25-28 korunur.
    4. **Dural Yırtık (İnsidental Durotomi), BOS Kaçağı ve Pürüzsüz Uyanma:** İleri yaş spinal stenoz ve revizyon olgularında dura incelmiştir ve %8-15 oranında dural yırtık (BOS kaçağı) gelişir. Primer dural dikiş ve fibrin yapıştırıcı tamirinden sonra uyanma evresinde hastanın öksürmesi, ıkınması ve hipertansiyon intratekal basıncı fırlatarak tamir hattını patlatır (BOS fistülü ve menenjit riski). Ekstübasyonda IV Lidokain (1.5 mg/kg) ile öksürük tamamen engellenmeli ve hasta normotansif, sakin uyandırılmalıdır.
    5. **Epidural Hematom, Kauda Ekuina Sendromu ve Multimodal Analjezi (TLIP / Lomber ESP Bloğu):** Kapanışta ve erken postop dönemde cerrahi lojda toplanan hematom dural keseyi sıkıştırarak hızla akut Kauda Ekuina Sendromuna (parapleji, idrar/gaita inkontinansı) yol açabilir; cerrahi kapanış öncesi tansiyon normotansif seviyeye çekilerek titiz hemostaz kontrol edilmelidir. Postoperatif analjezide opioid tüketimini azaltıp erken mobilizasyonu sağlamak için ultrason eşliğinde bilateral TLIP (Thoracolumbar Interfascial Plane) veya Lomber Erektör Spina Plan (ESP) bloğu uygulanmalıdır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 31. Yeni Prosedür: Posterior Lomber Füzyon ve Enstrümantasyon - Çok Seviyeli Pedikül Vidaları, Pelvik Fiksasyon (S2AI/İliak), Cisimlerarası Füzyon (TLIF/PLIF) ve Deformite Osteotomileri (L1-Pelvis)

- **Kullanıcı İsteği:** Posterior Lumbar Fusion and Instrumentation ekle.
- **Türkçe İsimlendirme Kuralı:** **Posterior Lomber Füzyon ve Enstrümantasyon: Çok Seviyeli Pedikül Vidaları, Pelvik Fiksasyon (S2AI/İliak), Cisimlerarası Füzyon (TLIF/PLIF) ve Deformite Osteotomileri (L1-Pelvis)**
- **Dosya:** `src/data/procedures/posteriorLumbarFusionInstrumentation.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Posterior Lumbar Fusion and Instrumentation, pp. 548-554), NASS, SRS, ISASS, SNACC ve ERAS Society Kompleks Lomber Füzyon ve Deformite Kılavuzları referans alındı.
  - **Posterior Lomber Füzyon ve Enstrümantasyonda Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **S2AI / İliak Vida Pelvik Ankorajında Siyatik Çentik ve Süperior Gluteal Arter Tehlikesi:** Uzun füzyonlarda lumbosakral bileşkeyi korumak için S2-alar-iliak (S2AI) veya iliak vidalar takılır. Vida iliak kanat dışına taşarsa veya siyatik çentikten (greater sciatic notch) çıkarsa süperior gluteal arteri yırtarak pelviste durdurulamaz arteriyel masif kanama yaratır veya siyatik siniri ezer. Pelvik vidalama esnasında anestezi ekibi ani hipotansiyon ve derin pelvik kanama belirtilerini yakından izlemelidir.
    2. **Çok Seviyeli Pedikül Vidalarında Tetiklenmiş EMG (Triggered EMG) ve Kürarsız TIVA Zorunluluğu:** 8 ila 16 pedikül vidasının her biri gönderilirken medial korteks delinme (pedicle breach) riski taşır; medial penetrasyon L1-S1 sinir köklerine veya kauda ekuinaya basarak parezi yaratır. Cerrahi prob ile vida başına akım verilip eşik değer test edilir (< 6-8 mA alarm!). Bu elektriksel kas yanıtını yakalamak için entübasyon sonrası KAS GEVŞETİCİ KESİNLİKLE VERİLMEZ (TOF 4/4) ve anestezi TIVA ile sürdürülür.
    3. **5 Saati Aşan Prone Cerrahide Masif Füzyon İlişkili POVL (Postoperatif Görme Kaybı) Savunması:** Uzun ameliyat süresi (> 5-6 saat), masif kan kaybı (> 1000-1500 mL), aşırı kristaloid yüklenmesi ve bağımlı pozisyon İskemik Optik Nöropatiye (ION) ve Santral Retinal Arter Oklüzyonuna (CRAO) yol açarak kalıcı körlük yapar! Baş ProneView aynalı kaskında asılı tutulur; göz küreleri her 15-30 dakikada bir kontrol edilir, hematokrit > %28 (Hgb > 9 g/dL) ve MAP > 75-80 mmHg korunur.
    4. **Osteotomi (PSO/SPO), Sagital Düzeltme ve Ani Kord/Kök İskemisinde İONM Alarmı:** Skolyoz ve düz bel deformitelerinde kemik kama çıkarılıp (PSO) omurga hiperekstansiyona zorlandığında dural kese katlanır ve sinir kökleri gerilir. tcMEP/SSEP sinyallerinde > %50 düşüş olursa anestezi derhal MAP > 85-90 mmHg seviyesine çıkarmalı, cerrah kompresyonu gevşetmeli ve implantları rahatlatmalıdır.
    5. **Masif Kanama, Koagülopati ve DVT ile Epidural Hematom Dengesi:** Çok seviyeli dekortikasyon ve osteotomi masif kanamaya yol açar; TXA infüzyonu ameliyat başından itibaren uygulanmalı, Cell Saver kullanılmalı, seri kan gazında iyonize kalsiyum ve fibrinojen replase edilmelidir. Postoperatif dönemde pelvik venöz staza bağlı yüksek DVT riskine karşı IPC çorapları sürdürülürken, erken dönemde kauda ekuinayı sıkıştırabilecek akut epidural hematoma karşı cerrahi hemostaz teyit edilmeden antikoagülan verilmemeli, saatlik alt ekstremite nörolojik muayenesi yapılmalıdır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 32. Yeni Prosedür: Torasik ve Lomber Omurgada Kombine Anterior ve Posterior Enstrümantasyon - Aynı Gün / Aşamalı Çift Seviyeli Rekonstrüksiyon (360 Derece Füzyon)

- **Kullanıcı İsteği:** Combined Anterior and Posterior Instrumentation of the Thoracic and Lumbar Spine ekle.
- **Türkçe İsimlendirme Kuralı:** **Torasik ve Lomber Omurgada Kombine Anterior ve Posterior Enstrümantasyon: Aynı Gün / Aşamalı Çift Seviyeli Rekonstrüksiyon (360 Derece Füzyon)**
- **Dosya:** `src/data/procedures/combinedAnteriorPosteriorThoracolumbarInstrumentation.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section II: Neurosurgery - Spine Surgery: Combined Anterior and Posterior Instrumentation of the Thoracic and Lumbar Spine, pp. 554-560), SRS, NASS, SNACC ve ERAS Society 360 Derece Spinal Rekonstrüksiyon Kılavuzları referans alındı.
  - **Kombine Anterior-Posterior Cerrahide Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **İki Aşamalı / Çift Pozisyon Değişiminde Hava Yolu, Tüp Güvenliği ve Resüsitasyon Mola Protokolü:** Anterior aşama (lateral dekübitüs veya supin) bitip göğüs tüpü/drenler bağlandıktan sonra hastanın posterior aşama için prone masaya çevrilmesi anında ekstübasyon, damar yolu kopması veya ani kardiyovasküler kollaps ölümcül bir risktir. Pozisyon değişiminden önce cerrah ve anestezi ekibi arasında "Resüsitasyon Molası" (Resuscitation Time-Out) verilir; kan gazı, Hb, laktat ve sıcaklık dengelenir. Şiddetli asidoz, kontrolsüz kanama veya hipotermi varsa posterior aşama 2-5 gün sonraya ertelenir (Staged Cerrahi kararı).
    2. **Kümülatif Masif Kan Kaybı, Dilüsyonel Koagülopati ve Agresif TXA + Cell Saver Protokolü:** Hem ön hem arka kolonun açılması kümülatif kan kaybını 2000-5000 mL seviyesine çıkarır; tüketim koagülopatisi ve DIC riski çok yüksektir. Yüksek doz TXA infüzyonu, çift hatlı Cell Saver, 1:1:1 oranında dengeli masif transfüzyon, ROTEM/TEG takibi, iyonize kalsiyum ve fibrinojen desteği hayat kurtarıcıdır.
    3. **Adamkiewicz Arteri, Çift Seviyeli İskemi ve İONM MAP > 85-90 mmHg Zorunluluğu:** Anterior fazda segmental ligasyon ve korpektomide Adamkiewicz arteri; posterior fazda ise traksiyon/rotasyonla omurilik gerilme riski altındadır. İki aşamada da tcMEP ve SSEP kesintisiz izlenmeli; entübasyon sonrası KAS GEVŞETİCİ KESİNLİKLE VERİLMEMELİ (TOF 4/4), kürarsız TIVA sürdürülmeli ve MAP KESİNLİKLE > 85-90 mmHg tutulmalıdır.
    4. **8-12 Saati Aşan Cerrahide Yüz/Larinks Ödemi, Sıfır Oküler Bası (POVL) ve Zorunlu Postoperatif Mekanik Ventilasyon:** 8-12 saatlik cerrahi, masif sıvı resüsitasyonu ve uzun prone pozisyon masif baş-yüz ve larinks ödemine yol açar; İskemik Optik Nöropati (ION) ve retinal arter oklüzyonu ile kalıcı körlük (POVL) riski en üst düzeydedir (gözler sürekli kontrol edilir, hematokrit > %28 tutulur). Hasta ameliyathanede KESİNLİKLE EKSTÜBE EDİLMEZ; entübe, sedatize olarak Yoğun Bakıma transfer edilir.
    5. **Çift Kavite İnvazyonu (Toraks + Retroperiton + Posterior Omurga), Pnömotoraks ve Multimodal Analjezi:** Anterior torakofrenotomi plevra açılması ve diyafram kesisi gerektirir; posterior proneda göğüs tüpü tıkanırsa tansiyon pnömotoraks gelişebilir. Göğüs tüpü fonksiyonu kontrol edilmeli; nörolojik defisiti maskelememek ve epidural hematom riskinden kaçınmak için epidural kateterden kaçınılarak cerrahi infiltrasyon, ESP bloğu ve IV multimodal analjezi uygulanmalıdır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 33. Yeni Prosedür: Karotis Endarterektomi (KEA) - Açık Karotis Bifurkasyonu Plak Rezeksiyonu ve Yama (Patch) / Primer Anjiyoplasti

- **Kullanıcı İsteği:** Carotid Endarterectomy ekle.
- **Türkçe İsimlendirme Kuralı:** **Karotis Endarterektomi (KEA): Açık Karotis Bifurkasyonu Plak Rezeksiyonu ve Yama (Patch) / Primer Anjiyoplasti**
- **Dosya:** `src/data/procedures/carotidEndarterectomy.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section III: Vascular Surgery - Carotid Endarterectomy, pp. 586-594), ESVS 2023, SVS, SNACC ve AHA/ASA Kılavuzları referans alındı.
  - **Karotis Endarterektomide Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Karotis Klempleme İskemisi, Güdük Basıncı (Stump Pressure) ve Şant Kararı:** Karotis klemplendiğinde beynin ipsilateral hemisferi Willis poligonu kollaterallerine bağımlı hale gelir. Klempleme öncesi MAP %10-20 yükseltilerek kollateral akım desteklenmelidir. Güdük basıncı < 40-50 mmHg ise, veya uyanık hastada nörolojik defisit (karşı elde güç kaybı, dizartri, bilinç bulanıklığı), veya genel anestezide EEG/SSEP/NIRS'ta iskemi bulgusu saptanırsa derhal intraluminal geçici şant (Javid / Pruitt-Inahara) yerleştirilmelidir.
    2. **Karotis Sinüs Refleksi ve Şiddetli Vagal Bradikardi / Hipotansiyon Koruması:** Bifurkasyon diseksiyonunda karotis sinüs baroreseptörlerinin gerilmesi ani ve şiddetli vagal deşarja, derin bradikardiye, asistoliye ve vazodilatatör şoka yol açabilir. Cerrah diseksiyona başlamadan önce bifurkasyona 1-2 mL %1-2'lik Lidokain infiltrasyonu yapmalı, anestezi ekibi masada Atropin ve Efedrin/Noradrenalini hazır tutmalıdır.
    3. **Karotis Deklempleme Hipotansiyonu ve Serebral Hiperperfüzyon Sendromu (CHS):** Kronik iskemik serebral damarlar otoregülasyonunu kaybetmiştir. Klempler açıldıktan sonra gelişebilecek kontrolsüz sistemik hipertansiyon (SKB > 140-160 mmHg) doğrudan kapiller yatağa yansıyarak vazojenik beyin ödemi, nöbetler ve ölümcül intraserebral kanamayla seyreden Serebral Hiperperfüzyon Sendromuna (CHS) neden olur. Deklempleme anında tansiyon derhal sıkı kontrol altına alınmalıdır (SKB < 130-140 mmHg, Labetalol/Esmolol/Nikardipin hazır).
    4. **Akut Kompresif Boyun Hematomu ve Acil Yatakbaşı Dikiş Açma Protokolü:** Karotis sütür hattından veya boyun damarlarından sızan kan, derin servikal fasyanın altında toplanarak trakeayı hızla ezer ve masif larinks ödemi yaratır. Postoperatif ilk 6 saatte boyunda ani şişlik, dispne veya stridor geliştiğinde hasta ameliyathaneye yetiştirilemez; yatakbaşında steril şartlar aranmaksızın tüm cilt ve fasya dikişleri derhal açılıp hematom boşaltılmalı, trakea basısı kalktıktan sonra acil entübasyon yapılmalıdır.
    5. **Kraniyal Sinir Yaralanmaları (VII, IX, X, XI, XII) ve Postoperatif Solunum Koruması:** Cerrahi sahada hipoglossal sinir (CN XII - dil deviasyonu ve hava yolu tıkanıklığı), rekürren laringeal sinir / vagus (CN X - tek taraflı ses kısıklığı veya bilateral felçte stridor/afoni), fasiyal sinirin marjinal mandibuler dalı (CN VII - ağız sarkması) ve glossofaringeal sinir (CN IX - yutma güçlüğü) doğrudan hasar riski taşır. Ekstübasyonda vokal kord hareketi, dil protrüzyonu ve yutma refleksi mutlaka kontrol edilmeli, bilateral karotis cerrahisi öyküsü olanlarda bilateral glomus kaybına bağlı hipoksik solunum dürtüsü kaybı bilinmelidir.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 34. Arayüz ve Kullanıcı Deneyimi Yeniliği: Cerrahi Branş Kartları Karşılama Ekranı ve Hiyerarşik Gezinme (Drill-Down)

- **Kullanıcı İsteği:** "Sistematik Prosedür Bazlı Anestezi Yönetimi tıklayınca bizi branş kartları karşılasın. Branş kartına basınca prosedürler açılsın. Böylelikle biraz daha derli toplu olur."
- **Yapılan İyileştirmeler:**
  1. **Branş Kartları Karşılama Ekranı (Specialty Directory Landing View):**
     - Prosedür modülüne girildiğinde kullanıcıyı doğrudan 37 prosedürlük uzun liste yerine 13 cerrahi branşı temsil eden şık ve düzenli **Cerrahi Branş Kartları** karşılar.
     - Her kartta branşa özel renk teması, lucide ikonu (Beyin ve Sinir Cerrahisi için Beyin, Kalp ve Damar için Kalp, Genel Cerrahi için Makas vb.), branş adı, kapsam açıklaması ve aktif kayıtlı prosedür sayacı (`{count} Prosedür`) yer alır.
  2. **Hiyerarşik Gezinme ve Branş İçi Prosedürler (Drill-Down Navigation):**
     - Bir branş kartına tıklandığında görünüm o branşın prosedürlerine odaklanır.
     - En üstte `[ ← Tüm Cerrahi Branşlar ]` breadcrumb butonu ve seçili branş başlığı/özeti sunulur.
     - Kullanıcı dilerse yatay hızlı branş değiştirici ile diğer aktif branşlara (Genel Cerrahi, KVC, Gastroenteroloji vb.) tek tıkla geçiş yapabilir.
  3. **Akıllı Çok Kademeli Arama (Instant Global & Scoped Search):**
     - Branş kartları ekranındayken arama çubuğuna yazıldığında, sistem anında tüm branşlar genelinde eşleşen prosedürleri tek bir dinamik arama sonuçları listesinde sunar. Arama temizlendiğinde pürüzsüzce branş kartlarına geri döner.
     - Belirli bir branşın içindeyken arama yapıldığında arama o branşın prosedürlerine odaklanır.
  4. **Prosedür Detayından Geri Dönüş Akışı:**
     - Prosedür detay sayfasında (`ProcedureDetailView`) "Geri Dön" tıklandığında kullanıcı doğrudan ayrıldığı branşın prosedür listesine döner; oradan "Tüm Cerrahi Branşlar" butonuna basarak ana branş dizinine geçebilir.

---

## 35. Yeni Prosedür: Katarakt Cerrahisi ve Göz İçi Lens İmplantasyonu: Fakoemülsifikasyon (FAKO) Yöntemi ile İntraoküler Lens (İOL) Yerleşimi

- **Kullanıcı İsteği:** Cataract Extraction with Intraocular Lens Insertion ekle.
- **Türkçe İsimlendirme Kuralı:** **Katarakt Cerrahisi ve Göz İçi Lens İmplantasyonu: Fakoemülsifikasyon (FAKO) Yöntemi ile İntraoküler Lens (İOL) Yerleşimi**
- **Dosya:** `src/data/procedures/cataractExtractionIolInsertion.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section VI: Ophthalmology - Cataract Extraction with Intraocular Lens Insertion, pp. 844-852), AAO, ESCRS, OAS ve TOD Protokolleri referans alındı.
  - Göz Hastalıkları (`goz`) branşının ilk prosedürü olarak sisteme kaydedildi.
  - **Katarakt Cerrahisinde Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Okülokardiyak Refleks (Aschner Fenomeni) ve Ani Vagal Duraklama:** Ekstraoküler kaslara bası veya göz küresine traksiyon uygulandığında trigemino-vagal refleks arkı tetiklenir; ani derin bradikardi, blok ve asistoli gelişebilir. Monitörde bradikardi görüldüğü anda cerraha derhal "Traksiyonu bırak" uyarısı verilmeli, bası kalkınca nabız düzelir; düzelmezse İV Atropin (0.5 mg) uygulanmalıdır.
    2. **Göz Küresi Açıkken Öksürük, Ikınma ve Ekspulsif Koroidal Hemoraji Felaketi:** Kornea kesilip ön kamara açıldığında göz küresi açık küre (open globe) durumundadır. Hastanın aniden öksürmesi, ıkınması veya başını oynatması intratorasik ve oküler venöz basıncı fırlatarak arka siliyer arterleri patlatır (ekspulsif koroidal kanama); göz içi dokuları yaradan dışarı fırlar ve kalıcı körlük gelişir. Öksürük önceden sezinlenmeli, aşırı hipoventilasyon kaynaklı huzursuz uyanmalar önlenmelidir.
    3. **Retrobulber / Peribulber Blokta Beyin Sapı Anestezisi ve Retrobulber Hematom:** İğneli bloklarda iğne optik sinir kılıfının dural uzantısını delerse lokal anestezik doğrudan subaraknoid mesafeye enjekte olur. 2-5 dakika içinde kontralateral körlük, afoni, solunum arresti ve kardiyovasküler kollaps (beyin sapı anestezisi) gelişir; anestezi acil entübasyon ve resüsitasyona hazır olmalıdır. Retrobulber hematomda acil lateral kantotomi gerekebilir.
    4. **Topikal / Sedasyon Yönetiminde "Aşırı Sedasyon ve Hipoventilasyon Tuzağı":** Katarakt hastaları çoğunlukla yaşlı ve KOAH'lıdır; cerrahi örtü altında hava açlığı ve CO2 göllenmesi hastada ani panik ve baş hareketi yaratır. Derin sedasyon hastayı uyutup aniden sıçrayarak uyandırabileceğinden (mikroskop altında arka kapsül yırtığı riski) KESİNLİKLE UYGULANMAMALI; örtü altına 2-3 L/dk O2 köprüsü kurulmalı, hasta ile uyanık ve sakin sözel iletişim sürdürülmelidir.
    5. **İntraoperatif Gevşek İris Sendromu (IFIS) ve Alfa-1 Blokerleri (Tamsulosin):** Prostat hipertrofisi için Tamsulosin veya diğer alfa-1 antagonistlerini kullanan hastalarda cerrahi esnasında iris gevşekçe dalgalanır, pupilla hızla büzüşür (miyozis) ve iris fako ucuna aspire olarak yırtılır. Preoperatif sorgulamada tamsulosin öyküsü tespit edilmeli, cerraha IFIS uyarısı verilmeli ve intrakameral fenilefrin/adrenalin ile iris kancaları (Malyugin halkası) hazır bulundurulmalıdır.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.

---

## 36. Yeni Prosedür: Kornea Nakli (Keratoplasti) - Penetran Keratoplasti (PKP) ve Lameller Kornea Nakli (DALK, DSAEK, DMEK)

- **Kullanıcı İsteği:** Corneal Transplant ekle.
- **Türkçe İsimlendirme Kuralı:** **Kornea Nakli (Keratoplasti): Penetran Keratoplasti (PKP) ve Lameller Kornea Nakli (DALK, DSAEK, DMEK)**
- **Dosya:** `src/data/procedures/cornealTransplant.ts`
- **Kapsam ve Akademik Standartlar:**
  - Jaffe 5. Baskı (Section VI: Ophthalmology - Corneal Transplant [Penetrating Keratoplasty], pp. 852-858), AAO, Cornea Society, ESCRS ve TOD Protokolleri referans alındı.
  - Göz Hastalıkları (`goz`) branşının ikinci prosedürü olarak sisteme kaydedildi.
  - **Kornea Naklinde Anestezinin 5 Vazgeçilmez Kuralı:**
    1. **Geniş Açık Küre (Open Globe) Evresinde Sıfır Göz İçi Basıncı (GİB) ve Sıfır Hareket / Öksürük Disiplini:** Penetran keratoplastide kornea trefinasyonu yapıldığı anda gözün ön yüzeyi 8 mm çapında açık bir pencereye dönüşür ve ön kamara ile dış ortam arasında sıfır bariyer kalır. Bu aşamada hastanın aniden öksürmesi, ıkınması, kafasını oynatması veya hiperkapniye bağlı koroidal venöz dolgunluk gelişmesi; vitreusun öne fırlamasına ve saniyeler içinde arka siliyer arterlerin patlayarak tüm göz içi dokularının dışarı fırlamasına (ekspulsif koroidal hemoraji) ve kalıcı körlüğe yol açar. Bu evrede derin anestezi, tam nöromusküler blok (TOF 0/4 veya 1/4) sürdürülmeli; PaCO2 35-38 mmHg seviyesinde normokapnik tutulmalıdır.
    2. **Pürüzsüz Öksürmesiz Uyanma (Smooth Emergence) ve Dikiş Hattı Güvenliği:** Donör kornea alıcı yatağa 16-24 adet saç kılından ince 10-0 naylon dikişle tutturulur. Ekstübasyon anında hastanın tüpü ısırması, öksürmesi veya hipertansif kriz geliştirmesi yeni atılan dikişleri patlatır, yara ayrışması (wound dehiscence), iris prolapsusu ve hifemaya yol açar. Ekstübasyondan 5-10 dakika önce İV Lidokain (1.5 mg/kg), profilaktik antiemetik (Ondansetron), nazik orofaringeal aspirasyon uygulanmalı; hasta kesinlikle öksürmeden, ıkınmadan ve normotansif uyandırılmalıdır.
    3. **Okülokardiyak Refleks (Aschner Fenomeni) ve Flieringa Halkası Tehlikesi:** Sklera kollapsını önlemek için göz küresine Flieringa halkası dikilirken veya rektus kaslarına tespit sütürleri atılırken trigemino-vagal refleks (CN V -> CN X) tetiklenir. Bu durum ani derin bradikardi, nodal ritim ve kardiyak duraklamaya (asistoli) neden olabilir. EKG ritmi anlık izlenmeli; bradikardi görüldüğünde cerraha traksiyonu gevşetmesi söylenmeli, düzelmezse İV Atropin (0.5 mg) uygulanmalıdır.
    4. **Endotel Naklinde (DMEK / DSAEK) Ön Kamara Hava/Gaz (SF6) Kabarcığı ve Azot Protoksit (N2O) Kontrendikasyonu:** Lameller endotel nakillerinde donör Descemet zarını alıcı stromaya yapıştırmak için ön kamaraya hava veya %20 SF6 (kükürt hekzaflorür) gaz kabarcığı enjekte edilir. Eğer anestezide Azot Protoksit (N2O) kullanılıyorsa, N2O gaz kabarcığının içine kandan hızla difüze olarak kabarcığı şişirir; göz içi basıncını (GİB) 50-70 mmHg üzerine fırlatarak santral retinal arteri tıkar ve anında körlük yaratır! Bu nedenle kornea cerrahisinde azot protoksit kesinlikle yasaktır. Postoperatif dönemde hastanın sırtüstü (supin) yatması zorunludur.
    5. **Mannitol Kullanımı, Honan Balon Sınırı ve Perioperatif Glisemi Yönetimi:** Cerrahi öncesi göz içi basıncını düşürmek ve vitreus hacmini küçültmek amacıyla İV Mannitol (%20 solüsyon, 1-1.5 g/kg) indüksiyonda yavaşça infüze edilebilir. Ancak dikkat: Trepanasyon öncesi kullanılan mekanik Honan balonu veya oküler kompresyon cihazları, kornea kesildikten sonra kesinlikle kullanılamaz. Greft rejeksiyonunu engellemek için operasyon esnasında yüksek doz topikal/sistemik steroid uygulanacağından diyabetik hastalarda kan şekeri yakından izlenmeli (hedef < 180 mg/dL) ve dekompanse hiperglisemi önlenmelidir.
- **Katalog ve Arama Entegrasyonu:** `src/data/procedures/index.ts` ve `src/data/portalSearchIndex.ts` dosyalarına kaydedildi.
