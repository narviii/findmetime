import Head from 'next/head'
import React from 'react'
import { createTimeline } from '../helpers/timelinehelper'
import { HourSlot } from '../components/timeslot'
import { useRef } from 'react'
import moment from "moment";

export default function Home() {
  const main = createTimeline("main");
  main.init();
  main.addFutureHours(12);
  main.addPastHours(12);
  //console.log(main.get())
  const isSelected = {
    start: moment().add(2, "hour"),
    end: moment().subtract(2, "hour")
  }
  const slots = main.get().map(item => {

    return <HourSlot
      isSelected={isSelected}
      label={item.start.clone().hour()}
      hour = {item}
       />
  })

  return (
    <React.Fragment>
      
      <div className="bg-green-200 h-screen flex flex-col justify-center   ">
        
        <div className="bg-gray-100 h-5/6 w-10/12 mx-auto rounded-lg ">
          
          <ul className="flex flex-nowrap overflow-x-scroll no-scrollbar">
            
            {slots}
          </ul>

        </div>
      </div>
    </React.Fragment>
  )
}
