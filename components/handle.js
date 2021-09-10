import React from 'react'
import { useDrag } from '../hooks/useDrag'
import { getPosition } from '../helpers/getPosition'

const handleStyle = " cursor-pointer bg-red-900 h-10 opacity-50  w-2 absolute text-center z-30 leading-10 disable-select"

export function Handle({ control, timeLine }) {

    const handleMouseDown = useDrag(control, "translateTimeline")

    return (
        <div>
            <div onMouseDown={handleMouseDown} className="bg-red-900 cursor-pointer  h-12 mx-auto w-32 block text-center leading-10 disable-select">
                DRAG ME
            </div>
        </div>

    )
}


export function SelectElement({ control, timeLine }) {

    const handleMouseLeft = useDrag(control, "left")
    const handleMouseCenter = useDrag(control, "center")
    const handleMouseRight = useDrag(control, "right")

    const leftPosition = getPosition(timeLine.isSelected.start, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(timeLine.isSelected.end, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition
    return (
        <React.Fragment>
            <div style={{ left: leftPosition, width: 10, opacity: 100, zIndex: 100 }} onMouseDown={handleMouseLeft} className={handleStyle} />
            <div style={{ left: leftPosition, width: width }} onMouseDown={handleMouseCenter} className={handleStyle} />
            <div style={{ right: timeLine.pixelWidth - rightPosition, width: 10, opacity: 100, zIndex: 100 }} onMouseDown={handleMouseRight} className={handleStyle} />
        </React.Fragment>
    )
}

export function ShowSelection({ isSelectedStart, isSelectedEnd, timeLine }) {
    const leftPosition = getPosition(isSelectedStart, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(isSelectedEnd, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition
    return (
        <React.Fragment>
            <div style={{ left: leftPosition, width: width }} className={handleStyle} />
        </React.Fragment>
    )


}

