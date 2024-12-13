// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBLnh95ImlQ7FNkRIjFX0c12mW-FI6ZlZc",
    authDomain: "travelguidemap-15c4f.firebaseapp.com",
    projectId: "travelguidemap-15c4f",
    storageBucket: "travelguidemap-15c4f.firebasestorage.app",
    messagingSenderId: "409708106962",
    appId: "1:409708106962:web:34acad2e6e7ddaa95b090b",
    measurementId: "G-52TK2LCD7J"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
