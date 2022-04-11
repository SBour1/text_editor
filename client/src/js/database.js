import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, value) => {
  console.error('PUT request to JATEDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStor = tx.objectStore('jate');
  const req = objStor.put({ id: id, value: value });
  const res = await req;
  console.log('Data saved to JATEDB', res)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error('Getting data from JATEDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStor = tx.objectStore('jate');
  const req = objStor.getAll();
  const res = await req;
  console.log('Data saved to JATEDB', res)
};

initdb();
