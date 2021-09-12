import { getAuth, signInAnonymously } from "firebase/auth";
import { get, getDatabase, ref, child, set } from '@firebase/database';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');


export async function  getUserScreenName () {
    const db = getDatabase();
    const auth = getAuth();
    const user = (await signInAnonymously(auth)).user
    const curUserRecord = await get(child(ref(db), `users/${user.uid}`))
    if (curUserRecord.exists()) {
        console.log(curUserRecord.val().screenName)
     return (curUserRecord.val().screenName)
    } else {
      return ""
    }
  }