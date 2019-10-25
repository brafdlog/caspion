import Datastore from 'nedb';

const db = new Datastore({ filename: '.persistance/nedb.json', autoload: true });

export function LoadState(dataCallback) {
  db.find({}, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      dataCallback(doc);
    }
  });
}

export function SetImporter(importer, callback) {
  db.insert(importer, (err, newDocs) => {
    if (err) {
      console.error(err);
    } else if (callback) {
      callback(newDocs);
    }
  });
}

export function RemoveImporter(_id, callback) {
  db.remove({ _id }, {}, (err, numRemoved) => {
    if (err) {
      console.log(err);
    } else if (callback && numRemoved === 1) {
      callback();
    } else {
      console.log(`numRemoved: ${numRemoved}`);
    }
  });
}
