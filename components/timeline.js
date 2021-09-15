var moment = require('moment-timezone');
import React, { useEffect } from 'react'
import { SelectElement, ShowSelection } from './handle'
import { DrawMarks } from './drawMarks'
import { useRouter } from 'next/router'
import { ref, set, update } from "firebase/database"
import { getDatabase } from '@firebase/database';
import { timeLineClass } from "../pages/session"
import { useCurrentUser } from '../hooks/useCurrentUser'
import { Now } from '/components/now';
import { useDrag } from '../hooks/useDrag'
import { DrawDates } from './drawDates';



export function TimeLinePassive({ control, isSelectedStart, tz, isSelectedEnd, timeLine }) {
    const handleMouseDown = useDrag(control, "translateTimeline")
    const isSelected = {
        start: isSelectedStart,
        end: isSelectedEnd
    }
    return (
        <div>
            <div className=" relative overflow-block-clip -translate-y-5 ">
                <DrawDates timeLine={timeLine} tz={tz} />
            </div>
            <div onMouseDown={handleMouseDown} className={timeLineClass}>
                <DrawMarks isSelected={isSelected} timeLine={timeLine} tz={tz} />
                <ShowSelection isSelectedStart={isSelectedStart} isSelectedEnd={isSelectedEnd} timeLine={timeLine} />
                <Now timeLine={timeLine} />
            </div>
        </div>
    )
}


export function TimelineActive({ control, isSelected, setSelected, timeLine }) {
    const router = useRouter()
    const db = getDatabase();
    const user = useCurrentUser()

    const handleMouseDown = useDrag(control, "translateTimeline")



    useEffect(async () => {
        if (user) {
            set(ref(db, "sessions/" + router.query.id + "/users/" + user.uid), {
                start: isSelected.start.clone().utc().format(),
                end: isSelected.end.clone().utc().format(),
                tz: moment.tz.guess(),
                displayName: user.displayName
            });
        }

    }, [isSelected, user])

    return (

        <div>
            <div className=" relative overflow-block-clip -translate-y-5 ">
                <DrawDates timeLine={timeLine} />
            </div>
            <div onMouseDown={handleMouseDown} className={timeLineClass}>
                <DrawMarks isSelected={isSelected} timeLine={timeLine} />
                <SelectElement control={setSelected} isSelected={isSelected} timeLine={timeLine} />
                <Now timeLine={timeLine} />
            </div>
        </div>

    )
}