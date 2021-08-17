import Head from 'next/head'
import React from 'react'
import { createTimeline } from '../helpers/timelinehelper'
import {HourSlot} from '../components/timeslot'

export default function Home() {
  const main = createTimeline("main");
  main.init();
  main.addFutureHours(3);
  main.addPastHours(3);
  const slots = main.get().map(item=>{
    console.log(item)
    return <HourSlot label = {item.start.clone().hour()}/>
  })
  
  return (
    <React.Fragment>
      <div className="bg-green-200 h-screen flex flex-col justify-center ">
        <div className="bg-gray-100 h-5/6 w-10/12 mx-auto rounded-lg">
          {slots}
        </div>
      </div>
    </React.Fragment>
  )
}
