import { getTimeFromOffset } from '../helpers/getTimeOffset';


export function selectionReducer(state, action) {
  const timeOffset = getTimeFromOffset(action.offset, action.timeline.start, action.timeline.end, action.timeline.pixelWidth)
  if (action.type === "isDragging" && action.id != "translateTimeline") return {
    ...state,
    originStart: state.start.clone(),
    originEnd: state.end.clone()
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
  const scaleFactor = (action.offsetY || 0) / 30

  if (action.type === "isDragging" && action.id === "translateTimeline") return {
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
          start: state.originStart.clone().add(timeOffset - scaleFactor, "hours"),
          end: state.originEnd.clone().add(timeOffset + scaleFactor, "hours")

        }
    }

  }
  return state
}

