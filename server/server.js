const Sequelize = require('sequelize');
const pg = require('pg');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//node eventEmitter
const EventEmitter = require('events');
class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});

//set what event listen should listen for
myEmitter.addListener('get', (request, response) => {
  console.log("1!!!!!1!!!!!!!!1!!!!!!1!!!!!!", request.body);
});


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
    user: { type: Sequelize.STRING, primarykey: true },
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
    //input stuff into DB
    Entries.create({
        user: "test user",
        password: "test password",
        title: request.body.title,
        logTime: request.body.logTime,
        entry: request.body.entry
    }).then((task) => task.save());

    myEmitter.emit('get', request, response);

    //post to DB using sequelize
    response.json(request.body)
})

//should make a get request to get the entry based on the title
app.get('/findEntries', (request, response) => {
   Entries.findAll().then((result) => {
     response.json(result);
   })
})


app.listen(3000, function () {
  console.log('listening on port 3000!')
})