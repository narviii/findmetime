import React, { useEffect, useRef, useReducer } from 'react'
import moment from "moment";
import { Background } from '../../components/background';
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import { useSessionUsers } from '../../hooks/useSessionUsers';
import { TimelineActive, TimeLinePassive } from '../../components/timeline';
import { timeLineReducer } from '../../helpers/selectionReducer';
import { Handle } from '../../components/handle'
import { selectionReducer } from '../../helpers/selectionReducer';
import { removeItemOnce } from '../../helpers/removeItemOnce';
import { UserName } from '../../components/username';
import { getDatabase, ref, onValue } from "@firebase/database";
import { CopyToClipboard } from '../../components/copytoclipboard';
import { OutPut } from '../../components/output';
import { ZoomTimeline } from '../../components/timeline';
import { DrawZoomDates } from '../../components/drawDates';
export const timeLineClass = "h-12 m-1 mb-3 relative rounded-md  overflow-block-clip border-l border-r border-gray-500"
export const zoomTimeLineClass = "h-10 m-1 mb-3 relative rounded-md  overflow-block-clip border-l border-r border-gray-500"



export default function Home() {
    const router = useRouter()
    const sessionUsers = useSessionUsers(router.query.id)
    const user = useAuth()
    const db = getDatabase();

    const timelineContainerRef = useRef(0)

    const [zoomTimeline, setZoomTimeline] = useReducer(
        timeLineReducer,
        {
            start: moment().subtract(1, "days"),
            end: moment().add(1, "days"),
            pixelWidth: 0
        }
    )



    const [timeLine, setTimeLine] = useReducer(
        timeLineReducer,
        {
            start: moment().subtract(3, "hours"),
            end: moment().add(3, "hours"),
            pixelWidth: 0
        })

    const [isSelected, setSelected] = useReducer(
        selectionReducer,
        {
            start: moment().subtract(1, "hours"),
            end: moment().add(1, "hours")
        },
    )

    useEffect(() => {
        setTimeLine({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
        setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })

        window.addEventListener('resize', function () {
            setTimeLine({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
            setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
        });

        return window.removeEventListener('resize', function () {
            setTimeLine({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
            setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
        });
    }, [])




    let passiveTimelines
    let sessionUserNames



    if (sessionUsers && user) {
        let usersList = Object.keys(sessionUsers)

        usersList = removeItemOnce(usersList, user.uid) //make sure active user is allways first elemement of array
        usersList.unshift(user.uid)

        sessionUserNames = usersList.map((item) => {
            return (
                <UserName key={item + "user"} uid={item} />
            )
        })

        passiveTimelines = usersList.map((item) => {

            if (item != user.uid) {
                return (
                    <TimeLinePassive control={setTimeLine} key={item} timeLine={timeLine} tz={sessionUsers[item].tz} isSelectedStart={moment(sessionUsers[item].start)} isSelectedEnd={moment(sessionUsers[item].end)} />
                )
            }

        })
    }
    /*
        <div className="col-span-1 flex flex-col justify-center ">
                                <Handle control={setTimeLine} timeLine={timeLine} />
                            </div>
        
    
    */
    return (
        <React.Fragment>
            <Background>
                <div>
                    <CopyToClipboard />
                    <div className="grid mx-auto grid-cols-10 grid-flow-row grid-rows-2  p-5 max-w-screen-xl">
                        <div className=" bg-gray-100  w-full mx-auto block rounded-lg col-span-2">
                            <div className={zoomTimeLineClass}>  </div>
                            {sessionUserNames}
                        </div>
                        <div ref={timelineContainerRef} className="bg-gray-100  w-full mx-auto block rounded-lg col-span-8">
                            <ZoomTimeline control={setZoomTimeline}>
                                <DrawZoomDates timeLine={zoomTimeline}>
                                    
                                </DrawZoomDates>
                            </ZoomTimeline>

                            <TimelineActive control={setTimeLine} isSelected={isSelected} setSelected={setSelected} timeLine={timeLine} />
                            {passiveTimelines}

                        </div>

                    </div>

                </div>
                <OutPut sessionUsers={sessionUsers} />

            </Background>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}