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
    }
    else if(end - start >= 5) {
      $("#submit").prop('disabled', true);
    }
    else {
      $("#submit").prop('disabled', false);
    }
  });
});
