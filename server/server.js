const Entries = require('./database');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, "./../public/login-page")));
app.use(bodyParser.json());

//post info for verification
app.post('/verification', (request, response) => {
  console.log("i am response.body from verification", request.body);
  response.json(request.body)
  //response.redirect()
});

//post for new user
app.post('/newuser', (request, response) => {
  console.log("i am response.body from newuser", request.body)
  response.json(request.body)
});


//post should be able to put entry into DB
app.post('/entries',(request, response) => {
    //find user and save entry
    Entries.update({
        title: request.body.title,
        logTime: request.body.logTime,
        entry: request.body.entry
    }, { 
      where: {user: "test user"} //user should be dynamic. value should come from login
    }).then((result) => {
      //console.log("i am promise after updating user entry: ", result)
  })

    response.json(request.body)
});

//should make a get request to get the entry based on the title
app.get('/findEntries', (request, response) => {
   Entries.findAll().then((result) => response.json(result))
});


app.listen(3000, function () {
  console.log('listening on port 3000!')
});


