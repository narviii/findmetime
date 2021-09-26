import React, { useEffect, useRef, useReducer } from 'react'
import { Background } from '../../components/background';
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import { useSessionUsers } from '../../hooks/useSessionUsers';
import { TimelineActive, TimeLinePassive } from '../../components/timeline';
import { timeLineReducer } from '../../helpers/selectionReducer';
import { Handle } from '../../components/handle'
import { selectionReducer } from '../../helpers/selectionReducer';
import { zoomReducer } from '../../helpers/zoomReducer';
import { removeItemOnce } from '../../helpers/removeItemOnce';
import { UserName } from '../../components/username';
import { getDatabase, ref, onValue } from "@firebase/database";
import { CopyToClipboard } from '../../components/copytoclipboard';
import { OutPut } from '../../components/output';
import { ZoomTimeline } from '../../components/timeline';
import { DrawZoomDates } from '../../components/drawDates';
import { ZoomSelect } from '../../components/zoomSelect';
import { Now } from '../../components/now';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { updateRecord } from '../../helpers/updateRecord';

export const timeLineClass = "h-12 m-1 mb-6 relative rounded-md  overflow-block-clip border-l border-r border-gray-500"
export const zoomTimeLineClass = "h-8 m-1 mb-5 relative rounded-md  overflow-block-clip border-l border-r border-gray-500"


export default function Home() {
    const moment = extendMoment(Moment);

    const router = useRouter()
    const sessionUsers = useSessionUsers(router.query.id)
    const user = useAuth()
    const db = getDatabase();
    const zoomWindow = 6
    const start = moment().subtract(2, "days")
    const end =  moment().add(2, "days")
    const center = moment.range(start.clone(),end.clone()).center()
    const zoomStart = center.clone().subtract(zoomWindow,"hours")
    const zoomEnd = center.clone().add(zoomWindow,"hours")
    

    const timelineContainerRef = useRef(0)

    const [zoomTimeline, setZoomTimeline] = useReducer(
        zoomReducer,
        {
            start: start,
            end: end,
            zoomStart:zoomStart,
            zoomEnd:zoomEnd,
            pixelWidth: 0,
            zoomWindow:zoomWindow
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
         
        },
    )

    const newTimeLine = {
        start:zoomTimeline.zoomStart,
        end:zoomTimeline.zoomEnd,
        pixelWidth:zoomTimeline.pixelWidth,
        domRect:zoomTimeline.domRect
    }

    const updateSelected = updateRecord(isSelected,router.query.id,user)
    //updateSelected()

    useEffect(() => {
        setTimeLine({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
        setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
        setZoomTimeline({ type: 'set_domRect', domRect: timelineContainerRef.current ? timelineContainerRef.current.getBoundingClientRect() : 0 })


        window.addEventListener('resize', function () {
            setTimeLine({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
            setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
            setZoomTimeline({ type: 'set_domRect', domRect: timelineContainerRef.current ? timelineContainerRef.current.getBoundingClientRect() : 0 })

        });

        return window.removeEventListener('resize', function () {
            setTimeLine({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
            setZoomTimeline({ type: 'set_width', width: timelineContainerRef.current ? timelineContainerRef.current.offsetWidth : 0 })
            setZoomTimeline({ type: 'set_domRect', domRect: timelineContainerRef.current ? timelineContainerRef.current.getBoundingClientRect() : 0 })

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
                    <TimeLinePassive control={setTimeLine} key={item} timeLine={newTimeLine} tz={sessionUsers[item].tz} isSelectedStart={moment(sessionUsers[item].start)} isSelectedEnd={moment(sessionUsers[item].end)} />
                )
            }

        })
    }
    return (
        <React.Fragment>
            <Background>
                <div>
                    <CopyToClipboard />
                    <div className="grid mx-auto grid-cols-10 max-w-screen-xl">
                        <div className=" bg-gray-100  w-full mx-auto block rounded-lg col-span-3">
                            <div className={zoomTimeLineClass}>  </div>
                            {sessionUserNames}
                        </div>
                        <div ref={timelineContainerRef} className="bg-gray-100  w-full mx-auto block rounded-lg col-span-7">
                            <ZoomTimeline control={setZoomTimeline}>
                                <DrawZoomDates timeLine={zoomTimeline}/>
                                <ZoomSelect timeLine={zoomTimeline} control={setZoomTimeline}/>
                                <Now timeLine={zoomTimeline} scale={10} />
                            </ZoomTimeline>

                            <TimelineActive control={setSelected} isSelected={isSelected} setSelected={setSelected} timeLine={newTimeLine} />
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