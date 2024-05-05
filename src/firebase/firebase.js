import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtqfbG9IzpUWwPb3ndaQdrrn_rNt3SOHA",
  authDomain: "integ-58a44.firebaseapp.com",
  projectId: "integ-58a44",
  storageBucket: "integ-58a44.appspot.com",
  messagingSenderId: "910844906996",
  appId: "1:910844906996:web:4cd17a5f61af553d87bda1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export {app, auth };