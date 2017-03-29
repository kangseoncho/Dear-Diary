const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db')

// db.serialize(function () {
//   db.run('CREATE TABLE IF NOT EXISTS entries (info TEXT)')
//   let stmt = db.prepare('INSERT INTO entries VALUES (?)')

//   for (let i = 0; i < 10; i++) {
//     stmt.run('Ipsum ' + i)
//   }

//   stmt.finalize()

//   db.each('SELECT rowid AS id, info FROM entries', function (err, row) {
//     console.log(row.id + ': ' + row.info)
//   })
// })

 db.serialize(function () {
        db.run('CREATE TABLE IF NOT EXISTS entries (user TEXT, title TEXT, entry TEXT, logTime TEXT)')
        let stmt = db.prepare('INSERT INTO entries (user, title, entry, logTime) VALUES (?, ?, ?, ?)')

        stmt.run(request.body.user, request.body.title, request.body.entry, request.body.logTime)

        stmt.finalize()

        db.each('SELECT user, title, entry, logTime FROM entries', function (err, row) {
            //if (err) console.log(err)
            console.log(row.user + " " + row.title + " " + row.entry + " " + row.logTime)
        })
    })

db.close()