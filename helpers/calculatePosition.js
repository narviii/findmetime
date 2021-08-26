export  function calculatePosition (timeLineWidth, index,offset){
    return  timeLineWidth / 2 - 128 / 2 + index * 128 + offset
}