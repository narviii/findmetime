import { getDatabase, ref, onValue } from '@firebase/database';
import { useEffect, useState } from "react"
import { timeLineClass } from "../pages/session"
import { useRouter } from 'next/router'
import { getAuth } from '@firebase/auth';
import moment from 'moment';

const nameElemClass = "grid grid-cols-3"


export function UserName({ uid }) {
    const router = useRouter()
    const db = getDatabase();
    const auth = getAuth()
    const [displayName, setDisplayName] = useState("")
    const [tz, setTz] = useState("")
    const [isSelected, setSelected] = useState("")

    useEffect(() => {
        if (auth.currentUser) {
            return onValue(ref(db, `sessions/${router.query.id}/users/${uid}`), (sn) => {
                if (sn.val()) {
                    setDisplayName(sn.val().displayName)
                    setTz(sn.val().tz)
                    const data = sn.val()
                    if (data && data.start && data.end) {
                        setSelected({
                            start: moment(sn.val().start),
                            end: moment(sn.val().end)
                        })
                    }


                }

            });
        }

    }, [auth])



    return (
        <div className={timeLineClass + " grid grid-cols-5 rounded-md"}>
            <div className="col-span-3 flex flex-col justify-center">
                <div className=" text-base text-center">
                    {displayName}
                </div>
                <div className=" text-xxs text-center">
                    {tz.toLocaleLowerCase()}
                </div>
            </div>

            <div className=" text-xs text-center col-span-1 flex flex-col justify-center">
                <div>
                    {isSelected.start ? isSelected.start.format("H:mm a") : null}
                </div>
                <div>
                    {isSelected.start ? isSelected.start.format("MMM, D").toLocaleLowerCase() : null}
                </div>
            </div>
            <div className=" text-xs text-center col-span-1 flex flex-col justify-center">
                <div>
                    {isSelected.end ? isSelected.end.format("H:mm a") : null}
                </div>
                <div>
                    {isSelected.end ? isSelected.end.format("MMM, D").toLocaleLowerCase() : null}
                </div>
            </div>

        </div>
    )
}