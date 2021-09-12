import React from 'react'
import moment from 'moment'
import { getPosition } from '../helpers/getPosition'
import { Now } from '/components/now';





export function DrawMark({ mark, timeLine }) {

    const leftPosition = getPosition(mark.start.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(mark.end.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition


    return (
        <div style={{ left: leftPosition, width: width }} className="border rounded-lg disable-select flex flex-col justify-center   absolute  text-center h-full   z-10 bg-gray-300   ">
            <div className = "text-base leading-tight">
                {mark.start.clone().startOf("hour").format("h")}
            </div>
            <div className=" text-xs leading-tight">
            {mark.start.clone().startOf("hour").format("a")}
            </div>
        </div>
    )
}


export function DrawMarks({ timeLine }) {
    const start = timeLine.start.clone().subtract(1, "hours")
    const end = timeLine.end.clone().add(1, "hours")
    let marks = []

    do {
        marks.push({
            start: start.clone().startOf("hour"),
            end: start.clone().endOf("hour")
        })

        start.add(1, "hours")


    } while (moment.duration(end.clone().subtract(start.clone())).asHours() > 0)


    const marksEl = marks.map((item) => <DrawMark key={Math.random().toString(36).substr(2, 5)} timeLine={timeLine} mark={item} />)


    return (
        <React.Fragment>
            {marksEl}
            <Now timeLine={timeLine} />

        </React.Fragment>
    )
}