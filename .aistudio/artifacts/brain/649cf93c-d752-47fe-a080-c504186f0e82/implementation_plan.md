# Pulmoner Embolizm (PE / PTE) Acil Protokolü Entegrasyonu

## Yapılan Geliştirmeler

1. **Master Veri & Protokol Tanımı (`src/data/emergenciesData.ts`):**
   - **Tanım ve Giriş:** Pulmoner vasküler yatak obstrüksiyonu, sağ ventrikül aşırı yüklenmesi, septal kayma (septal shift) ve obstrüktif şok patofizyolojisi.
   - **Tanı Kriterleri & Skalalar:** İntraoperatif ani EtCO2 çöküşü (<15-20 mmHg), refrakter hipotansiyon, inatçı sinüs taşikardisi, CVP artışı, TEE/TTE McConnell bulgusu, S1Q3T3 deseni. Wells PE Skoru ve sPESI (Basitleştirilmiş Pulmoner Emboli Ciddiyet İndeksi) tabloları.
   - **Ayırıcı Tanı:** İntraoperatif hava embolisi, amniyotik sıvı embolisi (AFE), yağ embolisi sendromu (FES), sağ ventrikül MI, tansiyon pnömotoraks, kardiyak tamponad.
   - **10 Aşamalı Kriz Algoritması:** 
     1. %100 O2 & Acil Yardım / Cerrahiyi Durdurma
     2. Aşırı Sıvı Kısıtlaması (Maks 250-500 mL dengeli kristaloid; aşırı volüm septal shift yaparak sol ventrikülü çökertebilir)
     3. Erken Noradrenalin (MAP ≥ 65-70 hedefi; sağ koroner perfüzyonunu koruma) + Dirençli vazoplejide Vazopressin
     4. İnvaziv Arter ve TEE Monitörizasyonu (RV/LV > 1.0, D-şeklinde LV)
     5. Ventilatör Optimizasyonu (Vt 6 mL/kg, Ilımlı PEEP 5-8 cmH2O, Pplat < 28-30)
     6. Acil Sistemik Tromboliz (Alteplase 100 mg / 2 saat veya Arrestte acil 50 mg IV 15 dk bolus; Tenecteplase)
     7. Antikoagülasyon (UFH 80 IU/kg bolus + 18 IU/kg/saat infüzyon, aPTT 60-80 sn; Protamin Sülfat antidotu)
     8. Refrakter Olgularda VA-ECMO & Açık Cerrahi Embolektomi
     9. Arrest Durumunda Uzamış KPR (En az 60-90 dakika kesintisiz kompresyon)
   - **Özel Protokoller:**
     - Akut RV Desteği & Vazoaktifler (Noradrenalin, Vazopressin, Dobutamin, Milrinon, iNO/İloprost)
     - Trombolitik Rejimler & Cerrahi/Girişimsel Seçenekler (EKOS, Trendelenburg embolektomisi, VA-ECMO)
     - Antikoagülasyon Yönetimi (UFH vs DMAH/Enoksaparin)
     - ESC 2019 Risk Tabakalaması (Masif, Submasif, Orta-Düşük, Düşük Risk)

2. **Kullanıcı Arayüzü & İnteraktif Hesaplayıcı (`src/components/emergencies/EmergencyProtocolDetailView.tsx`):**
   - Hastanın kilosuna göre anlık hesaplanan:
     - Alteplase Arrest Bolusu (50 mg IV 15 dk) ve İnfüzyon Dozu
     - Tenecteplase tek bolus dozu (kilo dilimine göre 30-50 mg)
     - Heparin (UFH) 80 IU/kg bolus ve 18 IU/kg/saat infüzyon dozları
     - Enoksaparin dozu (1 mg/kg SC)
     - Noradrenalin başlama aralığı
     - Kritik sıvı kısıtlama uyarısı
   - 4 modüllü detaylı kriz paneli (RV Desteği, Tromboliz Rejimleri, Heparin Protokolü, Risk Tabakalaması)

3. **Gezinti ve Arama Entegrasyonu:**
   - `src/components/emergencies/AnesthesiaEmergenciesView.tsx`: Senaryo kartları arasına Pulmoner Embolizm (PE / PTE) kartı "10 Aşamalı Protokol Hazır" etiketiyle eklendi.
   - `src/data/portalSearchIndex.ts`: `emergency-pulmonary-embolism` başlığı ve kapsamlı anahtar kelimeleriyle (PE, PTE, masif emboli, alteplase, tenecteplase, EtCO2 düşüşü, McConnell vb.) arama dizinine eklendi.
   - `src/components/PortalWorkspace.tsx`: Arama sonuçlarından tıklandığında doğrudan PE detay protokolüne yönlendirme bağlandı.
