// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: "pokemonfinalproj.firebaseapp.com",
    projectId: "pokemonfinalproj",
    storageBucket: "pokemonfinalproj.appspot.com",
    messagingSenderId: "887000795205",
    appId: "1:887000795205:web:08c90b196d317a52bf3b2c",
    measurementId: "G-Q6PT055BHB"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

export {firebase, db, auth, storage};
