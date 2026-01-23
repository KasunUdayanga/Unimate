// src/screens/AddTaskScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { saveTask } from "../utils/storage";
import { MaterialIcons } from "@expo/vector-icons";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const handleSave = async () => {
    if (!title.trim() || !subject.trim()) {
      Alert.alert("Error", "Please enter Title and Subject");
      return;
    }

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newTask = {
      id: Date.now().toString(),
      title,
      subject,
      dueDate: `${formattedDate} at ${formattedTime}`,
    };

    await saveTask(newTask);
    Alert.alert("Success", "Task saved successfully!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Schedule</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Assignment Name / Lecture"
      />

      <Text style={styles.label}>Subject</Text>
      <TextInput
        style={styles.input}
        value={subject}
        onChangeText={setSubject}
        placeholder="Subject Code (e.g. ICT4242)"
      />

      <Text style={styles.label}>Pick Date & Time</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.pickerBtn} onPress={showDatepicker}>
          <MaterialIcons name="calendar-today" size={24} color="#fff" />
          <Text style={styles.pickerText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pickerBtn} onPress={showTimepicker}>
          <MaterialIcons name="access-time" size={24} color="#fff" />
          <Text style={styles.pickerText}>
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>SAVE TASK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ea",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  pickerBtn: {
    flexDirection: "row",
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },
  pickerText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
  saveBtn: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
