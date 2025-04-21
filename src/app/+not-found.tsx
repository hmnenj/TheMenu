import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function NotFound() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Page not found</Text>
      <Text style={styles.message}>This route doesn't exist.</Text>

      <Link href="/" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go back to home</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4B7F3A",
    fontFamily: "Poppins-Bold",
  },
  message: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4B7F3A",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});
