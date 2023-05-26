// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ1oTmA1OAjvcIHwTPGgGyneGkahqwTSE",
  authDomain: "eventglee-a8d98.firebaseapp.com",
  projectId: "eventglee-a8d98",
  storageBucket: "eventglee-a8d98.appspot.com",
  messagingSenderId: "844759637685",
  appId: "1:844759637685:web:f661b73e2f3182975da8fc",
  measurementId: "G-9THXTDJHMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);