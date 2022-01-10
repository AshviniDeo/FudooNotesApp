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
        'KeepNotes' +
        '(ID INTEGER PRIMARY KEY ,Title TEXT,Note TEXT,Archive INTEGER,Pinned INTEGER,Remainder TEXT,Trash INTEGER,BackgroundColor TEXT,IsList INTEGER,List TEXT);',
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

export const createnoteinDB = async (
  id,
  Title,
  Note,
  Archive,
  Pinned,
  Remainder,
  Trash,
  BackgroundColor,
  IsList,
  List,
  callback,
) => {
  try {
    await DB.transaction(async txn => {
      Pinned = Pinned ? 1 : 0;
      Archive = Archive ? 1 : 0;
      Trash = Trash ? 1 : 0;
      IsList = IsList ? 1 : 0;
      await txn.executeSql(
        'INSERT INTO Notes (ID,Title ,Note ,Archive ,Pinned ,Remainder,Trash,BackgroundColor,IsList,List) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [
          Title,
          Note,
          Archive,
          Pinned,
          Remainder,
          Trash,
          BackgroundColor,
          IsList,
          List,
        ],
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

export const updatenoteinDB = async (
  Title,
  Note,
  Archive,
  Pinned,
  Remainder,
  Trash,
  reciveId,
  BackgroundColor,
  IsList,
  List,
  callback,
) => {
  try {
    Pinned = Pinned ? 1 : 0;
    Archive = Archive ? 1 : 0;
    Trash = Trash ? 1 : 0;
    IsList = IsList ? 1 : 0;
    await DB.transaction(async txn => {
      await txn.executeSql(
        'UPDATE Notes SET Title=?,Note=?,Archive=?,Pinned=?,Remainder=?,Trash=?,BackgroundColor = ? WHERE ID = ?',
        [
          Title,
          Note,
          Archive,
          Pinned,
          Remainder,
          Trash,
          BackgroundColor,
          IsList,
          List,
          reciveId,
        ],
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
export const fetchNoteDatafromDB = async () => {
  try {
    const result = await ExecuteQuery(SELECT_DATA);
    var rows = result.rows;
    console.log('result is', result.rows.item(0));
    let arr = [];
    for (let i = 0; i < rows.length; i++) {
      var item = rows.item(i);
      console.log(item);

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
