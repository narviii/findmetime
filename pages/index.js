import Head from 'next/head'
import React from 'react'
import { Background } from '../components/background';
import { useRouter } from 'next/router'
import { dbFireStore } from '../helpers/firebase'
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getAuth} from "firebase/auth";



export default function Home() {
  const router = useRouter()
  const auth = getAuth();

  const handleClick = async (e) => {
    const session = await addDoc(collection(dbFireStore, "sessions"), {});

    await setDoc(doc(dbFireStore, session.path, "users", auth.currentUser.uid), {
      start: 'start',
      end: 'end'
    });
    router.push({
      pathname: 'session',
      query: { id: session.id },
    })
  }


  return (
    <React.Fragment>
      <Background>
        <div className="flex flex-col justify-center h-full ">
          <button onClick={handleClick} className="bg-green-300 hover:bg-green-100 p-3 cursor-pointer   mx-auto block text-center  ">
            Start new session
          </button>
        </div>
      </Background>
    </React.Fragment>
  )
}
