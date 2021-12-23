import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore, {
  query,
  collection,
  where,
  getDocs,
} from '@react-native-firebase/firestore';

const getUid = async () => {
  return await AsyncStorage.getItem('uid');
};
const dbData = firestore().collection('PersonalDetails');
export const createnote = async (
  Title,
  Note,
  Archive,
  Pinned,
  Remainder,
  callback,
) => {
  try {
    const data = {
      Title,
      Note,
      Archive,
      Pinned,
      Remainder,
    };
    const id = await getUid();
    await dbData.doc(id).collection('Notes').add(data);
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
    };
    const id = await getUid();
    await dbData.doc(id).collection('Notes').doc(reciveId).update(data);
    callback();
  } catch (error) {
    console.log(error.code);
  }
};

export const fetchNoteData = async () => {
  const arr = [];
  const uid = await getUid();
  return firestore()
    .collection('PersonalDetails')
    .doc(uid)
    .collection('Notes')
    .where('Archive', '!=', true)
    .get()
    .then(noteData => {
      noteData.forEach(note => {
        const docData = note.data();
        docData.noteId = note.id;
        arr.push(docData);
      });

      return arr;
    });
};

export const fetchArchiveData = async () => {
  const arr = [];
  const uid = await getUid();
  return firestore()
    .collection('PersonalDetails')
    .doc(uid)
    .collection('Notes')
    .where('Archive', '==', true)
    .get()
    .then(noteData => {
      noteData.forEach(note => {
        const docData = note.data();
        docData.noteId = note.id;
        arr.push(docData);
      });

      return arr;
    });
};

export const fetchTrashData = async () => {
  const arr = [];
  const uid = await getUid();
  return firestore()
    .collection('PersonalDetails')
    .doc(uid)
    .collection('Notes')
    .where('Trash', '==', true)
    .get()
    .then(noteData => {
      noteData.forEach(note => {
        const docData = note.data();
        docData.noteId = note.id;
        arr.push(docData);
      });

      return arr;
    });
};
