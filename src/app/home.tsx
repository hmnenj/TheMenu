import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    ImageBackground
} from "react-native";
import { Link } from "expo-router";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const API_KEY = "2ba30ad7d7504bdaa523d84823eab915";

const loadFonts = () => {
    return Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    });
};

export default function Home() {
    const [query, setQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
            );
            const data = await response.json();
            setRecipes(data.results || []);
        } catch (error) {
            console.error("Erro ao buscar receitas:", error);
        }
    };

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
        <ImageBackground
            source={require("../../assets/images/background.jpg")}
            style={styles.container}
            resizeMode="cover"
        >
            <Text style={styles.title}>Queen of Sauce Recipes</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Search for a recipe"
                    value={query}
                    onChangeText={setQuery}
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.recipeTitle}>{item.title}</Text>
                        </View>
                    </View>
                )}
            />
            <Link href="/" asChild>
                <TouchableOpacity style={styles.backbutton}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </Link>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: "#fffaf0",
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#ad0050",
        fontFamily: "Poppins-Bold",
    },
    searchContainer: {
        flexDirection: "row",
        marginBottom: 20,
        gap: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
        fontFamily: "Poppins-Regular",
    },
    button: {
        backgroundColor: "#ad0050",
        paddingHorizontal: 16,
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontFamily: "Poppins-Bold",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(74, 224, 255 ,0.7)",
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
        elevation: 3,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    recipeTitle: {
        flex: 1,
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        color: "#ad0050",
    },
    backbutton: {
        backgroundColor: "#ad0050",
        alignContent: "center",
        alignItems:"center",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    },
});
