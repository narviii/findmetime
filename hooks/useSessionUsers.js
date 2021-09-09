import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from '/helpers/firebase'


export function useSessionUsers(sessionId) {
    const [data, setData] = useState()
    
    const q = query(collection(db, "sessions", sessionId, "users"));

    
    useEffect(() => {
        const unsub = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.id);
            });
            //console.log(querySnapshot.docs)
            console.log(users)
        })
        return unsub
    }, [])

    return data


}