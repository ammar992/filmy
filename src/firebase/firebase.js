// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1P-j3Z65mOYvT7Fg1OtfCo_l_mWa-PrA",
  authDomain: "fimywerse.firebaseapp.com",
  projectId: "fimywerse",
  storageBucket: "fimywerse.appspot.com",
  messagingSenderId: "952077136834",
  appId: "1:952077136834:web:5fff8d8bdeb1811f0c5c5b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db,"movies");
export const reviewsRef = collection(db,"reviews");
export const usersRef = collection(db,"users");


export default app;