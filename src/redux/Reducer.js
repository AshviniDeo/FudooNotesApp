import {SET_LABEL_DATA, SET_NOTE, SET_PROFILE} from './Actions';

const initialState = {
  note: [],
  labelData: [],
  profileImage: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NOTE:
      return {...state, note: action.payload};
    case SET_LABEL_DATA:
      return {...state, labelData: action.payload};
    case SET_PROFILE:
      return {...state, profileImage: action.payload};
    default:
      return state;
  }
}

export default userReducer;
