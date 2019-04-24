var runes = ["B E L I E V E", "MAGIC IS REAL", "MAGIC E X I S T S", "THIS IS SAFE", "DO NOT BE AFRAID", "MAGIC HEALS", "LOVE THE EARTH", "BE CAREFUL", "DO NOT WORRY"];
var believe = false;
var useChart;
var sign;
var horoscope;
var moonSign;
//array if sun signs
var firstSigns = {
  'aries': '+',
  'taurus': '-',
  'gemini': '+',
  'cancer': '-',
  'leo': '+',
  'virgo': '-',
  'libra': '+',
  'scorpio': '-',
  'sagittarius': '+',
  'capricorn': '-',
  'aquarius': '+',
  'pisces': '-'
};

var secondSigns = {
  'aries': '-',
  'taurus': '+',
  'gemini': '-',
  'cancer': '+',
  'leo': '-',
  'virgo': '+',
  'libra': '-',
  'scorpio': '+',
  'sagittarius': '-',
  'capricorn': '+',
  'aquarius': '-',
  'pisces': '+'
};



$(document).ready(function() {
  $("#believe").css("visibility","hidden");
  $("#content-border").css("display","none");
  $("#content").css("display","none");
  $("#window").css("display","none");


  //initial loading of dropdown just in case
  for(var i = 1; i <= 31; i++){
    $("#date").append('<option value="'+ i +'">' + i + '</option>');
  }

  $("#month").on("change", function(){
    $("#date").empty();
    var count = 0;
    var month = $("#month").val();
      if(month == 2)
        count = 29;
      else if(month == 1 || month == 3 || month == 1 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
        count = 31;
      else
        count = 30;

        for(var i = 1; i <= count; i++){
          $("#date").append('<option value="'+ i +'">' + i + '</option>');
        }
  });

  $("#start").on("click", function(){
    $("#month").css("display","none");
    $("#start").css("display","none");
    $("#date").css("display","none");
    $("#title").text("Do You Believe?");
    $("#believe").css("visibility","visible");
    $("#content-border").css("display","block");
    $("#content").css("display","block");
    $("#window").css("display","block");


    //get sign
    if ($("#month").val() == 1 && $("#date").val() >=20 || $("#month").val() == 2 && $("#date").val() <=18)
      sign = "aquarius";
    if ($("#month").val() == 2 && $("#date").val() >=19 || $("#month").val() == 3 && $("#date").val() <=20)
      sign = "pisces";
    if ($("#month").val() == 3 && $("#date").val() >=21 || $("#month").val() == 4 && $("#date").val() <=19)
      sign = "aries";
    if ($("#month").val() == 4 && $("#date").val() >=20 || $("#month").val() == 5 && $("#date").val() <=20)
      sign = "taurus";
    if ($("#month").val() == 5 && $("#date").val() >=21 || $("#month").val() == 6 && $("#date").val() <=21)
      sign = "gemini";
    if ($("#month").val() == 6 && $("#date").val() >=22 || $("#month").val() == 7 && $("#date").val() <=22)
      sign = "cancer";
    if ($("#month").val() == 7 && $("#date").val() >=23 || $("#month").val() == 8 && $("#date").val() <=22)
      sign = "leo";
    if ($("#month").val() == 8 && $("#date").val() >=23 || $("#month").val() == 9 && $("#date").val() <=22)
      sign = "virgo";
    if ($("#month").val() == 9 && $("#date").val() >=23 || $("#month").val() == 10 && $("#date").val() <=22)
      sign = "libra";
    if ($("#month").val() == 10 && $("#date").val() >=23 || $("#month").val() == 11 && $("#date").val() <=21)
      sign = "scorpio";
    if ($("#month").val() == 11 && $("#date").val() >=22 || $("#month").val() == 12 && $("#date").val() <=21)
      sign = "sagittarius";
    if ($("#month").val() == 12 && $("#date").val() >=22 || $("#month").val() == 1 && $("#date").val() <=19)
      sign = "capricorn";

    if(sign == 'aries' || sign == 'gemini' || sign == 'leo' || sign == 'libra' || sign == 'sagittarius' || sign == 'aquarius')
      useChart = firstSigns;
    else
      useChart = secondSigns;

    console.log(sign);
  });

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


//http://68.183.207.85:2828/v1/moon

$.ajax({

    url : 'http://68.183.207.85:2828/v1/moon',
    type : 'GET',
    success : function(data) {
      console.log('The moon is in: '+data[0].position.sign);
      moonSign = data[0].position.sign.toLowerCase();
    },
    error : function(request,error)
    {
        alert("Request: "+JSON.stringify(request));
    }
});
});

function startHoroscope(){
  horoscope = useChart[moonSign];
  getHoroscope();
}

function getHoroscope(){
  var horoscopeText;
  if(horoscope == '+')
    horoscopeText = "You are a " + sign + ", so it looks like things aren't going to be too bad while the moon is in " + moonSign + ". Enjoy what you can!";
  else{
    horoscopeText = "You are a " + sign + ", so things may not be going as planned while the moon is in " + moonSign + ". It's okay though, it won't last forever."
  }
  console.log(horoscopeText);
}
