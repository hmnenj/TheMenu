import { useLocalSearchParams, Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";

const API_KEY = "ae87762fc0ca4585809a2d2c12251b72";

export default function Details() {
    const { id } = useLocalSearchParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchRecipeDetails = async () => {
            try {
                const res = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                );
                const data = await res.json();
                setRecipe(data);
            } catch (err) {
                setError("Erro loading recipe details");
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeDetails();
    }, [id]);

    if (loading)
        return <ActivityIndicator size="large" color="#4B7F3A" style={{ marginTop: 50 }} />;
    if (error !== "") return <Text style={styles.error}>{error}</Text>;

    return (
        <ScrollView style={styles.container}>
            <Link href="/search" asChild>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
            </Link>

            <Image source={{ uri: recipe.image }} style={styles.image} />
            <Text style={styles.title}>{recipe.title}</Text>

            <Text style={styles.title}>
                Ingredients:
            </Text>

            {recipe.extendedIngredients?.map((ingredient, index) => (
                <Text key={index} style={styles.summary}>
                    • {ingredient.original}
                </Text>
            ))}

            {recipe.analyzedInstructions?.length > 0 && (
                <>
                    <Text style={styles.title}>
                        Instructions:
                    </Text>
                    {recipe.analyzedInstructions[0].steps.map((step, index) => (
                        <Text key={index} style={styles.summary}>
                            {index + 1}. {step.step}
                        </Text>
                    ))}
                </>
            )}
            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    backButton: {
        backgroundColor: "#4B7F3A",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 50,
        marginBottom: 20,
        alignSelf: "flex-start",
    },
    backText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "Poppins-Bold",
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10,
        color: "#4B7F3A",
        fontFamily: "Poppins-Bold",
    },
    summary: {
        fontSize: 16,
        color: "#444",
        fontFamily: "Poppins-Regular",
        marginBottom: 6,
    },
    error: {
        marginTop: 50,
        textAlign: "center",
        fontSize: 16,
        color: "#4B7F3A",
    },
});
