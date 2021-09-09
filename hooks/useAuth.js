import { useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";

export function useAuth() {
    const [user, setUser] = useState()
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
        } else {
            // User is signed out
            // ...
        }
    });
    return user
}