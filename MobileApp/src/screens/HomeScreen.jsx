import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
// import { useNavigation } from "@react-navigation/native";


const HomeScreen = () => {
    // const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header
            // onLoginPress={() => navigation.navigate("Login")}
            // onSignupPress={() => navigation.navigate("Signup")}

            onLoginPress={() => console.log("Login pressed")}
            onSignupPress={() => console.log("Signup pressed")}
      />
     

      {/* Body */}
      <View style={styles.body}>
        <Text style={styles.welcomeText}>
          Welcome to Hello Aaye 👋
        </Text>
        <Text style={styles.subText}>
          Your smart mobile-first application
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    height: 60,
    backgroundColor: "#1E88E5", // blue
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

//   authButtons: {
//     flexDirection: "row",
//   },

//   loginBtn: {
//     marginRight: 12,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderWidth: 1,
//     borderColor: "#fff",
//     borderRadius: 4,
//   },

  loginText: {
    color: "#fff",
    fontSize: 14,
  },

//   signupBtn: {
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     backgroundColor: "#fff",
//     borderRadius: 4,
//   },

  signupText: {
    color: "#1E88E5",
    fontSize: 14,
    fontWeight: "600",
  },

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },

  subText: {
    fontSize: 14,
    color: "#666",
  },
});
