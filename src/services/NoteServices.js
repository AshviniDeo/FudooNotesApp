import AsyncStorage from '@react-native-async-storage/async-storage';

import {createNote, updateNote, fetchFirestoreData} from './noteServiceManger';

const getUid = async () => {
  return await AsyncStorage.getItem('uid');
};

export const createnote = async (
  Title,
  Note,
  Archive,
  Pinned,
  Remainder,
  Trash,
  List,
  IsList,
  BackgroundColor,
  callback,
) => {
  try {
    const data = {
      Title,
      Note,
      Archive,
      Pinned,
      Remainder,
      Trash,
      List,
      IsList,
      BackgroundColor,
    };
    const id = await getUid();
    await createNote(data, id);
    callback();
  } catch (error) {
    console.log(error.code);
  }
};

export const updatenote = async (
  Title,
  Note,
  Archive,
  Pinned,
  Remainder,
  Trash,
  List,
  IsList,
  BackgroundColor,
  reciveId,
  callback,
) => {
  try {
    const data = {
      Title,
      Note,
      Archive,
      Pinned,
      Remainder,
      Trash,
      List,
      IsList,
      BackgroundColor,
    };
    const id = await getUid();
    await updateNote(id, data, reciveId);
    callback();
  } catch (error) {
    console.log(error.code);
  }
};

export const fetchNoteData = async () => {
  const uid = await getUid();
  return await fetchFirestoreData(uid);
};
