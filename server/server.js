const Sequelize = require('sequelize');
const pg = require('pg');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//set DB connection
const connection = new Sequelize('kangseoncho', 'kangseoncho', 'blog', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
});

//create DB Model
const Entries = connection.define('entries',{
    user: Sequelize.STRING,
    password: Sequelize.STRING,
    title: Sequelize.STRING,
    logTime: Sequelize.STRING,
    entry: Sequelize.TEXT
});

//create DB if one does not exist already
connection.sync();


app.use(express.static(path.join(__dirname, "./../public/blog")))
app.use(bodyParser.json())

//post should be able to put entry into DB
app.post('/entries',(request, response) => {
    //console.log("request ", request)
    console.log("I am request.body: ", request.body) //THIS IS THE STUFF WE WANT!!!!

    //input stuff into DB
    Entries.create({
        user: request.body.username,
        password: "test password",
        title: request.body.title,
        logTime: request.body.logTime,
        entry: request.body.entry
    }).then((task) => task.save());

    //post to DB using sequelize
    response.json(request.body)
})

//should make a get request to get the entry based on the title
app.get('/findEntries', (request, response) => {
   
})


app.listen(3000, function () {
  console.log('listening on port 3000!')
})


