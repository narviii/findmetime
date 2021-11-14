import { getPosition } from '../helpers/getPosition'
import moment from "moment"

export function Now({ timeLine,scale }) {

    const leftPosition = getPosition(moment().subtract(1*scale, "minutes"), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(moment().add(1*scale, "minutes"), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition

    const center = getPosition(moment(), timeLine.start, timeLine.end, timeLine.pixelWidth)


    return (
        <div style={{ left: center-2, width: 4 }} className=" disable-select   absolute   h-full leading-10  rounded-md z-50 bg-red-500 "/>
    )
}