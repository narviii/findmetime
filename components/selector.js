import { getBorderTimes } from "../helpers/timeBorderHelper"
import { getSelectorPosition } from "../helpers/selectorPosition"
import { LeftHandle,RightHandle } from "./handle"


export function Selector({ isSelected, timeLineState, timeLineView, children }) {
    const borderTimes = getBorderTimes(timeLineState, timeLineView)
    const { left, width } = getSelectorPosition(isSelected, borderTimes, timeLineView)

    return (
        <div style={{ left: left, width: width }} className="left-1/2 disable-select  w-96  absolute  text-center h-10 leading-10  rounded-sm m-1 z-30 bg-green-300 opacity-50  ">
            <LeftHandle/>
            <RightHandle/>

        </div>
    )
}