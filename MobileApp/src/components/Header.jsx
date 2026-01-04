import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Header = ({ onLoginPress, onSignupPress }) => {
  return (
    <View style={styles.header}>
      {/* Left: Logo / App Name */}
      <Text style={styles.logoText}>Hello Aaye</Text>

      {/* Right: Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={onSignupPress}>
          <Text style={styles.signupText}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#1E88E5", // Blue color
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  loginButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    marginRight: 10,
  },

  loginText: {
    color: "#fff",
    fontSize: 14,
  },

  signupButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
  },

  signupText: {
    color: "#1E88E5",
    fontSize: 14,
    fontWeight: "600",
  },
});
