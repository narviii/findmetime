import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";

export function useCurrentUser() {
    const [curUser, setCurrentUser] = useState()
    const auth = getAuth();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
                // ...
            } else {
                // User is signed out
                // ...
            }
        });
        return unsub
    })


    return curUser
}