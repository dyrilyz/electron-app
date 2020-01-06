import db from './dbInstance'

const coll = db.collection('config')

export async function findConfig() {
  return coll.find().toArray()
}

export async function findConfigByKey(key) {
  return coll.findOne({key})
}

export async function insertConfig(doc) {
  return coll.insert([doc])
}

export async function insertConfigList(docs) {
  return coll.insert(docs)
}

export async function removeConfigByKey(key) {
  return coll.remove({key})
}

export async function updateConfigByKey(key, doc) {
  return coll.update({key}, doc)
}