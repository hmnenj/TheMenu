import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList, TextInput, Pressable, TouchableOpacity } from "react-native";
import { useRouter, Link } from "expo-router";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const API_KEY = "ae87762fc0ca4585809a2d2c12251b72";

const loadFonts = () => {
  return Font.loadAsync({
    "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../../assets/fonts/Poppins-SemiBold.ttf"),
  });
};

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const router = useRouter();

  const fetchRecommendedRecipes = async () => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=recipe&number=3&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setRecommendedRecipes(data.results || []);
    } catch (error) {
      console.error("Error in search a recipe", error);
    }
  };

  useEffect(() => {
    fetchRecommendedRecipes();
  }, []);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Menu</Text>
      <Text style={styles.subtitle}>Welcome to The Menu App</Text>

      <Pressable onPress={() => router.push("/search")}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search a recipe"
            editable={false}
            pointerEvents="none"
            style={styles.inputFake}
          />
          <Image
            style={styles.searchImg}
            source={require("../../assets/images/search.png")}
          />
        </View>
      </Pressable>

      <Text style={styles.text}>Recommended Recipes</Text>
      <FlatList
        horizontal
        data={recommendedRecipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Image source={{ uri: item.image }} style={styles.recipeImage} />
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Link href={`/details?id=${item.id}`} asChild>
              <TouchableOpacity>
                <Text style={styles.details}>Details</Text>
              </TouchableOpacity>
            </Link>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 30,
  },
  title: {
    fontSize: 32,
    color: "#4B7F3A",
    fontFamily: "Poppins-Bold",
    textAlign: "left",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    color: "#4B7F3A",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 20,
  },
  text: {
    color: "#000",
    fontFamily: "Poppins-Regular",
    fontSize: 25,
    marginBottom: 5,
    textAlign: "left",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 15,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  inputFake: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    flex: 1,
    color: "#666",
  },
  searchImg: {
    width: 20,
    height: 20,
  },
  recipeCard: {
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: 150,
    height: 150
  },
  recipeImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  recipeTitle: {
    marginTop: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#4B7F3A",
    textAlign: "center",
  },
  details:{
    fontFamily: "Poppins-SemiBold",
    marginTop: 10,
  },
});
