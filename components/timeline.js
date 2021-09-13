var moment = require('moment-timezone');
import React, { useEffect} from 'react'
import {SelectElement,ShowSelection } from './handle'
import { DrawMarks } from './drawMarks'
import { useRouter } from 'next/router'
import { getAuth } from "firebase/auth";
import { useAuth } from '../hooks/useAuth'
import {ref, set,update } from "firebase/database"
import { getDatabase } from '@firebase/database';
import { timeLineClass } from "../pages/session"


export function TimeLinePassive({ isSelectedStart,tz, isSelectedEnd,timeLine }) {
    
    return (
        <div  className={timeLineClass}>
                <DrawMarks timeLine={timeLine} tz={tz} />
                <ShowSelection isSelectedStart={isSelectedStart} isSelectedEnd={isSelectedEnd} timeLine={timeLine} />
        </div>
    )
}


export function TimelineActive({isSelected,setSelected, timeLine }) {
    const auth = getAuth();
    const router = useRouter()
    const user = useAuth()
    const db = getDatabase();

    useEffect(async () => {
        if (auth.currentUser) {
            await set(ref(db, "sessions/" + router.query.id + "/users/" + auth.currentUser.uid), {
                start: isSelected.start.clone().utc().format(),
                end: isSelected.end.clone().utc().format(),
                tz:moment.tz.guess()
               

            });
            
            await update(ref(db, "users/" + auth.currentUser.uid), {
                tz:moment.tz.guess()
            });
            
            
        }
    }, [isSelected, user])
    
    return (
        
            <div className={timeLineClass}>
                <DrawMarks timeLine={timeLine} />
                <SelectElement control = {setSelected} isSelected={isSelected} timeLine={timeLine}/>
            </div>
        
    )
}