import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store';
import Navigation from './src/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFavorites } from './src/store/favoritesSlice';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favorites = await AsyncStorage.getItem('favorites');
        if (favorites !== null) {
          dispatch(setFavorites(JSON.parse(favorites)));
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    loadFavorites();
  }, [dispatch]);

  return <Navigation />;
};

export default AppWrapper;