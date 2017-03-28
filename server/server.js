const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static(path.join(__dirname, "../public")))

console.log(path.join(__dirname, "../public"))

app.get('/', function (req, res) {

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})