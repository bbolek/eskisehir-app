import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Place } from '@/types/place';
import placesData from '@/data/places.json';

export default function PlacesScreen() {
  const places = placesData as Place[];
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Gezilecek Yerler</ThemedText>
        <ThemedText style={styles.subtitle}>
          Eskişehir'in güzelliklerini ve tarihini keşfedin
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.placesContainer}>
        {places.map((place) => (
          <Pressable
            key={place.id}
            style={styles.placeCard}
            onPress={() => router.push(`/place-detail/${place.id}`)}>
            <Image
              source={{ uri: place.mainMedia.url }}
              style={styles.placeImage}
              contentFit="cover"
            />
            <View style={styles.placeContent}>
              <ThemedText type="defaultSemiBold" style={styles.placeName}>
                {place.name}
              </ThemedText>
              <ThemedText style={styles.placeCategory}>
                {place.category}
              </ThemedText>
              <ThemedText style={styles.placeDescription}>
                {place.shortInfo}
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
  placesContainer: {
    padding: 16,
  },
  placeCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderWidth: 2,
    borderColor: '#4FC3F7',
  },
  placeImage: {
    width: '100%',
    height: 200,
  },
  placeContent: {
    padding: 16,
  },
  placeName: {
    fontSize: 20,
    marginBottom: 4,
  },
  placeCategory: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 8,
  },
  placeDescription: {
    fontSize: 15,
    opacity: 0.8,
    lineHeight: 22,
  },
});
