const INDEX_DB_NAME = 'smart_client_pos';
const INDEXED_DB_VERSION = 1;
const COLLECTION_NAME = 'smart_pos';

const idb = {

  db: null,

  async init() {
    this.db = await new Promise((resolve, reject) => {
      const request = window.indexedDB.open(INDEX_DB_NAME, INDEXED_DB_VERSION);

      request.onerror = (e) => {
        console.error('Error opening db', e);
        reject(new Error('Error opening indexed database'));
      };

      request.onsuccess = (e) => {
        resolve(e.target.result);
      };

      // Incase the table structure changes
      // Increment the Db version number and re-run all createObjectStore(s)
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        // Technically these are your tables (collections)
        // Add more tables here
        const objectStore = db.createObjectStore(COLLECTION_NAME, { autoIncrement: true, keyPath: 'data_key' });
        objectStore.createIndex('data_key', 'data_key', { unique: true });
      };
    });
  },

  docs() {
    return new Promise((resolve, reject) => {
      const trans = this.db.transaction([COLLECTION_NAME], 'readonly');

      const store = trans.objectStore(COLLECTION_NAME);
      const docs = [];

      trans.oncomplete = () => {
        resolve(docs);
      };

      store.openCursor().onsuccess = (e) => {
        const results = e.target.result;
        if (results) {
          docs.push(results.value);
          results.continue();
        }
      };

      trans.onerror = (e) => {
        reject(new Error('Error'));
        throw new Error(e);
      };
    });
  },

  add(doc) {
    return new Promise((resolve, reject) => {
      const trans = this.db.transaction([COLLECTION_NAME], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      trans.onerror = (e) => {
        reject(new Error(e));
      };

      const store = trans.objectStore(COLLECTION_NAME);
      store.add(doc);
    });
  },

  get(key) {
    return new Promise((resolve, reject) => {
      const trans = this.db.transaction([COLLECTION_NAME], 'readonly');
      if (!trans) {
        throw new Error('No such key found');
      }
      const objectStore = trans.objectStore(COLLECTION_NAME);

      const index = objectStore.index('data_key');

      index.openCursor().onerror = (e) => {
        reject(new Error(e));
        throw new Error(e);
      };

      index.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.data_key === key) {
            resolve(cursor.value);
          }
          cursor.continue();
        }
      };
    });
  },

  update(updatedDoc) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([COLLECTION_NAME], 'readwrite');

      transaction.onerror = (e) => {
        reject(new Error(e));
        throw new Error(e);
      };
      const objectStore = transaction.objectStore(COLLECTION_NAME);

      objectStore.onerror = (e) => {
        reject(new Error(e));
        throw new Error(e);
      };

      objectStore.openCursor().onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          if (cursor.value.data_key === updatedDoc.data_key) {
            const request = cursor.update({
              ...updatedDoc,
            });
            request.onsuccess = () => {
              resolve();
            };

            request.onerror = (e) => {
              reject(new Error(e));
              throw new Error(e);
            };
          }
          cursor.continue();
        }
      };
    });
  },

  delete(DataKey) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([COLLECTION_NAME], 'readwrite');
      const objectStore = transaction.objectStore(COLLECTION_NAME);

      const objectStoreRequest = objectStore.delete(DataKey);
      objectStoreRequest.onsuccess = () => {
        resolve();
      };

      objectStoreRequest.onerror = (e) => {
        reject(new Error(e));
        throw new Error(e);
      };
    });
  },

};

export default idb;
