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
        'FundooNotes' +
        '(ID TEXTPRIMARY KEY,noteId TEXT ,Title TEXT,Note TEXT,Archive INTEGER,Pinned INTEGER,Remainder TEXT,Trash INTEGER,BackgroundColor TEXT,IsList INTEGER,List TEXT,Flag TEXT);',
      [],
      (tx, results) => {
        console.log('table created successfully', results);
      },
      error => {
        console.log('error on creating table' + error);
      },
    );
  });
};

export const addNote = async (noteId, noteData, uid, callback) => {
  try {
    await DB.transaction(async txn => {
      noteData.Pinned = noteData.Pinned ? 1 : 0;
      noteData.Archive = noteData.Archive ? 1 : 0;
      noteData.Trash = noteData.Trash ? 1 : 0;
      noteData.IsList = noteData.IsList ? 1 : 0;
      await txn.executeSql(
        'INSERT INTO FundooNotes (ID,noteId,Title ,Note ,Archive ,Pinned ,Remainder,Trash,BackgroundColor,IsList,List) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
        [
          uid,
          noteId,
          noteData.Title,
          noteData.Note,
          noteData.Archive,
          noteData.Pinned,
          noteData.Remainder,
          noteData.Trash,
          noteData.BackgroundColor,
          noteData.IsList,
          JSON.stringify(noteData.List),
        ],
        () => {
          console.log('Inserted');
        },
        error => {
          console.log('Sqlite', error);
        },
      );
    });
    callback();
  } catch (error) {
    console.log(error.code);
  }
};

export const setNote = async (uid, noteData, noteId, callback) => {
  try {
    noteData.Pinned = noteData.Pinned ? 1 : 0;
    noteData.Archive = noteData.Archive ? 1 : 0;
    noteData.Trash = noteData.Trash ? 1 : 0;
    noteData.IsList = noteData.IsList ? 1 : 0;
    await DB.transaction(async txn => {
      await txn.executeSql(
        'UPDATE Notes SET Title=?,Note=?,Archive=?,Pinned=?,Remainder=?,Trash=?,BackgroundColor = ? WHERE noteId = ?',
        [
          uid,
          noteId,
          noteData.Title,
          noteData.Note,
          noteData.Archive,
          noteData.Pinned,
          noteData.Remainder,
          noteData.Trash,
          noteData.BackgroundColor,
          noteData.IsList,
          noteData.List,
        ],
        () => {
          console.log('Updated');
        },
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

const ExecuteQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    DB.transaction(trans => {
      trans.executeSql(
        sql,
        params,
        results => {
          resolve(results);
        },
        error => {
          reject(error);
        },
      );
    });
  });
const SELECT_DATA = 'SELECT * FROM KeepNotes;';
export const getNotes = async () => {
  try {
    const result = await ExecuteQuery(SELECT_DATA);
    var rows = result.rows;
    console.log('result is', result.rows.item(0));
    let arr = [];
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      console.log(item);
      item.List = JSON.parse(item.List);
      item.Pinned = Boolean(item.Pinned);
      item.Archive = Boolean(item.Archive);
      item.Trash = Boolean(item.Trash);
      item.IsList = Boolean(item.IsList);
      arr.push(item);
    }
    return arr;
  } catch (error) {
    console.log(error);
  }
};
