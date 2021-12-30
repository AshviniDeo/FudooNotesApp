import firestore from '@react-native-firebase/firestore';
const dbData = firestore().collection('PersonalDetails');

export const addLabel = async (id, data) => {
  await dbData.doc(id).collection('Labels').add(data);
};

export const setLabel = async (id, labelId, data) => {
  await dbData.doc(id).collection('Labels').doc(labelId).update(data);
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
