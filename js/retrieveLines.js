// Only needs to be run once to generate Iliad.html

const fs = require('fs');
var express = require('express');
var bodyParser= require('body-parser');
const http = require('http');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(express.static('../'));

//Set up the server
var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server is listening on port ' + port);
  generateHTML();
})

//Generate the HTML and save it to Iliad.html
function generateHTML() {
  var book = 1;
  var file = '../IliadLines/book' + book + '.json';
  // Read the JSON file containing the chosen Iliad lines
  fs.readFile(file, (err, data) => {
    if (err) throw err;
    let lines= JSON.parse(data);

    var chosenLines = '';
    var scansion = '';
    var usefulNotes = '';
    var start = 1;
    var end = 164;
    // Read each line
    for (var i = start; i <= end; i++) {
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

      chosenLines += '<input type="text" class="answer ' + (i) + '" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">';
      chosenLines += '<p class="correct ' + (i) + '"> ' + scansion + '</p>';
      chosenLines += '<p class="line ' + (i) + '">' + lines[i-1].Text + '</p>';
      usefulNotes += '<p class="notes ' + (i) + '"> ' + notes + '</p>'
    }


    var html = '<!DOCTYPE html>\
    <head>\
      <meta charset="UTF-8">\
      <title>Mr. Meter Machine</title>\
      <link rel="stylesheet" type="text/css" href="styles.css">\
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>\
      <script src="js/check.js"></script>\
    </head>\
    <body>\
      <h1>Mr. Meter Machine</h1>\
      <p>Instructions: Scan the line in red in the text box by marking syllables as short (u) or long (hyphen -). Press "done" or hit enter to check your answer. Once you get it right, you can scan the next line.</p>'
      +chosenLines+
      '<button id="Done">Done</button>\
      <p id="right">Great Job!</p>\
      <p id="wrong">Not Quite</p>'
      + usefulNotes +
    '</body>'

    // Write the HTML to file
    fs.writeFile('Iliad.html', html, (err) =>  {
      if (err) throw err;

      console.log('Iliad file written');
    });
  });
}
