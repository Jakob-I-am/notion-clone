// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFSwg1PAVQEmcXoW_TTVbc_aNvysH5XRM',
  authDomain: 'notion-clone-303e4.firebaseapp.com',
  projectId: 'notion-clone-303e4',
  storageBucket: 'notion-clone-303e4.firebasestorage.app',
  messagingSenderId: '32853686195',
  appId: '1:32853686195:web:2984294a6c152a8752bdc6',
};

// Initialize Firebase
const app = getApps.length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
