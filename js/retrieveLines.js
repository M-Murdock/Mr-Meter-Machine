const fs = require('fs');
var express = require('express');
var bodyParser= require('body-parser');
const http = require('http');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static('/Users/mallard/Mr-Meter-Machine'));
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
  var book = req.body.book;
  var file = '/Users/mallard/Mr-Meter-Machine/IliadLines/book' + book + '.json';
  // Read the JSON file containing the chosen Iliad lines
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    let lines= JSON.parse(data);
    var chosenLines = '';
    var scansion = '';
    // Read each line, adding its scansion to the text file
    for (var i = req.body.start; i <= req.body.end; i++) {
      scansion = '';
      scansion += (lines[i-1].__0);
      scansion += (lines[i-1].__1);
      scansion += (lines[i-1].__2);
      scansion += (lines[i-1].__3);
      scansion += (lines[i-1].__4);
      scansion += (lines[i-1].__5);
      scansion += ("\n");


      chosenLines += '<input type="text" class="answer">';
      chosenLines += '<p class="correct"> ' + scansion + '</p>';
      chosenLines += '<p class="line">' + lines[i-1].Text + '</p>';
      chosenLines += '<p class="notes"> ' + lines[i-1].textother + '</p>'
    }


    var html = '<!DOCTYPE html>\
    <head>\
      <meta charset="UTF-8">\
      <title>Mr. Meter Machine</title>\
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>\
      <script src="js/check.js"></script>\
    </head>\
    <body>\
      <h1>Mr.Meter Machine</h1>'
      +chosenLines+
      '<button id="Done">Done</button>\
      <p id="right">Great Job!</p>\
      <p id="wrong">Not Quite</p>\
    </body>'
    fs.writeFile('scansion.html', html, (err) => {
      if (err) throw err;
    });
    // Display the lines on the page
    res.send(html);
  });
});
