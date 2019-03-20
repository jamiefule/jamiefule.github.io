//Jamie Fule

var isHot = true;
var isEmpty = false;
var collected = 0;
var currWorld = "main";
var hasCat = false;
var firstBasement = true;
var firstdog = true;
var hasDog = false;
var lightDog = true;
var lightBasement = true;

var isPlaying = false;
var audio = new Audio('assets/bgm.mp3');
var audioBasement = new Audio('assets/scary.mp3');


$(document).on("click", function(){
  if(isPlaying == false){
    isPlaying = true;
    audio.play();
  }
});
//--------------------------------------------Key of all Commands and Corresponding text-------------------------------------------
var commandKey = [{
  "command": "coffee",
  "text" : "Mmm Coffee always makes mornings better"
},
{
  "command": "wrong",
  "text" : "??? This is coffee..."
},
{
  "command" : "cactus",
  "text" : "Aww.. Look at the little cactus, it's so small..."
},
{
  "command" : "rude",
  "text" : "I just made that, don't be so rude"
},
{
  "command" : "socks",
  "text" : "Excuse me? Do a couple of socks really offend you that much?"
},
{
  "command": "exit",
  "text" : "You aren't going anywhere...."
},
{
  "command": "chair",
  "text" : "You just woke up, no sense in sitting around all day"
},
{
  "command": "window",
  "text" : "It sure is raining hard out there... Maybe you should take a walk outside?"
},
{
  "command": "outside",
  "text" : "Want to go outside? Type 'go out'"
},
{
  "command" : "go",
  "text" : "You are outside."
},
{
  "command" : "pink",
  "text" : "Fact: Pink is the best color"
},
{
  "command" : "light",
  "text" : "These lights are the cutest decoration"
},
{
  "command" : "table",
  "text" : "It's a table"
},
{
  "command" : "secret",
  "text" : "No secrets here, sorry"
},
{
  "command": "hello",
  "text": "Hello! Take a look around!"
},
{
  "command": "cat",
  "text": "You have a cat now."
}];
 var outsideCommandKey = [
   {
     "command": "tree",
     "text": "It's an apple tree. Why don't you take a closer look?"
   },
   {
     "command" : "flower",
     "text": "It's a little flower patch. I bet it's loving this rain."
   },
   {
     "command" : "mountain",
     "text": "It's a mountain in the far off distance. It's too far to walk to."
   },
   {
     "command" : "cloud",
     "text" : "That's a nice cloud."
   },
   {
     "command" : "rain",
     "text": "It's still raining pretty bad out here"
   },
   {
     "command": "grass",
     "text": "There's nothing interesting about the grass"
   },
   {
     "command": "leave",
     "text": "Leave? You just got here!"
   }
 ];

var treeCommandKey = [
  {
    "command": "cat",
    "text": "Wow! You found a cat!"
  },
  {
    "command": "leave",
    "text": "I guess it's time to head back inside"
  },
  {
    "command": "rain",
    "text": "It's still raining."
  },
  {
    "command": "tree",
    "text": "It's a tree."
  }
];

var lightCommandKey = [
  {
    "command": "light",
    "text" : "You check out the next room to find the light switch."
  },
  {
    "command": "leave",
    "text": "You tried to leave, but it's dark and you stubbed your toe."
  },
  {
    "command": "dark",
    "text": "It's really dark. You need to find the light."
  }
];

var darkDogCommandKey = [
  {
    "command": "light",
    "text": "You found the light."
  },
  {
    "command": "run",
    "text": "Running seems like a bad idea..."
  },
  {
    "command": "attack",
    "text": "I don't think this is a fight you can win. Just look for the light switch."
  },
  {
    "command": "monster",
    "text": "Yeah this definitely looks bad."
  }
];

var lightDogCommandKey = [
  {
    "command": "leave",
    "text": "You're back in the other room"
  },
  {
    "command": "dog",
    "text": "Hey! You found a puppy! Nothing scary about that!"
  },
  {
    "command": "cactus",
    "text": "It's a little painting of a cactus. Really cute."
  },
  {
    "command": "sock",
    "text": "A lonely sock. Looks like the dog has been chewing on it."
  },
  {
    "command": "light",
    "text": "The light is back on."
  }
];

