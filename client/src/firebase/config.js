import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

// Default Firebase Configuration
// Users can provide these in .env or via the in-app configuration panel
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKokanNirvanaKey123456789",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kokan-nirvana-dapoli.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kokan-nirvana-dapoli",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kokan-nirvana-dapoli.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "109876543210",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:109876543210:web:abcdef1234567890"
};

let app;
let db;
let isFirebaseInitialized = false;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  db = getFirestore(app);
  isFirebaseInitialized = true;
} catch (error) {
  console.warn("Firebase initialization warning (using local fallback sync):", error.message);
}

export { app, db, isFirebaseInitialized, firebaseConfig };
