/**
  Checks the line numbers to make sure they are within a valid range
**/
$(document).ready(function(){
  start = Number($("input[name=start]").val());
  end = Number($("input[name=end]").val());

  $("input[name=start], input[name=end]").change(function() {
    start = Number($("input[name=start]").val());
    end = Number($("input[name=end]").val());

    if(start >= end) {
      $("#submit").prop('disabled', true);
      $("#feedback").text("Choose a valid range");
    }
    else if(end - start >= 10) {
      $("#submit").prop('disabled', true);
      $("#feedback").text("Choose fewer lines");
    }
    else {
      $("#submit").prop('disabled', false);
      $("#feedback").text("");
    }
  });
});