var lightBasementCommandKey = [
  {
    "command": "leave",
    "text": "You're back upstairs"
  },
  {
    "command": "sock",
    "text": "Another sock... Looks like this one's been chewed up a bit."
  },
  {
    "command": "light",
    "text": "The light is back on."
  }
];

//---------------------------------------------List of commands for main room------------------------------------------------------
var mainCommands = [{
  "word" : "coffee",
  "command" : "coffee"
},
{
  "word" : "mug",
  "command" : "coffee"
},
{
  "word" : "sip",
  "command" : "coffee"
},
{
  "word" : "tea",
  "command" : "wrong"
},
{
  "word" : "juice",
  "command" : "wrong"
},
{
  "word" : "milk",
  "command" : "wrong"
},
{
  "word" : "chocolate",
  "command" : "wrong"
},
{
  "word": "cactus",
  "command": "cactus"
},
{
  "word": "plant",
  "command" : "cactus"
},
{
  "word": "succulent",
  "command" : "cactus"
},
{
  "word": "cacti",
  "command" : "cactus"
},
{
  "word": "pour",
  "command": "rude"
},
{
  "word": "sock",
  "command" : "socks"
},
{
  "word": "mess",
  "command" : "socks"
},
{
  "word": "dirty",
  "command" : "socks"
},
{
  "word": "clothes" ,
  "command" : "socks"
},
{
  "word": "exit",
  "command": "exit"
},
{
  "word": "leave",
  "command": "exit"
},
{
  "word": "escape" ,
  "command": "exit"
},
{
  "word": "quit" ,
  "command": "exit"
},
{
  "word": "restart" ,
  "command": "exit"
},
{
  "word": "chair" ,
  "command": "chair"
},
{
  "word": "sit" ,
  "command": "chair"
},
{
  "word": "couch" ,
  "command": "chair"
},
{
  "word": "lay" ,
  "command": "chair"
},
{
  "word": "relax" ,
  "command": "chair"
},
{
  "word": "sleep" ,
  "command": "chair"
},
{
  "word": "rain" ,
  "command": "window"
},
{
  "word": "window" ,
  "command": "window"
},
{
  "word": "outside" ,
  "command": "outside"
},
{
  "word": "weather" ,
  "command": "window"
},
{
  "word": "go out" ,
  "command": "go"
},
{
  "word": "check it out" ,
  "command": "outside"
},
{
  "word": "pink" ,
  "command": "pink"
},
{
  "word": "ugly" ,
  "command": "pink"
},
{
  "word": "gross" ,
  "command": "pink"
},
{
  "word": "light" ,
  "command": "light"
},
{
  "word": "fairy" ,
  "command": "light"
},
{
  "word": "string" ,
  "command": "light"
},
{
  "word": "table" ,
  "command": "table"
},
{
  "word": "secret" ,
  "command": "secret"
},
{
  "word": "hello",
  "command" : "hello"
},
{
  "word":"hi",
  "command":"hello"
},{
  "word": "cat",
  "command": "cat"
}
];



var outsideCommands = [
  {
    "word" : "tree",
    "command" : "tree"
  },
  {
    "word": "flower",
    "command": "flower"
  },
  {
    "word": "grass",
    "command": "grass"
  },
  {
    "word": "cloud",
    "command": "cloud"
  },
  {
    "word": "mountain",
    "command": "mountain"
  },
  {
    "word": "rain",
    "command": "rain"
  },
  {
    "word": "weather",
    "command": "rain"
  },
  {
    "word": "sky",
    "command": "rain"
  },
  {
    "word": "grass",
    "command": "grass"
  },
  {
    "word": "back",
    "command": "leave"
  },
  {
    "word": "leave",
    "command": "leave"
  },
  {
    "word": "go in",
    "command": "leave"
  }
];

var treeCommands = [
  {
    "word": "cat",
    "command": "cat"
  },
  {
    "word": "back",
    "command": "leave"
  },
  {
    "word": "leave",
    "command": "leave"
  },
  {
    "word": "rain",
    "command": "rain"
  },
  {
    "word": "tree",
    "command": "tree"
  },
  {
    "word": "exit",
    "command": "leave"
  }
];

