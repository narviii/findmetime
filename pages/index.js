import Head from 'next/head'
import React from 'react'
import { Background } from '../components/background';
import { useRouter } from 'next/router'
import { dbFireStore } from '../helpers/firebase'
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getAuth} from "firebase/auth";
var randomstring = require("randomstring");




export default function Home() {
  const router = useRouter()
  const auth = getAuth();

  const handleClick = async (e) => {
    router.push({
      pathname: 'session',
      query: { id: randomstring.generate()},
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
