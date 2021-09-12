import { getDatabase, ref, onValue } from '@firebase/database';
import { useEffect, useState } from "react"
import { timeLineClass } from "../pages/session"

const nameElemClass = " flex flex-col justify-center "


export function UserName({ uid }) {
    const db = getDatabase();
    const [screenName, setScreenName] = useState("   ")
    useEffect(() => {
        onValue(ref(db, `users/${uid}`), (sn) => {
            setScreenName(sn.val().screenName)
        });
    }, [])

   

    return (
        <div className={timeLineClass + nameElemClass + "bg-gray-300 rounded-lg"}>
            <div className="text-center p-1">
                {screenName}
            </div>
        </div>
    )
}