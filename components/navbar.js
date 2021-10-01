import { React } from "react";
import { getAuth, GoogleAuthProvider, linkWithRedirect, linkWithPopup, getRedirectResult } from "firebase/auth";

export function NavBar() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    //console.log(auth)

    function handleClick() {
        
    }
    console.log(auth.currentUser)

   

    return (

        <div className=" bg-gray-200 w-full absolute top-0  h-14  justify-between items-center flex mx-auto">
            <div>

            </div>
            <button onClick={handleClick} className=" rounded-md m-4">
                Sign In
            </button>
        </div>

    )
}

