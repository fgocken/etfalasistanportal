# Bölüm ve İnfografik Doğrudan Paylaşım (Deep Linking & Hash Routing)

Klinisyenlerin ve asistanların portaldeki herhangi bir infografiği (örneğin **Hızlı Seri Entübasyon vs Elektif Entübasyon**) veya klinik hesaplama aracını doğrudan tek tıkla kopyalayıp meslektaşlarıyla paylaşabilmesini sağlayan, tarayıcı geçmişiyle tam uyumlu temiz URL Hash rotalama sistemi.

## User Review & Critical Decisions

> [!IMPORTANT]
> Kullanıcının netleştirdiği 3 kritik mimari ve kullanıcı deneyimi kararı plana işlenmiştir:

- **Doğrulanmış Karar 1 (URL Yapısı)**: Temiz ve sezgisel URL Hash formatı kullanılacak (`#infografik=rsi-vs-elective` veya `#arac=intraop`). Sayfa yenilenmesine gerek kalmadan SPA içinde anında senkronize olur.
- **Doğrulanmış Karar 2 (Arayüz Butonu)**: Her infografik ve klinik aracın üst başlık çubuğuna şık bir **"Bağlantıyı Kopyala" (Share/Copy Link)** butonu eklenecek; tıklandığında panoya kopyalayıp görsel onay bildirimi ("Bağlantı Kopyalandı!") verecek.
- **Doğrulanmış Karar 3 (Açılış Davranışı)**: Paylaşılan linke tıklayan bir hekim uygulamayı açtığında karşılama ekranını atlayarak **doğrudan ilgili infografiğe veya araca** yönlendirilecek; sol üstteki "← Portale Dön" butonuyla ana panele geçebilecek.

---

## 1. Overview & Core Concept

- **Ne Sağlar**: Kullanıcı tek bir butona tıklayarak o an açık olan infografiğin veya aracın doğrudan linkini panoya kopyalar (örn. `https://ais-...run.app/#infografik=rsi-vs-elective`). Bu link WhatsApp, e-posta veya klinik mesajlaşma gruplarında paylaşıldığında, linki açan meslektaş karşılama ekranı veya menüler arasında kaybolmadan doğrudan hedef klinik kılavuzu görür.
- **Hedef Kitle**: Şişli Etfal Anesteziyoloji ve Reanimasyon Kliniği hekimleri, asistanlar, ameliyathane ekibi ve konsültasyon hekimleri.
- **Sağlanan Temel Fayda**: Ameliyathanede veya acil nöbetinde saniyeler içinde doğru klinik infografiğe doğrudan erişim ve meslektaşlar arası zahmetsiz bilgi aktarımı.

---

## 2. User Experience & Visual Design

### Temel Kullanıcı Akışları
1. **Bağlantı Kopyalama (Paylaşan Kullanıcı)**:
   - Kullanıcı "Hızlı Seri Entübasyon (RSI) vs Elektif Entübasyon" infografiğini inceler.
   - Başlık alanındaki `Bağlantıyı Kopyala` butonuna (Share2 / Link ikonu) tıklar.
   - Buton mikro animasyonla 2 saniyeliğine yeşil renk alarak `Kopyalandı! ✓` durumuna geçer; eş zamanlı olarak alt köşede zarif bir toast bildirim belirir.
   - Pano içeriği: `https://[alan-adi]/#infografik=rsi-vs-elective`
2. **Doğrudan Erişim (Bağlantıyı Açan Meslektaş)**:
   - Meslektaş gelen bağlantıya tıklar.
   - Uygulama açılışta hash parametresini (`#infografik=rsi-vs-elective`) algılar.
   - Karşılama ekranı bypass edilerek doğrudan Hızlı Seri Entübasyon infografiği ekrana gelir.
   - Sayfa başında `← Tüm İnfografikler` ve `← Ana Portale Dön` navigasyon seçenekleri yer alır.
3. **Tarayıcı Geçmişi (Geri / İleri Entegrasyonu)**:
   - Tarayıcının "Geri" butonuna basıldığında infografik galerisine, oradan ana portale doğal olarak dönülür (`popstate` / `hashchange` desteği).

