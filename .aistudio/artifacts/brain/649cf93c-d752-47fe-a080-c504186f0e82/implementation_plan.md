# Sodyum Bozuklukları (Hipo / Hipernatremi) Klinik Hesaplayıcı & Protokolü

Güncel klinik kılavuzlara ve MDCalc metodolojisine (Adrogué-Madias, Serbest Su Açığı, Glukoz Düzeltmeli Na, ODS güvenlik eşikleri) dayalı, "Tedaviler ve İlaçlar" modülüyle tam entegre klinik hesaplayıcı ve infografik kılavuzunun mimari planı.

> [!IMPORTANT]
> **Kullanıcı Tercihleri ve Doğrulanan Kararlar:**
> - **Klinik Formüller**: Adrogué-Madias 1 Litrelik $\Delta\text{Na}$ formülü, Hipernatremi Serbest Su Açığı (Free Water Deficit) ve Hiperglisemide Glukoz Düzeltmeli Na (Katz ve Hillier) birlikte yer alacaktır.
> - **Güvenlik Sınırları & Uyarılar**: 24 saatlik güvenli düzeltme tavanı (6–8 mEq/L/gün) ile Osmotik Demiyelinizasyon Sendromu (ODS / Santral Pontin Miyelinozis) risk analizleri ve saatlik infüzyon hızı (mL/saat) canlı hesaplanacaktır.
> - **Yerleşim**: Hesaplayıcı, kullanıcının talebi doğrultusunda **sadece "Tedaviler ve İlaçlar"** bölümü içerisinde Magnezyum ve Potasyum protokollerinin yanındaki üçüncü aktif kart olarak konumlandırılacaktır.

---

## 1. Genel Bakış ve Klinik Amaç

- **Amaç:** Yoğun bakım, ameliyathane ve perioperatif servislerde sodyum bozukluğu (akut/kronik hiponatremi ve hipernatremi) olan olgularda, seçilen IV infüzyon sıvısına göre serum sodyumundaki değişimi, hedeflenen düzeltme süresine göre saatlik infüzyon hızını (mL/saat) ve nörolojik komplikasyonları (ODS veya serebral ödem) önleyici güvenlik parametrelerini saniyeler içinde hesaplamak.
- **Kullanıcı Profili:** Anesteziyoloji ve Reanimasyon uzmanları, asistan hekimler ve yoğun bakım klinik ekipleri.
- **Kazanım:** Karmaşık manuel formülleri (Adrogué-Madias, TBW, Serbest Su Açığı) standardize etmek, %3 NaCl hipertonik salin infüzyonlarında olası aşırı hızlı düzeltme (overcorrection) ve demiyelinizasyon riskini renk kodlu ve sesli/görsel klinik uyarılarla önlemek.

---

## 2. Kullanıcı Deneyimi ve Görsel Tasarım

- **Tasarım Dili & Estetik:**
  - Mevcut portal mimarisine ve `references/8_science_space_biotech.md` klinik kılavuzuna uygun; temiz beyaz/slate zemin üzerinde camgöbeği/teal ve amber güvenlik vurguları.
  - Sodyum moleküler/elektrolit kimliğine uygun turkuaz/mavi ve amber uyarı rozetleri.
  - Bütün sayısal verilerde ve hız göstergelerinde `tabular-nums` ve `font-mono` kullanımı.
- **Görünüm Modları (Segmented Controls):**
  - **Tümü (Tam Görünüm)**: Hesaplayıcı ve klinik infografik/algoritma kartları bir arada.
  - **Hesaplayıcı & Protokol**: Parametre girişleri, sıvı seçimi, saatlik infüzyon debisi, ODS koruma eşikleri.
  - **Klinik Bulgular & Algoritma**: Hiponatremi semptom ağırlık skalası, akut semptomatik %3 NaCl bolus protokolü (100–150 mL IV 10–20 dk), ODS patogenezi ve hipernatremi kademeleri.
- **İnteraktif Akış:**
  1. *Hasta Parametreleri*: Güncel Serum Na⁺, Hedef Serum Na⁺, Kilo (kg), Cinsiyet & Yaş Grubu (Çocuk 0.6, Genç Erkek 0.6, Genç Kadın 0.5, Yaşlı Erkek 0.5, Yaşlı Kadın 0.45).
  2. *İnfüzyon Sıvısı Seçimi*:
     - %3 NaCl Hipertonik Salin (513 mEq/L Na⁺)
     - %0.9 NaCl Serum Fizyolojik (154 mEq/L Na⁺)
     - Ringer Laktat / Dengeli Elektrolit (130 mEq/L Na⁺ + 4 mEq/L K⁺)
     - %0.45 NaCl Yarım Salin (77 mEq/L Na⁺)
     - %0.2 NaCl + %5 Dextroz (34 mEq/L Na⁺)
     - %5 Dextroz (D5W) (0 mEq/L Na⁺)
     - Ek potasyum katkısı opsiyonu (+10, +20, +40 mEq/L KCl).
  3. *Özel Modüller*:
     - **Hiperglisemi Glukoz Düzeltmeli Na**: Glukoz (mg/dL) girildiğinde Katz (+0.016) ve Hillier (+0.024) düzeltmeli gerçek Na değeri.
     - **Hipernatremi Serbest Su Açığı**: $\text{TBW} \times [(\text{Serum Na} / 140) - 1]$ ile toplam serbest su açığı ve oral/IV D5W karşılığı.
  4. *ODS Güvenlik Monitörü*:
     - Hedeflenen 24 saatlik değişim $\le 6\text{--}8\text{ mEq/L}$ aralığında yeşil/güvenli bildirim.
     - $> 8\text{ mEq/L/gün}$ durumunda amber, $> 10\text{--}12\text{ mEq/L/gün}$ durumunda kırmızı aşırı düzeltme (overcorrection) ve desmopressin (dDAVP) kurtarma hatırlatması.

