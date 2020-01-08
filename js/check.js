$(document).ready(function(){
  $("#right").hide();
  $("#wrong").hide();
  $(".correct").hide();
  $(".answer").hide();
  $(".notes").hide();

  // Store the line, correct answer, and user's input
  $(".answer").first().show();
  var curLine = $(".line").first();
  var curCorrect = $(".correct").first();
  var curAnswer = $(".answer").first();
  var curNotes = $(".notes").first();
  curLine.css('color', 'red');

  //Pressing enter triggers the "done" button
  curAnswer.keyup(function(event) {
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      $("#Done").click();
    }
  });
  // When the button is clicked, check the answer
  $("#Done").click(function() {
    var answer = curAnswer.val().replace(/\s/g, "");
    var correct = curCorrect.text().replace(/\s/g, "");

    // If the answer is correct, move to the next line
    if($.trim(answer) === $.trim(correct)) {
      $("#right").show();
      $("#wrong").hide();
      curAnswer.hide();
      curNotes.hide();
      curCorrect.show();
      curLine.css('color', 'black');

      // Check if all the lines have been scanned
      if(curAnswer.is($(".answer").last())) {
        alert("Nice job! You've finished!");
        $(".notes").show();
      }
      else {
        curAnswer = curAnswer.next().next().next();
        curLine = curLine.next().next().next();
        curNotes = curNotes.next();
        curAnswer.show();
        curCorrect = curCorrect.next().next().next();
        curLine.css('color', 'red');
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
    }
  });
});
