const EntriesController = require('./entriesController');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

app.use('/', express.static(path.join(__dirname, "./../public/login-page")));
app.use('/welcome', express.static(path.join(__dirname, './../public/diary')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//set a user & password for the duration of the app.
let currentUser = app.locals.user;
let currentPassword = app.locals.password;

//two below are served statically via app.use. Only here to make redirect work.
app.get('/', (req, res) => { return })
app.get('/welcome', (req, res) => { return })

//post info for verification
app.post('/verification', EntriesController.verification);

//post for new user
app.post('/newuser', EntriesController.newUser);

//post should be able to put entry into DB
app.post('/entries', EntriesController.updateEntries);

//should make a get req to get the entry based on the title
app.get('/findEntries', EntriesController.getAllEntries);


app.listen(3000, () => {
  console.log("direectory name: ",__dirname);
  console.log(`listening on port ${port}!`)
});