//jfule2

//global variables
var canvas;
var backgroundColor;
var fillColor;
var strokeColor;
var stamp;
var numbers = [];
var white = 255;
var green;


function setup() {
canvas = createCanvas(windowWidth, windowHeight);
background(0);
textFont("courier");
textSize(20);
green =  color(0,0,0);

for(var i = 0; i < windowWidth; i+= 21){
  for(var j = 0; j < windowHeight; j+= 21){
    fill(white);
    //Generate random num 0 or 1
    var num;
    if(Math.random() > .5){
      num = 1;
    } else{
      num = 0;
    }
    //convert num to string and display
    text(num.toString(), i, j);
    numbers.push({
      "Number" : num,
      "x" : i,
      "y" : j,
      "color"  : white
    });
    //var text = 1;

  }
}
}

function draw() {
  if (mouseIsPressed) {
        var element = getClosest(mouseX, mouseY);
        numbers[element].color = green;
        redrawItems();
  }

}

function redrawItems(){
  background(0);
  for(var i = 0; i < numbers.length; i++){
      fill(numbers[i].color);
      //convert num to string and display
      text(numbers[i].Number, numbers[i].x, numbers[i].y);
      //var text = 1;

  }
}


function getClosest(mX, mY){
  var closest = 0;
  var minDistance = 999999;
  var distance;
  for(var i = 0; i < numbers.length; i++){
    distance = Math.sqrt(Math.pow(numbers[i].x - mX , 2) + Math.pow(numbers[i].y - mY , 2));
    if(distance < minDistance){
      closest = i;
      minDistance = distance;
    }

  }
  console.log(closest);
  return closest;
}


/*
Project Idea: orange-yellow-green vaporwave look that has palm trees and stuff and plays that mario sunshine music from the one beach with manta rays
maybe have multiple drawing modes with different themes and different music
maybe have a mini brick-break game but you draw the line the ball bounces off maybe
-Add limited vapor-wave esc color scheme
-add stamps
-have space draw mode with 3d rotating planets
-have a mode thats pixel adventure style?
-have different color palletes for each mode

MODES:
BEACH - mario sunshine soundtrack
VAPORWAVE - hotline miami song or its raining somewhere else undertale
SPACE - idk something ominous - CORE (undertale)?
UNDERWATER - mario galaxy ocean planet?
Dessert - stardew valley desert
GAME - zelda?
 */

 /* play its raining somewhere else Better project idea: have a bunch of binary on screen and different inputs affect the way it displays :
 kinda looks likes space or whatever have key inputs change the item being displayed */
