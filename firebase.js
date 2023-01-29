import { initializeApp } from "firebase/app";
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAhjzr4V-txnXjnGMGQErX5u3sTIy6oWFI",
    authDomain: "chat-app-71d9d.firebaseapp.com",
    projectId: "chat-app-71d9d",
    storageBucket: "chat-app-71d9d.appspot.com",
    messagingSenderId: "794577375777",
    appId: "1:794577375777:web:4e2984efb9c1def0e24960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig );


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);