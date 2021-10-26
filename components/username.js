import { getDatabase, ref, onValue } from '@firebase/database';
import React, { useEffect, useState } from "react"
import { timeLineClass } from "../pages/session"
import { useRouter } from 'next/router'
import { getAuth } from '@firebase/auth';
// eslint-disable-next-line no-undef
var moment = require('moment-timezone');
import { useAuth } from '../hooks/useAuth';


function isEven(value) {
    if (value % 2 == 0)
        return true;
    else
        return false;
}

function DisplaySelected({ isSelected,tz }) {
    const [curTime, setCurTime] = useState("")
    const user = useAuth()


    if (isSelected.start && isSelected.end) {
        return (
            <div className="col-span-5 grid grid-cols-11">
                <div className=" text-xs text-center col-span-5  lowercase flex flex-col justify-center">
                    <div>
                        {isSelected.start.format("h:mm a")}
                    </div>
                    <div>
                        {isSelected.start.format("MMM, D")}
                    </div>
                </div>
                <div className=" text-center col-span-1    flex flex-col justify-center">
                    <div>
                        {" - "}
                    </div>
                </div>
                <div className=" text-xs text-center col-span-5  lowercase flex flex-col justify-center">
                    <div>
                        {isSelected.end.format("h:m a")}
                    </div>
                    <div>
                        {isSelected.end.format("MMM, D")}
                    </div>
                </div>
            </div>
        )
    } else {
        if (user&&tz) {

            setInterval(() => {
                const curHour = moment().tz(tz).format("h")
                const curMin = moment().tz(tz).format("mm a")
                let blinker
                if (isEven(moment().second())) {
                    blinker = ":"
                } else {
                    blinker = " "
                }

                setCurTime(curHour + blinker + curMin)
            }, 500)


        }


        return (
            <div className="col-span-4 flex justify-center items-center text-xxs  font-bold ">
                {curTime}
            </div>
        )
    }


}

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
                            start: moment(data.start),
                            end: moment(data.end)
                        })
                    }


                }

            });
        }

    }, [auth])











    return (
        <div className={timeLineClass + " grid grid-cols-12 rounded-md"}>
            <div className="col-span-7 ">
                <div className=" text-base min-w-min text-left ml-6">
                    {displayName}
                </div>
                <div className="flex justify-between">
                    <div className=" text-xxs ml-6  ">
                        {tz.toLocaleLowerCase()}
                    </div>

                </div>
            </div>

            <DisplaySelected isSelected={isSelected} tz={tz} />

        </div>
    )
}