import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform, FlatList, Text, Image, TouchableOpacity } from "react-native";

const API_KEY = "2ba30ad7d7504bdaa523d84823eab915";

export default function Search() {
    const inputRef = useRef(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            inputRef.current?.focus();
        }, 300);
        return () => clearTimeout(timeout);
    }, []);

    const handleSearch = async () => {
        if (!query.trim()) return;

        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
            );
            const data = await response.json();
            setResults(data.results || []);
        } catch (error) {
            console.error("Erro na busca:", error);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View style={styles.topBar}>
                <Link href="/home" asChild>
                    <TouchableOpacity style={styles.backButton}>
                        <Text style={styles.backText}>← Back</Text>
                    </TouchableOpacity>
                </Link>
                <TextInput
                    ref={inputRef}
                    placeholder="Search for recipe"
                    value={query}
                    onChangeText={setQuery}
                    onSubmitEditing={handleSearch}
                    style={styles.input}
                    returnKeyType="search"
                />
            </View>

            <FlatList
                data={results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.recipeCard}>
                        <Image source={{ uri: item.image }} style={styles.recipeImage} />
                        <Text style={styles.recipeTitle}>{item.title}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    query.length > 0 ? (
                        <Text style={styles.noResults}>No results found.</Text>
                    ) : null
                }
            />

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 30,
    },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: "#4B7F3A",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 50,
        marginRight: 10,
    },
    backText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Poppins-Bold",
    },
    input: {
        flex: 1,
        backgroundColor: "#eee",
        borderRadius: 15,
        paddingHorizontal: 15,
        height: 50,
        fontFamily: "Poppins-Regular",
    },
    recipeCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
    },
    recipeImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    recipeTitle: {
        fontSize: 16,
        fontWeight: "500",
        flexShrink: 1,
    },
    noResults: {
        textAlign: "center",
        color: "#888",
        fontSize: 16,
        marginTop: 20,
    },
});
