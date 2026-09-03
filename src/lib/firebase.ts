import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyAeKse923EfPYKSoHPaRPQfg-DEke9o58c",
  authDomain: "start-the-elevate.firebaseapp.com",
  projectId: "start-the-elevate",
  storageBucket: "start-the-elevate.firebasestorage.app",
  messagingSenderId: "1028879174983",
  appId: "1:1028879174983:web:6e63a7d59c19058a76d062",
  measurementId: "G-E3DBR632FE"
};

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore on default database
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
