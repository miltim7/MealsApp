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
            .addCase(fetchRandomMeal.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            });
    },
});

export default mealsSlice.reducer;