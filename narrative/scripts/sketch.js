//Jamie Fule

var isHot = true;
var isEmpty = false;
var collected = 0;
var currWorld = "main";
var hasCat = false;

var main10 = ["table"];
//Yes, there is a table there.
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
]
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
 if(currWorld == "main" && hasCat == true){
   $(".main-content-cat").css("visibility", "visible");
 } else{
   $(".main-content-cat").css("visibility", "hidden");
 }
}

function keyPressed() {
  if(keyCode === ENTER){
    if(currWorld == "main"){
      checkInput();
    }
    if(currWorld == "outside"){
      checkOutsideInput();
    }
    if(currWorld == "tree"){
      checkTreeInput();
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
            $(".main-content").css("backgroundImage", 'url("assets/room-coffee-empty.png")');
            $(".award-1").css("visibility", "visible");
            return;
          }
          if(isHot == false && isEmpty == false){
            $("#main-output").val("YOU DRANK COLD COFFEE. DISGUSTING. GAME OVER.");
            $("#main-control").val("");
            return;
          }
          $("#main-output").text(commandKey[i].text);
        }
        if(command == "go"){
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
