const Entries = require('./database');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;

app.use('/',express.static(path.join(__dirname, "./../public/login-page")));
app.use('/welcome', express.static(path.join(__dirname, './../public/blog')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//set a user for the duration of the app.
let currentUser = app.locals.user;

//two below are served statically via app.use. Only here to make redirect work.
app.get('/', (req, res) => {
  return
})
app.get('/welcome', (req, res) => {
  return
})

//post info for verification
app.post('/verification', (req, res) => {
  console.log("i am res.body from verification", req.body);
  Entries.findOne({where: {user: req.body.user, password: req.body.password}}).then(entry => {
    if(entry === null) {
      console.log("i am null entry: ", entry);
      return res.redirect('/');
    } else {
      console.log("i am entry: ", entry);
      currentUser = req.body.user;
      return res.redirect('/welcome');
    }
  })
  return
});

//post for new user
app.post('/newuser', (req, res) => {
  console.log("i am res.body from newuser", req.body)
  //find if user already exist, if so, do not make new DB entry
  Entries.findOne({where: {user: req.body.user}}).then(entry => {
    if(entry) {
      // console.log("i am entry and i found stuff: ", entry);
      return res.redirect('/');
    } else {
      // console.log("i am entry and didnt find stuff: ", entry)
      //new user, therefore make new entry
      Entries.create({user: req.body.user, password: req.body.password})
      //app wide declaration of user
      currentUser = req.body.user;
      return res.redirect('/welcome');
    }
  })
  return;
});


//post should be able to put entry into DB
app.post('/entries',(req, res) => {
  //find user and save entry
  Entries.update({
    title: req.body.title,
    logTime: req.body.logTime,
    entry: req.body.entry
  }, {
    where: {user: currentUser, logTime: req.body.logTime} //got to check if logTime works
  }).then((result) => {
    //console.log("i am promise after updating user entry: ", result)
})
  res.json(req.body);
});

//should make a get req to get the entry based on the title
app.get('/findEntries', (req, res) => {
  Entries.findAll().then((result) => res.json(result))
});


app.listen(3000, () => {
  console.log("direectory name: ",__dirname);
  console.log(`listening on port ${port}!`)
});