import { configureStore } from '@reduxjs/toolkit';
import mealsReducer from './mealsSlice';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
    reducer: {
        meals: mealsReducer,
        favorites: favoritesReducer,
    },
});

export default store;