export const SET_NOTE = 'SET_NOTE';
export const SET_LABEL = 'SET_LABEL';

export const setNote = note => dispatch => {
  dispatch({
    type: SET_NOTE,
    payload: note,
  });
};

export const setLabel = label => dispatch => {
  dispatch({
    type: SET_LABEL,
    payload: label,
  });
};
