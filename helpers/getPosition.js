import { getBorderTimes } from "../helpers/timeBorderHelper"
import moment from "moment"

export function getPosition(time,timeLineState,timeLineView){
    const borderTimes = getBorderTimes(timeLineState,timeLineView)
    const timeWidthHours = moment.duration(borderTimes.end.clone().subtract(borderTimes.start.clone())).asHours()
    const positionHours = moment.duration(time.clone().subtract(borderTimes.start.clone())).asHours()
    return (positionHours/timeWidthHours)*timeLineView.width||0
}