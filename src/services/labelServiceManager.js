import firestore from '@react-native-firebase/firestore';
const dbData = firestore().collection('PersonalDetails');

export const addLabel = async (data, id) => {
  try {
    const Label = {Label: data};

    await dbData.doc(id).collection('Labels').add(Label);
  } catch (e) {
    console.log(e);
  }
};

export const setLabel = async (id, labelId, data) => {
  try {
    const Label = {Label: data};

    await dbData.doc(id).collection('Labels').doc(labelId).update(Label);
  } catch (e) {
    console.log(e);
  }
};

export const setNoteId = async (id, labelId, noteId) => {
  try {
    const noteData = {noteId};
    await dbData.doc(id).collection('Labels').doc(labelId).set(noteData);
  } catch (e) {
    console.log(e);
  }
};

export const removeLabel = async (id, labelId) => {
  await dbData.doc(id).collection('Labels').doc(labelId).delete();
};

export const getLabels = async uid => {
  const arr = [];
  return firestore()
    .collection('PersonalDetails')
    .doc(uid)
    .collection('Labels')
    .get()
    .then(noteData => {
      noteData.forEach(label => {
        const docData = label.data();
        docData.labelId = label.id;
        arr.push(docData);
      });

      return arr;
    });
};
