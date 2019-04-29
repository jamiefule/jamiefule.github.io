var runes = ["B E L I E V E", "MAGIC IS REAL", "MAGIC E X I S T S", "THIS IS SAFE", "DO NOT BE AFRAID", "MAGIC HEALS", "LOVE THE EARTH", "BE CAREFUL", "DO NOT WORRY"];
var believe = false;
var useChart;
var sign;
var horoscope;
var moonSign;
var shake = false;
var firstShake = true;
var gaze = false;
var rand;
var card = false;
var tarot = false;
var noAudio = new Audio('assets/EasyLemon.mp3');
var yesAudio = new Audio('assets/MistyMire.mp3');


var majorArcana = [
  {
    'card': 'The Chariot',
    'image' : 'assets/tarot/chariot.png',
    'description': 'With a bit of confidence, success will be coming your way.'
  },
  {
    'card': 'Death',
    'image' : 'assets/tarot/death.png',
    'description': 'All good things come to and end, it is time for a transition.'
  },
  {
    'card': 'The Devil',
    'image' : 'assets/tarot/devil.png',
    'description': 'It seems that may you have been indulging a bit too much and may have a few addictions you need to let go of. Please take care of yourself.'
  },
  {
    'card': 'The Empress',
    'image' : 'assets/tarot/empress.png',
    'description': 'Now is a great time to focus on making something new. Get in touch with your creative side.'
  },
  {
    'card': 'The Emperor',
    'image' : 'assets/tarot/emperor.png',
    'description': "It's time for some more discipline in your life. You need to focus on creating a more stable environment."
  },
  {
    'card': 'The Fool' ,
    'image' : 'assets/tarot/fool.png',
    'description':'Trust in yourself. Go with your natural instincts, they will lead you to success.'
  },
  {
    'card': 'The Hanged Man',
    'image' : 'assets/tarot/hanged.png',
    'description': 'Looking at things in a new perspective is important to do at this time.'
  },
  {
    'card': 'The Heirophant',
    'image' : 'assets/tarot/heirophant.png',
    'description': "It may be time to look to a more traditional outlook on things. Sometimes looking to the old can inspire something new."
  },
  {
    'card': 'The Hermit',
    'image' : 'assets/tarot/hermit.png',
    'description':'You are due for some much needed introspection. Reflect on where you are in life, and make sure you are on track.'
  },
  {
    'card': 'Judgement',
    'image' : 'assets/tarot/judgement.png',
    'description': "It's time to forgive yourself, and allow yourself to grow."
  },
  {
    'card': 'Justice',
    'image' : 'assets/tarot/justice.png',
    'description': 'Fairness will prevail, look out for hurt feelings during this time.'
  },
  {
    'card': 'The Lovers',
    'image' : 'assets/tarot/lovers.png',
    'description': 'Indulge in your passions, it is time to listen to your heart.'
  },
  {
    'card': 'The Magician',
    'image' : 'assets/tarot/magician.png',
    'description':'Go after your greatest achievements, you have the power and intellect to do so at this time.'
  },
  {
    'card': 'The Moon',
    'image' : 'assets/tarot/moon.png',
    'description': 'Many good things can seem real, but are merely an illusion. Think about who may be decieving you at this time.'
  },
  {
    'card': 'The High Priestess',
    'image' : 'assets/tarot/priestess.png',
    'description': 'Reflect on all your options, and then go with your intuition. You can trust your own stability.'
  },
  {
    'card': 'The Star',
    'image' : 'assets/tarot/star.png',
    'description': 'Listen to your dreams to help guide you. It is time to renew your passions.'
  },
  {
    'card': 'Strength',
    'image' : 'assets/tarot/strength.png',
    'description': 'It may be wise to take a calm and compassionate approach to your life at this time.'
  },
  {
    'card': 'The Sun',
    'image' : 'assets/tarot/sun.png',
    'description': 'You are due for some happiness and a refreshing outlook on life.'
  },
  {
    'card': 'Temperance',
    'image' : 'assets/tarot/temperance.png',
    'description': 'Balance in life is a necessity at this time, please be mindful of that.'
  },
  {
    'card': 'The Tower',
    'image' : 'assets/tarot/tower.png',
    'description': 'Something seems to be collapsing in your life. Change can be good, and a release of things can help propel you in the future.'
  },
  {
    'card': 'The Wheel of Fortune',
    'image' : 'assets/tarot/wheel.png',
    'description': 'Things might be changing soon, it looks like you are in for some good luck.'
  }
];

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
    shake = false;
    gaze = false;
    firstShake = true;
    $("#ball").text("ball");
    $("#cards").text("cards");
    $("#ball").css("visibility","visible");
    $("#cards").css("visibility","visible");
    $("#tarot-text").css("visibility","hidden");
    $("#tarot-card").css("visibility","hidden");
    $("#tarot-title").css("visibility", "hidden");

    if($("#believe").val() == "yes"){
      $("#content-border").css("backgroundColor","white");
      believe = true;
      $("#content").css("backgroundImage", "url('assets/yes-room-full.gif')");
      noAudio.pause();
      yesAudio.play();
    }
    else{
      $("#horoscope-text").css("visibility", "hidden");
      $("#content-border").css("backgroundColor","white");
      believe = false;
      $("#content").css("backgroundImage", "url('assets/no-room-full.gif')");
      yesAudio.pause();
      noAudio.play();
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
        alert("Please click the shield icon in your url bar and click 'load unsafe scripts' (It's safe don't worry)");
    }
});
$("#cards").on("click", function(){
  $("#horoscope-text").css("visibility", "hidden");
  $("#tarot-text").css("visibility","hidden");
  $("#tarot-card").css("visibility","hidden");
  $("#tarot-title").css("visibility", "hidden");

  if(card == true){
    $("#content").css("backgroundImage", "url('assets/no-room-full.gif')");
    $("#ball").css("visibility", "visible");
    $("#ball").text("ball");
    $("#cards").text("cards");
    card = false;
    return;
  }
  if(tarot == true){
    $("#content").css("backgroundImage", "url('assets/yes-room-full.gif')");
    $("#ball").css("visibility", "visible");
    $("#tarot-text").css("visibility","hidden");
    $("#ball").text("ball");
    $("#cards").text("cards");
    tarot = false;
    return;
  }
  if(shake == true){
    shake = false;
    firstShake = true;
    $("#ball").text("ball");
    $("#cards").text("cards");
    $("#content").css("backgroundImage", "url('assets/no-room-full.gif')");
    return;
  }

  if(gaze == true){
    gaze = false;
    $("#ball").text("ball");
    $("#cards").text("cards");
    $("#content").css("backgroundImage", "url('assets/yes-room-full.gif')");
    return;
  }
  if(believe == true){
    $("#content").css("backgroundImage", "url('assets/tarot-bg.png')");
    $("#ball").css("visibility", "visible");
    $("#tarot-text").css("visibility","hidden");
    $("#ball").text("get card");
    $("#cards").text("back");
    tarot = true;
  }
  if(believe == false){
    $("#content").css("backgroundImage", "url('assets/cards.png')");
    card = true;
    $("#ball").css("visibility", "hidden");
    $("#cards").text("back");

  }
});

