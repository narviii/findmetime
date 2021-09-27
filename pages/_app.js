import 'tailwindcss/tailwind.css'
import '../css/extend.css'
import { getAuth, signInAnonymously, updateProfile } from "firebase/auth";
import { get, getDatabase, ref, child, set } from '@firebase/database';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './/..//helpers/firebase'
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
import { useRouter } from 'next/router'




async function signIn() {
  const router = useRouter()

  const db = getDatabase();
  const auth = getAuth();

  try {
    const user = (await signInAnonymously(auth)).user
    if (user.displayName === null) {
      updateProfile(auth.currentUser, { displayName: uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: ' ' }) }).then(
        () => {
          update(ref(db, "sessions/" + router.query.id + "/users/" + auth.currentUser.uid), {
            tz: moment.tz.guess(),
            displayName: auth.currentUser.displayName
          });
        })


    }
  } catch {
    console.log("LOGIN ERROR")
  }
}

function MyApp({ Component, pageProps }) {
  const firebaseApp = initializeApp(firebaseConfig);
  signIn()
  return <Component {...pageProps} />
}

export default MyApp
