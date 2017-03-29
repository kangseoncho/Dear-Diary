const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


app.use(express.static(path.join(__dirname, "./../public")))
app.use(bodyParser.json())

//post should be able to put entry into DB
app.post('/entries',(request, response) => {
    //console.log("request ", request)
    console.log("I am request.body: ", request.body) //THIS IS THE STUFF WE WANT!!!!

    //creates and insert value into the SQlite db (mydb)
    db.serialize(function () {
        db.run('CREATE TABLE IF NOT EXISTS entries (user TEXT, title TEXT, entry TEXT, logTime TEXT)')
        let stmt = db.prepare('INSERT INTO entries (user, title, entry, logTime) VALUES (?, ?, ?, ?)')

        stmt.run(request.body.user, request.body.title, request.body.entry, request.body.logTime)
        stmt.finalize()
        // db.each('SELECT user, title, entry, logTime FROM entries', function (err, row) {
        //     //if (err) console.log(err)        
        // })
    })

    response.json(request.body)
   // db.close()
})

//should make a get request to get the entry based on the title
app.get('/findEntries', (request, response) => {
   db.all("SELECT * FROM entries", (err, rows) => {
       if(err) console.log(err)
       else console.log(rows)
       response.send(rows)
   })
})

app.listen(3000, function () {
  console.log('listening on port 3000!')
})


