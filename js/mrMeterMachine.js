function getVals() {
  //Get the lines to scan
  var startingLine = document.getElementsByName("start")[0].value;
  var endingLine = document.getElementsByName("end")[0].value;
  // alert(startingLine + " to " + endingLine);
  //Switch to the page for scanning
  window.location = "scansion.html";

    $.ajax({
    url: '/test',
    complete: function(data) {
      console.log(data);
    }
  });
}
