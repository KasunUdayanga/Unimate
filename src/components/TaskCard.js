import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const TaskCard = ({ title, subject, dueDate, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.date}>Due: {dueDate}</Text>
      </View>

      <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
        <MaterialIcons name="delete-outline" size={26} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 3, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subject: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  deleteBtn: {
    padding: 8,
  },
});

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskCard;
