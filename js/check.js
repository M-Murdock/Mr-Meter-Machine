$(document).ready(function(){
  $("#right").hide();
  $("#wrong").hide();
  $(".correct").hide();
  $(".answer").hide();

  // Store the line, correct answer, and user's input
  $(".answer").first().show();
  var curLine = $(".line").first();
  var curCorrect = $(".correct").first();
  var curAnswer = $(".answer").first();
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
    var answer = curAnswer.val();
    var correct = curCorrect.text();

    // If the answer is correct, move to the next line
    if($.trim(answer) === $.trim(correct)) {
      $("#right").show();
      $("#wrong").hide();
      curAnswer.hide();
      curCorrect.show();
      curLine.css('color', 'black');

      // Check if all the lines have been scanned
      if(curAnswer.is($(".answer").last())) {
        alert("Nice job! You've finished!");
      }
      else {
        curAnswer = curAnswer.next().next().next().next();
        curLine = curLine.next().next().next().next();
        curAnswer.show();
        curCorrect = curCorrect.next().next().next().next();
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
    }
  });
});
