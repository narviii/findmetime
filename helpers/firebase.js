// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database";
import { getAnalytics } from "firebase/analytics";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "findmetime-928be.firebaseapp.com",
  projectId: "findmetime-928be",
  storageBucket: "findmetime-928be.appspot.com",
  messagingSenderId: "198781720632",
  appId: "1:198781720632:web:ed280a03ba70d255c92ecd",
  measurementId: "G-9KGR8EZVRN",
  databaseURL: "https://findmetime-928be-default-rtdb.firebaseio.com/"
};

let analytics

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//analytics = getAnalytics(firebaseApp);
export const dbFireStore = getFirestore();




