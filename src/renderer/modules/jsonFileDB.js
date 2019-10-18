import Datastore from 'nedb'

const db = new Datastore({ filename: '.persistance/nedb.json', autoload: true })

export function LoadState (dataCallback) {
  db.find({}, (err, doc) => {
    if (err) {
      console.error(err)
    } else {
      dataCallback(doc)
    }
  })
}

export function SetImporter (importer, callback) {
  db.insert(importer, function (err, newDocs) {
    if (err) {
      console.error(err)
    } else if (callback) {
      callback(newDocs)
    }
  })
}
