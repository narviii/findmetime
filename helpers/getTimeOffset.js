import moment from "moment"
import { getBorderTimes } from "../helpers/timeBorderHelper"


export function getTimeFromOffset(offset,timeLineState,timeLineView){
    const borderTimes = getBorderTimes(timeLineState,timeLineView)
    const timeWidthHours = moment.duration(borderTimes.end.clone().subtract(borderTimes.start.clone())).asHours()
    return (offset/timeLineView.width)*timeWidthHours

}
