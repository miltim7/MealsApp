import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    meals: [],
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addMealToFavorites: (state, action) => {
            const exists = state.meals.find(meal => meal.idMeal === action.payload.idMeal);
            if (!exists) {
                state.meals.push(action.payload);
                saveFavorites(state);
            }
        },
        removeMealFromFavorites: (state, action) => {
            state.meals = state.meals.filter(meal => meal.idMeal !== action.payload);
            saveFavorites(state);
        },
        setFavorites: (state, action) => {
            state.meals = action.payload.meals || [];
        },
    },
});

const saveFavorites = async (state) => {
    try {
        await AsyncStorage.setItem('favorites', JSON.stringify(state));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
};

export const {
    addMealToFavorites,
    removeMealFromFavorites,
    setFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;