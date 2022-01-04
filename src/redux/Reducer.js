import {SET_LABEL, SET_NOTE} from './Actions';

const initialState = {
  note: [],
  label: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTE:
      return {...state, note: action.payload};
    case SET_LABEL:
      return {...state, labels: action.payload};

    default:
      return state;
  }
}

export default userReducer;
