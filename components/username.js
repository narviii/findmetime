import { getDatabase, ref, onValue } from '@firebase/database';
import { useEffect, useState } from "react"
import { timeLineClass } from "../pages/session"

const nameElemClass = " flex flex-col justify-center "


export function UserName({ uid }) {
    const db = getDatabase();
    const [userRecord, setUserRecord] = useState({screenName:"",tz:""})
    useEffect(() => {
         return onValue(ref(db, `users/${uid}`), (sn) => {
            if (sn.val()) {
                setUserRecord(sn.val())
            }

        });
    }, [])



    return (
        <div className={timeLineClass + nameElemClass + "bg-gray-300 rounded-lg"}>
            <div className="text-center ">
                {userRecord.screenName}
            </div>
            <div className="text-center text-tiny">
                {userRecord.tz}
            </div>
        </div>
    )
}