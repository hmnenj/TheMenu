import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, Image } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const loadFonts = () => {
    return Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    });
};

export default function Index() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

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
            source={require('../../assets/images/background.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <View style={styles.centerContent}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.title}>The Menu</Text>
                </View>

                <View style={styles.bottomContent}>
                    <Text style={styles.subtitle}>Choose a recipe{"\n"}Cook and savor</Text>
                    <Link href="/home" asChild>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.label}>Explore</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        paddingHorizontal: 24,
        paddingVertical: 40,
        justifyContent: "space-between",
    },
    centerContent: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    bottomContent: {
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
    title: {
        fontSize: 28,
        color: "#fff",
        fontFamily: "Poppins-Bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "Poppins-Regular",
        textAlign: "center",
        padding: 20,
    },
    label: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "Poppins-Bold",
    },
    button: {
        backgroundColor: "#4B7F3A",
        paddingHorizontal: 100,
        paddingVertical: 12,
        borderRadius: 50,
    },
});
