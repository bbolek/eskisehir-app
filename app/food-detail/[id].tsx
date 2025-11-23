import { StyleSheet, ScrollView, View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { FoodItem, Media } from '@/types/place';
import foodData from '@/data/food.json';

const categoryLabels: Record<string, string> = {
  yemek: 'Yemek',
  tatlı: 'Tatlı',
  içecek: 'İçecek',
  restoran: 'Restoran',
};

export default function FoodDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const item = (foodData as FoodItem[]).find((f) => f.id === id);

  if (!item) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Yemek bulunamadı</ThemedText>
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
            {item.name}
          </ThemedText>
          {item.category && (
            <ThemedText style={styles.category}>
              {categoryLabels[item.category]}
            </ThemedText>
          )}
        </View>

        <ThemedText style={styles.shortInfo}>{item.shortInfo}</ThemedText>

        {item.ingredients && item.ingredients.length > 0 && (
          <View style={styles.ingredientsContainer}>
            <ThemedText type="defaultSemiBold" style={styles.ingredientsTitle}>
              Malzemeler:
            </ThemedText>
            <View style={styles.ingredientsList}>
              {item.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <ThemedText style={styles.ingredientBullet}>•</ThemedText>
                  <ThemedText style={styles.ingredientText}>{ingredient}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}

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
  ingredientsContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 211, 61, 0.1)',
  },
  ingredientsTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  ingredientsList: {
    gap: 4,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ingredientBullet: {
    fontSize: 16,
  },
  ingredientText: {
    fontSize: 15,
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
