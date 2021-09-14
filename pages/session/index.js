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

export const timeLineClass = "h-12 m-1 mt-4 relative  overflow-block-clip border-l border-r border-gray-500"



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

    const [isSelected, setSelected] = useReducer(
        selectionReducer,
        {
            start: moment().subtract(1, "hours"),
            end: moment().add(1, "hours")
        },
    )

    useEffect(() => {
        setTimeLine({ type: 'set_width', width: timelineContainerRef.current?timelineContainerRef.current.offsetWidth:0 })
        window.addEventListener('resize', function () {
            setTimeLine({ type: 'set_width', width: timelineContainerRef.current?timelineContainerRef.current.offsetWidth:0 })
        });
    }, [])

    


    let passiveTimelines
    let sessionUserNames

    

    if (sessionUsers && user) {
        let usersList = Object.keys(sessionUsers)

        usersList = removeItemOnce(usersList,user.uid) //make sure active user is allways first elemement of array
        usersList.unshift(user.uid)
        
        sessionUserNames = usersList.map((item) => {
            return (
                <UserName key={item+"user"} uid = {item}/>
            )
        })

        passiveTimelines = usersList.map((item) => {
            
            if (item != user.uid) {
                return (
                    <TimeLinePassive key = {item} timeLine={timeLine} tz={sessionUsers[item].tz} isSelectedStart={moment(sessionUsers[item].start)} isSelectedEnd={moment(sessionUsers[item].end)} />
                )
            }

        })
    }





    return (
        <React.Fragment>
            <Background>
                <div className="grid grid-cols-5  p-5">
                    <div className=" bg-gray-100  w-full mx-auto block rounded-lg">
                        {sessionUserNames}
                    </div>
                    <div ref={timelineContainerRef} className="bg-gray-100  w-full mx-auto block rounded-lg col-span-4">
                        <TimelineActive isSelected={isSelected} setSelected={setSelected} timeLine={timeLine} />
                        {passiveTimelines}
                        <Handle control={setTimeLine} timeLine={timeLine} />
                    </div>

                </div>

            </Background>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}