var lightCommands = [
  {
    "word": "light",
    "command": "light"
  },
  {
    "word": "turn on",
    "command": "light"
  },
  {
    "word": "find",
    "command": "light"
  },
  {
    "word": "leave",
    "command": "leave"
  },
  {
    "word": "back",
    "command": "leave"
  },
  {
    "word": "exit",
    "command": "leave"
  },
  {
    "word": "upstairs",
    "command": "leave"
  },
  {
    "word": "stairs",
    "command": "leave"
  },
  {
    "word": "dark",
    "command": "dark"
  }
];

var darkDogCommands = [
  {
    "word": "light",
    "command" :  "light"
  },
  {
    "word": "escape",
    "command" : "run"
  },
  {
    "word": "run",
    "command" : "run"
  },
  {
    "word": "flee",
    "command" : "run"
  },
  {
    "word": "attack",
    "command" : "attack"
  },
  {
    "word": "fight",
    "command" : "attack"
  },
  {
    "word": "hit",
    "command" : "attack"
  },
  {
    "word": "monster",
    "command" : "monster"
  },
  {
    "word": "evil",
    "command" : "monster"
  }
];

var lightDogCommands = [
  {
    "word": "leave",
    "command" :  "leave"
  },
  {
    "word": "back",
    "command": "leave"
  },
  {
    "word": "exit",
    "command": "leave"
  },
  {
    "word": "dog",
    "command": "dog"
  },
  {
    "word": "painting",
    "command": "cactus"
  },
  {
    "word": "picture",
    "command": "cactus"
  },
  {
    "word": "cactus",
    "command": "cactus"
  },
  {
    "word": "sock",
    "command": "sock"
  },
  {
    "word": "light",
    "command": "light"
  }
];

var lightBasementCommands = [
  {
    "word": "leave",
    "command" :  "leave"
  },
  {
    "word": "back",
    "command": "leave"
  },
  {
    "word": "stairs",
    "command": "leave"
  },
  {
    "word": "exit",
    "command": "leave"
  },
  {
    "word": "light",
    "command": "light"
  },
  {
    "word": "sock",
    "command": "sock"
  }
];

function setup() {

}

function draw(){
 //check value of select box
 if($("#select-control").val() == "yes"){
   $("#select-control").val("");
   $(".text-input").css("visibility", "visible");
   $(".select-input").css("visibility", "hidden");
   currWorld = "tree";
   $(".main-content").css("backgroundImage", 'url("assets/tree.png")');
   $(".main-content").css("zIndex", "51");
   $("#main-output").text("You're taking a closer look.");
 }
 if($("#select-control").val() == "no"){
   $("#select-control").val("");
   $(".text-input").css("visibility", "visible");
   $(".select-input").css("visibility", "hidden");
   $("#main-output").text("I guess the tree isn't cool enough for you.");

 }
 if(currWorld == "main" && hasCat == true){
   $(".main-content-cat").css("visibility", "visible");
 } else{
   $(".main-content-cat").css("visibility", "hidden");
 }

 if(currWorld == "main" && isHot == false && isEmpty == false){
     $(".main-content").css("backgroundImage",'url("assets/main.png")');
 }
 if(currWorld == "main" && isEmpty == true){
   $(".main-content").css("backgroundImage",'url("assets/room-coffee-empty.png")');
 }
 if(currWorld == "main" && isEmpty == true && hasCat == true && hasDog == false){
   $("#main-output").text("Hmm, you heard something downstairs... Maybe you should go down there.");
   $(".text-input").css("visibility", "hidden");
   $(".basement-input").css("visibility", "visible");
 }
 if(currWorld == 'basement' && firstBasement == true){
   firstBasement = false;
   $("#main-output").text("It's dark, you should look for a light switch.");
   $(".main-content").css("backgroundImage", 'url("assets/basement-1.png")');
   $(".text-input").css("visibility", "visible");
   $(".basement-input").css("visibility", "hidden");
   audio.pause();
   audioBasement.play();
 }
 if(currWorld == "darkDog" && firstdog == true){
   firstdog = false;
   $("#main-output").text("You check out the next room to find the light switch.");
 }
 if(currWorld == "lightDog" && lightDog == true){
   lightDog = false;
   $("#main-output").text("You found the light.");
 }
 if(currWorld == "lightBasement" && lightBasement == true){
   lightBasement = false;
   $("#main-output").text("You're back in the other room.");
 }
 if(currWorld == "sleep"){
   $(".last-screen").css("visibility", "visible");
   $(".sleep-input").css("visibility", "hidden");
   $(".reset-input").css("visibility", "visible");
   $("#main-output").text("You win! You collected all 3 items necessary for a perfect life!");
 }
 if(currWorld == "main" && hasDog == true && hasCat == true && isEmpty == true){
   $("#main-output").text("You feel like you've accomplished a lot today. I think it's time to sleep.");
   $(".sleep-input").css("visibility", "visible");
   $(".text-input").css("visibility", "hidden");

 }
}

