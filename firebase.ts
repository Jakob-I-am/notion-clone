import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'notion-clone-303e4.firebaseapp.com',
  projectId: 'notion-clone-303e4',
  storageBucket: 'notion-clone-303e4.firebasestorage.app',
  messagingSenderId: '32853686195',
  appId: '1:32853686195:web:2984294a6c152a8752bdc6',
};

const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
