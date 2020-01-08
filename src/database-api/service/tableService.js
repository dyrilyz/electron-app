import db from './dbInstance'

const coll = db.collection('table')

export async function findTables() {
  return coll.find().toArray()
}

export async function findTableById(id) {
  return coll.findOne({_id: id})
}

export async function addTable(doc) {
  return coll.insert([doc])
}

export async function removeTableById(id) {
  return coll.remove({_id: id})
}

export async function updateTableById(id, $set) {
  return coll.update({_id: id}, {$set})
}