import firestore from '@react-native-firebase/firestore';

const dbData = firestore().collection('PersonalDetails');
export const createNote = async (data, id) => {
  await dbData.doc(id).collection('Notes').add(data);
};

export const updateNote = async (id, data, noteId) => {
  await dbData.doc(id).collection('Notes').doc(noteId).update(data);
};

export const fetchFirestoreData = async uid => {
  let arr = [];
  return firestore()
    .collection('PersonalDetails')
    .doc(uid)
    .collection('Notes')
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
