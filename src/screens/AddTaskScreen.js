import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { saveTask } from "../utils/storage";

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dateText, setDateText] = useState("");
  const [timeText, setTimeText] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    subject: "",
    date: "",
    time: "",
  });

  const validateDate = (date) => {
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    return dateRegex.test(date);
  };

  const validateTime = (time) => {
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/;
    return timeRegex.test(time);
  };

  const handleSave = async () => {
    const newErrors = {
      title: "",
      subject: "",
      date: "",
      time: "",
    };

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!dateText.trim()) {
      newErrors.date = "Date is required";
    } else if (!validateDate(dateText)) {
      newErrors.date = "Invalid format. Use MM/DD/YYYY (e.g., 01/25/2026)";
    }

    if (!timeText.trim()) {
      newErrors.time = "Time is required";
    } else if (!validateTime(timeText)) {
      newErrors.time = "Invalid format. Use HH:MM AM/PM (e.g., 2:30 PM)";
    }

    setErrors(newErrors);

    if (newErrors.title || newErrors.subject || newErrors.date || newErrors.time) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title,
      subject,
      dueDate: `${dateText} at ${timeText}`,
    };

    await saveTask(newTask);
    Alert.alert("Success", "Task saved successfully!");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Schedule</Text>

      <Text style={styles.label}>Title *</Text>
      <TextInput
        style={[styles.input, errors.title ? styles.inputError : null]}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          if (errors.title) setErrors({ ...errors, title: "" });
        }}
        placeholder="Assignment Name / Lecture"
      />
      {errors.title ? <Text style={styles.errorText}>{errors.title}</Text> : null}

      <Text style={styles.label}>Subject *</Text>
      <TextInput
        style={[styles.input, errors.subject ? styles.inputError : null]}
        value={subject}
        onChangeText={(text) => {
          setSubject(text);
          if (errors.subject) setErrors({ ...errors, subject: "" });
        }}
        placeholder="Subject Code (e.g. ICT4242)"
      />
      {errors.subject ? <Text style={styles.errorText}>{errors.subject}</Text> : null}

      <Text style={styles.label}>Select Date *</Text>
      <TextInput
        style={[styles.input, errors.date ? styles.inputError : null]}
        value={dateText}
        onChangeText={(text) => {
          setDateText(text);
          if (errors.date) setErrors({ ...errors, date: "" });
        }}
        placeholder="MM/DD/YYYY (e.g., 01/25/2026)"
      />
      {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}

      <Text style={styles.label}>Select Time *</Text>
      <TextInput
        style={[styles.input, errors.time ? styles.inputError : null]}
        value={timeText}
        onChangeText={(text) => {
          setTimeText(text);
          if (errors.time) setErrors({ ...errors, time: "" });
        }}
        placeholder="HH:MM AM/PM (e.g., 2:30 PM)"
      />
      {errors.time ? <Text style={styles.errorText}>{errors.time}</Text> : null}

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
    marginBottom: 5,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputError: {
    borderColor: "#ff0000",
    borderWidth: 2,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 14,
    marginBottom: 15,
    marginTop: 0,
  },
  saveBtn: {
    backgroundColor: "#6200ea",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});