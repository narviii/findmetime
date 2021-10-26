import React, { useEffect, useRef, useReducer } from 'react'
import { Background } from '../../components/background';
import { useRouter } from 'next/router'
import { useAuth } from '../../hooks/useAuth'
import { useSessionUsers } from '../../hooks/useSessionUsers';
import { TimelineActive, TimeLinePassive } from '../../components/timeline';
import { timeLineReducer } from '../../helpers/selectionReducer';
import { selectionReducer } from '../../helpers/selectionReducer';
import { zoomReducer } from '../../helpers/zoomReducer';
import { removeItemOnce } from '../../helpers/removeItemOnce';
import { UserName } from '../../components/username';
import { CopyToClipboard } from '../../components/copytoclipboard';
import { OutPut } from '../../components/output';
import { ZoomTimeline } from '../../components/timeline';
import { DrawZoomDates } from '../../components/drawDates';
import { ZoomSelect } from '../../components/zoomSelect';
import { Now } from '../../components/now';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { NavBar } from '../../components/navbar';
var randomstring = require("randomstring");
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth,signInWithRedirect } from '@firebase/auth';
import { useMounted } from '../../hooks/useMounted';
import { GoogleAuthProvider } from "firebase/auth";


export const timeLineClass = "h-12 m-1 relative rounded-md  overflow-block-clip overflow-clip border-l border-r border-gray-500"
export const zoomTimeLineClass = "h-8 m-1  relative rounded-md  overflow-block-clip overflow-clip border-l border-r border-gray-500"


export default function Home() {
    const moment = extendMoment(Moment);
    const auth = getAuth()
    const router = useRouter()
    const sessionUsers = useSessionUsers(router.query.id)

    const zoomWindow = 6
    const start = moment().subtract(5, "days")
    const end = moment().add(5, "days")
    const center = moment.range(start.clone(), end.clone()).center()
    const zoomStart = center.clone().subtract(zoomWindow, "hours")
    const zoomEnd = center.clone().add(zoomWindow, "hours")

    const [user, loading, error] = useAuthState(auth);
    const isMounted = useMounted()



    const handleClick = () => {

        window.location.href = `session?id=${randomstring.generate()}`
    }


    const [zoomTimeline, setZoomTimeline] = useReducer(
        zoomReducer,
        {
            start: start,
            end: end,
            zoomStart: zoomStart,
            zoomEnd: zoomEnd,
            pixelWidth: 0,
            zoomWindow: zoomWindow
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
        start: zoomTimeline.zoomStart,
        end: zoomTimeline.zoomEnd,
        pixelWidth: zoomTimeline.pixelWidth,
        domRect: zoomTimeline.domRect
    }



    let passiveTimelines


    if (sessionUsers && user) {
        let usersList = Object.keys(sessionUsers)

        usersList = removeItemOnce(usersList, user.uid) //make sure active user is allways first elemement of array
        usersList.unshift(user.uid)



        passiveTimelines = usersList.map((item) => {
            if (item != user.uid) {
                return (
                    <TimeLinePassive control={setTimeLine} key={item} uid={item} timeLine={newTimeLine} tz={sessionUsers[item].tz} isSelectedStart={moment(sessionUsers[item].start)} isSelectedEnd={moment(sessionUsers[item].end)} />
                )
            }

        })
    }

    if (!loading && !user && isMounted) {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
        return null
    }

    return (
        <React.Fragment>
            <Background>
                <NavBar />


                <div >
                    <CopyToClipboard />
                    <div className="grid mx-auto   max-w-screen-xl ">

                        <div className="bg-gray-100 overflow-block-clip  w-full mx-auto block rounded-lg col-span-7">
                            <div className="md:grid md:grid-cols-11">
                                <div className="md:col-span-3 hidden md:block">

                                </div>
                                <div className="md:col-span-8 ">
                                    <ZoomTimeline control={setZoomTimeline}>
                                        <DrawZoomDates timeLine={zoomTimeline} />
                                        <Now timeLine={zoomTimeline} scale={10} />
                                    </ZoomTimeline>
                                    <div className="h-4  relative rounded-md    border-gray-500">
                                        <ZoomSelect timeLine={zoomTimeline} control={setZoomTimeline} />
                                    </div>

                                </div>
                            </div>

                            <TimelineActive control={setSelected} isSelected={isSelected} setZoomTimeline={setZoomTimeline} timeLine={newTimeLine} />
                            {passiveTimelines}

                        </div>

                    </div>

                </div>
                <OutPut sessionUsers={sessionUsers} />
                <button onClick={handleClick} className="hover:border-gray-500 border-gray-100 border-2 rounded-md p-3 cursor-pointer bg-gray-200  mx-auto block text-center mt-6 ">
                    Reset session
                </button>

            </Background>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}