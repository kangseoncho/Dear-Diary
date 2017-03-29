const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db')

db.serialize(function () {
  db.run('CREATE TABLE IF NOT EXISTS entries (info TEXT)')
  let stmt = db.prepare('INSERT INTO entries VALUES (?)')

  for (let i = 0; i < 10; i++) {
    stmt.run('Ipsum ' + i)
  }

  stmt.finalize()

  db.each('SELECT rowid AS id, info FROM entries', function (err, row) {
    console.log(row.id + ': ' + row.info)
  })
})

db.close()