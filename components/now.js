import { getPosition } from '../helpers/getPosition'
import moment from "moment"

export function Now({ timeLine }) {

    const leftPosition = getPosition(moment().subtract(1, "minutes"), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const rightPosition = getPosition(moment().add(1, "minutes"), timeLine.start, timeLine.end, timeLine.pixelWidth)
    const width = rightPosition - leftPosition


    return (
        <div style={{ left: leftPosition, width: width }} className=" disable-select  w-1  absolute  text-center h-10 leading-10  rounded-sm z-50 bg-green-900   ">

        </div>
    )
}