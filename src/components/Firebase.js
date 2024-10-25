// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA-SwAJ7lzVTKpAn8xTWjJ4aTQ2B675UAk",
    authDomain: "otp-sms-5adc0.firebaseapp.com",
    projectId: "otp-sms-5adc0",
    storageBucket: "otp-sms-5adc0.appspot.com",
    messagingSenderId: "396761461743",
    appId: "1:396761461743:web:b3e24ad447ff0cb9f57c1a",
    measurementId: "G-6QQJ2V47HM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)