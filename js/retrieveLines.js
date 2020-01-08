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
    var usefulNotes = '';
    // Read each line
    for (var i = req.body.start; i <= req.body.end; i++) {
      scansion = '';
      scansion += (lines[i-1].__0);
      scansion += (lines[i-1].__1);
      scansion += (lines[i-1].__2);
      scansion += (lines[i-1].__3);
      scansion += (lines[i-1].__4);
      scansion += (lines[i-1].__5);
      scansion += ("\n");

      var notes = "";
      if(lines[i-1].MetricalLengthening != '') {
        notes += '\nMetrical Lengthening: ' + lines[i-1].MetricalLengthening;
      }
      if(lines[i-1].Synezesis != '') {
        notes += '\nSynezesis: ' + lines[i-1].Synezesis;
      }
      if(lines[i-1].Correption != '') {
        notes += '\nCorreption: ' + lines[i-1].Correption;
      }
      if(lines[i-1].textother != '') {
        notes += '\nText/Other: ' + lines[i-1].textother;
      }

      chosenLines += '<input type="text" class="answer">';
      chosenLines += '<p class="correct"> ' + scansion + '</p>';
      chosenLines += '<p class="line">' + lines[i-1].Text + '</p>';
      usefulNotes += '<p class="notes"> ' + notes + '</p>'
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
      <p id="wrong">Not Quite</p>'
      + usefulNotes +
    '</body>'
    // fs.writeFile('scansion.html', html, (err) => {
    //   if (err) throw err;
    // });
    // Display the lines on the page
    res.send(html);
  });
});
