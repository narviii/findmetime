import Head from 'next/head'
import React, { createContext, useContext, useEffect, useState, useRef, useReducer } from 'react'
import { createTimeline } from '../helpers/timelinehelper'
import { HourSlot } from '../components/timeslot'
import moment from "moment";
import { calculatePosition } from '../helpers/calculatePosition'
import { getBorderTimes } from '../helpers/timeBorderHelper';
import { getSelectorPosition } from '../helpers/selectorPosition'
import { Selector } from '../components/selector';
import { Now } from '../components/now';
import { Handle, SelectElement } from '../components/handle'
import { getTimeFromOffset } from '../helpers/getTimeOffset';


export default function Home() {

  const main = createTimeline("main");
  main.init();
  main.addFutureHours(6);
  main.addPastHours(6);



  const timelineContainerRef = useRef(0)
  const [timeLineWidth, setTimeLineWidh] = useState(0)
  const [mainState, setMainState] = useState(main)
  const [timeLineView, updateTimeLineView] = useReducer(timeLineViewReducer, { offset: 0, hourWidth: 128, width: 0 })
  const [isSelected, setSelector] = useReducer(selectionReducer, { start: moment().subtract(1, "hours"), end: moment().add(1, "hours") })



  function selectionReducer(state, action) {

    const timeOffset = getTimeFromOffset(action.offset, mainState, timeLineView)
    if (action.type === "isDragging") return { ...state, originStart: state.start.clone(), originEnd: state.end.clone() }

    if (action.type === "translate") {
      switch (action.id) {
        case "center":
          return { ...state, start: state.originStart.clone().add(timeOffset, "hours"), end: state.originEnd.clone().add(timeOffset, "hours") }
        case "left":
          if (state.end.clone().isBefore(state.originStart.clone().add(timeOffset + 0.1, "hours"))) return state

          return { ...state, start: state.originStart.clone().add(timeOffset, "hours") }
        case "right":
          if (state.start.clone().isAfter(state.originEnd.clone().add(timeOffset - 0.1, "hours"))) return state
          return { ...state, end: state.originEnd.clone().add(timeOffset, "hours") }

      }

    }

    return state
  }


  function growTimeline(offset) {
    if (mainState.countLeftOffscreen(timeLineWidth, offset).length < 2) {
      setMainState((prevState) => {
        prevState.addPastHours(3)
        return { ...prevState }
      })
    } else if (mainState.countRightOffscreen(timeLineWidth, offset).length < 2) {
      setMainState((prevState) => {
        prevState.addFutureHours(3)
        return { ...prevState }
      })
    }
  }

  function timeLineViewReducer(state, action) {
    switch (action.type) {
      case 'isDragging':
        return { ...state, origin: state.offset }
      case 'translate':
        growTimeline(state.offset)
        return { ...state, offset: state.origin + action.offset }
      case 'shift_left':
        growLeft(state.offset)
        return { ...state, offset: state.offset - 50 };
      case 'shift_right':
        growRight(state.offset)
        return { ...state, offset: state.offset + 50 };
      case 'shift_center':
        return { ...state, offset: 0 }
      case 'set_width':
        return { ...state, width: action.width }
      default:
        throw new Error();
    }

  }

  useEffect(() => {
    updateTimeLineView({ type: 'set_width', width: timelineContainerRef.current.offsetWidth || 0 })
    setTimeLineWidh(timelineContainerRef.current.offsetWidth || 0)
    window.addEventListener('resize', function () {
      updateTimeLineView({ type: 'set_width', width: timelineContainerRef.current.offsetWidth || 0 })
      setTimeLineWidh(timelineContainerRef.current.offsetWidth || 0)
    });
    mainState
  }, [])



  const slots = mainState.get().map(item => {
    return <HourSlot
      label={item.start.clone().hour()}
      currentSlot={item}
      key={item.start.clone().format("dddd, MMMM Do YYYY, h:mm:ss a")}
      position={timeLineWidth ? calculatePosition(timeLineWidth, item.index, timeLineView.offset) : 0}
    />
  })







  return (
    <React.Fragment>

      <div className="bg-green-200 h-screen flex flex-col justify-center   ">
        <div className="bg-gray-100 h-2/5 w-10/12 mx-auto block rounded-lg ">

          <div ref={timelineContainerRef} className="relative overflow-block-clip mt-1 ">

            <div>
              <Now timeLineState={mainState} timeLineView={timeLineView} />
              <SelectElement control={setSelector} isSelected={isSelected} timeLineState={mainState} timeLineView={timeLineView} />
              <ul className="h-12">
                {slots}
              </ul>
            </div>
            <Handle control={updateTimeLineView} />

          </div>
        </div>
        <p>
          {isSelected.start.clone().format("DD-MM-YYYY hh:mm:ss")}
        </p>
        <p>
          {isSelected.end.clone().format("DD-MM-YYYY hh:mm:ss")}
        </p>
        <button onClick={() => updateTimeLineView({ type: 'shift_left' })}>
          left
        </button>
        <button onClick={() => updateTimeLineView({ type: 'shift_center' })}>
          central
        </button>
        <button onClick={() => updateTimeLineView({ type: 'shift_right' })}>
          right
        </button>

      </div>
    </React.Fragment>
  )
}
