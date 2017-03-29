const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');



app.use(express.static(path.join(__dirname, "./../public")))

console.log(path.join(__dirname, "./../dist"))


app.listen(3000, function () {
  console.log('listening on port 3000!')
})