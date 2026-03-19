// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSG2yVy8ZgB1yo2CeYr2UY03uZzBkr-RI",
  authDomain: "netflixgpt-c0957.firebaseapp.com",
  projectId: "netflixgpt-c0957",
  storageBucket: "netflixgpt-c0957.firebasestorage.app",
  messagingSenderId: "966261226524",
  appId: "1:966261226524:web:a397ff447caa125227f3d9",
  measurementId: "G-81H6P6DMY8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export default app;