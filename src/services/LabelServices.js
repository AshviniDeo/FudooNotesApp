import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addLabel,
  getLabels,
  removeLabel,
  setLabel,
  setNoteId,
} from './labelServiceManager';

const getUid = async () => {
  return await AsyncStorage.getItem('uid');
};

export const createLabel = async Label => {
  try {
    const id = await getUid();
    await addLabel(Label, id);
  } catch (error) {
    return error;
  }
};

export const setlabel = async (labelId, noteId) => {
  try {
    const id = await getUid();
    await setNoteId(id, labelId, noteId);
  } catch (error) {
    return error;
  }
};

export const updateLabel = async (labelId, Label) => {
  try {
    const id = await getUid();
    await setLabel(id, labelId, Label);
  } catch (error) {
    return error;
  }
};

export const daleteLabel = async labelId => {
  try {
    const id = await getUid();
    await removeLabel(id, labelId);
  } catch (error) {
    return error;
  }
};

export const fetchLabels = async () => {
  const id = await getUid();
  return await getLabels(id);
};
