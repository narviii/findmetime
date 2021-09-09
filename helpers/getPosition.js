import { getBorderTimes } from "../helpers/timeBorderHelper"
import moment from "moment"

export function getPosition(time, timeLineStart,timeLineEnd,pixelWidth) {
    const borderTimes = {
        start: timeLineStart,
        end: timeLineEnd
    }
    const timeWidthHours = moment.duration(borderTimes.end.clone().subtract(borderTimes.start.clone())).asHours()
    const positionHours = moment.duration(time.clone().subtract(borderTimes.start.clone())).asHours()
    return (positionHours / timeWidthHours) * pixelWidth || 0
}