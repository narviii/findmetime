import React from 'react'
import { useDrag } from '../hooks/useDrag'
import { getPosition } from '../helpers/getPosition'

const handleStyle = " cursor-pointer bg-red-900 h-full opacity-50 rounded-lg  w-2 absolute text-center z-30 leading-10 disable-select"

export function Handle({ control, timeLine }) {

    const handleMouseDown = useDrag(control, "translateTimeline")

    return (
        <div>
            <div onMouseDown={handleMouseDown} className="bg-red-900 cursor-pointer rounded-lg    mx-auto w-32 block text-center leading-10 disable-select">
                DRAG ME
            </div>
        </div>

    )
}


export function SelectElement({isSelected, control, timeLine }) {

    const handleMouseLeft = useDrag(control, "left",timeLine)
    const handleMouseCenter = useDrag(control, "center",timeLine)
    const handleMouseRight = useDrag(control, "right",timeLine)

    const handleWidth = 10

    const leftPosition = getPosition(isSelected.start, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(isSelected.end, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition
    return (
        <div>
            <div style={{ left: leftPosition, width: handleWidth, opacity: 100, zIndex: 100 }} onMouseDown={handleMouseLeft} className={handleStyle} />
            <div style={{ left: leftPosition, width: width }} onMouseDown={handleMouseCenter} className={handleStyle} />
            <div style={{ right: timeLine.pixelWidth - rightPosition-handleWidth, width: handleWidth, opacity: 100, zIndex: 100 }} onMouseDown={handleMouseRight} className={handleStyle} />
        </div>
    )
}

export function ShowSelection({ isSelectedStart, isSelectedEnd, timeLine }) {
    const leftPosition = getPosition(isSelectedStart, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(isSelectedEnd, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition
    return (
        
            <div style={{ left: leftPosition, width: width }} className={handleStyle} />
       
    )


}

