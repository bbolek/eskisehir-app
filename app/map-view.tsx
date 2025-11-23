import { StyleSheet, View, Pressable, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Place } from '@/types/place';
import placesData from '@/data/places.json';

export default function MapViewScreen() {
  const router = useRouter();
  const places = (placesData as Place[]).filter((p) => p.location);

  // Eskişehir merkez koordinatları
  const eskisehirCenter = {
    latitude: 39.7767,
    longitude: 30.5206,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

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
});
