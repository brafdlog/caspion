import Datastore from 'nedb';
import { encryptProperty, decryptProperty, defaultEncryptProperty } from './credentials';

const dbDir = '.persistance';

const importersDB = new Datastore({ filename: `${dbDir}/importers.json`, autoload: true });
const transactionsDB = new Datastore({ filename: `${dbDir}/transactions.json`, autoload: true });

export function LoadState(dataCallback) {
  importersDB.find({}, (err, doc) => {
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
  importersDB.insert(encrypted, (err, newDocs) => {
    if (err) {
      console.error(err);
    } else if (callback) {
      callback(decryptProperty(newDocs, defaultEncryptProperty));
    }
  });
}

export function RemoveImporter(_id, callback) {
  importersDB.remove({ _id }, {}, (err, numRemoved) => {
    if (err) {
      console.log(err);
    } else if (callback && numRemoved === 1) {
      callback();
    } else {
      console.log(`numRemoved: ${numRemoved}`);
    }
  });
}

export function AddTransactions(transactions, callback) {
  console.log('nedb add transactions:');
  console.log(transactions);
  transactionsDB.insert(transactions, (err, newDocs) => {
    if (err) {
      console.log(err);
    } else if (callback) {
      callback(newDocs);
    }
  });
}
