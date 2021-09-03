import { getBorderTimes } from "../helpers/timeBorderHelper"
import { getSelectorPosition } from "../helpers/selectorPosition"
import moment from "moment"

export function Now({timeLineState,timeLineView}) {
    
    const borderTimes = getBorderTimes(timeLineState,timeLineView)
    const { left, width } = getSelectorPosition({start:moment().subtract(1,"minutes"),end:moment().add(1,"minutes")},borderTimes, timeLineView)
    return (
        <div style={{left:left,width:width}} className="left-1/2 disable-select  w-1  absolute  text-center h-10 leading-10  rounded-sm z-50 bg-red-900   ">

        </div>
    )
}