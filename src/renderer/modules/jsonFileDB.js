import Datastore from 'nedb';
import { encryptProperty, decryptProperty, defaultEncryptProperty } from './credentials';

const db = new Datastore({ filename: '.persistance/nedb.json', autoload: true });

export function LoadState(dataCallback) {
  db.find({}, (err, doc) => {
    if (err) {
      console.error(err);
    } else {
      const decrypted = doc.map((d) => decryptProperty(d, defaultEncryptProperty));
      dataCallback(decrypted);
    }
  });
}

export function SetImporter(importer, callback) {
  const encrypted = encryptProperty(importer, defaultEncryptProperty);
  db.insert(encrypted, (err, newDocs) => {
    if (err) {
      console.error(err);
    } else if (callback) {
      callback(decryptProperty(newDocs, defaultEncryptProperty));
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
