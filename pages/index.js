import Head from 'next/head'
import React, { useEffect, useState, useRef, useReducer } from 'react'
import { createTimeline } from '../helpers/timelinehelper'
import { HourSlot } from '../components/timeslot'
import moment from "moment";
import { calculatePosition } from '../helpers/calculatePosition'
import { getBorderTimes } from '../helpers/timeBorderHelper';
import { getSelectorPosition } from '../helpers/selectorPosition'
import { Selector } from '../components/selector';
import { Now } from '../components/now';

export default function Home() {

  const main = createTimeline("main");
  main.init();
  main.addFutureHours(6);
  main.addPastHours(6);



  const timelineContainerRef = useRef(0)
  const [timeLineWidth, setTimeLineWidh] = useState(0)
  const [mainState, setMainState] = useState(main)
  const [timeLineView, updateTimeLineView] = useReducer(timeLineViewReducer, { offset: 0, hourWidth: 128, width: 0 })
  const [isSelected, setSelected] = useReducer(selectionReducer, { start: moment().subtract(1, "hours"), end: moment().add(1, "hours") })


  function selectionReducer(state, action) {
    switch (action.type) {
      case 'shift_left':
        return {start:state.start.subtract(10,"minutes"),end:state.end.subtract(10,"minutes")}
      case 'shift_right':
        return {start:state.start.add(10,"minutes"),end:state.end.add(10,"minutes")}
    }
    
  }


  function growLeft(offset) {
    if (mainState.countRightOffscreen(timeLineWidth, offset).length < 2) {
      setMainState((prevState) => {
        prevState.addFutureHours(3)
        return { ...prevState }
      })
    }
  }

  function growRight(offset) {
    if (mainState.countLeftOffscreen(timeLineWidth, offset).length < 2) {
      setMainState((prevState) => {
        prevState.addPastHours(3)
        return { ...prevState }
      })
    }
  }

  function timeLineViewReducer(state, action) {
    switch (action.type) {
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




  const { start, end } = getBorderTimes(mainState, timeLineView)
  const borderTimes = getBorderTimes(mainState, timeLineView)
  const lft = start.format("dddd, MMMM Do YYYY, h:mm:ss a")
  const rght = end.format("dddd, MMMM Do YYYY, h:mm:ss a")

  //console.log(getSelectorPosition(isSelected, getBorderTimes(mainState, timeLineView), timeLineView))
  const { left, width } = getSelectorPosition(isSelected, getBorderTimes(mainState, timeLineView), timeLineView)

  return (
    <React.Fragment>

      <div className="bg-green-200 h-screen flex flex-col justify-center   ">
        <div className="bg-gray-100 h-2/5 w-10/12 mx-auto rounded-lg ">

          <div ref={timelineContainerRef} className="relative overflow-block-clip ">
            <Now timeLineState={mainState} timeLineView={timeLineView} />
            <Selector left={left} width={width} />
            <ul>
              {slots}
            </ul>
          </div>


        </div>
        <p>
          {lft}
        </p>
        <p>
          {rght}
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

        <button onClick={() => setSelected({ type: 'shift_left' })}>
          left
        </button>

        <button onClick={() => setSelected({ type: 'shift_right' })}>
          right
        </button>
      </div>
    </React.Fragment>
  )
}
