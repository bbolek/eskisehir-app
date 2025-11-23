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

### 🚧 Gelecek Özellikler

1. **Veritabanı Entegrasyonu**: JSON dosyaları yerine Firebase/Supabase gibi gerçek veritabanı
2. **YouTube Video Player**: Video galeri öğelerini oynatma
3. **Sosyal Paylaşım**: Yerleri sosyal medyada paylaşma
4. **Kullanıcı Yorumları**: Yerler için kullanıcı yorumları ve değerlendirmeler
5. **Offline Mod**: İnternet olmadan da kullanılabilme
6. **Push Notifications**: Yeni içerikler için bildirimler
7. **Çoklu Dil Desteği**: İngilizce ve diğer diller

## Lisans

Bu proje özel bir projedir.
