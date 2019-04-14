$(document).ready(function() {
  $("#believe").on("change", function(){
    if($("#believe").val() == "yes"){
      $("#content").css("backgroundImage", "url('assets/yes-room-empty.png')");
      $("#window").css("backgroundImage", "url('assets/yes-window.png')");
    }
    else{
      $("#content").css("backgroundImage", "url('assets/no-room-empty.png')");
      $("#window").css("backgroundImage", "url('assets/no-window.png')");
    }
  });
});
