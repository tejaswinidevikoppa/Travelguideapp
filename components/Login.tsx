import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const Login: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image 
        source={require('./../assets/images/wl.jpeg')}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Discover your next adventure effortlessly. 
        </Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push('auth/sign-in')}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 500,
  },
  contentContainer: {
    backgroundColor: '#fff',
    marginTop: -20,
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontFamily: 'outfit-bold',
  },
  description: {
    fontFamily: 'outfit',
    fontSize: width * 0.04,
    textAlign: 'center',
    color: '#808080',
    marginTop: 15,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: "#ff6347",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: width * 0.045,
  },
});

export default Login;
