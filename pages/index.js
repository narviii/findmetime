import Head from 'next/head'
import React from 'react'
import { Background } from '../components/background';
import { useRouter } from 'next/router'
import { dbFireStore } from '../helpers/firebase'
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { getAuth, signInWithRedirect } from "firebase/auth";
var randomstring = require("randomstring");
import { useMounted } from '../hooks/useMounted';
import GoogleButton from 'react-google-button'
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider } from "firebase/auth";
import { NavBar } from '../components/navbar';
import { Footer } from '../components/footer';



export default function Home() {
  const router = useRouter()
  const auth = getAuth();
  const mounted = useMounted()
  const [user, loading, error] = useAuthState(auth);

  const handleGoogleSignInClick = async (e) => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }

  if (loading && mounted) return (
    <div>
      <div className="bg-gray-100">
        <div className=" h-screen flex flex-col items-center justify-center ">
          <h1>
            Loading...
          </h1>
        </div>
      </div>
    </div>
  )

  

  if (user && mounted) {
    if (user.isAnonymous == false) {
      router.replace({
        pathname: 'session',
        query: { id: randomstring.generate() },
      })
      return null
    }


  }


  return (
    <React.Fragment>
      <div className="bg-gray-100">
        <NavBar />

        <div className=" h-screen flex flex-col items-center justify-center ">
          <div className="flex justify-center">
            <h1 className="w-min border-t border-gray-500 rounded-md pl-5 pr-5 border-b text-4xl ">
              Find me time
            </h1>
            <div className="flex flex-col justify-center">
              <ol className="mx-auto  text m-3">
                <p className="m-2">
                A multiplayer timeline for scheduling meetings and calls across different time zones.
                </p>
                <p className="m-2">
                Start a session and send a link to a friend(or friends) or colleague(or colleagues).
                </p>
                <p className="m-2">
                Select a time interval in your timeline, and wait for him(or them) to select his, all happens in real time.
                </p>
                <p className="m-2">
                See, if there is a match.
                </p>
              </ol>
            </div>
          </div>
          <div className="mx-auto w-max">
            <GoogleButton
              onClick={handleGoogleSignInClick}
            />
          </div>
        </div>
        <Footer />

      </div>
    </React.Fragment>
  )
}
