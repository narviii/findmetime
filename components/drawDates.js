import React from "react"
import { useMounted } from "../hooks/useMounted"
import { getPosition } from '../helpers/getPosition'
import moment from "moment"
import { PositionElement } from "./positionElement"

export function DrawZoomDates({ timeLine, children }) {
    const mounted = useMounted()
    let dates = []

    const start = timeLine.start.clone().subtract(1, "days")
    const end = timeLine.end.clone().add(1, "days")


    if (mounted === true) {
        do {
            dates.push({
                start: start.clone().startOf("day"),
                end: start.clone().endOf("day")
            })

            start.add(1, "days")


        } while (moment.duration(end.clone().subtract(start.clone())).asHours() > 0)
    }
    const datesEl = dates.map((date) => <DrawDate date={date} timeLine={timeLine} />)

    return (
        <React.Fragment>
            {datesEl}
        </React.Fragment>
    )
}

function DrawDate({ date, timeLine }) {
    const leftPosition = getPosition(date.start.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(date.end.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition

    return (
        <React.Fragment>
            <div style={{ left: leftPosition, width: width, zIndex: 100 }} className="text-sm absolute">
                {date.start.clone().format("ddd")}
            </div>
            <div style={{ left: leftPosition, width: width, zIndex: 100 }} className="text-center text-sm  absolute">
                {date.start.clone().format("MMMM Do")}
            </div>
        </React.Fragment>
    )
}

export function DrawDates({ timeLine, tz }) {
    const mounted = useMounted()
    let dates = []

    const start = timeLine.start.clone().subtract(1, "days")
    const end = timeLine.end.clone().add(1, "days")

    if (tz) {
        start.tz(tz)
        end.tz(tz)
    }

    if (mounted === true) {
        do {
            dates.push({
                start: start.clone().startOf("day"),
                end: start.clone().endOf("day")
            })

            start.add(1, "days")


        } while (moment.duration(end.clone().subtract(start.clone())).asHours() > 0)
    }

    const datesEl = dates.map((date) => <DrawDate date={date} timeLine={timeLine} />)


    return (
        <React.Fragment>
            {datesEl}
        </React.Fragment>
    )
}