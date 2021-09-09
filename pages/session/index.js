import React, { useEffect, useRef, useReducer } from 'react'
import moment from "moment";
import { Handle, SelectElement } from '/components/handle'
import { DrawMarks } from '/components/drawMarks'
import { db } from '/helpers/firebase'
import { doc, setDoc } from "firebase/firestore";
import { selectionReducer } from '/helpers/selectionReducer';
import { Background } from '/components/background';
import { useRouter } from 'next/router'
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuth } from '/hooks/useAuth'
import { useSessionUsers } from '/hooks/useSessionUsers';
import { Timeline } from '/components/Timeline'


export default function Home() {

    const router = useRouter()
    const sessionUsers = useSessionUsers(router.query.id)
    const user = useAuth()

    let passiveTimelines

    if (sessionUsers) {
        passiveTimelines = sessionUsers.map((item) => {

            return (
                <Timeline docId={item} isActive={false} />
            )
        })
    }

    return (
        <React.Fragment>
            <Background>
                <Timeline isActive={true} />
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