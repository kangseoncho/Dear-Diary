const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');


const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('mydb.db')


app.use(express.static(path.join(__dirname, "./../public")))
app.use(bodyParser.json())

//post should be able to put entry into DB
app.post('/entries',(request, response) => {
    //console.log(request.body) //THIS IS THE STUFF WE WANT!!!!
    
    db.serialize(function () {
        db.run('CREATE TABLE IF NOT EXISTS entries (user TEXT, title TEXT, entry TEXT, logTime TEXT)')
        let stmt = db.prepare('INSERT INTO entries (user, title, entry, logTime) VALUES (?, ?, ?, ?)')

        stmt.run(request.body.user, request.body.title, request.body.entry, request.body.logTime)

        stmt.finalize()

        // db.each('SELECT user, title, entry, logTime FROM entries', function (err, row) {
        //     //if (err) console.log(err)
        //     //console.log(row)
        //     //response.json(row);
        //     //console.log(row.user + "/" + row.title + "/" + row.entry + "/" + row.logTime)
        // })
    })

    response.json(request.body)
    db.close()
})

//should make a get request to get the entry based on the title
app.get('/entries', (request, response) => {
    response.send()
})

app.listen(3000, function () {
  console.log('listening on port 3000!')
})


