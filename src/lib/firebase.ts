import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDH3dAOk7dW5GVTwytIadMBMixORFQgIyQ",
  authDomain: "vajrakaya-celebrations-addbc.firebaseapp.com",
  projectId: "vajrakaya-celebrations-addbc",
  storageBucket: "vajrakaya-celebrations-addbc.firebasestorage.app",
  messagingSenderId: "332382734014",
  appId: "1:332382734014:web:e10afe95a0d115c3cc00ef",
  measurementId: "G-7X7XZ10JHK"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
