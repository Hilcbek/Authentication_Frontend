// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_AUTH,
  authDomain: "complete-auth-with-mern-stack.firebaseapp.com",
  projectId: "complete-auth-with-mern-stack",
  storageBucket: "complete-auth-with-mern-stack.appspot.com",
  messagingSenderId: "878393945389",
  appId: "1:878393945389:web:7c0565f49fafe17839b7a4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
