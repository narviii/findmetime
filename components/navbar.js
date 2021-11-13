import { React, useState, useRef, useEffect } from "react";
import { getAuth,signOut, GoogleAuthProvider, linkWithRedirect, linkWithPopup, getRedirectResult } from "firebase/auth";
import router, { useRouter } from 'next/router'
import { useAuthState } from 'react-firebase-hooks/auth';



function Avatar() {
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const router = useRouter()
    let img
   

    if (loading) return null

    if (!user) return null
    
    const initials = user.displayName.split(" ")[0][0] + user.displayName.split(" ")[1][0]
    if (user.photoURL != "") {
        img = <img className="rounded-full h-12 w-12 leading-none" src={user.photoURL} />
    } else {
        img = (
            <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                {initials}
            </div>
        )
    }


    return (
        <div className="h-full flex-col flex justify-center">
            {img}
        </div>
    )
}

function Menu() {
    function signOutFb() {
        const auth = getAuth();
        router.push("/")
        signOut(auth)
    }
    return (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
            <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <div onClick={signOutFb} className=" block disable-select cursor-pointer px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600">
                    <span class="flex flex-col">
                        <span>
                            Sign out
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}


export function NavBar( ) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const ref = useRef()



    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])



    return (

        <nav className=" bg-gray-200 w-full absolute top-0  h-14  justify-between items-center flex mx-auto">
            <div>

            </div>

            <div ref={ref} className="h-full mr-5 relative">
                <div onClick={() => setIsMenuOpen(oldState => !oldState)} className="h-full">
                    <Avatar />
                </div>
                {isMenuOpen ? <Menu /> : null}
            </div>
        </nav>

    )
}

