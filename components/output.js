import React from 'react'
import Moment from 'moment';
import { extendMoment } from 'moment-range';





export const OutPut = ({ sessionUsers }) => {
    const moment = extendMoment(Moment)
    const ranges = []
    let intersectRange

    if (!sessionUsers) return (
        <div className="mx-auto h-20     w-max mt-6  rounded-md p-4 ">
        </div>
    )

    if (Object.keys(sessionUsers).length > 1) {
        for (const key in sessionUsers) {
            if (sessionUsers[key].start && sessionUsers[key].end) {
                const range = moment.range(moment(sessionUsers[key].start), moment(sessionUsers[key].end))
                ranges.push(range)
            }

        }
    }

    if (ranges.length < Object.keys(sessionUsers).length) return (
        <div className="mx-auto h-20     w-max mt-6  rounded-md p-4 ">
        </div>
    )

    let i = 0
    if (ranges.length > 1) {
        do {
            if (i == 0) {
                intersectRange = ranges[i].intersect(ranges[i + 1])
            } else {
                intersectRange = intersectRange.intersect(ranges[i + 1])

            }
            i++
        } while ((i < ranges.length - 1) && intersectRange != null)
    }

    if (!intersectRange) return (
        <div className="mx-auto h-20     w-max mt-6  rounded-md p-4 ">
        </div>
    )


    return (
        <React.Fragment>
            <div className="mx-auto h-20    w-max mt-6  rounded-md p-4 ">

                <div>All parties are available from </div>

                <div className="justify-around items-center flex  h-10">
                    <div className="text-red-500 font-bold m-2 ">
                        <div>{intersectRange.start.format("h:mm a")}</div>
                        <div className="text-xs text-center">{intersectRange.start.format("MMM do")}</div>
                    </div>


                    <div className="">
                        to
                    </div>
                    <div className="text-red-500 font-bold m-2 ">
                        <div>{intersectRange.end.format("h:mm a")}</div>
                        <div className="text-xs text-center">{intersectRange.end.format("MMM do")}</div>
                    </div>
                </div>





            </div>


        </React.Fragment>
    )
}