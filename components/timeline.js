var moment = require('moment-timezone');
import React, { useEffect, useRef } from 'react'
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
import { UserName } from './username';
import { OutMark } from './outmark';


export function ZoomTimeline({ children, control }) {
    const handleMouseDown = useDrag(control, "translateTimeline")

    return (
        <div onMouseDown={handleMouseDown} className={zoomTimeLineClass}>

            {children}
        </div>

    )
}


export function TimeLinePassive({ control, isSelectedStart, tz, isSelectedEnd, timeLine, uid }) {
    const handleMouseDown = useDrag(control, "translateTimeline")
    const isSelected = {
        start: isSelectedStart,
        end: isSelectedEnd
    }
    return (
        <React.Fragment>
            <div className="grid grid-cols-11">
                <div className="col-span-3">
                    <div className=" relative h-4 overflow-hidden  ">
                        
                    </div>
                    <UserName uid={uid} tz={tz} />
                </div>
                <div className="col-span-8">
                    <div className=" relative h-4 overflow-hidden  ">
                        <DrawDates timeLine={timeLine} tz={tz} />
                    </div>
                    <div onMouseDown={handleMouseDown} className={timeLineClass}>
                        <DrawMarks isSelected={isSelected} timeLine={timeLine} tz={tz} />
                        <ShowSelection isSelectedStart={isSelectedStart} isSelectedEnd={isSelectedEnd} timeLine={timeLine} />
                        <Now timeLine={timeLine} />
                        <OutMark timeLine={timeLine} isSelected={isSelected} />
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}








export function TimelineActive({ control, isSelected, timeLine, setZoomTimeline }) {
    const router = useRouter()
    const db = getDatabase();
    const user = useCurrentUser()
    const handleMouseDown = useDrag(control, "setSelection", timeLine)
    const timelineContainerRef = useRef(0)


    useEffect(() => {
        if (user) {
            onValue(ref(db, "sessions/" + router.query.id + "/users/" + user.uid), (snapshot) => {
                const data = snapshot.val();

                if (data && data.start && data.end) {

                    control({
                        type: "set",
                        timeline: timeLine,
                        start: moment(data.start),
                        end: moment(data.end)
                    })
                }


            });
        }
    }, [user])

    useEffect(() => {
        setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
        setZoomTimeline({ type: 'set_domRect', domRect: timelineContainerRef.current ? timelineContainerRef.current.getBoundingClientRect() : 0 })


        window.addEventListener('resize', function () {
            setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
            setZoomTimeline({ type: 'set_domRect', domRect: timelineContainerRef.current ? timelineContainerRef.current.getBoundingClientRect() : 0 })

        });

        return window.removeEventListener('resize', function () {
            setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
            setZoomTimeline({ type: 'set_domRect', domRect: timelineContainerRef.current ? timelineContainerRef.current.getBoundingClientRect() : 0 })

        });
    }, [])



    useEffect(async () => {
        if (user && (isSelected.start && isSelected.end)) {
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
            <div className="grid grid-cols-11">

                <div className="col-span-3">
                    <div className=" h-4">

                    </div>
                    {user ? <UserName uid={user.uid} tz={user.tz} /> : null}
                </div>
                <div className="col-span-8 ">
                    <div className=" relative h-4 overflow-hidden  ">
                        <DrawDates timeLine={timeLine} />
                    </div>
                    <div ref={timelineContainerRef} onMouseDown={handleMouseDown} className={timeLineClass}>
                        <DrawMarks isSelected={isSelected} timeLine={timeLine} />
                        <SelectElement control={control} isSelected={isSelected} timeLine={timeLine} />
                        <Now timeLine={timeLine} scale={1} />
                        <OutMark timeLine={timeLine} isSelected={isSelected} />
                    </div>
                </div>
            </div>

        </React.Fragment>

    )
}