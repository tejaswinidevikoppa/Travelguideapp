import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  ToastAndroid 
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../configs/firebaseConfig'; // Correct relative path

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  // Function to handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      ToastAndroid.show("Please enter your email to reset password", ToastAndroid.LONG);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      ToastAndroid.show("Password reset email sent!", ToastAndroid.LONG);
    } catch (error: any) {
      console.error(error);
      ToastAndroid.show("Error sending reset email", ToastAndroid.LONG);
    }
  };

  // Function to handle sign-in
  const onSignIn = async () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter Email and Password", ToastAndroid.LONG);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      router.replace('/home'); 
      console.log("Signed in:", user);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Sign-in error:", errorCode, errorMessage);

      // Handle specific Firebase Auth errors
      if (errorCode === 'auth/invalid-email') {
        ToastAndroid.show("Invalid email format", ToastAndroid.LONG);
      } else if (errorCode === 'auth/user-not-found') {
        ToastAndroid.show("User not found, please sign up", ToastAndroid.LONG);
      } else if (errorCode === 'auth/wrong-password') {
        ToastAndroid.show("Incorrect password", ToastAndroid.LONG);
      } else {
        ToastAndroid.show("Authentication failed", ToastAndroid.LONG);
      }
    }
  };

  return (
    <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.container}>
      <SafeAreaView style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={30} color="white" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#a0a0a0"
              onChangeText={(val) => setEmail(val)}
              value={email}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#a0a0a0"
              onChangeText={(val) => setPassword(val)}
              value={password}
            />
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => router.replace('auth/sign-up')}
          >
            <Text style={styles.createAccountButtonText}>Create Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={handlePasswordReset}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 25,
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 25,
  },
  headerContainer: {
    marginBottom: 40,
  },
  headerText: {
    fontFamily: 'outfit-bold',
    fontSize: 32,
    color: 'white',
    marginBottom: 10,
  },
  subHeaderText: {
    fontFamily: 'outfit',
    color: '#e0e0e0',
    fontSize: 18,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'outfit',
    color: 'white',
    marginBottom: 5,
  },
  input: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    fontFamily: 'outfit',
    color: 'white',
  },
  signInButton: {
    backgroundColor: '#ff6347',
    borderRadius: 25,
    padding: 15,
    marginTop: 20,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'outfit-bold',
    fontSize: 16,
  },
  createAccountButton: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    marginTop: 15,
  },
  createAccountButtonText: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 16,
  },
  forgotPasswordButton: {
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#a0a0a0',
    textAlign: 'center',
    fontFamily: 'outfit',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default SignIn;
