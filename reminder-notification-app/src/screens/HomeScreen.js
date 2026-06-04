// screens/HomeScreen.js
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../services/notificationService';

// Set handler notifikasi (untuk iOS dan Android)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function HomeScreen() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    // Daftar token push notification
    registerForPushNotificationsAsync().then(token => {
      if (token) setExpoPushToken(token);
    });

    // Listener notifikasi masuk
    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        console.log('Notification received:', notification);
      });

    // Listener saat notifikasi di-tap
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        console.log('Notification response:', response);
      });

    return () => {
      // Hapus listener saat unmount
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  // Fungsi kirim notifikasi lokal
  async function sendLocalNotification() {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Notifikasi lokal tidak tersedia di browser'
      );
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder Notification',
        body: 'Praktikum React Native dimulai sekarang',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Notification App</Text>

      <Text style={styles.label}>Device Token:</Text>

      <Text style={styles.token}>{expoPushToken || 'Belum ada token'}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={sendLocalNotification}
      >
        <Text style={styles.buttonText}>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  token: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});