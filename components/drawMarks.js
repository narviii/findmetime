import React from 'react'
var moment = require('moment-timezone');
import { getPosition } from '../helpers/getPosition'
import { useState, useEffect } from 'react';
import { useMounted } from '../hooks/useMounted';


const generalMark = " border-l border-r border-gray-500 disable-select flex flex-col justify-center  rounded-md    absolute  text-center h-full   z-20  "
const hour23 = " rounded-md border-l border-r  border-gray-500 disable-select flex flex-col justify-center    absolute  text-center h-full   z-20  "
const hour00 = " rounded-md border-l border-r  border-gray-500 disable-select flex flex-col justify-center    absolute  text-center h-full   z-20  "


export function DrawMark({ isSelected, mark, timeLine }) {


    const leftPosition = getPosition(mark.start.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(mark.end.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition
    let bgColor = ""
    let textColor = ""

    let zoomFlag

    //console.log(moment.duration(timeLine.end.clone().subtract(timeLine.start.clone())).asHours())

    if (moment.duration(timeLine.end.clone().subtract(timeLine.start.clone())).asHours()<35) {
        zoomFlag = true
    }else{
        zoomFlag = false
    }
    //console.log(zoomFlag)

    if (isSelected.start && isSelected.end) {
        if (mark.start.clone().add(0.5, "hours").isBetween(isSelected.start.clone(), isSelected.end.clone())) {
            textColor = " text-red-500"
        }
    }

    if (mark.start.clone().startOf("hour").hour() > 6 && mark.start.clone().startOf("hour").hour() < 21) {
        bgColor = ""
    } else {
        bgColor = "bg-gray-300"
    }




    if (mark.start.clone().startOf("hour").hour() == 23) {
        return (
            <div style={{ left: leftPosition, width: width }} className={hour23 + bgColor + textColor}>
                <div className="  text-base leading-tight" >
                    {zoomFlag==true?mark.start.clone().startOf("hour").format("h"):null}
                </div>
                <div className=" text-tiny leading-tight">
                    {zoomFlag==true?mark.start.clone().startOf("hour").format("a"):null}
                </div>
            </div>
        )
    }

    if (mark.start.clone().startOf("hour").hour() == 0) {
        return (
            <React.Fragment>


                <div style={{ left: leftPosition, width: width }} className={hour00 + bgColor + textColor}>

                    <div className={"text-base leading-tight" + textColor}>
                        {zoomFlag==true?mark.start.clone().startOf("hour").format("MMM"):null}
                    </div>
                    <div className={" text-xs leading-tight" + textColor}>
                        {zoomFlag==true?mark.start.clone().startOf("hour").format("D"):null}
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <div style={{ left: leftPosition, width: width }} className={generalMark + bgColor + textColor}>
            <div className="text-base leading-tight">
                {zoomFlag==true?mark.start.clone().startOf("hour").format("h"):null}
            </div>
            <div className=" text-tiny leading-tight">
                {zoomFlag==true?mark.start.clone().startOf("hour").format("a"):null}
            </div>
        </div>
    )
}


export function DrawMarks({ isSelected, timeLine, tz }) {
    const mounted = useMounted()

    let marks = []

    const start = timeLine.start.clone().subtract(1, "hours")
    const end = timeLine.end.clone().add(1, "hours")

    if (tz) {
        start.tz(tz)
        end.tz(tz)
    }

    if (mounted == true) { // make sure we are on client
        do {
            marks.push({
                start: start.clone().startOf("hour"),
                end: start.clone().endOf("hour")
            })

            start.add(1, "hours")


        } while (moment.duration(end.clone().subtract(start.clone())).asHours() > 0)
    }

    const marksEl = marks.map((item) => <DrawMark isSelected={isSelected} key={item.start.clone().format("dddd, MMMM Do YYYY, h:mm:ss a")} timeLine={timeLine} mark={item} />)


    return (
        <div>
            {marksEl}
        </div>
    )
}