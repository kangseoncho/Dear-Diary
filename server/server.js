const Entries = require('./database');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use('/',express.static(path.join(__dirname, "./../public/login-page")));
//app.use('/welcome', express.static(path.join(__dirname, './../public/blog')))
app.use(bodyParser.json());

//post info for verification
app.post('/verification', (req, res) => {
  console.log("i am res.body from verification", req.body);
  //res.json(req.body)
  //res.sendFile(path.join(__dirname, './../public/blog/index.html'));
  res.redirect('/welcome');
  return
});

app.get('/welcome', (req,res) => {
  res.sendFile(path.join(__dirname, './../public/blog/index.html'))
  return
})

//post for new user
app.post('/newuser', (req, res) => {
  console.log("i am res.body from newuser", req.body)
  res.json(req.body)
});


//post should be able to put entry into DB
app.post('/entries',(req, res) => {
    //find user and save entry
    Entries.update({
        title: req.body.title,
        logTime: req.body.logTime,
        entry: req.body.entry
    }, {
      where: {user: "test user"} //user should be dynamic. value should come from login
    }).then((result) => {
      //console.log("i am promise after updating user entry: ", result)
  })

    res.json(req.body)
});

//should make a get req to get the entry based on the title
app.get('/findEntries', (req, res) => {
   Entries.findAll().then((result) => res.json(result))
});


app.listen(3000, () => {
  console.log("direectory name: ",__dirname);
  console.log('listening on port 3000!')
});


