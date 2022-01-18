export const SET_NOTE = 'SET_NOTE';
export const SET_LABEL_DATA = 'SET_LABEL_DATA';
export const SET_PROFILE = 'SET_PROFILE';

export const setNote = note => {
  return {
    type: SET_NOTE,
    payload: note,
  };
};

export const setLabelData = labelData => {
  return {
    type: SET_LABEL_DATA,
    payload: labelData,
  };
};

export const setDisplayPicture = profileImage => {
  return {
    type: SET_PROFILE,
    payload: profileImage,
  };
};
