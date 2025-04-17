import { View, StyleSheet, Text, TouchableOpacity, ImageBackground, Image } from "react-native"
import { Link } from "expo-router"
import { useState } from "react"
import * as Font from "expo-font"
import AppLoading from "expo-app-loading"

const loadFonts = () => {
    return Font.loadAsync({
        "Poppins-Regular": require("../../assets/fonts/Poppins-Regular.ttf"),
        "Poppins-Bold": require("../../assets/fonts/Poppins-Bold.ttf"),
    })
}


export default function Index() {
    const [fontsLoaded, setFontsLoaded] = useState(false)

    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={loadFonts}
                onFinish={() => setFontsLoaded(true)}
                onError={console.warn}
            />
        )
    }

    return (
        <ImageBackground
            source={require('../../assets/images/background.jpg')}
            style={styles.container}
            resizeMode="cover"
        >
            <Image
                source={require('../../assets/images/queen-of-sauce.png')}
                resizeMode="contain" 
            />
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to the Queen of Sauce App</Text>
                <Text style={styles.text}>
                    Hello, my dear culinary apprentice!{"\n"}
                    It is an honor to have you here, in my newest digital kingdom — the official Queen of Sauce app!{"\n"}
                    If you’ve seen me on Sunday mornings on Stardew Valley’s rural TV, then you know this isn’t just any recipe book… it’s a culinary treasure trove!{"\n"}
                    Inside this app, you’ll find all the recipes featured on my show!
                </Text>
                <Link href="/home" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.label}>Explore</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: "rgba(74, 224, 255 ,0.7)",
        borderRadius: 20,
    },
    title: {
        fontSize: 32,
        color: "#ad0050",
        fontFamily: "Poppins-Bold",
        textAlign: "center",
    },
    text: {
        fontSize: 17,
        fontFamily: "Poppins-Regular",
        textAlign: "center",
        padding: 10,
        color: "#ad0050"
    },
    label: {
        fontSize: 16,
        color: "#fff",
        fontFamily: "Poppins-Bold",
    },
    button: {
        backgroundColor: "#ad0050",
        paddingHorizontal: 32,
        paddingVertical: 10,
        borderRadius: 10,
    },
})
