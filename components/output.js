import React from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';





export const OutPut = ({ sessionUsers }) => {
    const moment = extendMoment(Moment)
    const ranges = []
    let intersectRange

    if (sessionUsers){
        for (const key in sessionUsers){
            const range = moment.range(moment(sessionUsers[key].start),moment(sessionUsers[key].end))
            ranges.push(range)
        }
    }

    for (let i=0;i<ranges.length-1;i++){
        if (i==0){
            intersectRange = ranges[i].intersect(ranges[i+1])
        } else{
            intersectRange = intersectRange.intersect(ranges[i+1])

        }
    }
    


    return (
        <React.Fragment>
            <div className="mx-auto max-w-screen-xl w- w-4/12 ">
                <p className="text-center text-sm">
                    Intersection of all selected intervals:
                </p>
                <p>
                    {intersectRange?intersectRange.start.format("dddd, MMMM Do YYYY, h:mm:ss a"):"    "}
                </p>
                <p>
                    {intersectRange?intersectRange.end.format("dddd, MMMM Do YYYY, h:mm:ss a"):"   "}
                </p>
            </div>
        </React.Fragment>
    )
}