---

## 3. Sistem Mimarisi ve Bileşen Hiyerarşisi

```
src/components/treatments/
│
├── TreatmentsWorkspace.tsx           (Sekme yönetimi, Sodium kartının 'active' yapılması)
│   ├── SodiumCalculator.tsx          (Yeni: Ana hesaplayıcı bileşeni)
│   │   ├── Formula Engine            (Adrogué-Madias, TBW, Infusate Na+K, Infusion Rate)
│   │   ├── Hyperglycemia Module      (Katz & Hillier Glukoz düzeltmeli Na)
│   │   ├── FreeWaterDeficit Module   (Hipernatremi su açığı hesabı)
│   │   └── ODS Safety Banner         (Osmotik Demiyelinizasyon Sendromu risk analizi)
│   │
│   └── HyponatremiaInfographic.tsx   (Yeni: Akut/Kronik hiponatremi semptomları ve infografik)
```

---

## 4. Teknik Formüller ve Matematiksel Mantık

1. **Toplam Vücut Suyu (TBW - Total Body Water):**
   - Genç Erkek / Çocuk: $\text{Kilo} \times 0.60$
   - Genç Kadın / Yaşlı Erkek ($\ge 65$ yaş): $\text{Kilo} \times 0.50$
   - Yaşlı Kadın ($\ge 65$ yaş): $\text{Kilo} \times 0.45$

2. **Adrogué-Madias 1 Litre Sıvı Değişim Formülü:**
   $$\Delta \text{Serum Na}^+ \text{ (mEq/L per 1L)} = \frac{(\text{İnfüzat Na}^+ + \text{İnfüzat K}^+) - \text{Serum Na}^+}{\text{TBW} + 1}$$

3. **Gerekli Sıvı Hacmi ve Saatlik İnfüzyon Hızı (mL/saat):**
   $$\text{Gereken Toplam Sıvı (Litre)} = \frac{\text{Hedeflenen } \Delta\text{Na (mEq/L)}}{\Delta\text{Na (1 Litre İnfüzat)}}$$
   $$\text{Saatlik İnfüzyon Hızı (mL/saat)} = \frac{\text{Gereken Toplam Sıvı (mL)}}{\text{Hedef Süre (saat)}}$$

4. **Hipernatremi Serbest Su Açığı (Free Water Deficit):**
   $$\text{Su Açığı (Litre)} = \text{TBW} \times \left( \frac{\text{Serum Na}^+}{140} - 1 \right)$$

5. **Glukoz Düzeltmeli Sodyum:**
   - $\text{Katz Formülü} = \text{Ölçülen Na} + 0.016 \times (\text{Glukoz} - 100)$
   - $\text{Hillier Formülü} = \text{Ölçülen Na} + 0.024 \times (\text{Glukoz} - 100)$

---

## 5. Uygulama Adımları

1. **`SodiumCalculator.tsx` Bileşeninin Oluşturulması:**
   - İnteraktif form parametreleri (yaş/cinsiyet/kilo, serum Na, hedef Na, süre, infüzyon sıvısı ve ilave K⁺).
   - Canlı sonuç kartları: 1 Litre infüzyon ile Na değişimi, toplam gereken sıvı hacmi, saatlik infüzyon debisi (mL/saat ve damla/dakika).
   - Glukoz düzeltme ve Serbest su açığı alt akordeonları / araçları.
   - ODS güvenlik sınır göstergesi (6-8 mEq/L/gün kuralı).
   - Literatür ve kaynakça referansı (Adrogué HJ, Madias NE. NEJM 2000; Spasovski G et al. Eur J Endocrinol 2014; Sterns RH. NEJM 2015).

2. **`HyponatremiaInfographic.tsx` Bileşeninin Oluşturulması:**
   - Hiponatremi klinik şiddet sınıflaması (Hafif: 130–134, Orta: 125–129, Derin: <125 mEq/L).
   - Akut semptomatik hiponatremide acil %3 NaCl 100–150 mL IV bolus protokolü.
   - Osmotik Demiyelinizasyon Sendromu (ODS) risk faktörleri tablosu.

3. **`TreatmentsWorkspace.tsx` Entegrasyonu:**
   - `PROTOCOL_CARDS` içindeki `sodium` kartının `status: 'active'` haline getirilmesi.
   - Görünüm filtreleri (Tümü, Hesaplayıcı, İnfografik) ve kart tıklamasıyla `activeProtocolId === 'sodium'` yönlendirmesinin bağlanması.
   - Hızlı arama ve derin bağlantı (`#arac=treatments&tedavi=sodium`) uyumluluğu.

4. **Doğrulama ve Derleme Kontrolleri:**
   - `compile_applet` ve `lint_applet` ile tip ve derleme testlerinin tamamlanması.
