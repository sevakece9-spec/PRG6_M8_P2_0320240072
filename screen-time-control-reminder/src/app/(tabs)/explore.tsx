import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  StatusBar,
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../../services/notificationServices';

export default function ReminderScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [text, setText] = useState('');
  const [reminders, setReminders] = useState<{ id: string; title: string }[]>([]);

  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: string | undefined) => {
      if (token) setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log('Notifikasi diterima:', notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Notifikasi di-tap:', response);
      });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  const addReminder = async () => {
    if (!text.trim()) {
      Alert.alert('Peringatan', 'Reminder tidak boleh kosong');
      return;
    }

    if (Platform.OS === 'web') {
      Alert.alert('Info', 'Notifikasi tidak didukung di web');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⏰ Reminder',
        body: text,
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 3,
      },
    });

    setReminders(prev => [{ id: Date.now().toString(), title: text }, ...prev]);
    setText('');
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />

      {/* ── HEADER ── */}
      <View style={styles.header}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <Text style={styles.headerEmoji}>📋</Text>
        <Text style={styles.headerTitle}>Reminder List</Text>
        <Text style={styles.headerSub}>Catat dan kelola semua pengingat kamu</Text>
      </View>

      <FlatList
        data={reminders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            {/* Token box */}
            <View style={styles.tokenCard}>
              <View style={styles.tokenLeft}>
                <Text style={styles.tokenIcon}>🔑</Text>
                <View>
                  <Text style={styles.tokenLabel}>Device Token</Text>
                  <Text style={styles.tokenValue} numberOfLines={1}>
                    {expoPushToken ? expoPushToken.slice(0, 30) + '...' : 'Menunggu izin notifikasi...'}
                  </Text>
                </View>
              </View>
              <View style={[styles.tokenDot, { backgroundColor: expoPushToken ? '#22c55e' : '#f59e0b' }]} />
            </View>

            {/* Input area */}
            <View style={styles.inputCard}>
              <Text style={styles.inputLabel}>Reminder baru</Text>
              <TextInput
                value={text}
                onChangeText={setText}
                placeholder="Tulis reminder kamu di sini..."
                placeholderTextColor="#94a3b8"
                style={styles.input}
                multiline
              />
              <TouchableOpacity
                style={styles.btnAdd}
                onPress={addReminder}
                activeOpacity={0.85}
              >
                <Text style={styles.btnAddText}>＋  Tambah Reminder</Text>
              </TouchableOpacity>
            </View>

            {/* List header */}
            {reminders.length > 0 && (
              <View style={styles.listHeader}>
                <Text style={styles.listHeaderText}>Aktif ({reminders.length})</Text>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyEmoji}>🗂️</Text>
            <Text style={styles.emptyTitle}>Belum ada reminder</Text>
            <Text style={styles.emptySub}>Tambahkan reminder pertama kamu di atas</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.reminderCard}>
            {/* nomor urut */}
            <View style={styles.reminderNum}>
              <Text style={styles.reminderNumText}>{index + 1}</Text>
            </View>

            <Text style={styles.reminderText} numberOfLines={2}>{item.title}</Text>

            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => deleteReminder(item.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.btnDeleteText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },

  // HEADER
  header: {
    backgroundColor: '#2563eb',
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  circle1: {
    position: 'absolute', width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.07)', top: -30, right: -30,
  },
  circle2: {
    position: 'absolute', width: 90, height: 90, borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.05)', bottom: -10, left: 10,
  },
  headerEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
  },

  // LIST
  listContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 40,
  },

  // TOKEN CARD
  tokenCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
    marginBottom: 12,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  tokenIcon: { fontSize: 20 },
  tokenLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  tokenValue: {
    fontSize: 12,
    color: '#475569',
    maxWidth: 220,
  },
  tokenDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },

  // INPUT CARD
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
    marginBottom: 12,
    gap: 10,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#0f172a',
    minHeight: 48,
  },
  btnAdd: {
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
  },
  btnAddText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // LIST HEADER
  listHeader: {
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  listHeaderText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },

  // REMINDER CARD
  reminderCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#e2e8f0',
    gap: 12,
    marginBottom: 8,
  },
  reminderNum: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderNumText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
    color: '#0f172a',
    lineHeight: 20,
  },
  btnDelete: {
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fecaca',
  },
  btnDeleteText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: '600',
  },

  // EMPTY STATE
  emptyBox: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyEmoji: { fontSize: 40, marginBottom: 4 },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  emptySub: {
    fontSize: 13,
    color: '#94a3b8',
    textAlign: 'center',
  },
});