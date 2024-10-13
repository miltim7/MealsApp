import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import MealCard from '../../components/MealCard';

const FavoritesScreen = ({ navigation }) => {
    const { meals } = useSelector(state => state.favorites);

    const renderItem = ({ item }) => (
        <MealCard
            meal={item}
            onPress={() => navigation.navigate('MealDetails', { mealId: item.idMeal })}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Favorite Meals</Text>
            {meals.length === 0 ? (
                <Text style={styles.empty}>No favorite meals.</Text>
            ) : (
                <FlatList
                    data={meals}
                    keyExtractor={item => item.idMeal}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const { width } = Dimensions.get('window');
const CARD_MARGIN = 10;
const CARD_WIDTH = width - CARD_MARGIN * 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: CARD_MARGIN,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    empty: {
        fontSize: 18,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
});

export default FavoritesScreen;