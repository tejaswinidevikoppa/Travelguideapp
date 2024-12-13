import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const nycPlaces = [
  { 
    name: 'Central Park', 
    description: 'Famous urban park in NYC', 
    icon: 'leaf',
    latitude: 40.785091, 
    longitude: -73.968285
  },
  { 
    name: 'Statue of Liberty', 
    description: 'Iconic symbol of freedom', 
    icon: 'flag',
    latitude: 40.689247, 
    longitude: -74.044502
  },
  { 
    name: 'Metropolitan Museum of Art', 
    description: 'Renowned art museum', 
    icon: 'color-palette',
    latitude: 40.779437, 
    longitude: -73.963244
  },
  { 
    name: 'Brooklyn Bridge', 
    description: 'Iconic suspension bridge in NYC', 
    icon: 'location',
    latitude: 40.7061, 
    longitude: -73.9969
  },
  { 
    name: 'Pace University', 
    description: 'Famous university in NYC', 
    icon: 'business',
    latitude: 40.7113, 
    longitude: -74.0052
  },
  { 
    name: 'Empire State Building', 
    description: 'Landmark skyscraper', 
    icon: 'cube',
    latitude: 40.748817, 
    longitude: -73.985428
  },
  { 
    name: 'Times Square', 
    description: 'Famous commercial and entertainment hub', 
    icon: 'bulb',
    latitude: 40.7580, 
    longitude: -73.9855
  },
  { 
    name: 'One World Trade Center', 
    description: 'Skyscraper and memorial', 
    icon: 'globe',
    latitude: 40.712742, 
    longitude: -74.013382
  },
  { 
    name: 'The High Line', 
    description: 'Elevated linear park', 
    icon: 'walk',
    latitude: 40.7480, 
    longitude: -74.0048
  },
  { 
    name: 'Rockefeller Center', 
    description: 'Famous complex with seasonal events', 
    icon: 'snow',
    latitude: 40.7587, 
    longitude: -73.9787
  },
  { 
    name: 'The Edge', 
    description: 'A thrilling outdoor observation deck', 
    icon: 'trail-sign',
    latitude: 40.754260, 
    longitude: -74.000654
  },
  { 
    name: 'Summit One Vanderbilt', 
    description: 'Multi-sensory observation deck experience', 
    icon: 'cloudy',
    latitude: 40.7547, 
    longitude: -73.9780
  },
  { 
    name: 'Madame Tussauds', 
    description: 'Famous wax museum', 
    icon: 'person',
    latitude: 40.7564, 
    longitude: -73.9885
  },
  { 
    name: 'Broadway', 
    description: 'World-renowned theater district', 
    icon: 'film',
    latitude: 40.7590, 
    longitude: -73.9845
  },
  { 
    name: 'American Museum of Natural History', 
    description: 'Celebrated museum with exhibits on the natural world', 
    icon: 'planet',
    latitude: 40.7812, 
    longitude: -73.9735
  },
  { 
    name: 'Bryant Park', 
    description: 'Beautiful park with seasonal activities', 
    icon: 'park',
    latitude: 40.753596, 
    longitude: -73.983233
  },
  { 
    name: 'Chelsea Market', 
    description: 'Popular indoor food market and shopping mall', 
    icon: 'basket',
    latitude: 40.742439, 
    longitude: -74.006177
  },
  { 
    name: 'Grand Central Terminal', 
    description: 'Iconic transportation hub with a historic design', 
    icon: 'train',
    latitude: 40.752726, 
    longitude: -73.977229
  },
  { 
    name: 'Intrepid Sea, Air & Space Museum', 
    description: 'Museum on an aircraft carrier with historic exhibits', 
    icon: 'airplane',
    latitude: 40.764526, 
    longitude: -73.999607
  },
  { 
    name: 'The Vessel', 
    description: 'Unique structure at Hudson Yards', 
    icon: 'cube-outline',
    latitude: 40.7546, 
    longitude: -74.0027
  },
];

const Explore: React.FC = () => {
  const router = useRouter();
  const [myTrips, setMyTrips] = useState<any[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const savedTrips = await AsyncStorage.getItem('myTrips');
        if (savedTrips) {
          setMyTrips(JSON.parse(savedTrips));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrips();
  }, []);

  const addToMyTrips = async (location: any) => {
    const isAlreadyAdded = myTrips.some((trip) => trip.name === location.name);

    if (isAlreadyAdded) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Already added to your trip!',
        visibilityTime: 2000,
        autoHide: true,
      });
    } else {
      const updatedTrips = [...myTrips, location];
      setMyTrips(updatedTrips);
      try {
        await AsyncStorage.setItem('myTrips', JSON.stringify(updatedTrips));
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: 'Added successfully!',
          visibilityTime: 2000,
          autoHide: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#4c669f" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Explore NYC Destinations</Text>
      </View>

      <FlatList
        data={nycPlaces}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => addToMyTrips(item)}
          >
            <Ionicons name={item.icon} size={30} color="#4c669f" />
            <View style={styles.textContainer}>
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  backText: {
    fontSize: 16,
    color: '#4c669f',
    marginLeft: 5,
  },
  title: {
    fontSize: 22,
    color: '#4c669f',
    textAlign: 'center',
    flex: 1,
  },
  card: {
    backgroundColor: 'rgba(76, 102, 159, 0.1)',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default Explore;
