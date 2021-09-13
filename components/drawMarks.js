import React from 'react'
var moment = require('moment-timezone');
import { getPosition } from '../helpers/getPosition'
import { Now } from '/components/now';





export function DrawMark({ mark, timeLine }) {

    const leftPosition = getPosition(mark.start.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(mark.end.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition


    return (
        <div style={{ left: leftPosition, width: width }} className="border rounded-lg disable-select flex flex-col justify-center   absolute  text-center h-full   z-10 bg-gray-300   ">
            <div className="text-base leading-tight">
                {mark.start.clone().startOf("hour").format("h")}
            </div>
            <div className=" text-tiny leading-tight">
                {mark.start.clone().startOf("hour").format("a")}
            </div>
        </div>
    )
}


export function DrawMarks({ timeLine,tz }) {

    const start = timeLine.start.clone().subtract(1, "hours")
    const end = timeLine.end.clone().add(1, "hours")

    if (tz){
       start.tz(tz)
       end.tz(tz)
    }

    let marks = []

    do {
        marks.push({
            start: start.clone().startOf("hour"),
            end: start.clone().endOf("hour")
        })

        start.add(1, "hours")


    } while (moment.duration(end.clone().subtract(start.clone())).asHours() > 0)


    const marksEl = marks.map((item) => <DrawMark key={item.start.clone().format("dddd, MMMM Do YYYY, h:mm:ss a")}  timeLine={timeLine} mark={item} />)


    return (
        <div>
            {marksEl}
            <Now timeLine={timeLine} />

        </div>
    )
}