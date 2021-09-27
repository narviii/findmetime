import Head from 'next/head'
import React from 'react'
import { Background } from '../components/background';
import { useRouter } from 'next/router'
import { dbFireStore } from '../helpers/firebase'
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
var randomstring = require("randomstring");
import { useMounted } from '../hooks/useMounted';




export default function Home() {
  const router = useRouter()
  const auth = getAuth();
  const mounted = useMounted()

  const handleClick = async (e) => {
    router.push({
      pathname: 'session',
      query: { id: randomstring.generate() },
    })
  }

  if (mounted) {
    router.push({
      pathname: 'session',
      query: { id: randomstring.generate() },
    })
  }



  return (
    <React.Fragment>
      <Background>

      </Background>
    </React.Fragment>
  )
}
