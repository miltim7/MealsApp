import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import MealCard from '../../components/MealCard';

const FavoritesScreen = ({ navigation }) => {
    const { meals } = useSelector(state => state.favorites);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Favorite Meals</Text>
            {meals.length === 0 ? (
                <Text style={styles.empty}>No favorite meals.</Text>
            ) : (
                <FlatList
                    data={meals}
                    keyExtractor={item => item.idMeal}
                    renderItem={({ item }) => (
                        <MealCard
                            meal={item}
                            onPress={() => navigation.navigate('MealDetails', { mealId: item.idMeal })}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 10 },
    header: { fontSize: 20, fontWeight: 'bold', marginVertical: 10, color: '#333' },
    empty: { fontSize: 16, color: '#555', marginBottom: 10 },
});

export default FavoritesScreen;