import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMeals, fetchRandomMeal, fetchMealCategories } from '../../store/mealsSlice';
import MealCard from '../../components/MealCard';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import RandomMealModal from '../../components/RandomMealModal';

const MealsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { items, status, error, categories } = useSelector(state => state.meals);
    const [search, setSearch] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [mealCategories, setMealCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [randomMeal, setRandomMeal] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loadingRandom, setLoadingRandom] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMeals());
            dispatch(fetchMealCategories());
        }
    }, [status, dispatch]);

    useEffect(() => {
        // Определяем категории, которые имеют хотя бы одно блюдо
        const categoriesWithMeals = categories.filter(category =>
            items.some(meal => meal.strCategory === category.strCategory)
        );
        setMealCategories(categoriesWithMeals);
    }, [categories, items]);

    useEffect(() => {
        let filtered = items;
        if (search.trim() !== '') {
            filtered = filtered.filter(meal =>
                meal.strMeal.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (selectedCategory !== '') {
            filtered = filtered.filter(meal => meal.strCategory === selectedCategory);
        }
        setFilteredMeals(filtered);
    }, [search, selectedCategory, items]);

    const handleRandomMeal = async () => {
        try {
            setLoadingRandom(true);
            const action = await dispatch(fetchRandomMeal());
            if (fetchRandomMeal.fulfilled.match(action)) {
                setRandomMeal(action.payload);
                setIsModalVisible(true);
            } else {
                console.error('Failed to fetch random meal');
            }
        } catch (error) {
            console.error('Error fetching random meal:', error);
        } finally {
            setLoadingRandom(false);
        }
    };

    const handleAddToFavorites = () => {
        if (randomMeal) {
            dispatch({ type: 'favorites/addMealToFavorites', payload: randomMeal });
            setIsModalVisible(false);
        }
    };

    const handleDetail = () => {
        if (randomMeal) {
            navigation.navigate('MealDetails', { mealId: randomMeal.idMeal });
            setIsModalVisible(false);
        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    if (status === 'loading' || status === 'loadingCategories') {
        return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
    }

    if (status === 'failed') {
        return (
            <View style={styles.center}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search Meals..."
                style={styles.search}
                value={search}
                onChangeText={setSearch}
            />
            <Picker
                selectedValue={selectedCategory}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
                <Picker.Item label="All Categories" value="" />
                {mealCategories.map(category => (
                    <Picker.Item key={category.strCategory} label={category.strCategory} value={category.strCategory} />
                ))}
            </Picker>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.randomButton} onPress={handleRandomMeal} disabled={loadingRandom}>
                    <Text style={styles.randomButtonText}>{loadingRandom ? 'Loading...' : 'Random Meal'}</Text>
                </TouchableOpacity>
            </View>
            {filteredMeals.length === 0 ? (
                <View style={styles.center}>
                    <Text>No meals found.</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredMeals}
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
            <RandomMealModal
                visible={isModalVisible}
                meal={randomMeal}
                onAdd={handleAddToFavorites}
                onDetail={handleDetail}
                onClose={handleCloseModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    search: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 10,
    },
    buttonContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    randomButton: {
        backgroundColor: '#e91e63',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    randomButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default MealsScreen;