import { getTimeFromOffset } from '../helpers/getTimeOffset';
import moment from 'moment';


export function selectionReducer(state, action) {
  

  const timeOffset = getTimeFromOffset(action.offset, action.timeline.start, action.timeline.end, action.timeline.pixelWidth)
  if (action.type === "isDragging" && action.id != "translateTimeline") return {
    ...state,
    originStart: state.start.clone(),
    originEnd: state.end.clone()
  }
  
  if (action.type === 'set'){
    return {
      ...state,
      start:action.start,
      end:action.end
    }
  }
  

  if (action.type === "translate") {
    switch (action.id) {
      case "center":
        return {
          ...state,
          start: state.originStart.clone().add(timeOffset, "hours"),
          end: state.originEnd.clone().add(timeOffset, "hours")
        }

      case "left":
        if (state.end.clone().isBefore(state.originStart.clone().add(timeOffset + 0.1, "hours"))) return state
        return {
          ...state,
          start: state.originStart.clone().add(timeOffset, "hours")
        }
      case "right":
        if (state.start.clone().isAfter(state.originEnd.clone().add(timeOffset - 0.1, "hours"))) return state
        return {
          ...state,
          end: state.originEnd.clone().add(timeOffset, "hours")
        }

    }

  }

  return state
}


export function timeLineReducer(state, action) {
  const timeOffset = getTimeFromOffset(action.offset, state.start, state.end, state.pixelWidth)
  let scaleFactor = (action.offsetY || 0) / 30

  if (action.type === "isDragging") return {
    ...state,
    originStart: state.start.clone(),
    originEnd: state.end.clone()

  }



  if (action.type === 'set_width') {
    return { ...state, pixelWidth: action.width }
  }
  if (action.type === "translate") {
    switch (action.id) {
      case "translateTimeline":
        return {
          ...state,
          start: state.originStart.clone().subtract(timeOffset, "hours"),
          end: state.originEnd.clone().subtract(timeOffset, "hours")

        }
      case "scaleTimeline":
        const newStart = state.originStart.clone().subtract(scaleFactor, "hours")
        const newEnd = state.originEnd.clone().add(scaleFactor, "hours")
        const timeLineDurationHours = moment.duration(state.originEnd.clone().subtract(state.originStart.clone())).asHours()
        //console.log(`timeLineDurationHours:${timeLineDurationHours} scaleFactor:${scaleFactor}`)
        
        if ((timeLineDurationHours+2*scaleFactor)>30){
          scaleFactor=(30 - timeLineDurationHours)/2
        } else if ((timeLineDurationHours+2*scaleFactor)<6){
          scaleFactor=(6- timeLineDurationHours)/2
        }


        

        return {
          ...state,
          start: state.originStart.clone().subtract(scaleFactor, "hours"),
          end: state.originEnd.clone().add(scaleFactor, "hours")

        }

    }

  }
  return state
}

