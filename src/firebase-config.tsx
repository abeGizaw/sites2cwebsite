// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfcAPEXDtDcwosX-ooBXylf_JlKnudGVY",
  authDomain: "gsmartinez-abegizaw-starter.firebaseapp.com",
  databaseURL:
    "https://gsmartinez-abegizaw-starter-default-rtdb.firebaseio.com",
  projectId: "gsmartinez-abegizaw-starter",
  storageBucket: "gsmartinez-abegizaw-starter.appspot.com",
  messagingSenderId: "582052325575",
  appId: "1:582052325575:web:f6d0c4dfc6b89eddd9f6e2",
  measurementId: "G-NMLNLGV14B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Initialize Google Auth
export const provider = new GoogleAuthProvider();
