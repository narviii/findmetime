import moment from "moment";

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

const futureHourAdder = (state) => ({
  addFutureHours: (n) => {
    for (let i = 0; i < n; i++) {
      const futureHour = {
        start: state[state.length - 1].start.clone().add(1, "hour"),
        end: state[state.length - 1].end.clone().add(1, "hour")
      };
      futureHour.half = divideHour(futureHour);
      state.push(futureHour);
    }
  }
});

const pastHourAdder = (state) => ({
  addPastHours: (n) => {
    for (let i = 0; i < n; i++) {
      const pastHour = {
        start: state[0].start.clone().subtract(1, "hour"),
        end: state[0].end.clone().subtract(1, "hour")
      };
      pastHour.half = divideHour(pastHour);
      state.unshift(pastHour);
    }
  }
});

const initer = (state) => ({
  init: () => {
    state[0] = {
      start: moment().startOf("hour"),
      end: moment().endOf("hour")
    };
    state[0].half = divideHour(state[0]);
  }
});

const getter = (state) => ({
  get: () => {
    return state;
  }
});

export const createTimeline = (name) => {
  const state = [];
  return {
    ...initer(state),
    ...getter(state),
    ...futureHourAdder(state),
    ...pastHourAdder(state)
  };
};


