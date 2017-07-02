const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const initialState = {
  number: 1,
};

export default function countReducer(state = initialState, action) {
  switch(action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}

countReducer.reducer = 'countReducer';
