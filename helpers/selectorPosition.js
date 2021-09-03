import moment from "moment";
 
export function getSelectorPosition(isSelected,borderTimes,timeLineView){
    let left = 0
    let width = 0
    //console.log(isSelected)
    
    const timeWidthHours = moment.duration(borderTimes.end.clone().subtract(borderTimes.start.clone())).asHours()
    const leftHours = moment.duration(isSelected.start.clone().subtract(borderTimes.start.clone())).asHours()
    const rightHours = moment.duration(isSelected.end.clone().subtract(borderTimes.start.clone())).asHours()
    //console.log(rightHours)
    left = (leftHours/timeWidthHours)*timeLineView.width
    width  = (rightHours/timeWidthHours)*timeLineView.width - left
    left = left||0
    width = width||0
    return {left,width}
}