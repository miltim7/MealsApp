import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMeals = createAsyncThunk('meals/fetchMeals', async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    return response.data.meals;
});

export const fetchRandomMeal = createAsyncThunk('meals/fetchRandomMeal', async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    return response.data.meals[0];
});

export const fetchMealCategories = createAsyncThunk('meals/fetchMealCategories', async () => {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    return response.data.meals;
});

const mealsSlice = createSlice({
    name: 'meals',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        categories: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMeals.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMeals.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchMeals.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchRandomMeal.pending, (state) => {
                state.status = 'loadingRandom';
            })
            .addCase(fetchRandomMeal.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(fetchRandomMeal.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchMealCategories.pending, (state) => {
                state.status = 'loadingCategories';
            })
            .addCase(fetchMealCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchMealCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default mealsSlice.reducer;