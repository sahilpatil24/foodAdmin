// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your Firebase configuration (find this in your Firebase project settings)
const firebaseConfig = {
  apiKey: "AIzaSyB88QihVgdkMdptXWYduRFulXOoznzkvio",
  authDomain: "foodwaste-f17ad.firebaseapp.com",
  projectId: "foodwaste-f17ad",
  storageBucket: "foodwaste-f17ad.firebasestorage.app",
  messagingSenderId: "379292993308",
  appId: "1:379292993308:web:b8228e94501da22cf09cd9",
  measurementId: "G-4F689S8G2S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // Initialize and export the Auth service

export { db, auth };
