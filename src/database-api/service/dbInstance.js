const {Db} = window.zango
let db = null

function getDB() {
  if (!db) {
    db = new Db('__e_app', [
      'config',
      'table'
    ])
  }
  return db
}

export default getDB()