import { getPosition } from '../helpers/getPosition'
import moment from "moment"

export function Now({ timeLine,scale }) {

    const leftPosition = getPosition(moment().subtract(1*scale, "minutes"), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(moment().add(1*scale, "minutes"), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition


    return (
        <div style={{ left: leftPosition, width: width }} className=" disable-select  w-1  absolute  text-center h-full leading-10  rounded-sm z-50 bg-red-500 "/>
    )
}