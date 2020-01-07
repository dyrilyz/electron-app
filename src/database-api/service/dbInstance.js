const {Db} = window.zango
let db = null

function getDB() {
  if (!db) {
    db = new Db('__e_app', [
      'config',
    ])
  }
  return db
}

export default getDB()