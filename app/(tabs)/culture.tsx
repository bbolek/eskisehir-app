import { StyleSheet, ScrollView, View, Pressable, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CultureItem } from '@/types/place';
import { getCulture } from '@/lib/supabase';
import * as Sentry from '@sentry/react-native';

export default function CultureScreen() {
  const [items, setItems] = useState<CultureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadCulture();
  }, []);

  async function loadCulture() {
    try {
      setLoading(true);
      setError(null);
      Sentry.addBreadcrumb({
        category: 'navigation',
        message: 'Loading culture screen',
        level: 'info',
      });
      const data = await getCulture();
      setItems(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError('Veriler yüklenirken bir hata oluştu');
      console.error('Error loading culture:', err);
      Sentry.captureException(err, {
        tags: { screen: 'CultureScreen', action: 'loadCulture' },
        extra: { errorMessage },
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB74D" />
        <ThemedText style={styles.loadingText}>Yükleniyor...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>{error}</ThemedText>
        <Pressable style={styles.retryButton} onPress={loadCulture}>
          <ThemedText style={styles.retryButtonText}>Tekrar Dene</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Kültür ve Tarih</ThemedText>
        <ThemedText style={styles.subtitle}>
          Eskişehir'in zengin kültürel mirasını keşfedin
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.itemsContainer}>
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={styles.itemCard}
            onPress={() => router.push(`/culture-detail/${item.id}`)}>
            <Image
              source={{ uri: item.mainMedia.url }}
              style={styles.itemImage}
              contentFit="cover"
            />
            <View style={styles.itemContent}>
              <ThemedText type="defaultSemiBold" style={styles.itemTitle}>
                {item.title}
              </ThemedText>
              <ThemedText style={styles.itemCategory}>
                {item.category}
              </ThemedText>
              <ThemedText style={styles.itemDescription}>
                {item.shortInfo}
              </ThemedText>
            </View>
          </Pressable>
        ))}
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
  header: {
    padding: 24,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    textAlign: 'center',
  },
  itemsContainer: {
    padding: 16,
  },
  itemCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderWidth: 2,
    borderColor: '#FFB74D',
  },
  itemImage: {
    width: '100%',
    height: 200,
  },
  itemContent: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 20,
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 15,
    opacity: 0.8,
    lineHeight: 22,
  },
});
