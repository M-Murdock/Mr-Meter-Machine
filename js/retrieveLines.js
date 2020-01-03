const Excel= require('exceljs');
const express = require('express')
const app = express()
const port = 3000

var text;
var workbook = new Excel.Workbook();
workbook.xlsx.readFile("IliadLines/Iliad-1-Meter.xlsx").then(function () {
  var worksheet = workbook.getWorksheet('Book 1');
  var cell = worksheet.getCell("B2").value;
  text = cell;
  // document.getElementByID("lines").value = cell;
  console.log(cell);

  // Pass back the spreadsheet data
  app.get('/test', function(req, res, next) {
    res.json({ message: "Hello world" });
  });
});
