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
  Trash,
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
