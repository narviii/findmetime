// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwJ9GqBZXxeCJFqpCqA5I9joVFZDv7Mlk",
  authDomain: "schbiggle.firebaseapp.com",
  projectId: "schbiggle",
  storageBucket: "schbiggle.appspot.com",
  messagingSenderId: "155557142215",
  appId: "1:155557142215:web:801c3217e0dbe0f44ae8e2",
  measurementId: "G-333BYZKCY2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);
export const db = getFirestore();
//export const auth = getAuth();



