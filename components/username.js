import { getDatabase, ref, onValue } from '@firebase/database';
import { useEffect, useState } from "react"
import { timeLineClass } from "../pages/session"
import { useRouter } from 'next/router'
import { getAuth } from '@firebase/auth';
var moment = require('moment-timezone');
import { useAuth } from '../hooks/useAuth';

const nameElemClass = "grid grid-cols-3"

function isEven(value) {
	if (value%2 == 0)
		return true;
	else
		return false;
}


export function UserName({ uid }) {
    const router = useRouter()
    const db = getDatabase();
    const auth = getAuth()
    const [displayName, setDisplayName] = useState("")
    const [tz, setTz] = useState("")
    const [isSelected, setSelected] = useState("")
    const user = useAuth()
    const [curTime,setCurTime] = useState()

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

   
    if (user) {
        
        setInterval(()=>{
            const curHour = moment().tz(tz).format("h")
            const curMin = moment().tz(tz).format("mm a")
            let blinker
            if (isEven(moment().second())){
                blinker=":"
            }else{
                blinker=" "
            }
            
            setCurTime(curHour+blinker+curMin)
        },500)

        
    }









    return (
        <div className={timeLineClass + " grid grid-cols-12 rounded-md"}>
            <div className="col-span-8 ">
                <div className=" text-base min-w-min text-left ml-6">
                    {displayName}
                </div>
                <div className="flex justify-between">
                    <div className=" text-xxs ml-6  ">
                        {tz.toLocaleLowerCase()}
                    </div>
                    <div className=" text-xxs  font-bold mr-8">
                        {curTime}
                    </div>
                </div>
            </div>

            <div className="col-span-4 grid grid-cols-11">
                <div className=" text-xs text-center col-span-5  lowercase flex flex-col justify-center">
                    <div>
                        {isSelected.start ? isSelected.start.format("h:mm a") : null}
                    </div>
                    <div>
                        {isSelected.start ? isSelected.start.format("MMM, D") : null}
                    </div>
                </div>
                <div className=" text-center col-span-1    flex flex-col justify-center">
                    <div>
                    {isSelected.end ? " - " : null}
                    </div>
                </div>
                <div className=" text-xs text-center col-span-5  lowercase flex flex-col justify-center">
                    <div>
                        {isSelected.end ? isSelected.end.format("h:m a") : null}
                    </div>
                    <div>
                        {isSelected.end ? isSelected.end.format("MMM, D") : null}
                    </div>
                </div>
            </div>

        </div>
    )
}