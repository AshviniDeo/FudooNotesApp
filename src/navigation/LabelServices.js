import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const getUid = async () => {
  return await AsyncStorage.getItem('uid');
};

const dbData = firestore().collection('PersonalDetails');

export const createLabel = async Label => {
  try {
    const data = {
      Label,
    };
    const id = await getUid();
    await dbData.doc(id).collection('Labels').add(data);
  } catch (error) {
    console.log(error.code);
  }
};
export const fetchLabels = async () => {
  const arr = [];
  const uid = await getUid();
  return firestore()
    .collection('PersonalDetails')
    .doc(uid)
    .collection('Labels')
    .get()
    .then(noteData => {
      console.log('Total size:' + noteData.size);
      noteData.forEach(label => {
        const docData = label.data();
        docData.labelId = label.id;
        arr.push(docData);
        console.log(arr);
      });

      return arr;
    });
};
