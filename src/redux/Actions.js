export const SET_NOTE = 'SET_NOTE';
export const SET_LABEL_DATA = 'SET_LABEL_DATA';

export const setNote = note => dispatch => {
  dispatch({
    type: SET_NOTE,
    payload: note,
  });
};

export const setLabelData = labelData => dispatch => {
  dispatch({
    type: SET_LABEL_DATA,
    payload: labelData,
  });
};
