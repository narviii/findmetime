var moment = require('moment-timezone');
import React, {useEffect } from 'react'
import { SelectElement, ShowSelection } from './handle'
import { DrawMarks } from './drawMarks'
import { useRouter } from 'next/router'
import { ref, set, update } from "firebase/database"
import { getDatabase } from '@firebase/database';
import { timeLineClass, zoomTimeLineClass } from "../pages/session"
import { useCurrentUser } from '../hooks/useCurrentUser'
import { Now } from '/components/now';
import { useDrag } from '../hooks/useDrag'
import { DrawDates } from './drawDates';
import { onValue } from "@firebase/database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'


export function ZoomTimeline({ children, control }) {
    const handleMouseDown = useDrag(control, "translateTimeline")

    return (
        <div onMouseDown={handleMouseDown} className={zoomTimeLineClass}>

            {children}
        </div>

    )
}


export function TimeLinePassive({ control, isSelectedStart, tz, isSelectedEnd, timeLine }) {
    const handleMouseDown = useDrag(control, "translateTimeline")
    const isSelected = {
        start: isSelectedStart,
        end: isSelectedEnd
    }
    return (
        <React.Fragment>
            <div className=" relative -translate-y-5 ">
                <DrawDates timeLine={timeLine} tz={tz} />
            </div>
            <div onMouseDown={handleMouseDown} className={timeLineClass}>
                <DrawMarks isSelected={isSelected} timeLine={timeLine} tz={tz} />
                <ShowSelection isSelectedStart={isSelectedStart} isSelectedEnd={isSelectedEnd} timeLine={timeLine} />
                <Now timeLine={timeLine} />
                <OutMark timeLine={timeLine} isSelected={isSelected} />

            </div>

        </React.Fragment>
    )
}

function OutMark({ timeLine, isSelected }) {

    if (!isSelected.start) return null

    if (isSelected.start.clone().isAfter(timeLine.end.clone())) {
        return (
            <div className={"  absolute  z-50 h-12 right-0   text-red-500"}>
                <FontAwesomeIcon icon={faArrowRight} className="h-full" />
            </div>
        )
        position = " right-0 "
    } else if (isSelected.end.clone().isBefore(timeLine.start.clone())) {
        return (
            <div className=" absolute  z-50 h-12 left-0 text-red-500">
                <FontAwesomeIcon icon={faArrowLeft} className="h-full" />
            </div>
        )
    }

    return null


}







export function TimelineActive({ control, isSelected, timeLine,setSelected }) {
    const router = useRouter()
    const db = getDatabase();
    const user = useCurrentUser()
    const handleMouseDown = useDrag(control, "setSelection",timeLine)
    
    
    useEffect(() => {
        if (user) {
            onValue(ref(db, "sessions/" + router.query.id + "/users/" + user.uid), (snapshot) => {
                const data = snapshot.val();
                
                if (data&&data.start && data.end) {
                    
                    setSelected({
                        type: "set",
                        timeline: timeLine,
                        start: moment(data.start),
                        end: moment(data.end)
                    })
                }


            });
        }
    }, [user])
    
/*
    useEffect(async () => {
        console.log(user.displayName)
        if (user) {
            update(ref(db, "sessions/" + router.query.id + "/users/" + user.uid), {
                tz: moment.tz.guess(),
                displayName: user.displayName
            });
            
            
           
        }

    }, [user])
    */
    
     useEffect(async () => {
         if (user&&(isSelected.start&&isSelected.end)) {
             update(ref(db, "sessions/" + router.query.id + "/users/" + user.uid), {
                 start: isSelected.start.clone().utc().format(),
                 end: isSelected.end.clone().utc().format(),
                 tz: moment.tz.guess(),
                 displayName: user.displayName
             });
         }
 
     }, [isSelected, user])
     

    

    return (

        <React.Fragment>
            <div className=" relative -translate-y-5  ">
                <DrawDates timeLine={timeLine} />
            </div>
            <div onMouseDown={handleMouseDown} className={timeLineClass}>
                <DrawMarks isSelected={isSelected} timeLine={timeLine} />
                <SelectElement control={control} isSelected={isSelected} timeLine={timeLine} />
                <Now timeLine={timeLine} scale={1} />

                <OutMark timeLine={timeLine} isSelected={isSelected} />
            </div>
        </React.Fragment>

    )
}