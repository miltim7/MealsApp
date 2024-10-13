import axios from 'axios';

const API_BASE_MEALS = 'https://www.themealdb.com/api/json/v1/1/';

export const searchMeals = async (query) => {
    const response = await axios.get(`${API_BASE_MEALS}search.php?s=${query}`);
    return response.data.meals;
};

export const getMealById = async (id) => {
    const response = await axios.get(`${API_BASE_MEALS}lookup.php?i=${id}`);
    return response.data.meals[0];
};

export const getRandomMeal = async () => {
    const response = await axios.get(`${API_BASE_MEALS}random.php`);
    return response.data.meals[0];
};

export const getMealCategories = async () => {
    const response = await axios.get(`${API_BASE_MEALS}list.php?c=list`);
    return response.data.meals;
};
