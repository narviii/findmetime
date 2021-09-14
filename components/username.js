import { getDatabase, ref, onValue } from '@firebase/database';
import { useEffect, useState } from "react"
import { timeLineClass } from "../pages/session"
import { useRouter } from 'next/router'
import { getAuth } from '@firebase/auth';

const nameElemClass = " flex flex-col  justify-center "


export function UserName({ uid }) {
    const router = useRouter()
    const db = getDatabase();
    const auth = getAuth()
    const [displayName, setDisplayName] = useState("")
    const [tz, setTz] = useState("")

    useEffect(() => {
        if (auth.currentUser) {
            return onValue(ref(db, `sessions/${router.query.id}/users/${uid}`), (sn) => {
                if (sn.val()) {
                    setDisplayName(sn.val().displayName)
                    setTz(sn.val().tz)

                }

            });
        }

    }, [auth])



    return (
        <div className={timeLineClass + nameElemClass +  "rounded-md"}>
            <div className="text-center ">
                {displayName}
            </div>
            <div className="text-center text-tiny">
                {tz}
            </div>
        </div>
    )
}