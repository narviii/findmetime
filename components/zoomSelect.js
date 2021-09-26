import React from "react";
import { PositionElement } from "./positionElement"
import moment, { Moment } from "moment";
import { useDrag } from '../hooks/useDrag'

const zoomStyle = " cursor-pointer border border-gray-500 h-full z-50 rounded-lg  w-full absolute text-center z-10  leading-10 disable-select "



export function ZoomSelect({ children, timeLine,control }) {
    const handleMouseDown = useDrag(control, "zoomSelect", timeLine)

    return (
        <React.Fragment>
            <PositionElement start={timeLine.zoomStart} end={timeLine.zoomEnd} timeLine={timeLine}>
                <div className={zoomStyle}>

                </div>
            </PositionElement>
            <PositionElement start={timeLine.zoomStart} end={timeLine.zoomStart.clone().add(1, "hours")} timeLine={timeLine}>
                <div onMouseDown={handleMouseDown} className={zoomStyle + "bg-gray-500"}>

                </div>
            </PositionElement>
            <PositionElement end={timeLine.zoomEnd} start={timeLine.zoomEnd.clone().subtract(1, "hours")} timeLine={timeLine}>
                <div onMouseDown={handleMouseDown} className={zoomStyle + "bg-gray-500"}>

                </div>
            </PositionElement>
        </React.Fragment>
    )
}