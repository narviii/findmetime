import React from "react"
import { useMounted } from "../hooks/useMounted"
import { getPosition } from '../helpers/getPosition'
import moment from "moment"

export function PositionElement({ children,start,end, timeLine, zIndex }) {
    const leftPosition = getPosition(start.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(end.clone(), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition

    return (
        <div style={{ left: leftPosition, width: width, zIndex: zIndex }} className="absolute disable-select h-full">
            {children}
        </div>

    )
}