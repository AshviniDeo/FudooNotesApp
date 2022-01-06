import SQLite from 'react-native-sqlite-storage';

const DB = SQLite.openDatabase(
  {
    name: 'FundooNotes',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error.code);
  },
);

export const createTable = () => {
  DB.transaction(txn => {
    txn.executeSql(
      'CREATE TABLE IF NOT EXISTS ' +
        'Notes ' +
        '(ID INTEGER PRIMARY KEY AUTOINCREMENT,TITLE TEXT,NOTE TEXT,ARCHIVE BOOLEAN,PINNED BOOLEAN,REMAINDER TEXT,TRASH,BOOLEAN);',
      () => {},
      error => {
        console.log(error.code);
      },
    );
  });
};

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
    await DB.transaction(async txn => {
      await txn.executeSql(
        'INSERT INTO Notes (TITLE ,NOTE ,ARCHIVE ,PINNED ,REMAINDER,TRASH) VALUES (?,?,?,?,?,?)',
        [Title, Note, Archive, Pinned, Remainder, Trash],
        () => {},
        error => {
          console.log(error.code);
        },
      );
    });
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
    await DB.transaction(async txn => {
      await txn.executeSql(
        'UPDATE Notes SET TITLE=?,NOTE=?,ARCHIVE=?,PINNED=?,REMAINDER=?,TRASH=?',
        [Title, Note, Archive, Pinned, Remainder, Trash],
        () => {},
        error => {
          console.log(error.code);
        },
      );
    });
    callback();
  } catch (error) {
    console.log(error.code);
  }
};

export const fetchNoteData = async () => {
  const arr = DB.transaction(txn => {
    txn.executeSql('Select * from Notes;', []);
  });
  return arr;
};
