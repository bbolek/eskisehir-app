# Eskişehir Rehberi - Mobile App

Eskişehir hakkında kapsamlı bilgi sunan mobil uygulama. Bu uygulama Eskişehir'deki gezilecek yerler, kültür ve tarih, yerel yemekler hakkında bilgi içerir.

## Özellikler

- 🏛️ **Gezilecek Yerler**: Eskişehir'deki önemli turistik mekanlar
- 🎨 **Kültür ve Tarih**: Şehrin zengin kültürel mirası
- 🍽️ **Yemek ve İçecek**: Geleneksel Eskişehir lezzetleri
- 📄 **Detay Sayfaları**: Her öğe için tam metin, galeri ve ek bilgiler
- ❤️ **Favoriler**: Beğendiğiniz yerleri kaydedin (AsyncStorage ile)
- 🔍 **Arama**: Tüm içerikte anlık arama yapın
- 🗺️ **Harita Görünümü**: Yerleri harita üzerinde görün
- 🌙 **Dark/Light Mode**: Otomatik tema desteği
- 📱 **Cross-Platform**: iOS, Android ve Web desteği

## Teknolojiler

- React Native
- Expo SDK 54
- TypeScript
- Expo Router (File-based routing)

## Kurulum

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. Uygulamayı başlatın:

   ```bash
   npx expo start
   ```

3. Uygulamayı açmak için:

   - iOS simulator için `i` tuşuna basın
   - Android emulator için `a` tuşuna basın
   - Web için `w` tuşuna basın
   - Mobil cihazda test için Expo Go uygulamasını kullanın

## Proje Yapısı

```
├── app/                         # Uygulama ekranları (File-based routing)
│   ├── (tabs)/                 # Tab navigasyon ekranları
│   │   ├── index.tsx           # Ana sayfa
│   │   ├── places.tsx          # Gezilecek yerler listesi
│   │   ├── culture.tsx         # Kültür ve tarih listesi
│   │   ├── food.tsx            # Yemek ve içecek listesi
│   │   └── search.tsx          # Arama ekranı
│   ├── place-detail/[id].tsx   # Yer detay sayfası
│   ├── culture-detail/[id].tsx # Kültür detay sayfası
│   ├── food-detail/[id].tsx    # Yemek detay sayfası
│   └── map-view.tsx            # Harita görünümü
├── components/                  # Yeniden kullanılabilir bileşenler
├── contexts/                    # React Context (Favoriler)
│   └── FavoritesContext.tsx    # Favori yönetimi
├── constants/                   # Sabitler (renkler, temalar)
├── data/                        # JSON veri dosyaları
│   ├── places.json             # Yerler verisi
│   ├── culture.json            # Kültür verisi
│   └── food.json               # Yemek verisi
├── types/                       # TypeScript tip tanımlamaları
│   └── place.ts                # Veri modelleri
└── assets/                     # Resimler ve medya dosyaları

```

## Veri Yönetimi

Şu anda uygulama JSON dosyalarından veri çekmektedir. İleride database entegrasyonu planlanmaktadır.

Her veri kaydı şunları içerir:
- Ana görsel/video
- Kısa açıklama
- Detaylı bilgi metni
- Galeri (ek görseller ve videolar)
- Kategori bilgisi

## Geliştirme

Geliştirme sırasında `app/(tabs)` klasöründeki dosyaları düzenleyerek değişiklikleri anında görebilirsiniz.

## Over-The-Air (OTA) Güncellemeleri

Uygulama artık Expo Updates ile over-the-air güncellemeleri desteklemektedir. Bu, app store'dan yeni bir sürüm yayınlamadan JavaScript ve asset güncellemelerini kullanıcılara doğrudan göndermenizi sağlar.

### OTA Güncelleme Nasıl Çalışır?

1. Uygulama her açıldığında otomatik olarak güncelleme kontrolü yapar
2. Yeni bir güncelleme varsa, arka planda indirilir
3. İndirme tamamlandığında uygulama yeniden başlatılır
4. Kullanıcı en son sürümü kullanmaya başlar

### Güncelleme Yayınlama

#### Production'a Güncelleme Gönderme:

```bash
npm run update:production "Açıklayıcı güncelleme mesajı"
```

veya

```bash
eas update --channel production --message "Video oynatma özelliği eklendi"
```

