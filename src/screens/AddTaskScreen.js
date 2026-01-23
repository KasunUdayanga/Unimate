import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveTask } from '../utils/storage';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSave = async () => {
    // Form Validation
    if (!title.trim() || !subject.trim() || !dueDate.trim()) {
      Alert.alert('Missing Info', 'Please fill in all fields');
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      subject,
      dueDate,
    };

    await saveTask(newTask);
    Alert.alert('Success', 'Added successfully!');
    navigation.goBack(); // ආපසු Home එකට යයි
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title (e.g., Assignment 1)</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title" />

      <Text style={styles.label}>Subject (e.g., ICT4242)</Text>
      <TextInput style={styles.input} value={subject} onChangeText={setSubject} placeholder="Enter subject code" />

      <Text style={styles.label}>Due Date / Time</Text>
      <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="2026-01-28" />

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.btnText}>SAVE SCHEDULE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 16 },
  saveBtn: { backgroundColor: '#6200ea', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});