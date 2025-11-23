import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { CultureItem } from '@/types/place';
import cultureData from '@/data/culture.json';

export default function CultureScreen() {
  const items = cultureData as CultureItem[];
  const router = useRouter();

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
