import 'tailwindcss/tailwind.css'
import '../css/extend.css'
import { getAuth, signInAnonymously } from "firebase/auth";
import { get, getDatabase, ref, child, set } from '@firebase/database';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './/..//helpers/firebase'
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
var moment = require('moment-timezone');




async function signIn() {
  
  const db = getDatabase();
  const auth = getAuth();
  const user = (await signInAnonymously(auth)).user
  const curUserRecord = await get(child(ref(db), `users/${user.uid}`))
  if (curUserRecord.exists()) {
  } else {
    set(ref(db, `users/${user.uid}`), {
      screenName: uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: ' ' }),
      tz:moment.tz.guess()
    })
  }
}

function MyApp({ Component, pageProps }) {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getDatabase();
  const auth = getAuth();
  if (!auth) {
    signIn()
  }
  signIn()
  return <Component {...pageProps} />
}

export default MyApp
