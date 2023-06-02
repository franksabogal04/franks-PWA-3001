import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate DB created');
    },
  });

export const putDb = async (content) => {
	console.log("PUT to the DB");


	const jateDb = await openDB("jate", 1); 

	// new transaction and specify the database/privileges
	const tx = jateDb.transaction("jate", "readwrite");

	// Open up object store
	const store = tx.objectStore("jate"); 

	// Use the .put()
	// The text editor retrieves and updates
	const request = store.put({ id: 1, value: content });

	// Get confirmation
	const result = await request;
	console.log("🚀 - data saved to the DB", result); 
};

// GET
export const getDb = async () => {
	console.log("GET from the DB");

	// Create a connection to  DB
	const jateDb = await openDB("jate", 1); 

	// Create a new transaction to the database/data privileges
	const tx = jateDb.transaction("jate", "readonly"); 

	// Open up the desired object store
	const store = tx.objectStore("jate");

	// Use the .getAll() method 
	const request = store.getAll();

      // Get confirmation of the request.
      const result = await request;
      console.log('result.value', result);
      return result?.value;
  
};

initdb();
