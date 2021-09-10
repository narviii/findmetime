import React, { useEffect, useRef, useReducer, Children } from 'react'
import moment from "moment";
import { Handle, SelectElement } from '/components/handle'
import { DrawMarks } from '/components/drawMarks'
import { selectionReducer } from '/helpers/selectionReducer';
import { useRouter } from 'next/router'
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuth } from '/hooks/useAuth'
import { getDatabase, ref, set } from "firebase/database"
import { db } from '../helpers/firebase';
import { ShowSelection } from '/components/handle';


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


export function TimelineActive({ timeLine }) {
    const auth = getAuth();
    const router = useRouter()
    const user = useAuth()

    const [isSelected, setSelected] = useReducer(
        selectionReducer,
        {
            start: moment().subtract(1, "hours"),
            end: moment().add(1, "hours")
        },
    )

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