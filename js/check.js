$(document).ready(function(){
  $("#right").hide();
  $("#wrong").hide();
  $(".correct").hide();

  // Store the line, correct answer, and user's input
  var curLine = $(".line").first();
  var curCorrect = $(".correct").first();
  var curAnswer = $(".answer").first();
  curLine.css('color', 'red');

  // When the Button is clicked
  $("#Done").click(function() {
    var answer = curAnswer.val();
    var correct = curCorrect.text();


    // alert("Your answer: " + answer);
    // alert("Correct answer: " + correct);

    // If the answer is correct, move to the next line
    if($.trim(answer) === $.trim(correct)) {
      $("#right").show();
      $("#wrong").hide();
      curAnswer = curAnswer.next();
      curCorrect = curCorrect.next();
      curLine.css('color', 'black');
      curLine = curLine.next();
      curLine.css('color', 'red');
    }
    //If the answer is wrong, show a message
    else {
      $("#right").hide();
      $("#wrong").show();
    }
  });
});
