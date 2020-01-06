import db from './dbInstance'

const coll = db.collection('config')

export async function findConfigByKey(key) {
  return await coll.findOne({key})
}

export async function insertConfig(doc) {
  await coll.insert([doc])
}

export async function insertConfigList(docs) {
  await coll.insert(docs)
}

export async function removeConfigByKey(key) {
  await coll.remove({key})
}

export async function updateConfigByKey(key, doc) {
  await coll.remove({key}, doc)
}