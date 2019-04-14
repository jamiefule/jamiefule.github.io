var runes = ["B E L I E V E", "MAGIC IS REAL", "MAGIC E X I S T S", "THIS IS SAFE", "DO NOT BE AFRAID", "MAGIC HEALS", "LOVE THE EARTH", "BE CAREFUL", "DO NOT WORRY"];
$(document).ready(function() {
  $("#believe").on("change", function(){
    if($("#believe").val() == "yes"){
      $("#content").css("backgroundImage", "url('assets/yes-room-empty.png')");
      $("#window").css("backgroundImage", "url('assets/yes-window.png')");
    }
    else{
      $("#content").css("backgroundImage", "url('assets/no-room-full.png')");
      $("#window").css("backgroundImage", "url('assets/no-window.png')");
    }
  });
  setInterval(function(){
    $("#runes-left").text(runes[Math.floor(Math.random() * runes.length)]);
    $("#runes-right").text(runes[Math.floor(Math.random() * runes.length)]);
}, 300);
});
