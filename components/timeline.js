import React, { useEffect} from 'react'
import {SelectElement,ShowSelection } from './handle'
import { DrawMarks } from './drawMarks'
import { useRouter } from 'next/router'
import { getAuth } from "firebase/auth";
import { useAuth } from '../hooks/useAuth'
import {ref, set } from "firebase/database"
import { db } from '../helpers/firebase';



export function TimeLinePassive({ isSelectedStart, isSelectedEnd,timeLine }) {
    
    return (
        <div  className="relative overflow-block-clip mt-1 ">
            <div className="h-12">
                <DrawMarks timeLine={timeLine} />
                <ShowSelection isSelectedStart={isSelectedStart} isSelectedEnd={isSelectedEnd} timeLine={timeLine} />
            </div>

        </div>
    )
}


export function TimelineActive({isSelected,setSelected, timeLine }) {
    const auth = getAuth();
    const router = useRouter()
    const user = useAuth()

    

    useEffect(async () => {
        if (auth.currentUser) {
            set(ref(db, "sessions/" + router.query.id + "/users/" + auth.currentUser.uid), {
                start: isSelected.start.clone().utc().format(),
                end: isSelected.end.clone().utc().format(),

            });
            
        }
    }, [isSelected, user])
    

    return (
        <div className="relative overflow-block-clip mt-1 ">
            <div className="h-12">
                <DrawMarks timeLine={timeLine} />
                <SelectElement control = {setSelected} isSelected={isSelected} timeLine={timeLine}/>
            </div>
        </div>
    )
}