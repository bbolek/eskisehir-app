import { StyleSheet, ScrollView, View, Pressable, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Place, CultureItem, FoodItem } from '@/types/place';
import placesData from '@/data/places.json';
import cultureData from '@/data/culture.json';
import foodData from '@/data/food.json';

type SearchResult = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  type: 'place' | 'culture' | 'food';
  category?: string;
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const colorScheme = useColorScheme();

  const places = placesData as Place[];
  const culture = cultureData as CultureItem[];
  const food = foodData as FoodItem[];

  const getAllResults = (): SearchResult[] => {
    const results: SearchResult[] = [];

    places.forEach((place) => {
      results.push({
        id: place.id,
        title: place.name,
        description: place.shortInfo,
        imageUrl: place.mainMedia.url,
        type: 'place',
        category: place.category,
      });
    });

    culture.forEach((item) => {
      results.push({
        id: item.id,
        title: item.title,
        description: item.shortInfo,
        imageUrl: item.mainMedia.url,
        type: 'culture',
        category: item.category,
      });
    });

    food.forEach((item) => {
      results.push({
        id: item.id,
        title: item.name,
        description: item.shortInfo,
        imageUrl: item.mainMedia.url,
        type: 'food',
        category: item.category,
      });
    });

    return results;
  };

  const searchResults = searchQuery
    ? getAllResults().filter((item) =>
        [item.title, item.description, item.category]
          .filter(Boolean)
          .some((text) =>
            text!.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : [];

  const handleResultPress = (result: SearchResult) => {
    if (result.type === 'place') {
      router.push(`/place-detail/${result.id}`);
    } else if (result.type === 'culture') {
      router.push(`/culture-detail/${result.id}`);
    } else if (result.type === 'food') {
      router.push(`/food-detail/${result.id}`);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'place':
        return 'Yer';
      case 'culture':
        return 'Kültür';
      case 'food':
        return 'Yemek';
      default:
        return '';
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Ara</ThemedText>
        <View style={[styles.searchContainer, {
          backgroundColor: colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
        }]}>
          <IconSymbol name="magnifyingglass" size={20} color="#888" />
          <TextInput
            style={[styles.searchInput, {
              color: colorScheme === 'dark' ? '#FFF' : '#000'
            }]}
            placeholder="Eskişehir'de ara..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <IconSymbol name="xmark.circle.fill" size={20} color="#888" />
            </Pressable>
          )}
        </View>
      </ThemedView>

      <ScrollView style={styles.resultsContainer}>
        {searchQuery === '' ? (
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="magnifyingglass" size={60} color="#CCC" />
            <ThemedText style={styles.emptyText}>
              Yerler, kültür veya yemekler arasında arama yapın
            </ThemedText>
          </ThemedView>
        ) : searchResults.length === 0 ? (
          <ThemedView style={styles.emptyState}>
            <IconSymbol name="questionmark.circle" size={60} color="#CCC" />
            <ThemedText style={styles.emptyText}>Sonuç bulunamadı</ThemedText>
          </ThemedView>
        ) : (
          <ThemedView style={styles.resultsList}>
            <ThemedText style={styles.resultsCount}>
              {searchResults.length} sonuç bulundu
            </ThemedText>
            {searchResults.map((result) => (
              <Pressable
                key={`${result.type}-${result.id}`}
                style={styles.resultCard}
                onPress={() => handleResultPress(result)}>
                <Image
                  source={{ uri: result.imageUrl }}
                  style={styles.resultImage}
                  contentFit="cover"
                />
                <View style={styles.resultContent}>
                  <View style={styles.resultHeader}>
                    <ThemedText type="defaultSemiBold" style={styles.resultTitle}>
                      {result.title}
                    </ThemedText>
                    <ThemedText style={styles.resultType}>
                      {getTypeLabel(result.type)}
                    </ThemedText>
                  </View>
                  {result.category && (
                    <ThemedText style={styles.resultCategory}>
                      {result.category}
                    </ThemedText>
                  )}
                  <ThemedText style={styles.resultDescription} numberOfLines={2}>
                    {result.description}
                  </ThemedText>
                </View>
              </Pressable>
            ))}
          </ThemedView>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
  },
  resultsContainer: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.6,
  },
  resultsList: {
    padding: 16,
  },
  resultsCount: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 16,
  },
  resultCard: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  resultImage: {
    width: 100,
    height: 100,
  },
  resultContent: {
    flex: 1,
    padding: 12,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  resultType: {
    fontSize: 12,
    opacity: 0.5,
    fontWeight: '500',
  },
  resultCategory: {
    fontSize: 13,
    opacity: 0.6,
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    opacity: 0.7,
    lineHeight: 18,
  },
});
