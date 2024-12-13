import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  const { name, latitude, longitude, description } = useLocalSearchParams();
  const router = useRouter();

  const [region, setRegion] = useState({
    latitude: parseFloat(latitude as string) || 40.7128,
    longitude: parseFloat(longitude as string) || -74.0060,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitude as string),
            longitude: parseFloat(longitude as string),
          }}
          title={name as string}
          description={description as string}
          pinColor="#4c669f"
        />
      </MapView>

      <View style={styles.info}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4c669f',
    fontFamily: 'outfit-bold',
  },
  map: {
    width: width,
    height: height * 0.75,
  },
  info: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 24,
    color: '#4c669f',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default MapScreen;