### Görsel Tasarım & Stil
- **Buton Tasarımı**:
  - Karanlık mod: `bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700`
  - Aydınlık mod: `bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs`
  - Aktif / Kopyalandı durumu: `bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30`
- **Konumlandırma**: Her infografik sayfasının ve her klinik aracın sağ üst başlık aksiyonları arasına (PubMed butonunun yanına) yerleştirilir.

---

## 3. Key Product Decisions & Trade-Offs

- **Hash-Based Routing (`#infografik=...`) vs Path-Based Routing (`/infografik/...`)**:
  - *Seçilen*: Hash tabanlı rotalama.
  - *Neden*: Statik SPA ve Docker/Vite hosting ortamlarında sunucu tarafı URL rewrite gerektirmeden, 404 hatası riski olmaksızın her ortamda garantili çalışır.
- **Otomatik Hash Senkronizasyonu**:
  - Kullanıcı sekme veya infografik değiştirdiğinde `window.location.hash` arka planda `history.replaceState` ile güncellenir; böylece kullanıcı butona basmasa bile adres çubuğundaki linki elle kopyaladığında da doğru bölüm paylaşılmış olur.

---

## 4. Technical Architecture & Data Strategy

### Mimari & Veri Akış Diyagramı

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Tarayıcı URL Hash                             │
│                  #infografik=rsi-vs-elective                           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ window.location.hash
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                               App.tsx                                  │
│  - İlk yüklemede hash parse edilir                                     │
│  - Hash doluysa: currentView = 'portal' (Welcome Screen atlanır)        │
│  - Hash dinleyicisi (window.addEventListener('hashchange'))            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ activeTab, activeInfographicId
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        PortalWorkspace.tsx                             │
│  - activeTab state'i hash ile senkronize tutulur                       │
│  - Her araç başlığında evrensel ShareButton bileşeni                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ initialInfographicId
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       InfographicsView.tsx                             │
│  - activeInfographicId (#infografik=...) ile eşleşen kartı açar        │
│  - Geri dönüldüğünde hash temizlenir (#arac=infographics)              │
│  - İnfografik başlığında "Bağlantıyı Kopyala" aksiyonu                 │
└────────────────────────────────────────────────────────────────────────┘
```

### Desteklenecek Bölüm Kimlikleri (ID Haritası)

1. **İnfografikler (`#infografik=<id>`)**:
   - `rsi-vs-elective`: Hızlı Seri Entübasyon (RSI) vs Elektif Entübasyon
   - `adult-fasting`: Erişkin Preoperatif Açlık Rehberi (2-6-8)
   - `pediatric-fasting`: Pediatrik Preoperatif Açlık Rehberi (6-4-3-1)
   - `modified-aldrete`: Modifiye Aldrete Skoru (Faz 1 PACU)
   - `padss`: PADSS Skoru (Faz 2 Günübirlik Taburculuk)
   - `surgical-urgency`: 2024 AHA/ACC Cerrahi Aciliyet ve Zamanlama

2. **Klinik Araçlar (`#arac=<id>`)**:
   - `calculator`: Kilo, MV Volüm, İdame Sıvı Hesaplayıcı
   - `intraop`: İntraoperatif Sıvı Hesaplayıcı
   - `infusion`: İnfüzyon Hızı Çevirici
   - `preop`: Preoperatif Değerlendirme (ASA/Mallampati vb.)
   - `airway`: Zor Havayolu Kılavuzu & Algoritması
   - `treatments`: Klinik Protokoller & Tedavi Rehberleri
   - `infographics`: İnfografik Koleksiyonu Ana Ekranı
   - `contacts`: Klinik Dahili Telefon Rehberi
   - `roster`: Nöbet Listesi

### Uygulama Bileşenleri
1. **`src/utils/deepLink.ts`**: URL hash okuma, oluşturma ve clipboard kopyalama yardımcı fonksiyonları.
2. **`src/components/common/ShareLinkButton.tsx`**: Her sayfada kullanılabilir, kopyalama geri bildirimi veren kompakt buton.
3. **`App.tsx`, `PortalWorkspace.tsx`, `InfographicsView.tsx`**: Hash parametrelerini okuyup doğru sekmeyi ve alt içeriği açan reaktif durum yönetimi.
