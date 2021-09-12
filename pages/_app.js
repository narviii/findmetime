import 'tailwindcss/tailwind.css'
import '../css/extend.css'
import { getAuth, signInAnonymously } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {firebaseConfig} from  './/..//helpers/firebase'

function MyApp({ Component, pageProps }) {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  return <Component {...pageProps} />
}

export default MyApp
