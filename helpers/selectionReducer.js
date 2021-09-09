import { getTimeFromOffset } from '../helpers/getTimeOffset';


export function selectionReducer(state, action) {
    const timeOffset = getTimeFromOffset(action.offset, state.start, state.end, state.pixelWidth)
    const scaleFactor = (action.offsetY || 0) / 30
    /*
    if (action.type === 'set_controled'){
      return {
        ...state,
        isSelected:{
          start:action.payload.start,
          end:action.payload.end
        }
      }
    }
    */
    if (action.type === "isDragging" && action.id != "translateTimeline") return {
      ...state,
      isSelected: {
        ...state.isSelected,
        originStart: state.isSelected.start.clone(),
        originEnd: state.isSelected.end.clone()
      },
    }

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
        case "center":
          return {
            ...state,
            isSelected: {
              ...state.isSelected,
              start: state.isSelected.originStart.clone().add(timeOffset, "hours"),
              end: state.isSelected.originEnd.clone().add(timeOffset, "hours")
            }
          }

        case "translateTimeline":
          return {
            ...state,
            start: state.originStart.clone().add(timeOffset - scaleFactor, "hours"),
            end: state.originEnd.clone().add(timeOffset + scaleFactor, "hours")

          }

        case "left":
          if (state.end.clone().isBefore(state.isSelected.originStart.clone().add(timeOffset + 0.1, "hours"))) return state
          return {
            ...state,
            isSelected: {
              ...state.isSelected,
              start: state.isSelected.originStart.clone().add(timeOffset, "hours")
            }

          }
        case "right":
          if (state.start.clone().isAfter(state.isSelected.originEnd.clone().add(timeOffset - 0.1, "hours"))) return state
          return {
            ...state,
            isSelected: {
              ...state.isSelected,
              end: state.isSelected.originEnd.clone().add(timeOffset, "hours")
            }

          }

      }

    }

    return state
  }
