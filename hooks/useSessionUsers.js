import { useState, useEffect } from "react";
import { db } from '../helpers/firebase'
import { useAuth } from '../hooks/useAuth'
import { ref, onValue } from "firebase/database";


export function useSessionUsers(sessionId) {
    const [users, setUsers] = useState()
    const user = useAuth()

    const activeUsers = ref(db, "sessions/"+sessionId+"/users");

    useEffect(() => {
        onValue(activeUsers, (snapshot) => {
            const data = snapshot.val();
            //console.log(data)
            setUsers(data)
          });
    }, [user])

    return users


}