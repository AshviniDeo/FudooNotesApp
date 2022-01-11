import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createNote,
  updateNote,
  fetchFirestoreData,
} from './NotesFirebaseService';
import {addNote, setNote} from './NotesSqliteService';

const getUid = async () => {
  return await AsyncStorage.getItem('uid');
};

export const createnote = async (noteId, noteData, callback) => {
  try {
    const uid = await getUid();
    await createNote(noteId, noteData, uid, callback);
    await addNote(noteId, noteData, uid, callback);
  } catch (error) {
    console.log(error);
  }
};

export const updatenote = async (noteData, noteId, callback) => {
  try {
    const id = await getUid();
    await updateNote(id, noteData, noteId, callback);
    await setNote(id, noteData, noteId, callback);
  } catch (error) {
    console.log(error.code);
  }
};

export const fetchNoteData = async () => {
  const uid = await getUid();
  return await fetchFirestoreData(uid);
};
