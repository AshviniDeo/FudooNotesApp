import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

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
      console.log('Total size:' + noteData.size);
      noteData.forEach(note => {
        const docData = note.data();
        docData.noteId = note.id;
        arr.push(docData);
        console.log(arr);
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
      console.log('Total size:' + noteData.size);
      noteData.forEach(note => {
        const docData = note.data();
        docData.noteId = note.id;
        arr.push(docData);
        console.log(arr);
      });

      return arr;
    });
};
