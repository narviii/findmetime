import { getTimeFromOffset } from '../helpers/getTimeOffset';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

export function zoomReducer(state, action) {
    const moment = extendMoment(Moment);
    let timeOffset = getTimeFromOffset(action.offset, state.start, state.end, state.pixelWidth)
    const minWindow = 2
    const maxWindow = 30
    let newZoomWindow
    let cntr

    if (action.type === "isDragging") return {
        ...state,
        originStart: state.start.clone(),
        originEnd: state.end.clone(),
        originZoomWindow: state.zoomWindow

    }



    if (action.type === 'set_width') {
        return { ...state, pixelWidth: action.width }
    }

    if (action.type === 'set_domRect') {
        return { ...state, domRect: action.domRect }
    }

    if (action.type === "translate") {
        switch (action.id) {
            case "translateTimeline":
                const newStart = state.originStart.clone().subtract(timeOffset, "hours")
                const newEnd = state.originEnd.clone().subtract(timeOffset, "hours")
                const center = moment.range(newStart.clone(), newEnd.clone()).center()
                return {
                    ...state,
                    start: newStart,
                    end: newEnd,
                    center: center,
                    zoomStart: center.clone().subtract(state.zoomWindow, "hours"),
                    zoomEnd: center.clone().add(state.zoomWindow, "hours")

                }
            case "zoomSelectLeft":
                
                
                if ((state.originZoomWindow - timeOffset) > minWindow && (state.originZoomWindow - timeOffset) < maxWindow) {
                    newZoomWindow = state.originZoomWindow - timeOffset
                } else if ((state.originZoomWindow - timeOffset) < minWindow) {
                    newZoomWindow = minWindow

                } else if ((state.originZoomWindow - timeOffset) > maxWindow) {
                    newZoomWindow = maxWindow
                }
                cntr = moment.range(state.start.clone(), state.end.clone()).center()

                return {
                    ...state,
                    zoomWindow: newZoomWindow,
                    zoomStart: cntr.clone().subtract(state.zoomWindow, "hours"),
                    zoomEnd: cntr.clone().add(state.zoomWindow, "hours")
                }
            case "zoomSelectRight":
                timeOffset = -timeOffset
                let newZoomWindow
                let cntr
                if ((state.originZoomWindow - timeOffset) > minWindow && (state.originZoomWindow - timeOffset) < maxWindow) {
                    newZoomWindow = state.originZoomWindow - timeOffset
                } else if ((state.originZoomWindow - timeOffset) < minWindow) {
                    newZoomWindow = minWindow

                } else if ((state.originZoomWindow - timeOffset) > maxWindow) {
                    newZoomWindow = maxWindow
                }
                cntr = moment.range(state.start.clone(), state.end.clone()).center()

                return {
                    ...state,
                    zoomWindow: newZoomWindow,
                    zoomStart: cntr.clone().subtract(state.zoomWindow, "hours"),
                    zoomEnd: cntr.clone().add(state.zoomWindow, "hours")
                }

        }

    }
    return state
}