function keyPressed() {
  if(keyCode === ENTER && $("#main-control").val() != ""){
    if(currWorld == "main"){
      checkInput();
    }
    if(currWorld == "outside"){
      checkOutsideInput();
    }
    if(currWorld == "tree"){
      checkTreeInput();
    }
    if(currWorld == "basement"){
      checkBasementInput();
    }
    if(currWorld == "darkDog"){
      checkDarkDogInput();
    }
    if(currWorld == "lightDog"){
      checkLightDogInput();
    }
    if(currWorld == "lightBasement"){
      checkLightBasementInput();
    }
  }
}

function checkInput(){
  var found = false;
  var input = $("#main-control").val();
  for(var i = 0; i < mainCommands.length; i++){
    if(input.includes(mainCommands[i].word)){
      var command = mainCommands[i].command;
      found = true;
        $("#main-control").val("");
    }
  }
  if(found == false){
    $("#main-output").text("I don't know what that means, stop trying to be funny.");
  }else{
    for(var i = 0; commandKey.length; i++){
      if(command == commandKey[i].command){
        if(command == "coffee"){
          if(isEmpty){
            $("#main-output").text("You already drank the coffee. It's empty.");
            $("#main-control").val("");
            return;
          }
          if(isHot == true && isEmpty == false){
            $("#main-output").text(commandKey[i].text);
            isEmpty = true;
            collected++;
            $("#main-control").val("");
            $(".award-1").css("visibility", "visible");
            return;
          }
          if(isHot == false && isEmpty == false){
            $("#main-output").text("YOU DRANK COLD COFFEE. N A S T Y. GAME OVER.");
            $("#main-control").val("");
            $(".reset-input").css("visibility", "visible");
            $(".text-input").css("visibility", "hidden");
            return;
          }
          $("#main-output").text(commandKey[i].text);
        }
        if(command == "outside"){
          if(hasCat == true){
            $("#main-output").text("There's nothing else to do outside.");
            return;
          }
        }
        if(command == "cat"){
          if(hasCat == true){
            $("#main-output").text(commandKey[i].text);
            return;
          } else{
            $("#main-output").text("Having a cat would be cool.");
            return;
          }
        }
        if(command == "go"){
          if(hasCat == true){
            $("#main-output").text("There's nothing else to do outside.");
            return;
          }
          currWorld = "outside";
          isHot = false;
          $(".main-content").css("backgroundImage", 'url("assets/outside.png")');
          $(".image").css("zIndex", "50");
          $(".window-color").css("backgroundImage", 'url("assets/mountains.png")')
        }
        $("#main-output").text(commandKey[i].text);
      }
    }
  }
  $("#main-control").val("");
}

function checkOutsideInput(){
  var found = false;
  var input = $("#main-control").val();
  for(var i = 0; i < outsideCommands.length; i++){
    if(input.includes(outsideCommands[i].word)){
      var command = outsideCommands[i].command;
      found = true;
        $("#main-control").val("");
    }
  }
  if(found == false){
    $("#main-output").text("I don't know what that means, stop trying to be funny.");
  }else{
    for(var i = 0; outsideCommandKey.length; i++){
      if(command == outsideCommandKey[i].command){
        if(command == "tree"){
          $(".text-input").css("visibility", "hidden");
          $(".select-input").css("visibility", "visible");
        }
        $("#main-output").text(outsideCommandKey[i].text);
      }
    }
  }
  $("#main-control").val("");
}

