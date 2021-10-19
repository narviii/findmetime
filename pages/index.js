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
              <ol className="mx-auto  text-sm m-3">
                <p >
                  1. Send the link bellow to your friend, collegue or collegues..
                </p>
                <p>
                  2. Select the time interval you are available for a call or a meeting in your.
                </p>
                <p>
                  3. See in realtime what intervals everybody selected in realtime.
                </p>
                <p>
                  4. See if any intersection of intervals in the window bellow.
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
      </div>
    </React.Fragment>
  )
}
