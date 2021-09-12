import { useState, useEffect } from "react";
import { useAuth } from '../hooks/useAuth'
import { getDatabase,ref, onValue } from "@firebase/database";


export function useSessionUsers(sessionId) {
    const [users, setUsers] = useState()
    const user = useAuth()
    const db = getDatabase();


    const activeUsers = ref(db, "sessions/"+sessionId+"/users");

    useEffect(() => {
        onValue(activeUsers, (snapshot) => {
            const data = snapshot.val();
           
            setUsers(data)
          });
    }, [user])

    return users


}