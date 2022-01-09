import {SET_LABEL_DATA, SET_NOTE} from './Actions';

const initialState = {
  note: [],
  labelData: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTE:
      return {...state, note: action.payload};
    case SET_LABEL_DATA:
      return {...state, labelData: [...state.labelData, action.payload]};

    default:
      return state;
  }
}

export default userReducer;
