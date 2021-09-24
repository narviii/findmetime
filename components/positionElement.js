import React from "react"
import { useMounted } from "../hooks/useMounted"
import { getPosition } from '../helpers/getPosition'
import moment from "moment"

export function PositionElement({ children, timeLine, zIndex }) {
    const leftPosition = getPosition(date.start.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(date.end.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition

    return (
        <div style={{ left: leftPosition, width: width, zIndex: zIndex }} className="absolute">
            {children}
        </div>

    )
}