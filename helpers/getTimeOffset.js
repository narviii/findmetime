import moment from "moment"
import { getBorderTimes } from "../helpers/timeBorderHelper"


export function getTimeFromOffset(offset,timeLineStart,timeLineEnd,timelinePixelWidth){
    
    
    const timelineHourWidth = moment.duration(timeLineEnd.clone().subtract(timeLineStart.clone())).asHours()
    
    return (offset/timelinePixelWidth)*timelineHourWidth

}
