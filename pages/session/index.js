import React, { useEffect, useRef, useReducer } from 'react'
import moment from "moment";
import { Background } from '/components/background';
import { useRouter } from 'next/router'
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuth } from '/hooks/useAuth'
import { useSessionUsers } from '/hooks/useSessionUsers';
import { TimelineActive, TimeLinePassive } from '../../components/timeline';
import { timeLineReducer } from '/helpers/selectionReducer';
import { Handle, SelectElement } from '/components/handle'






export default function Home() {
    const router = useRouter()
    const sessionUsers = useSessionUsers(router.query.id)
    const user = useAuth()
    const timelineContainerRef = useRef(0)
    


    const [timeLine, setTimeLine] = useReducer(
        timeLineReducer,
        {
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


    
    let passiveTimelines
    if (sessionUsers&&user) {
        const usersList = Object.keys(sessionUsers)
        passiveTimelines = usersList.map((item) => {
            if (item != user.uid) {
                return (
                    <TimeLinePassive timeLine={timeLine} isSelectedStart = {moment(sessionUsers[item].start)} isSelectedEnd = {moment(sessionUsers[item].end)} />
                )
            }

        })
    }
    

    return (
        <React.Fragment>
            <Background>
                <div ref={timelineContainerRef} className="bg-gray-100 h-2/5 w-10/12 mx-auto block rounded-lg ">
                    <TimelineActive timeLine={timeLine} />
                    {passiveTimelines}
                </div>
                <Handle control={setTimeLine} timeLine={timeLine} />
            </Background>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}