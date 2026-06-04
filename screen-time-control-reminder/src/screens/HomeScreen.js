import { StyleSheet, Platform, View, TouchableOpacity, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const goToReminder = () => {
    router.push('/(tabs)/explore');
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* ── HERO ── */}
      <View style={styles.hero}>
        {/* dekoratif lingkaran */}
        <View style={styles.circle1} />
        <View style={styles.circle2} />

        {/* ikon */}
        <View style={styles.heroIconBox}>
          <ThemedText style={styles.heroIconText}>⏰</ThemedText>
        </View>

        {/* badge */}
        <View style={styles.badge}>
          <ThemedText style={styles.badgeText}>✦  Reminder App</ThemedText>
        </View>

        <ThemedText style={styles.heroTitle}>
          Atur waktu,{'\n'}tetap produktif
        </ThemedText>
        <ThemedText style={styles.heroSub}>
          Kelola reminder & notifikasi kamu dengan mudah kapan saja
        </ThemedText>
      </View>

      {/* ── BODY ── */}
      <View style={styles.body}>

        {/* CTA card */}
        <View style={styles.ctaCard}>
          <View style={styles.ctaTop}>
            <ThemedText style={styles.ctaLabel}>REMINDER CONTROL</ThemedText>
            <View style={styles.activeDot} />
          </View>
          <ThemedText style={styles.ctaTitle}>Mulai buat reminder</ThemedText>
          <ThemedText style={styles.ctaDesc}>
            Tambah, hapus, dan atur semua reminder kamu dalam satu tempat.
          </ThemedText>
          <TouchableOpacity style={styles.btnPrimary} onPress={goToReminder} activeOpacity={0.85}>
            <ThemedText style={styles.btnText}>🔔  Buka Reminder  →</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#eff6ff' }]}>
              <ThemedText style={{ fontSize: 18 }}>🔔</ThemedText>
            </View>
            <ThemedText style={styles.statNum}>0</ThemedText>
            <ThemedText style={styles.statLbl}>Reminder aktif</ThemedText>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#f0fdf4' }]}>
              <ThemedText style={{ fontSize: 18 }}>✅</ThemedText>
            </View>
            <ThemedText style={styles.statNum}>0</ThemedText>
            <ThemedText style={styles.statLbl}>Selesai hari ini</ThemedText>
          </View>
        </View>

        {/* Feature list */}
        <ThemedText style={styles.sectionTitle}>Fitur utama</ThemedText>
        <View style={styles.featureCard}>
          {FEATURES.map((f, i) => (
            <View key={i} style={[styles.featureRow, i < FEATURES.length - 1 && styles.featureBorder]}>
              <View style={[styles.featureIcon, { backgroundColor: f.bg }]}>
                <ThemedText style={{ fontSize: 17 }}>{f.icon}</ThemedText>
              </View>
              <View style={{ flex: 1 }}>
                <ThemedText style={styles.featureMain}>{f.title}</ThemedText>
                <ThemedText style={styles.featureSub}>{f.sub}</ThemedText>
              </View>
              <ThemedText style={styles.chevron}>›</ThemedText>
            </View>
          ))}
        </View>

        {/* Platform pill */}
        <View style={styles.platformPill}>
          <ThemedText style={styles.platformText}>
            📱  Platform: {Platform.OS}
          </ThemedText>
        </View>

      </View>
    </ThemedView>
  );
}

const FEATURES = [
  { icon: '🔔', bg: '#f5f3ff', title: 'Push notification', sub: 'Notifikasi langsung ke perangkat' },
  { icon: '🕐', bg: '#fffbeb', title: 'Jadwal otomatis', sub: 'Atur kapan notifikasi dikirim' },
  { icon: '📋', bg: '#fff1ee', title: 'Kelola reminder', sub: 'Tambah & hapus dengan mudah' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },

  // ── HERO
  hero: {
    backgroundColor: '#2563eb',
    paddingTop: 56,
    paddingBottom: 36,
    paddingHorizontal: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  circle1: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)', top: -40, right: -40,
  },
  circle2: {
    position: 'absolute', width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)', bottom: -20, left: 20,
  },
  heroIconBox: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16, borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  heroIconText: { fontSize: 26 },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4,
    marginBottom: 14,
  },
  badgeText: { fontSize: 11, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },
  heroTitle: {
    fontSize: 28, fontWeight: '500', color: '#fff',
    lineHeight: 34, marginBottom: 8,
  },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 20 },

  // ── BODY
  body: { padding: 16, marginTop: -14, gap: 14 },

  // CTA card
  ctaCard: {
    backgroundColor: '#fff', borderRadius: 20,
    padding: 20, borderWidth: 0.5, borderColor: '#e2e8f0',
  },
  ctaTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  ctaLabel: { fontSize: 11, fontWeight: '500', color: '#94a3b8', letterSpacing: 0.8 },
  activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#22c55e' },
  ctaTitle: { fontSize: 18, fontWeight: '500', color: '#0f172a', marginBottom: 6 },
  ctaDesc: { fontSize: 13, color: '#64748b', lineHeight: 20, marginBottom: 16 },
  btnPrimary: {
    backgroundColor: '#2563eb', borderRadius: 12,
    paddingVertical: 13, alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '500' },

  // stats
  statsRow: { flexDirection: 'row', gap: 12 },
  statCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 16,
    padding: 16, borderWidth: 0.5, borderColor: '#e2e8f0',
  },
  statIcon: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  statNum: { fontSize: 22, fontWeight: '500', color: '#0f172a', marginBottom: 2 },
  statLbl: { fontSize: 12, color: '#64748b' },

  // features
  sectionTitle: { fontSize: 13, fontWeight: '500', color: '#64748b', paddingHorizontal: 4 },
  featureCard: {
    backgroundColor: '#fff', borderRadius: 16,
    borderWidth: 0.5, borderColor: '#e2e8f0', overflow: 'hidden',
  },
  featureRow: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, padding: 14,
  },
  featureBorder: { borderBottomWidth: 0.5, borderBottomColor: '#f1f5f9' },
  featureIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  featureMain: { fontSize: 14, fontWeight: '500', color: '#0f172a' },
  featureSub: { fontSize: 12, color: '#64748b', marginTop: 1 },
  chevron: { fontSize: 20, color: '#94a3b8' },

  // platform
  platformPill: {
    backgroundColor: '#f8fafc', borderRadius: 12,
    padding: 10, alignItems: 'center',
    borderWidth: 0.5, borderColor: '#e2e8f0',
  },
  platformText: { fontSize: 12, color: '#94a3b8' },
});