import React from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';





export const OutPut = ({ sessionUsers }) => {
    const moment = extendMoment(Moment)
    const ranges = []
    let intersectRange

    if (sessionUsers&&Object.keys(sessionUsers).length>1) {
        for (const key in sessionUsers) {
            const range = moment.range(moment(sessionUsers[key].start), moment(sessionUsers[key].end))
            ranges.push(range)
        }
    }

    let i = 0
    if (sessionUsers&&Object.keys(sessionUsers).length>1) {
        do {
            if (i == 0) {
                intersectRange = ranges[i].intersect(ranges[i + 1])
            } else {
                intersectRange = intersectRange.intersect(ranges[i + 1])

            }
            i++
        } while ((i < ranges.length - 1) && intersectRange != null)
    }

    /*
    for (let i=0;i<ranges.length-1;i++){
        if (i==0){
            intersectRange = ranges[i].intersect(ranges[i+1])
        } else{
            intersectRange = intersectRange.intersect(ranges[i+1])

        }
    }
    */


    return (
        <React.Fragment>
            <p className="text-center text-sm mt-4">
                All parties are available on:
            </p>
            <div className="mx-auto items-center max-w-screen-xl h-24 grid grid-cols-2 justify-center w-2/5 mt-2 border rounded-md p-4 border-black ">

                <span className="text-center text-sm align">
                    {intersectRange ? intersectRange.start.format("dddd, MMMM Do YYYY, h:mm a") : "    "}
                </span>
                <span className="text-center text-sm">
                    {intersectRange ? intersectRange.end.format("dddd, MMMM Do YYYY, h:mm a") : "   "}
                </span>
            </div>
        </React.Fragment>
    )
}