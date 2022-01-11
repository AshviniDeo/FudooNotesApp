import firestore from '@react-native-firebase/firestore';

const dbData = firestore().collection('PersonalDetails');

export const createNote = async (noteId, noteData, uid, callback) => {
  try {
    await dbData.doc(uid).collection('Notes').doc(noteId).set(noteData);
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const updateNote = async (id, noteData, noteId, callback) => {
  try {
    await dbData.doc(id).collection('Notes').doc(noteId).update(noteData);
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const fetchFirestoreData = async uid => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
