// src/screens/HomeScreen.js
import React, { useState, useCallback, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks, deleteTask, clearAllData } from '../utils/storage'; // clearAllData එකතු කර ඇත
import TaskCard from '../components/TaskCard';
import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // 1. Header එකට Logout Button එක දැමීම
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={confirmLogout} style={{ marginRight: 10 }}>
          <MaterialIcons name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // 2. දත්ත Refresh කිරීම
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    const updatedTasks = await deleteTask(id);
    setTasks(updatedTasks);
  };

  // 3. Logout Function එක
  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive", 
          onPress: handleLogout 
        }
      ]
    );
  };

  const handleLogout = async () => {
    await clearAllData(); // Async Storage Clear කිරීම
    // Login එකට යවන්න (Back යාම වැළැක්වීමට Reset කරයි)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialIcons name="event-busy" size={80} color="#ccc" />
          <Text style={styles.emptyText}>No Tasks Scheduled</Text>
          <Text style={styles.subText}>Tap + to add a lecture or assignment</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard 
              title={item.title} 
              subject={item.subject} 
              dueDate={item.dueDate}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddTask')}
      >
        <MaterialIcons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  list: { padding: 15 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#888', marginTop: 10 },
  subText: { color: '#aaa' },
  fab: {
    position: 'absolute', bottom: 30, right: 30,
    backgroundColor: '#6200ea', width: 60, height: 60,
    borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    elevation: 5, shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.3
  },
});