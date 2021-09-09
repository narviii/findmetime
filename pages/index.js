import Head from 'next/head'
import React, { createContext, useContext, useEffect, useState, useRef, useReducer } from 'react'
import moment from "moment";
import { Now } from '../components/now';
import { Handle, SelectElement } from '../components/handle'
import { DrawMarks } from '../components/drawMarks'
import { db } from '../helpers/firebase'
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useDocumentData } from '../hooks/useDocument';
import { selectionReducer } from '../helpers/selectionReducer';
import { Background } from '/components/background';


export default function Home() {
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
    await setDoc(doc(db, "sessions", "default"), {
      start: timeLine.isSelected.start.clone().utc().format(),
      end: timeLine.isSelected.end.clone().utc().format(),

    });

  }, [timeLine.isSelected])


  const data = useDocumentData(doc(db, "sessions", "default"))

  return (
    <React.Fragment>
      <Background>
        <div ref={timelineContainerRef} className="relative overflow-block-clip mt-1 ">
          <div className="h-12">
            <SelectElement control={setTimeLine} timeLine={timeLine} />
            <Now timeLine={timeLine} />
            <DrawMarks timeLine={timeLine} />
          </div>
          <Handle control={setTimeLine} timeLine={timeLine} />
        </div>
      </Background>
    </React.Fragment>
  )
}
