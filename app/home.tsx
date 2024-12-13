import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons
import { Easing } from 'react-native-reanimated'; // For custom easing animations

const Home: React.FC = () => {
  const router = useRouter();

  // Animations for the cards
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to the Travel Guide!</Text>
      </View>
      <View style={styles.body}>
        {/* My Trips Button */}
        <Animated.View
          style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
        >
          <TouchableOpacity
            style={styles.cardTouchable}
            onPressIn={handlePressIn}  // Press In Animation
            onPressOut={handlePressOut}  // Press Out Animation
            onPress={() => router.push('/mytrip')}  // Navigate to MyTrip screen
          >
            <Ionicons name="location" size={30} color="#4c669f" />
            <Text style={styles.cardText}>My Trips</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Explore Destinations Button */}
        <Animated.View
          style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
        >
          <TouchableOpacity
            style={styles.cardTouchable}
            onPressIn={handlePressIn}  // Press In Animation
            onPressOut={handlePressOut}  // Press Out Animation
            onPress={() => router.push('/explore')}  // Navigate to Explore Destinations screen
          >
            <Ionicons name="compass" size={30} color="#4c669f" />
            <Text style={styles.cardText}>Explore Destinations</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Profile Button */}
        <Animated.View
          style={[styles.card, { transform: [{ scale: scaleAnim }] }]}
        >
          <TouchableOpacity
            style={styles.cardTouchable}
            onPressIn={handlePressIn}  // Press In Animation
            onPressOut={handlePressOut}  // Press Out Animation
            onPress={() => router.push('/profile')}  // Navigate to Profile screen
          >
            <Ionicons name="person" size={30} color="#4c669f" />
            <Text style={styles.cardText}>Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',  // Light blue background to make it more refreshing
    padding: 20,
  },
  header: {
    marginBottom: 20,
    marginTop: 60, // Add margin-top to push the text down
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'outfit-bold',
    fontSize: 26,
    color: '#4c669f',
    textAlign: 'center',
    marginBottom: 10,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Align items to the center of the screen
  },
  card: {
    backgroundColor: 'rgba(76, 102, 159, 0.1)',
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Add shadow to give a lift effect
  },
  cardTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  cardText: {
    fontFamily: 'outfit',
    fontSize: 18,
    color: '#4c669f',
    marginLeft: 12,
    fontWeight: '600',
  },
});

export default Home;
