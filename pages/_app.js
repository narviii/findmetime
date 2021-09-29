import 'tailwindcss/tailwind.css'
import '../css/extend.css'
import { React } from 'react';
import { getAuth, signInAnonymously, updateProfile } from "firebase/auth";
import {  getDatabase, ref,update } from '@firebase/database';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './/..//helpers/firebase'
const { uniqueNamesGenerator, adjectives, animals } = require('unique-names-generator');
import { useRouter } from 'next/router'
var moment = require('moment-timezone');
import {useMounted} from '../hooks/useMounted'



async function signIn(router) {
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
  const router = useRouter()
  initializeApp(firebaseConfig);
  const mounted = useMounted()
  if (mounted) {
    signIn(router)

  }
  return <Component {...pageProps} />
}

export default MyApp
