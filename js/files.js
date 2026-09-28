const open = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open('jkl', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('files');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const run = (mode, action) =>
  open().then(
    (db) =>
      new Promise((resolve, reject) => {
        const request = action(db.transaction('files', mode).objectStore('files'));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }),
  );

export const loadFile = (id, name) => run('readonly', (store) => store.get(`${id}:${name}`));

export const saveFiles = (id, files) =>
  Promise.all(files.map(([name, file]) => run('readwrite', (store) => store.put(file, `${id}:${name}`))));
