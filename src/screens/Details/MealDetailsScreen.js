import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addMealToFavorites, removeMealFromFavorites } from '../../store/favoritesSlice';

const MealDetailsScreen = ({ route }) => {
    const { mealId } = route.params;
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.meals);
    const isFavorite = favorites.some(item => item.idMeal === mealId);

    useEffect(() => {
        const fetchMealDetails = async () => {
            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
                setMeal(response.data.meals[0]);
            } catch (error) {
                console.error('Error fetching meal details:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMealDetails();
    }, [mealId]);

    if (loading) {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    if (!meal) {
        return (
            <View style={styles.center}>
                <Text>Meal not found.</Text>
            </View>
        );
    }

    const handleFavorite = () => {
        if (isFavorite) {
            dispatch(removeMealFromFavorites(mealId));
        } else {
            dispatch(addMealToFavorites(meal));
        }
    };

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Text style={styles.category}>{meal.strCategory}</Text>
            <Text style={styles.sectionHeader}>Ingredients:</Text>
            {ingredients.map((item, index) => (
                <Text key={index} style={styles.ingredient}>
                    • {item}
                </Text>
            ))}
            <Text style={styles.sectionHeader}>Instructions:</Text>
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
            {meal.strYoutube ? (
                <Button
                    title="Watch on YouTube"
                    onPress={() => Linking.openURL(meal.strYoutube)}
                    color="#e91e63"
                />
            ) : null}
            <View style={styles.buttonContainer}>
                <Button
                    title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    onPress={handleFavorite}
                    color={isFavorite ? 'red' : 'green'}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 15 },
    image: { width: '100%', height: 250, borderRadius: 15 },
    title: { fontSize: 24, fontWeight: 'bold', marginVertical: 10, color: '#333' },
    category: { fontSize: 18, color: '#777', marginBottom: 10 },
    sectionHeader: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 5, color: '#333' },
    ingredient: { fontSize: 16, marginLeft: 10, marginBottom: 2, color: '#555' },
    instructions: { fontSize: 16, marginTop: 5, color: '#555' },
    buttonContainer: { marginTop: 20 },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MealDetailsScreen;