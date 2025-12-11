import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useFavorites } from '@/contexts/FavoritesContext';
import { getPlaceById } from '@/lib/supabase';
import { Media, Place } from '@/types/place';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function PlaceDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { toggleFavorite, isFavorite } = useFavorites();
  const placeId = typeof id === 'string' ? id : id[0];

  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlace();
  }, [placeId]);

  async function loadPlace() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlaceById(placeId);
      setPlace(data);
    } catch (err) {
      setError('Veri yüklenirken bir hata oluştu');
      console.error('Error loading place:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4FC3F7" />
        <ThemedText style={styles.loadingText}>Yükleniyor...</ThemedText>
      </ThemedView>
    );
  }

  if (error || !place) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Pressable style={styles.backButtonError} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </Pressable>
        <ThemedText style={styles.errorText}>{error || 'Yer bulunamadı'}</ThemedText>
        <Pressable style={styles.retryButton} onPress={loadPlace}>
          <ThemedText style={styles.retryButtonText}>Tekrar Dene</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const renderMedia = (media: Media, index: number) => {
    if (media.type === 'video') {
      return (
        <View key={index} style={styles.galleryItem}>
          <Image
            source={{ uri: media.thumbnail || media.url }}
            style={styles.galleryImage}
            contentFit="cover"
          />
          <View style={styles.playButton}>
            <IconSymbol name="play.circle.fill" size={40} color="#FFF" />
          </View>
          {media.caption && (
            <ThemedText style={styles.mediaCaption}>{media.caption}</ThemedText>
          )}
        </View>
      );
    }

    return (
      <View key={index} style={styles.galleryItem}>
        <Image
          source={{ uri: media.url }}
          style={styles.galleryImage}
          contentFit="cover"
        />
        {media.caption && (
          <ThemedText style={styles.mediaCaption}>{media.caption}</ThemedText>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: place.mainMedia.url }}
          style={styles.headerImage}
          contentFit="cover"
        />
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#FFF" />
        </Pressable>
        <Pressable
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(placeId)}>
          <IconSymbol
            name={isFavorite(placeId) ? 'heart.fill' : 'heart'}
            size={24}
            color={isFavorite(placeId) ? '#FF6B6B' : '#FFF'}
          />
        </Pressable>
      </View>

      <ThemedView style={styles.content}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            {place.name}
          </ThemedText>
          {place.category && (
            <ThemedText style={styles.category}>{place.category}</ThemedText>
          )}
        </View>

        <ThemedText style={styles.shortInfo}>{place.shortInfo}</ThemedText>

        {place.location && (
          <View style={styles.locationContainer}>
            <IconSymbol name="mappin.circle.fill" size={20} color="#FF6B6B" />
            <ThemedText style={styles.locationText}>{place.location.address}</ThemedText>
          </View>
        )}

        <View style={styles.divider} />

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Detaylı Bilgi
        </ThemedText>
        <ThemedText style={styles.mainText}>{place.mainText}</ThemedText>

        {place.gallery && place.gallery.length > 0 && (
          <>
            <View style={styles.divider} />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Galeri
            </ThemedText>
            <View style={styles.gallery}>
              {place.gallery.map((media, index) => renderMedia(media, index))}
            </View>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    opacity: 0.7,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backButtonError: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.7,
  },
  retryButton: {
    backgroundColor: '#4FC3F7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    opacity: 0.6,
  },
  shortInfo: {
    fontSize: 17,
    lineHeight: 26,
    marginBottom: 16,
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  locationText: {
    fontSize: 15,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.2)',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 22,
    marginBottom: 12,
  },
  mainText: {
    fontSize: 16,
    lineHeight: 26,
  },
  gallery: {
    gap: 16,
  },
  galleryItem: {
    marginBottom: 16,
  },
  galleryImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -20,
  },
  mediaCaption: {
    fontSize: 14,
    marginTop: 8,
    opacity: 0.7,
    fontStyle: 'italic',
  },
});
