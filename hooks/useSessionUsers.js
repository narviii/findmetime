import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from '/helpers/firebase'
import { useAuth } from '/hooks/useAuth'



export function useSessionUsers(sessionId) {
    const [data, setData] = useState()
    const user = useAuth()

    const q = query(collection(db, "sessions", sessionId, "users"));

    useEffect(() => {
        const unsub = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                if (user && (doc.id != user.uid)) {
                    users.push(doc.id);
                }
            });

            setData(users)
        })
        return unsub
    }, [user])

    return data


}