$("#ball").on("click", function(){
  if(tarot == true){
    $("#tarot-text").css("visibility","visible");
    $("#tarot-card").css("visibility","visible");
    $("#tarot-title").css("visibility", "visible");
    var rand = Math.floor(Math.random() * majorArcana.length );
    $("#tarot-card").css('backgroundImage', 'url('+ majorArcana[rand].image + ')');
    $("#tarot-text").text(majorArcana[rand].description);
    $("#tarot-title").text(majorArcana[rand].card);
    return;
  }
  if(gaze == true){
    $("#horoscope-text").css("visibility", "visible");
    startHoroscope();
    return;
  }
  if(believe == true){
    $("#content").css("backgroundImage", "url('assets/crystal-ball.gif')");
    $("#ball").text("gaze");
    $("#cards").text("back");
    gaze = true;
  }
  if(believe == false){
    $("#content").css("backgroundImage", "url('assets/8ball/shake.png')");
    shake = true;
    $("#ball").text("shake");
    $("#cards").text("back");
  }

  if(shake == true){
    rand = Math.floor(Math.random()*5);
    if(firstShake != true){
      if(rand == 0)
      $("#content").css("backgroundImage", "url('assets/8ball/no.png')");

      if(rand == 1)
      $("#content").css("backgroundImage", "url('assets/8ball/yes.png')");

      if(rand == 2)
      $("#content").css("backgroundImage", "url('assets/8ball/idk.png')");

      if(rand == 3)
      $("#content").css("backgroundImage", "url('assets/8ball/maybe.png')");

      if(rand == 4)
      $("#content").css("backgroundImage", "url('assets/8ball/later.png')");
    }
    firstShake = false;
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
      $("#horoscope-text").text(horoscopeText);
}
