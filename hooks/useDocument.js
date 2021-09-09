import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react"
import moment from 'moment'



export const useDocumentData = (docref) => {
    const [data, setData] = useState()

    useEffect(() => {
        
        const unsub = onSnapshot(docref, (doc) => {
            setData({
                start:moment(doc.data().start),
                end:moment(doc.data().end)
            })
        })
        return unsub
    },[])

    return data?data:{start:moment(),end:moment()}

}