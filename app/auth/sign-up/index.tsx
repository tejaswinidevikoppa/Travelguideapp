import React, { useState } from 'react';
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, StatusBar, 
  Platform, ToastAndroid, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/firebaseConfig'; // Correct relative path

const SignUp: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.BOTTOM);
    } else {
      Alert.alert('Notification', message);
    }
  };

  const onCreateAccount = () => {
    if (!email || !password || !fullName) {
      showToast("Please enter all details");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.replace('/auth/sign-in');
      })
      .catch((error) => {
        let errorMessage = 'Something went wrong!';
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already in use.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password must be at least 6 characters.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          default:
            errorMessage = error.message;
        }
        showToast(errorMessage);
      });
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/auth/sign-in')}
        >
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>Create New Account</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Enter Full Name' 
              placeholderTextColor="#a0a0a0"
              onChangeText={(val) => setFullName(val)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Enter Email' 
              placeholderTextColor="#a0a0a0"
              keyboardType="email-address"
              onChangeText={(val) => setEmail(val)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput 
              secureTextEntry 
              style={styles.input} 
              placeholder='Enter Password' 
              placeholderTextColor="#a0a0a0"
              onChangeText={(val) => setPassword(val)}
            />
          </View>

          <TouchableOpacity 
            style={styles.createAccountButton} 
            onPress={onCreateAccount}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.signInButton} 
            onPress={() => router.replace('/auth/sign-in')}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 25,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50,
  },
  backButton: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 50,
    left: 25,
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    color: 'white',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'outfit',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    fontFamily: 'outfit',
    fontSize: 16,
    color: 'white',
  },
  createAccountButton: {
    padding: 16,
    backgroundColor: '#ff6347',
    borderRadius: 25,
    marginTop: 30,
    elevation: 5,
  },
  createAccountButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 18,
  },
  signInButton: {
    padding: 16,
    backgroundColor: 'transparent',
    borderRadius: 25,
    marginTop: 15,
    borderWidth: 1,
    borderColor: 'white',
  },
  signInButtonText: {
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 18,
    color: 'white',
  },
});

export default SignUp;
