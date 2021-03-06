import React from 'react'
import { useDrag } from '../hooks/useDrag'
import { getPosition } from '../helpers/getPosition'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'

const handleStyle = " cursor-pointer border-2 border-red-500 h-full z-50 rounded-lg  w-2 absolute text-center z-10  leading-10 disable-select"
const handleStyle2 = " cursor-pointer bg-red-500   h-full rounded-lg  w-2 absolute text-center z-10  leading-10 disable-select"


export function Handle({ control }) {

    const handleMouseDown = useDrag(control, "scaleTimeline")

    return (
        <div onMouseDown={handleMouseDown} className="flex flex-col justify-center align-middle cursor-pointer">
            <FontAwesomeIcon icon={faAngleDoubleUp} className="" />
            <div className="bg-border rounded-lg  block  disable-select">
                ZOOM
            </div>
            <FontAwesomeIcon icon={faAngleDoubleDown} className="text-center " />
        </div>

    )
}


export function SelectElement({ isSelected, control, timeLine }) {

    const handleMouseLeft = useDrag(control, "left", timeLine)
    const handleMouseCenter = useDrag(control, "center", timeLine)
    const handleMouseRight = useDrag(control, "right", timeLine)

    const handleWidth = 10

    if (isSelected.start && isSelected.end) {
        const leftPosition = getPosition(isSelected.start, timeLine.start, timeLine.end, timeLine.pixelWidth)
        const rightPosition = getPosition(isSelected.end, timeLine.start, timeLine.end, timeLine.pixelWidth)
        const width = rightPosition - leftPosition
        return (
            <div>
                <div style={{ left: leftPosition, width: handleWidth, zIndex: 100 }} onMouseDown={handleMouseLeft} className={handleStyle2} />
                <div style={{ left: leftPosition, width: width, zIndex: 80 }} onMouseDown={handleMouseCenter} className={handleStyle} />
                <div style={{ left: rightPosition - handleWidth, width: handleWidth, zIndex: 100 }} onMouseDown={handleMouseRight} className={handleStyle2} />
            </div>
        )
    }

    return null
}

export function ShowSelection({ isSelectedStart, isSelectedEnd, timeLine }) {
    const leftPosition = getPosition(isSelectedStart, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(isSelectedEnd, timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition
    return (

        <div style={{ zIndex: 100, left: leftPosition, width: width }} className={handleStyle} />

    )


}

