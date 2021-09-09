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


export default function Home() {
    const auth = getAuth();
    const router = useRouter()
    const user = useAuth()
    const sessionUsers = useSessionUsers(router.query.id)

    if (user) {
        console.log(`My UID: ${user.uid}`)
    }


    signInAnonymously(auth)
        .then(() => {
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });



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
            await setDoc(doc(db, "sessions", router.query.id, "users", auth.currentUser.uid), {
                start: timeLine.isSelected.start.clone().utc().format(),
                end: timeLine.isSelected.end.clone().utc().format(),

            });
        }
    }, [timeLine.isSelected, user])








    return (
        <React.Fragment>
            <Background>
                <div ref={timelineContainerRef} className="relative overflow-block-clip mt-1 ">
                    <div className="h-12">
                        <SelectElement control={setTimeLine} timeLine={timeLine} />
                        <DrawMarks timeLine={timeLine} />
                    </div>
                    <Handle control={setTimeLine} timeLine={timeLine} />
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