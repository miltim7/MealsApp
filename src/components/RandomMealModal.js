import React, { useEffect } from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RandomMealModal = ({ visible, meal, onAdd, onDetail, onClose }) => {

    // animation
    const fadeAnim = React.useRef(new Animated.Value(0)).current;
    const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 5,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            fadeAnim.setValue(0);
            scaleAnim.setValue(0.8);
        }
    }, [visible, fadeAnim, scaleAnim]);

    if (!meal) return null;

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const modalWidth = screenWidth * 0.85;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View style={[
                    styles.modalContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ scale: scaleAnim }],
                        width: modalWidth,
                        maxHeight: screenHeight * 0.8,
                    }
                ]}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
                        <Text style={styles.title}>{meal.strMeal}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={onAdd}>
                                <Ionicons name="heart" size={24} color="#e91e63" />
                                <Text style={styles.buttonText}>Add to Favorites</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onDetail}>
                                <Ionicons name="information-circle" size={24} color="#4CAF50" />
                                <Text style={styles.buttonText}>Detail</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onClose}>
                                <Ionicons name="close-circle" size={24} color="#555" />
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    scrollContainer: {
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 15,
        textAlign: 'center',
        color: '#333',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 10,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
    },
    buttonText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
});

export default RandomMealModal;