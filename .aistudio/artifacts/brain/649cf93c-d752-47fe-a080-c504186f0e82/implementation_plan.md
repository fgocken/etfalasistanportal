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