#### Preview/Test Ortamına Güncelleme Gönderme:

```bash
npm run update:preview "Test güncellemesi"
```

#### Otomatik Kanal Seçimi:

```bash
npm run update
```

Bu komut, mevcut dalınıza göre otomatik olarak kanal seçer.

### Kanallar (Channels)

Projede 3 güncelleme kanalı yapılandırılmıştır:

- **production**: Canlı ortamdaki kullanıcılar için
- **preview**: Test amaçlı
- **development**: Geliştirme ortamı için

### Önemli Notlar

- ⚠️ OTA güncellemeleri sadece JavaScript ve asset değişikliklerini destekler
- ⚠️ Native kod değişiklikleri (yeni paket eklemek, native modül değiştirmek) için yeni bir build gerekir
- ⚠️ `app.json` içindeki `version` ve `runtimeVersion` değerleri kritik öneme sahiptir
- ✅ Güncellemeler development modunda çalışmaz (sadece production build'lerinde)

### Build ve Güncelleme İş Akışı

1. **İlk Dağıtım** (Native kod değişikliği varsa):
   ```bash
   # Android için
   npm run android-publish

   # iOS için
   npm run ios-publish
   ```

2. **Sonraki Güncellemeler** (Sadece JS/asset değişikliği):
   ```bash
   npm run update:production "Güncelleme açıklaması"
   ```

### Güncelleme Durumunu Kontrol Etme

EAS Dashboard üzerinden güncellemelerinizi takip edebilirsiniz:
https://expo.dev/accounts/[kullanıcı-adı]/projects/eskisehir-guide/updates

### Yapılandırma Dosyaları

- `eas.json`: Build ve update kanalları yapılandırması
- `app.json`: Updates URL ve runtime version ayarları
- `app/_layout.tsx`: Güncelleme kontrol mantığı

## Özellikler Detayları

### ✅ Tamamlanan Özellikler

1. **Detay Sayfaları**:
   - Her yer, kültür ve yemek öğesi için ayrı detay sayfası
   - Ana görsel, detaylı açıklama, galeri görünümü
   - Geri tuşu ve favori butonu
   - Yemekler için malzeme listesi

2. **Favori Sistemi**:
   - AsyncStorage kullanarak kalıcı favori saklama
   - Detay sayfalarında favori butonları (kalp ikonu)
   - Favorilere ekleme/çıkarma

3. **Arama Özelliği**:
   - Tüm içerikte (yerler, kültür, yemek) anlık arama
   - Başlık, açıklama ve kategori bazında arama
   - Sonuçları tip ve kategoriyle gösterme
   - Arama sonuçlarından detay sayfalarına navigasyon

4. **Harita Görünümü**:
   - React Native Maps entegrasyonu
   - Tüm yerlerin haritada marker'larla gösterimi
   - Marker'a tıklayarak detay sayfasına gitme
   - Kullanıcı konumu desteği
   - Eskişehir merkez odaklı görünüm

5. **5 Tab Navigasyon**:
   - Ana Sayfa: Eskişehir hakkında genel bilgiler
   - Yerler: Gezilecek yerler
   - Kültür: Kültürel miras
   - Yemek: Yerel lezzetler
   - Ara: Tüm içerikte arama

6. **YouTube Video Desteği**:
   - Galeri içinde YouTube videoları
   - Video thumbnailleri ile görsel önizleme
   - Tıklayarak YouTube'da video açma
   - YouTube app veya tarayıcı entegrasyonu

7. **OTA Güncellemeleri**:
   - Over-the-air güncelleme desteği
   - Otomatik güncelleme kontrolü
   - Production, preview ve development kanalları
   - EAS Update entegrasyonu

### 🚧 Gelecek Özellikler

1. **Sosyal Paylaşım**: Yerleri sosyal medyada paylaşma
2. **Kullanıcı Yorumları**: Yerler için kullanıcı yorumları ve değerlendirmeler
3. **Offline Mod**: İnternet olmadan da kullanılabilme
4. **Push Notifications**: Yeni içerikler için bildirimler
5. **Çoklu Dil Desteği**: İngilizce ve diğer diller
6. **İçerik Yönetim Sistemi**: Admin paneli ile içerik güncelleme

## Lisans

Bu proje özel bir projedir.
