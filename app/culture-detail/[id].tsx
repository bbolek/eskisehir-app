import { StyleSheet, ScrollView, View, Pressable, ActivityIndicator, Linking, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { CultureItem, Media } from '@/types/place';
import { getCultureById } from '@/lib/supabase';
import * as Sentry from '@sentry/react-native';

export default function CultureDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const itemId = typeof id === 'string' ? id : id[0];

  const [item, setItem] = useState<CultureItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCultureItem();
  }, [itemId]);

  async function loadCultureItem() {
    try {
      setLoading(true);
      setError(null);
      Sentry.addBreadcrumb({
        category: 'navigation',
        message: `Loading culture detail: ${itemId}`,
        level: 'info',
      });
      const data = await getCultureById(itemId);
      setItem(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError('Veri yüklenirken bir hata oluştu');
      console.error('Error loading culture item:', err);
      Sentry.captureException(err, {
        tags: { screen: 'CultureDetailScreen', action: 'loadCultureItem' },
        extra: { itemId, errorMessage },
      });
    } finally {
      setLoading(false);
    }
  }

  const handleVideoPress = async (videoUrl: string) => {
    try {
      await Linking.openURL(videoUrl);
    } catch (err) {
      console.error('Error opening video:', err);
      Alert.alert('Hata', 'Video açılırken bir sorun oluştu.');
      Sentry.captureException(err, {
        tags: { screen: 'CultureDetailScreen', action: 'handleVideoPress' },
        extra: { videoUrl },
      });
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB74D" />
        <ThemedText style={styles.loadingText}>Yükleniyor...</ThemedText>
      </ThemedView>
    );
  }

  if (error || !item) {
    return (
      <ThemedView style={styles.errorContainer}>
        <Pressable style={styles.backButtonError} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </Pressable>
        <ThemedText style={styles.errorText}>{error || 'İçerik bulunamadı'}</ThemedText>
        <Pressable style={styles.retryButton} onPress={loadCultureItem}>
          <ThemedText style={styles.retryButtonText}>Tekrar Dene</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const renderMedia = (media: Media, index: number) => {
    if (media.type === 'video') {
      return (
        <View key={index} style={styles.galleryItem}>
          <Pressable onPress={() => handleVideoPress(media.url)}>
            <Image
              source={{ uri: media.thumbnail || media.url }}
              style={styles.galleryImage}
              contentFit="cover"
            />
            <View style={styles.playButton}>
              <IconSymbol name="play.circle.fill" size={40} color="#FFF" />
            </View>
          </Pressable>
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
          source={{ uri: item.mainMedia.url }}
          style={styles.headerImage}
          contentFit="cover"
        />
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#FFF" />
        </Pressable>
      </View>

      <ThemedView style={styles.content}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            {item.title}
          </ThemedText>
          {item.category && (
            <ThemedText style={styles.category}>{item.category}</ThemedText>
          )}
        </View>

        <ThemedText style={styles.shortInfo}>{item.shortInfo}</ThemedText>

        <View style={styles.divider} />

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Detaylı Bilgi
        </ThemedText>
        <ThemedText style={styles.mainText}>{item.mainText}</ThemedText>

        {item.gallery && item.gallery.length > 0 && (
          <>
            <View style={styles.divider} />
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Galeri
            </ThemedText>
            <View style={styles.gallery}>
              {item.gallery.map((media, index) => renderMedia(media, index))}
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
    backgroundColor: '#FFB74D',
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
