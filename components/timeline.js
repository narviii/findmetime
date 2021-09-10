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


export function TimeLinePassive({isSelectedStart,isSelectedEnd}) {
    const timelineContainerRef = useRef(0)
    const [timeLine, setTimeLine] = useReducer(
        selectionReducer,
        {
            isSelected: {
                start: moment().subtract(1, "hours"),
                end: moment().add(1, "hours")
            },

            start: moment().subtract(3, "hours"),
            end: moment().add(3, "hours"),
            pixelWidth: 0


        })

    useEffect(() => {
        setTimeLine({ type: 'set_width', width: timelineContainerRef.current.offsetWidth || 0 })
        window.addEventListener('resize', function () {
            setTimeLine({ type: 'set_width', width: timelineContainerRef.current.offsetWidth || 0 })
        });
    }, [])

    return (
        <div ref={timelineContainerRef} className="relative overflow-block-clip mt-1 ">
            <div className="h-12">
                <DrawMarks timeLine={timeLine} />
                <ShowSelection isSelectedStart={isSelectedStart} isSelectedEnd={isSelectedEnd} timeLine={timeLine} />
            </div>
            <Handle control={setTimeLine} timeLine={timeLine} />
        </div>
    )
}


export function TimelineActive() {
    const auth = getAuth();
    const router = useRouter()
    const user = useAuth()
    const timelineContainerRef = useRef(0)
    const [timeLine, setTimeLine] = useReducer(
        selectionReducer,
        {
            isSelected: {
                start: moment().subtract(1, "hours"),
                end: moment().add(1, "hours")
            },

            start: moment().subtract(3, "hours"),
            end: moment().add(3, "hours"),
            pixelWidth: 0


        })




    useEffect(() => {
        setTimeLine({ type: 'set_width', width: timelineContainerRef.current.offsetWidth || 0 })
        window.addEventListener('resize', function () {
            setTimeLine({ type: 'set_width', width: timelineContainerRef.current.offsetWidth || 0 })
        });
    }, [])


    useEffect(async () => {

        if (auth.currentUser) {

            set(ref(db, "sessions/" + router.query.id + "/users/" + auth.currentUser.uid), {
                start: timeLine.isSelected.start.clone().utc().format(),
                end: timeLine.isSelected.end.clone().utc().format(),

            });
            /*
            await setDoc(doc(db, "sessions", router.query.id, "users", auth.currentUser.uid), {
                start: timeLine.isSelected.start.clone().utc().format(),
                end: timeLine.isSelected.end.clone().utc().format(),

            });
            */
        }
    }, [timeLine.isSelected, user])

    return (
        <div ref={timelineContainerRef} className="relative overflow-block-clip mt-1 ">
            <div className="h-12">
                <SelectElement control={setTimeLine} timeLine={timeLine} />
                <DrawMarks timeLine={timeLine} />
            </div>
            <Handle control={setTimeLine} timeLine={timeLine} />
        </div>
    )
}