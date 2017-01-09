var express = require('express')
var app = express()
var path = require('path');

app.get('/', function (req, res) {
  res.redirect("/static/index.html")
})

app.use('/static', express.static(path.join(__dirname, 'public')))

app.listen(8000, function () {
  console.log('Kevin\'s Weather Clock listening on port 8000!')
})