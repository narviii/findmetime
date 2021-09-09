import React, { useEffect, useRef, useReducer } from 'react'
import moment from "moment";
import { Handle, SelectElement } from '/components/handle'
import { DrawMarks } from '/components/drawMarks'
import { db } from '/helpers/firebase'
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { selectionReducer } from '/helpers/selectionReducer';
import { useRouter } from 'next/router'
import { getAuth, signInAnonymously } from "firebase/auth";
import { useAuth } from '/hooks/useAuth'
import { useSessionUsers } from '/hooks/useSessionUsers';
import { useDocumentData } from '../hooks/useDocument';


export function Timeline({ isActive, docId }) {
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

    if (docId && isActive == false) {
        //console.log('aaa')
        const unsub = onSnapshot(doc(db, "sessions", router.query.id, "users", docId), (doc) => {
            //console.log(moment(doc.data().start))
            setTimeLine({type:"set_controled",payload:{start:moment(doc.data().start),end:moment(doc.data().end)}})
            /*
            setData({
                start: moment(doc.data().start),
                end: moment(doc.data().end)
            })
            */
        })
        //const docData = useDocumentData(doc(db, "sessions", router.query.id, "users", docId))
        //console.log(docData)
    }



    useEffect(() => {
        setTimeLine({ type: 'set_width', width: timelineContainerRef.current.offsetWidth || 0 })
        window.addEventListener('resize', function () {
            setTimeLine({ type: 'set_width', width: timelineContainerRef.current.offsetWidth || 0 })
        });
    }, [])


    useEffect(async () => {

        if (auth.currentUser && isActive === true) {
            await setDoc(doc(db, "sessions", router.query.id, "users", auth.currentUser.uid), {
                start: timeLine.isSelected.start.clone().utc().format(),
                end: timeLine.isSelected.end.clone().utc().format(),

            });
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