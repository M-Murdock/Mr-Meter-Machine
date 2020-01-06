const fs = require('fs');
var express = require('express');
var bodyParser= require('body-parser');
const http = require('http');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//The initial form for choosing lines
app.get('/', function (req, res) {
  res.sendFile('/Users/mallard/Mr-Meter-Machine/index.html');
});

//Set up the server
app.listen(8080, () => {
  console.log('Server is listening on port ' + 8080);
})

//The page for scanning
app.post('/linesChosen', urlencodedParser, function(req, res) {
  res.send('Lines: ' + req.body.start + '-' + req.body.end);
  // res.send('Hello World');
});

  // fs.readFile('/Users/mallard/Mr-Meter-Machine/IliadLines/csvjson.json', (err, data) => {
  //   if (err) throw err;
  //   let lines= JSON.parse(data);
  //   return lines[1].Text;
  //   // console.log(lines[start].Text);
  //   // console.log(lines[end].Text);
  // });
