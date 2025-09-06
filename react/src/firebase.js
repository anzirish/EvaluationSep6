import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDPvbhL9ctPkig3QrXMs9XgK8dTOAO-5hM",
  authDomain: "ssign-9dbea.firebaseapp.com",
  databaseURL: "https://ssign-9dbea-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ssign-9dbea",
  storageBucket: "ssign-9dbea.firebasestorage.app",
  messagingSenderId: "517799544318",
  appId: "1:517799544318:web:b547185f0571c419caacaf",
  databaseURL: "https://ssign-9dbea-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);