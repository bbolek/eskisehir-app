import { StyleSheet, View, Pressable, Platform, ActivityIndicator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Place } from '@/types/place';
import { getPlaces } from '@/lib/supabase';

export default function MapViewScreen() {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPlaces();
  }, []);

  async function loadPlaces() {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlaces();
      setPlaces(data.filter((p) => p.location));
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu');
      console.error('Error loading places for map:', err);
    } finally {
      setLoading(false);
    }
  }

  // Eskişehir merkez koordinatları
  const eskisehirCenter = {
    latitude: 39.7767,
    longitude: 30.5206,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color="#000" />
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            Harita
          </ThemedText>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4FC3F7" />
          <ThemedText style={styles.loadingText}>Yükleniyor...</ThemedText>
        </View>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color="#000" />
          </Pressable>
          <ThemedText type="title" style={styles.title}>
            Harita
          </ThemedText>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>{error}</ThemedText>
          <Pressable style={styles.retryButton} onPress={loadPlaces}>
            <ThemedText style={styles.retryButtonText}>Tekrar Dene</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color="#000" />
        </Pressable>
        <ThemedText type="title" style={styles.title}>
          Harita
        </ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={eskisehirCenter}
        showsUserLocation
        showsMyLocationButton>
        {places.map((place) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.location!.latitude,
              longitude: place.location!.longitude,
            }}
            title={place.name}
            description={place.shortInfo}
            onCalloutPress={() => router.push(`/place-detail/${place.id}`)}
          />
        ))}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
  },
  map: {
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
});
