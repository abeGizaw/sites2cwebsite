import { initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectAuthEmulator, getAuth } from "firebase/auth";
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

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

connectDatabaseEmulator(database, "localhost", 9000);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectStorageEmulator(storage, "localhost", 9199); // Initialize Google Auth
