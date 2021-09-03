import React from 'react'
import { useDrag } from '../hooks/useDrag'
import { getPosition } from '../helpers/getPosition'

const handleStyle = " cursor-pointer bg-red-900 h-10 opacity-50  w-2 absolute text-center z-30 leading-10 disable-select"

export function Handle({ control }) {

    const handleMouseDown = useDrag(control)

    return (
        <div>
            <div onMouseDown={handleMouseDown} className="bg-red-900 cursor-pointer  h-12 mx-auto w-32 block text-center leading-10 disable-select">
                DRAG ME
            </div>
        </div>

    )
}


export function SelectElement({ control, isSelected, timeLineState, timeLineView }) {

    const handleMouseLeft = useDrag(control,"left")
    const handleMouseCenter = useDrag(control,"center")
    const handleMouseRight = useDrag(control,"right")

    const leftPosition = getPosition(isSelected.start, timeLineState, timeLineView)
    const rightPosition = getPosition(isSelected.end, timeLineState, timeLineView)
    const width = rightPosition - leftPosition
    return (
        <React.Fragment>
            <div style={{ left: leftPosition, width:10,opacity:100,zIndex:100 }} onMouseDown={handleMouseLeft} className={handleStyle} />
            <div style={{ left: leftPosition, width: width }} onMouseDown={handleMouseCenter} className={handleStyle} />
            <div style={{ right: timeLineView.width-rightPosition, width: 10,opacity:100,zIndex:100 }} onMouseDown={handleMouseRight} className={handleStyle} />
        </React.Fragment>
    )
}

