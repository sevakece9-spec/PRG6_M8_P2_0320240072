import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ThemedText } from '../components/themed-text';

export default function ReminderScreen() {
  const [text, setText] = useState('');
  const [reminders, setReminders] = useState<{ id: string; title: string }[]>([]);

  // tambah reminder
  const addReminder = () => {
    if (!text.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      title: text,
    };

    setReminders(prev => [newItem, ...prev]);
    setText('');
  };

  // hapus reminder
  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      
      {/* TITLE */}
      <ThemedText type="title">⏰ Reminder List</ThemedText>

      {/* INPUT */}
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Tulis reminder..."
        style={styles.input}
      />

      {/* BUTTON */}
      <TouchableOpacity style={styles.button} onPress={addReminder}>
        <Text style={styles.buttonText}>Tambah Reminder</Text>
      </TouchableOpacity>

      {/* LIST */}
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>

            <TouchableOpacity onPress={() => deleteReminder(item.id)}>
              <Text style={styles.delete}>Hapus</Text>
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  button: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  item: {
    backgroundColor: 'white',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  itemText: {
    flex: 1,
  },

  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
});