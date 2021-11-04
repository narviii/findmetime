// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA5HXjlxihufsP9G8r7IgmYvkN8XqGyuNk",
  authDomain: "findmetime-928be.firebaseapp.com",
  projectId: "findmetime-928be",
  storageBucket: "findmetime-928be.appspot.com",
  messagingSenderId: "198781720632",
  appId: "1:198781720632:web:ed280a03ba70d255c92ecd",
  measurementId: "G-9KGR8EZVRN",
  databaseURL: "https://findmetime-928be-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);
export const dbFireStore = getFirestore();




