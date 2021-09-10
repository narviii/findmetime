import React, { useEffect, useRef, useReducer } from 'react'
import moment from "moment";
import { Background } from '/components/background';
import { useRouter } from 'next/router'
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuth } from '/hooks/useAuth'
import { useSessionUsers } from '/hooks/useSessionUsers';
import { TimelineActive, TimeLinePassive } from '../../components/timeline';


export default function Home() {

    const router = useRouter()
    const sessionUsers = useSessionUsers(router.query.id)
    const user = useAuth()
    

    let passiveTimelines

    if (sessionUsers&&user) {
        const usersList = Object.keys(sessionUsers)
        passiveTimelines = usersList.map((item) => {
            if (item != user.uid) {
                return (
                    <TimeLinePassive isSelectedStart = {moment(sessionUsers[item].start)} isSelectedEnd = {moment(sessionUsers[item].end)} />
                )
            }

        })
    }

    return (
        <React.Fragment>
            <Background>
                <TimelineActive />
                {passiveTimelines}
            </Background>
        </React.Fragment>
    )
}


export async function getServerSideProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}