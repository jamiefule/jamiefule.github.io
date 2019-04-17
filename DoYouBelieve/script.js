var runes = ["B E L I E V E", "MAGIC IS REAL", "MAGIC E X I S T S", "THIS IS SAFE", "DO NOT BE AFRAID", "MAGIC HEALS", "LOVE THE EARTH", "BE CAREFUL", "DO NOT WORRY"];
var believe = false;
$(document).ready(function() {
  $("#believe").on("click", function(){
    if($("#believe").val() == "yes"){
      $("#content-border").css("backgroundColor","white");
      believe = true;
      $("#content").css("backgroundImage", "url('assets/yes-room-full.png')");
      $("#window").css("backgroundImage", "url('assets/yes-window.png')");
    }
    else{
      $("#content-border").css("backgroundColor","white");
      believe = false;
      $("#content").css("backgroundImage", "url('assets/no-room-full.png')");
      $("#window").css("backgroundImage", "url('assets/no-window.png')");
    }
  });

  setInterval(function(){
      if(believe == true){
        $("#runes-left").css("visibility","visible");
        $("#runes-right").css("visibility","visible");
        $("#runes-left").text(runes[Math.floor(Math.random() * runes.length)]);
        $("#runes-right").text(runes[Math.floor(Math.random() * runes.length)]);
      } else{
      $("#runes-left").css("visibility","hidden");
      $("#runes-right").css("visibility","hidden");

      }
}, 300);
});
