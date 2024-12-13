import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyTrip: React.FC = () => {
  const router = useRouter();
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const savedTrips = await AsyncStorage.getItem('myTrips');
        if (savedTrips) {
          setLocations(JSON.parse(savedTrips));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrips();
  }, []);

  const navigateToLocationMap = (location: any) => {
    router.push({
      pathname: '/map',
      params: {
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
        description: location.description,
      },
    });
  };

  const goBack = () => {
    router.back();
  };

  const clearTrips = async () => {
    Alert.alert(
      "Clear All Trips",
      "Are you sure you want to clear all saved trips?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('myTrips');
              setLocations([]); // Update state to reflect the cleared list
            } catch (error) {
              console.log(error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const deleteTrip = async (tripName: string) => {
    Alert.alert(
      "Delete Trip",
      `Are you sure you want to delete "${tripName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedLocations = locations.filter((location) => location.name !== tripName);
            setLocations(updatedLocations);
            try {
              await AsyncStorage.setItem('myTrips', JSON.stringify(updatedLocations));
            } catch (error) {
              console.log(error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderTripItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToLocationMap(item)}
      onLongPress={() => deleteTrip(item.name)} // Long press to delete with confirmation
    >
      <View style={styles.tripInfo}>
        <Ionicons name={item.icon} size={30} color="#4c669f" />
        <View style={styles.textContainer}>
          <Text style={styles.locationName}>{item.name}</Text>
          <Text style={styles.locationDescription}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#4c669f" />
        </TouchableOpacity>
        <Text style={styles.title}>My Trips</Text>
        {locations.length > 0 && (
          <TouchableOpacity onPress={clearTrips} style={styles.clearButton}>
            <Ionicons name="trash" size={24} color="#4c669f" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.body}>
        {locations.length === 0 ? (
          <Text style={styles.noTripsText}>No trips added yet!</Text>
        ) : (
          <FlatList
            data={locations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderTripItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    paddingRight: 15,
  },
  clearButton: {
    paddingLeft: 15,
  },
  title: {
    fontSize: 24,
    color: '#4c669f',
    textAlign: 'center',
    flex: 1,
  },
  body: {
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(76, 102, 159, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tripInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    color: '#4c669f',
  },
  locationDescription: {
    fontSize: 14,
    color: '#777',
  },
  noTripsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#4c669f',
  },
});

export default MyTrip;
