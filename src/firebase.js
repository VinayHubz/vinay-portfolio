import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyASuEF0osDF-NhIs8eALPhnbw1OO5fSeYc",
  authDomain: "portfolio-data-9ec8b.firebaseapp.com",
  projectId: "portfolio-data-9ec8b",
  storageBucket: "portfolio-data-9ec8b.firebasestorage.app",
  messagingSenderId: "251463526212",
  appId: "1:251463526212:web:21baa02e727fd931951911",
  measurementId: "G-VKFGDEQ40Y"
};

const app = initializeApp(firebaseConfig);

// export Firestore database
export const db = getFirestore(app);

