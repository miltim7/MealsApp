import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addMealToFavorites, removeMealFromFavorites } from '../store/favoritesSlice';

const MealCard = ({ meal, onPress }) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites.meals);
    const isFavorite = favorites.some(item => item.idMeal === meal.idMeal);

    const handleFavoritePress = () => {
        if (isFavorite) {
            dispatch(removeMealFromFavorites(meal.idMeal));
        } else {
            dispatch(addMealToFavorites(meal));
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            <View style={styles.info}>
                <Text style={styles.title}>{meal.strMeal}</Text>
                <Text style={styles.category}>{meal.strCategory}</Text>
            </View>
            <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavoritePress}>
                <Ionicons name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'red' : 'gray'} />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 200,
        marginRight: 15,
        borderRadius: 15,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        position: 'relative',
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 150,
    },
    info: {
        padding: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    category: {
        fontSize: 14,
        color: '#777',
        marginTop: 5,
    },
    favoriteIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default MealCard;