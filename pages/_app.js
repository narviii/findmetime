import 'tailwindcss/tailwind.css'
import '../css/extend.css'
import { getAuth, signInAnonymously,updateProfile } from "firebase/auth";
import { get, getDatabase, ref, child, set } from '@firebase/database';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './/..//helpers/firebase'
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');




async function signIn() {

  const db = getDatabase();
  const auth = getAuth();
  
  try{
    const user = (await signInAnonymously(auth)).user
    if (user.displayName===null){
      await updateProfile(auth.currentUser,{displayName: uniqueNamesGenerator({ dictionaries: [adjectives, animals], separator: ' ' })})
    } 
  }catch{
    console.log("LOGIN ERROR")
  }
  console.log(auth.currentUser)
}

function MyApp({ Component, pageProps }) {
  const firebaseApp = initializeApp(firebaseConfig);
  signIn()
  return <Component {...pageProps} />
}

export default MyApp
