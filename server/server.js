const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');



app.use(express.static(path.join(__dirname, "./../public")))
app.use(bodyParser.json())

console.log(__dirname)

//post should be able to put entry into DB
app.post('/entries',(request, response) => {
    console.log(request.body) //THIS IS THE STUFF WE WANT!!!!
    response.send("POST successful???")
})

app.listen(3000, function () {
  console.log('listening on port 3000!')
})