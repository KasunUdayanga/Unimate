import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.jpg")}
        style={styles.logo}
      />
      
      <Text style={styles.appName}>UniMate</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.btnText}>Go</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#6200ea",
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 40,
  },
  button: {
    marginTop: 30,
    width: 120,
    height: 40,
    backgroundColor: "#333",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
