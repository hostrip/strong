import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  // TODO: Replace with your Firebase config
  apiKey: "AIzaSyAxrzp1dt4EgTHTkNbgho1rCo9gvfycWHk",
  authDomain: "workoutwind.firebaseapp.com",
  projectId: "workoutwind",
  storageBucket: "workoutwind.firebasestorage.app",
  messagingSenderId: "378949936378",
  appId: "1:378949936378:web:1f2383f9ade267f25d5543",
  measurementId: "G-VC6T141DK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
