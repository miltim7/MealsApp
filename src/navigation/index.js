import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MealsScreen from '../screens/Home/MealsScreen';
import MealDetailsScreen from '../screens/Details/MealDetailsScreen';
import FavoritesScreen from '../screens/Favorites/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Meals') {
                    iconName = focused ? 'restaurant' : 'restaurant-outline';
                } else if (route.name === 'Favorites') {
                    iconName = focused ? 'heart' : 'heart-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarActiveTintColor: '#e91e63',
            tabBarInactiveTintColor: 'gray',
        })}
    >
        <Tab.Screen name="Meals" component={MealsScreen} />
        <Tab.Screen
            name="Favorites"
            component={FavoritesScreen}
            options={{
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />
                ),
            }}
        />
    </Tab.Navigator>
);

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="MealDetails" component={MealDetailsScreen} options={{ title: 'Meal Details' }} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;