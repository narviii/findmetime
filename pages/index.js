import Head from 'next/head'
import React, { useEffect, useState, useRef, useReducer } from 'react'
import { createTimeline } from '../helpers/timelinehelper'
import { HourSlot } from '../components/timeslot'
import moment from "moment";
import { calculatePosition } from '../helpers/calculatePosition'

export default function Home() {

  const main = createTimeline("main");
  main.init();
  main.addFutureHours(6);
  main.addPastHours(6);

  const timelineContainerRef = useRef(null)
  const [timeLineWidth, setTimeLineWidh] = useState(null)
  const [mainState, setMainState] = useState(main)
  const [timeLineView, updateTimeLineView] = useReducer(timeLineViewReducer, { offset: 0 })



  function growLeft(offset) {
    if (mainState.countRightOffscreen(timeLineWidth, offset).length < 2) {
      console.log(mainState.countRightOffscreen(timeLineWidth, offset))
      setMainState((prevState) => {
        prevState.addFutureHours(3)
        return { ...prevState }
      })
    }
  }

  function growRight(offset){
    if (mainState.countLeftOffscreen(timeLineWidth, offset).length < 2) {
      console.log(mainState.countLeftOffscreen(timeLineWidth, offset))
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
        return { offset: state.offset - 50 };
      case 'shift_right':
        growRight(state.offset)
        return { offset: state.offset + 50 };
      
      default:
        throw new Error();
    }

  }

  useEffect(() => {
    setTimeLineWidh(timelineContainerRef.current.offsetWidth)
    window.addEventListener('resize', function () {
      setTimeLineWidh(timelineContainerRef.current.offsetWidth)
    });

  }, [])


  const handleCentral = () => {
    setMainState((prevState) => {
      prevState.addFutureHours(1)
      prevState.addPastHours(1)
      return { ...prevState }
    })

  }


  const slots = mainState.get().map(item => {
    return <HourSlot
      label={item.start.clone().hour()}
      currentSlot={item}
      position={timeLineWidth ? calculatePosition(timeLineWidth, item.index, timeLineView.offset) : null}
    />
  })

  const handleLeftClick = () => {
    setTimeLineOffset(prevOffset => prevOffset - 50)
    console.log(mainState.countRightOffscreen(timeLineWidth, timeLineOffset))

    if (mainState.countRightOffscreen(timeLineWidth, timeLineOffset).length <= 2) {
      console.log('fire')
      setMainState((prevState) => {
        prevState.addFutureHours(3)
        return { ...prevState }
      })
    }

  }

  const handleRightClick = () => {
    setTimeLineOffset(prevOffset => prevOffset + 50)
    console.log(mainState.countLeftOffscreen(timeLineWidth, timeLineOffset))
    if (mainState.countLeftOffscreen(timeLineWidth, timeLineOffset).length < 2) {
      console.log('fire')
      setMainState((prevState) => {

        prevState.addPastHours(3)
        return { ...prevState }
      })
    }
  }



  return (
    <React.Fragment>

      <div className="bg-green-200 h-screen flex flex-col justify-center   ">
        <div className="bg-gray-100 h-5/6 w-10/12 mx-auto rounded-lg ">
          <ul ref={timelineContainerRef} className="relative overflow-block-clip ">
            {slots}
          </ul>
        
        </div>
        <p>
          {mainState.get().length}
        </p>
        <button onClick={() => updateTimeLineView({ type: 'shift_left' })}>
          left
        </button>
        <button onClick={handleCentral}>
          central
        </button>
        <button onClick={() => updateTimeLineView({ type: 'shift_right' })}>
          right
        </button>
      </div>
    </React.Fragment>
  )
}
