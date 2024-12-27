// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4FjuFaCoJD3ogJJnLaFNxbIDnGsZ7fyY",
  authDomain: "mangaseeking-website.firebaseapp.com",
  projectId: "mangaseeking-website",
  storageBucket: "mangaseeking-website.firebasestorage.app",
  messagingSenderId: "205994896305",
  appId: "1:205994896305:web:878af188523172e011eb90",
  measurementId: "G-84ZJWC4FYZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export default app;
