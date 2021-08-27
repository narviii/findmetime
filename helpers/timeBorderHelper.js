import moment from "moment"
import { calculatePosition } from "./calculatePosition"


const leftBorderTime = (timeLineState, timeLineView) => {
    const res = timeLineState.get().find((element) => {
        const pos = calculatePosition(timeLineView.width, element.index, timeLineView.offset)
        if (pos < 0 && (pos + timeLineView.hourWidth) > 0) {
            return true
        }
    })

    if (!res) return null
    const pos = calculatePosition(timeLineView.width, res.index, timeLineView.offset)
    return res.start.clone().add(Math.abs(pos) / timeLineView.hourWidth, "hours");
}



const rightBorderTime = (timeLineState, timeLineView) => {
    const res = timeLineState.get().find((element) => {
        const pos = calculatePosition(timeLineView.width, element.index, timeLineView.offset)
        if (pos < timeLineView.width && (pos + timeLineView.hourWidth) > timeLineView.width) {
            return true
        }
    })

    if (!res) return null
    const pos = calculatePosition(timeLineView.width, res.index, timeLineView.offset)
    return res.start.clone().add((timeLineView.width - pos) / timeLineView.hourWidth, "hours");
}

export const getBorderTimes = (timeLineState, timeLineView) => {
    return {
        start: leftBorderTime(timeLineState, timeLineView)||moment(),
        end: rightBorderTime(timeLineState, timeLineView)||moment()
    }
}