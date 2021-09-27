import 'tailwindcss/tailwind.css'
import '../css/extend.css'
import { getAuth, signInAnonymously, updateProfile } from "firebase/auth";
import { get, getDatabase, ref, child, set,update } from '@firebase/database';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './/..//helpers/firebase'
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
import { useRouter } from 'next/router'
var moment = require('moment-timezone');
import {useMounted} from '../hooks/useMounted'



async function signIn() {
  const router = useRouter()

  const db = getDatabase();
  const auth = getAuth();

  
    const user = (await signInAnonymously(auth)).user
    if (user.displayName === null) {
      updateProfile(auth.currentUser, { displayName: uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: ' ' }) }).then(
        () => {
          update(ref(db, "sessions/" + router.query.id + "/users/" + auth.currentUser.uid), {
            tz: moment.tz.guess(),
            displayName: auth.currentUser.displayName
          });
        })
    } else {
      update(ref(db, "sessions/" + router.query.id + "/users/" + auth.currentUser.uid), {
        tz: moment.tz.guess(),
        displayName: auth.currentUser.displayName
      });
    }
  } 


function MyApp({ Component, pageProps }) {
  const firebaseApp = initializeApp(firebaseConfig);
  const mounted = useMounted()
  if (mounted) {
    signIn()

  }
  return <Component {...pageProps} />
}

export default MyApp
