import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>Eskişehir'e Hoş Geldiniz</ThemedText>
        <ThemedText style={styles.subtitle}>
          Öğrenciler ve Lületaşı Şehri
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Eskişehir Hakkında</ThemedText>
        <ThemedText style={styles.description}>
          Eskişehir, Türkiye'nin kuzeybatısında yer alan, zengin tarihi, modern şehir planlaması
          ve dinamik öğrenci nüfusu ile tanınan canlı bir şehirdir. Geleneksel Türk kültürünü
          çağdaş yaşam tarzıyla mükemmel bir şekilde harmanlayan şehir, her yaştan ziyaretçisine
          eşsiz deneyimler sunar.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.highlightsContainer}>
        <View style={[styles.highlightCard, styles.historyCard]}>
          <IconSymbol name="building.2.fill" size={40} color="#E57373" />
          <ThemedText type="defaultSemiBold" style={styles.highlightTitle}>Zengin Tarih</ThemedText>
          <ThemedText style={styles.highlightText}>
            Frigler döneminden Osmanlı'ya uzanan antik miras
          </ThemedText>
        </View>

        <View style={[styles.highlightCard, styles.modernCard]}>
          <IconSymbol name="tram.fill" size={40} color="#4FC3F7" />
          <ThemedText type="defaultSemiBold" style={styles.highlightTitle}>Modern Şehir</ThemedText>
          <ThemedText style={styles.highlightText}>
            Eğitim düzeyi, gençliği, çağdaş altyapı ve sanayi
          </ThemedText>
        </View>

        <View style={[styles.highlightCard, styles.foodCard]}>
          <IconSymbol name="fork.knife" size={40} color="#FFB74D" />
          <ThemedText type="defaultSemiBold" style={styles.highlightTitle}>Yerel Lezzetler</ThemedText>
          <ThemedText style={styles.highlightText}>
            Çibörek, met helvası ve balaban ile ünlü mutfak
          </ThemedText>
        </View>

        <View style={[styles.highlightCard, styles.cultureCard]}>
          <IconSymbol name="theatermasks.fill" size={40} color="#81C784" />
          <ThemedText type="defaultSemiBold" style={styles.highlightTitle}>Sanat ve Kültür</ThemedText>
          <ThemedText style={styles.highlightText}>
            Müzeler, tiyatrolar ve geleneksel el sanatlarının evi
          </ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Hızlı Bilgiler</ThemedText>
        <View style={styles.factRow}>
          <ThemedText type="defaultSemiBold">Nüfus:</ThemedText>
          <ThemedText> ~900.000</ThemedText>
        </View>
        <View style={styles.factRow}>
          <ThemedText type="defaultSemiBold">Bölge:</ThemedText>
          <ThemedText> İç Anadolu</ThemedText>
        </View>
        <View style={styles.factRow}>
          <ThemedText type="defaultSemiBold">Rakım:</ThemedText>
          <ThemedText> Deniz seviyesinden 790m yükseklikte</ThemedText>
        </View>
        <View style={styles.factRow}>
          <ThemedText type="defaultSemiBold">İklim:</ThemedText>
          <ThemedText> Karasal (sıcak yazlar, soğuk kışlar)</ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <Pressable
          style={styles.mapButton}
          onPress={() => router.push('/map-view')}>
          <IconSymbol name="map.fill" size={24} color="#9575CD" />
          <ThemedText style={styles.mapButtonText}>Haritada Gör</ThemedText>
        </Pressable>
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
  section: {
    padding: 20,
    marginVertical: 8,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 22,
  },
  description: {
    lineHeight: 24,
    fontSize: 15,
  },
  highlightsContainer: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  highlightCard: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderWidth: 2,
  },
  historyCard: {
    borderColor: '#E57373',
  },
  modernCard: {
    borderColor: '#4FC3F7',
  },
  foodCard: {
    borderColor: '#FFB74D',
  },
  cultureCard: {
    borderColor: '#81C784',
  },
  highlightTitle: {
    marginTop: 8,
    marginBottom: 4,
    fontSize: 16,
    textAlign: 'center',
  },
  highlightText: {
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.8,
  },
  factRow: {
    flexDirection: 'row',
    paddingVertical: 6,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    borderWidth: 2,
    borderColor: '#9575CD',
  },
  mapButtonText: {
    color: '#9575CD',
    fontSize: 18,
    fontWeight: '600',
  },
});