function checkTreeInput(){
  var found = false;
  var input = $("#main-control").val();
  for(var i = 0; i < treeCommands.length; i++){
    if(input.includes(treeCommands[i].word)){
      var command = treeCommands[i].command;
      found = true;
        $("#main-control").val("");
    }
  }
  if(found == false){
    $("#main-output").text("I don't know what that means, stop trying to be funny.");
  }else{
    for(var i = 0; treeCommandKey.length; i++){
      if(command == treeCommandKey[i].command){
        if(command == "cat"){
          $(".award-2").css("visibility", "visible");
          hasCat = true;
        }
        if(command == "leave"){
          currWorld = "main";
          if(isEmpty)
          $(".main-content").css("backgroundImage", 'url("assets/room-coffee-empty.png")');
          else
          $(".main-content").css("backgroundImage", 'url("assets/coffee.gif")');
          $(".window-color").css("backgroundImage", "none");
        }
        $("#main-output").text(treeCommandKey[i].text);
      }
    }
  }
  $("#main-control").val("");
}


function checkBasementInput(){
  var found = false;
  var input = $("#main-control").val();
  for(var i = 0; i < lightCommands.length; i++){
    if(input.includes(lightCommands[i].word)){
      var command = lightCommands[i].command;
      found = true;
        $("#main-control").val("");
    }
  }
  if(found == false){
    $("#main-output").text("I don't know what that means, stop trying to be funny.");
  }else{
    for(var i = 0;i < lightCommandKey.length; i++){
      if(command == lightCommandKey[i].command){
        if(command == "light"){
          currWorld = "darkDog";
          $(".main-content").css("backgroundImage", 'url("assets/eyes.png")');
        }
        $("#main-output").text(lightCommandKey[i].text);
      }
    }
  }
  $("#main-control").val("");
}

function checkDarkDogInput(){
    var found = false;
    var input = $("#main-control").val();
    for(var i = 0; i < darkDogCommands.length; i++){
      if(input.includes(darkDogCommands[i].word)){
        var command = darkDogCommands[i].command;
        found = true;
          $("#main-control").val("");
      }
    }
    if(found == false){
      $("#main-output").text("I don't know what that means, stop trying to be funny.");
    }else{
      for(var i = 0;i < darkDogCommandKey.length; i++){
        if(command == darkDogCommandKey[i].command){
          if(command == "light"){
            currWorld = "lightDog";
            audioBasement.pause();
            audio.play();
            hasDog = true;
            $(".award-3").css("visibility", 'visible');
            $(".main-content").css("backgroundImage", 'url("assets/basement-dog.png")');
          }
          $("#main-output").text(darkDogCommandKey[i].text);
        }
      }
    }
    $("#main-control").val("");
  }

  function checkLightDogInput(){
      var found = false;
      var input = $("#main-control").val();
      for(var i = 0; i < lightDogCommands.length; i++){
        if(input.includes(lightDogCommands[i].word)){
          var command = lightDogCommands[i].command;
          found = true;
            $("#main-control").val("");
        }
      }
      if(found == false){
        $("#main-output").text("I don't know what that means, stop trying to be funny.");
      }else{
        for(var i = 0;i < lightDogCommandKey.length; i++){
          if(command == lightDogCommandKey[i].command){
            if(command == "leave"){
              $("#main-control").val("");
              currWorld = "lightBasement";
              $(".main-content").css("backgroundImage", 'url("assets/basement-2.png")');
            }
            if(command == "dog"){
            }
            $("#main-output").text(lightDogCommandKey[i].text);
          }
        }
      }
      $("#main-control").val("");
    }

    function checkLightBasementInput(){
        var found = false;
        var input = $("#main-control").val();
        for(var i = 0; i < lightBasementCommands.length; i++){
          if(input.includes(lightBasementCommands[i].word)){
            var command = lightBasementCommands[i].command;
            found = true;
              $("#main-control").val("");
          }
        }
        if(found == false){
          $("#main-output").text("I don't know what that means, maybe you should just go upstairs.");
        }else{
          for(var i = 0;i < lightBasementCommandKey.length; i++){
            if(command == lightBasementCommandKey[i].command){
              if(command == "leave"){
                $("#main-control").val("");
                currWorld = "main";
                $(".main-content-dog").css("visibility", "visible");
              }
              $("#main-output").text(lightBasementCommandKey[i].text);
            }
          }
        }
        $("#main-control").val("");
      }
