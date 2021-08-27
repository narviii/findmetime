import moment from "moment";
import { calculatePosition } from '../helpers/calculatePosition'

function divideHour(hour) {
  const half = [];
  half[0] = {
    start: hour.start.clone(),
    end: hour.start.clone().add(1800000 - 1, "milliseconds")
  };
  half[1] = {
    start: hour.start.clone().add(1800000, "milliseconds"),
    end: hour.end.clone()
  };
  return half;
}

const timelineIndexAdder = (state) => ({
  indexTimeline: () => {
    const now = moment().startOf("hour")
    const newState = state.map((element) => {
      element.index = moment.duration(element.start.clone().subtract(now)).asHours()
      return element
    })
  }
})

const indexTimeline = (state) => {
  const now = moment().startOf("hour")
  const newState = state.map((element) => {
    element.index = moment.duration(element.start.clone().subtract(now)).asHours()
    return element
  })
  return newState
}

const futureHourAdder = (state) => ({
  addFutureHours: (n) => {
    for (let i = 0; i < n; i++) {
      const futureHour = {
        start: state[state.length - 1].start.clone().add(1, "hour"),
        end: state[state.length - 1].end.clone().add(1, "hour"),
        inView: false
      };
      futureHour.half = divideHour(futureHour);
      state.push(futureHour);
      indexTimeline(state)

    }
  }
});

const pastHourAdder = (state) => ({
  addPastHours: (n) => {
    for (let i = 0; i < n; i++) {
      const pastHour = {
        start: state[0].start.clone().subtract(1, "hour"),
        end: state[0].end.clone().subtract(1, "hour"),
        inView: false
      };
      pastHour.half = divideHour(pastHour);
      state.unshift(pastHour);
      indexTimeline(state)
    }
  }
});

const initer = (state) => ({
  init: () => {
    state[0] = {
      start: moment().startOf("hour"),
      end: moment().endOf("hour"),
      inView: true
    };
    state[0].half = divideHour(state[0]);
  }
});

const getter = (state) => ({
  get: () => {
    return state;
  }
});

const countOffscreenAdder = (state) => ({
  countLeftOffscreen: (timeLineWidth, offset) => {
    const result = state.filter((element) => {
      let result
      const position = calculatePosition(timeLineWidth, element.index, offset)
      if (position < 0) {
        return true
      }
    })
    return result
  },
  countRightOffscreen: (timeLineWidth, offset) => {
    const result = state.filter((element) => {
      let result
      const position = calculatePosition(timeLineWidth, element.index, offset)
      if (position > timeLineWidth) {
        return true
      }
    })
    return result
  }
})



export const createTimeline = (name) => {
  const state = [];
  return {
    ...initer(state),
    ...getter(state),
    ...futureHourAdder(state),
    ...pastHourAdder(state),
    ...timelineIndexAdder(state),
    ...countOffscreenAdder(state),
  };
};


