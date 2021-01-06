/**
  Main code for checking scansion
**/

// Use the url to store and retrieve the line numbers
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


$(document).ready(function (){

  // Add the buttons at the bottom of the page
  $('#main').append("</br><button id='next'>Next 5 Lines</button><button id='home'>Return to Home</button>");

  // Dialog box
  $('body').append("<div id='dialog'><p>Good Work! You've finished scanning these lines. Would you like to continue to the next five lines or return to the homepage?</p></div>");
  $( "#dialog" ).dialog({
      autoOpen: false,
      resizable: false,
      height: "auto",
      closeText: "X",
      width: 400,
      modal: true,
      close: function() {
        $('#main').css({'-webkit-filter':'blur(0px)', 'filter': 'blur(0px)'});

      },
      buttons: {
        "Continue": function() {
          $( this ).dialog( "close" );
          window.location.href = "Iliad.html" + '?book=' + book + '&start=' + (end+1) + '&end=' + (end+5);
        },
        "Home": function() {
          $( this ).dialog( "close" );
          window.location.href="index.html";
        }
      }
    });


  // Get the book, start and end lines
  var book = Number(getUrlParameter('book'));
  var start = Number(getUrlParameter('start'));
  var end = Number(getUrlParameter('end'));
  $("p:first").append("<h3>Book " + book + " lines " + start + " - " + end + "</h3>");

  $('#next').click(function() {
    window.location.href = "Iliad.html" + '?book=' + book + '&start=' + (end+1) + '&end=' + (end+5);
  });
  $('#home').click(function() {
    window.location.href = "index.html";
  });
  // Hide the lines that we're not scanning
  if(start > 1) {
    for(var i = 1; i < start; i++) {
      $("." + i + "").hide();
    }
  }
  var endNum = 1000;
  if(end < endNum) {
    for(var i = end+1; i <= endNum; i++) {
      $("." + i + "").hide();
    }
  }


  $("#right").hide();
  $("#wrong").hide();
  $(".correct").hide();
  $(".answer").hide();
  $(".notes").hide();

  var curLineNum = start;
  // Store the line, correct answer, and user's input
  var curLine = $(".line." + curLineNum + "");
  var curCorrect = $(".correct." + curLineNum + "");
  var curAnswer = $(".answer." + curLineNum + "");
  var curNotes = $(".notes." + curLineNum + "");
  curLine.css('color', 'red');
  curAnswer.show();
  curAnswer.focus();

  //Pressing enter triggers the "done" button
  curAnswer.keyup(function(event) {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      $("#Done").click();
    }
  });
  // When 'skip' is clicked, skip to the next line
  $('#skip').click(function() {
    $("#wrong").hide();
    // Hide the textbox for the completed line
    $(".answer." + curLineNum + "").hide();
    $(".notes." + curLineNum + "").hide();
    $(".correct." + curLineNum + "").show();
    $(".line." + curLineNum + "").css('color', 'black');

    // Check if all the lines have been scanned
    if(curLineNum===end) {
      // Ask if the user wants to return to the main page/continue to the next 5 lines
      $( "#dialog" ).dialog( "open" );
      $('#main').css({'-webkit-filter':'blur(2px)', 'filter': 'blur(2px)'});

      for(var i = start; i <= end; i++) {
        $(".notes." + i + "").show();
      }
    }
    else {
      // Move to the next line
      curLineNum+=1;
      curLine = $(".line." + curLineNum + "");
      curCorrect = $(".correct." + curLineNum + "");
      curAnswer = $(".answer." + curLineNum + "");
      curNotes = $(".notes." + curLineNum + "");

      curAnswer.show();
      curLine.css('color', 'red');
      curAnswer.focus();
      //Pressing enter triggers the "done" button
      curAnswer.keyup(function(event) {
        if (event.keyCode === 13) {
          // Trigger the button element with a click
          $("#Done").click();
        }
      });
    }
  });
  // When the button is clicked, check the answer
  $("#Done").click(function() {
    var answer = $(".answer." + curLineNum + "").val().replace(/\s/g, "");
    var answer = answer.replace(/\./g, "");
    var answer = answer.replace(/\|/g, "");
    // replace l with - and s with u
    var answer = answer.replace(/l/g, "-");
    var answer = answer.replace(/s/g, "u");
    var correct = $(".correct." + curLineNum + "").text().replace(/\s/g, "");

    // If the answer is correct, move to the next line
    if($.trim(answer) === $.trim(correct)) {
      $("#right").show();
      $("#wrong").hide();
      // Hide the textbox for the completed line
      $(".answer." + curLineNum + "").hide();
      $(".notes." + curLineNum + "").hide();
      $(".correct." + curLineNum + "").show();
      $(".line." + curLineNum + "").css('color', 'black');

      // Check if all the lines have been scanned
      if(curLineNum===end) {
        // Ask if the user wants to return to the main page/continue to the next 5 lines
        $( "#dialog" ).dialog( "open" );
        $('#main').css({'-webkit-filter':'blur(2px)', 'filter': 'blur(2px)'});

        for(var i = start; i <= end; i++) {
          $(".notes." + i + "").show();
        }
      }
      else {
        // Move to the next line
        curLineNum+=1;
        curLine = $(".line." + curLineNum + "");
        curCorrect = $(".correct." + curLineNum + "");
        curAnswer = $(".answer." + curLineNum + "");
        curNotes = $(".notes." + curLineNum + "");

        curAnswer.show();
        curLine.css('color', 'red');
        curAnswer.focus();
        //Pressing enter triggers the "done" button
        curAnswer.keyup(function(event) {
          if (event.keyCode === 13) {
            // Trigger the button element with a click
            $("#Done").click();
          }
        });
      }
    }
    //If the answer is wrong, show a message
    else {
      $("#right").hide();
      $("#wrong").show();
      curNotes.show();
      curAnswer.focus();
    }
  });
});
