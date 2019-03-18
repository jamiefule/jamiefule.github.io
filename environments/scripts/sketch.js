//Jamie Fule
//Change mouse cursor depending on 'level'
//
var canvas;
var input = 0;
var level = 0;

var bubbleArr = [];
var magicArr = [];
var floodArr = [];
var rainCubeArr = [];
var cuteBubbleArr = [];
var flowerArr = [];
var geometricArr = [];
var fireflyArr = [];
var dustArr = [];


var rainSound = new Audio('assets/rain.mp3');
var underwaterSound = new Audio('assets/underwater.mp3');
var cuteSound = new Audio('assets/cute.mp3');


function setup() {
canvas = createCanvas(windowWidth, windowHeight);
background(0,0,0,0);
}

function draw(){
  if(level == 0){
    cute();
    bubblePhysics();
  } else if(level == 1){
    rain();
    rainGravity();
  }
  //else level = 2
  else{
    underwater();
      applyGravity();
  }
}

function cute(){
    $('*').css('background-image', 'url("assets/bg/bg4.gif")');
    $('.instructions').css('background-image', 'none');
    $('.instructions p').css('background-image', 'none');
    $('#btn').css('background-image', 'none');
    $('*').css(  'background-size', 'initial');

  if(mouseIsPressed){
    //bubble brush
    if(input == 0){

      var offset = Math.floor(Math.random() * 20);
      var xDir = offset % 2 == 0 ? 1 : -1;
      var offset2 = Math.floor(Math.random() * 20);
      var yDir = offset2 % 2 == 0 ? -1 : 1;
      cuteBubbleArr.push({
        'x' : mouseX,
        'y' : mouseY,
        'radius' : offset,
        'xDir' : xDir,
        'yDir' : yDir
      });

    }
    //flower brush
    else if (input == 1){
      console.log("flower");
      var randomInner = Math.floor(random(1,4));
      var randomOuter = Math.floor(random(1,50));
      flowerArr.push({
        'x' : mouseX,
        'y' : mouseY,
        'randomOuter' : randomOuter,
        'randomInner' : randomInner
      });

    }
    //geometric brush
    else if (input == 2){
      console.log("geometric");

      geometricArr.push({
        'x' : mouseX,
        'y' : mouseY
      });

    }
  }
}

function rain(){
  $('*').css('background-image', 'url("assets/bg/rain3.gif")');
  $('.instructions').css('background-image', 'none');
  $('.instructions p').css('background-image', 'none');
  $('#btn').css('background-image', 'none');
  $('*').css(  'background-size', 'cover');
  createCanvas(windowWidth, windowHeight);

  if(mouseIsPressed){
    //wave brush
    if(input == 0){
      var offset = random(5,20);
      var random2 = random(5,20);
      floodArr.push(
        {
          'x1': mouseX,
          'y1' : mouseY,
          'x2' : 0,
          'y2' : 0,
          'weight' : random(2,10),
          'opacity' : random(50,255)
        }
      );
      //raining cube brush
    } else if(input == 1){
      var random2 = random(15,50);
      var offset = random (5,15);
      var newMouseX = mouseX + random(-50,50);
      var newMouseY = mouseY + random(-50,50);
      if(Math.floor(offset) % 2 == 0)
      rainCubeArr.push(
        {
          'x1': newMouseX,
          'y1' : newMouseY,
          'x2' : random2,
          'y2' : random2,

          'x3' : newMouseX + offset,
          'y3' : newMouseY - offset,
          'x4' : random2,
          'y4' : random2,

          'l1x1' : newMouseX,
          'l1y1' : newMouseY,
          'l1x2' : newMouseX + offset,
          "l1y2" : newMouseY - offset,

          'l2x1' : newMouseX + random2,
          'l2y1' : newMouseY,
          'l2x2' : newMouseX + random2 + offset,
          "l2y2" : newMouseY - offset,

          'l3x1' : newMouseX,
          'l3y1' : newMouseY + random2,
          'l3x2' : newMouseX + offset,
          "l3y2" : newMouseY + random2 - offset,

          'l4x1' : newMouseX + random2,
          'l4y1' : newMouseY + random2,
          'l4x2' : newMouseX + offset + random2,
          "l4y2" : newMouseY - offset + random2,

          'weight' : random(2,10),
          'opacity' : random(50,100)
        }
      );
    }

    //firefly brush
    else{
      var radius = random(1,10);
      fireflyArr.push({
        'x' : mouseX,
        'y' : mouseY,
        'radius' : radius,
        'light' : random(0,255)
      });
    }
  }

}

function underwater(){
  $('*').css('background-image', 'url("assets/bg/ocean5.gif")');
  $('.instructions').css('background-image', 'none');
  $('.instructions p').css('background-image', 'none');
  $('#btn').css('background-image', 'none');
  $('*').css(  'background-size', 'initial');
  $('*').css(  'background-size', 'cover');

if(mouseIsPressed){
  if(input == 0){
    var offset = Math.floor(Math.random() * 30);
    ellipse(mouseX + offset, mouseY + offset, offset, offset);
    bubbleArr.push(
      {'x' : mouseX + offset,
      'y' : mouseY + offset,
      'radius' : offset,
       'randomSpeed' : random(2,5)}
    );

  }
  else if(input == 1){
    var random2 = random(5,30);
    magicArr.push(
      {'x1' : mouseX,
      'y1' : mouseY,
      'x2' : mouseX + random2,
      'y2' : mouseY - random2,
      'weight' : random(2,15),
      'opacity' : random(50,255)}
    );
  }
  //sort of dust brush
  else{
    dustArr.push({
      'x' : mouseX,
      'y' : mouseY,
      'opacity' : random(0,255),
      'size' : random(1,20)
    });

  }
}
}

function bubblePhysics(){
  createCanvas(windowWidth, windowHeight);
  background(0,0,0,0);
  for(var i = 0; i < cuteBubbleArr.length; i++){

    fill(255,255,255);
    stroke(255);
    strokeWeight(4);
    if(mouseIsPressed){
      cuteBubbleArr[i].xDir *= -1;
      cuteBubbleArr[i].yDir *= -1;
      // console.log(cuteBubbleArr[i].x + " " + cuteBubbleArr[i].y);

    }
    ellipse(cuteBubbleArr[i].x + cuteBubbleArr[i].xDir, cuteBubbleArr[i].y + cuteBubbleArr[i].yDir, cuteBubbleArr[i].radius, cuteBubbleArr[i].radius);
  }

  //re-print flowers
  for(var i = 0; i < flowerArr.length; i++){
    // console.log(i);
    strokeWeight(1);
    stroke(0,0,0,50);
    fill(255,255,255,50);
    push();
    translate(flowerArr[i].x, flowerArr[i].y);
    console.log(flowerArr[i].x);
    for (var j = 0; j < 10; j ++) {
      ellipse(0, flowerArr[i].randomOuter, flowerArr[i].randomInner, flowerArr[i].randomOuter);
      rotate(PI/5);
    }
    pop();
  }

  //randomize geometric shapes
  for(var i = 0; i < geometricArr.length; i++){
  fill(255,255,255,random(70,255));
  stroke(255);
  strokeWeight(1);
  quad(
    random(geometricArr[i].x - 40, geometricArr[i].x + 40), random(geometricArr[i].y-40, geometricArr[i].y+40),
    random(geometricArr[i].x - 40, geometricArr[i].x + 40), random(geometricArr[i].y-40, geometricArr[i].y+40),
    random(geometricArr[i].x - 40, geometricArr[i].x + 40), random(geometricArr[i].y-40, geometricArr[i].y+40),
    random(geometricArr[i].x - 40, geometricArr[i].x + 40), random(geometricArr[i].y-40, geometricArr[i].y+40)
  );
  }
}

function applyGravity(){
  createCanvas(windowWidth, windowHeight);
  var randomSpeed;

  for(var i = 0; i < bubbleArr.length; i++){
    randomSpeed = bubbleArr[i].randomSpeed;
    fill(0,0,0,0);
    stroke(255);
    strokeWeight(randomSpeed-1);
      ellipse(bubbleArr[i].x, bubbleArr[i].y-randomSpeed, bubbleArr[i].radius, bubbleArr.radius);
      bubbleArr[i].y -= randomSpeed;
  }

  //magic brush
  for(var i = 0; i < magicArr.length; i++){
    stroke(255,255,255,magicArr[i].opacity);
    strokeWeight(magicArr[i].weight)
    line(magicArr[i].x1-1, magicArr[i].y-1, magicArr[i].x2-1, magicArr[i].y2-1);
    magicArr[i].x1 -= 1;
    magicArr[i].y1 -= 1;
    magicArr[i].x2 -= 1
    magicArr[i].y2 -= 1;
  }

  //dust brush
  for(var i = 0; i < dustArr.length; i++){
    fill(25, 65, 79, dustArr[i].opacity);
    stroke(0,0,0,0);

    ellipse(dustArr[i].x, dustArr[i].y, dustArr[i].size, dustArr[i].size);

    dustArr[i].x += 3;
    dustArr[i].y += 1;

  }
}

function rainGravity(){
  createCanvas(windowWidth, windowHeight);
  for(var i = 0; i < floodArr.length; i++){
    fill(0,0,0,0);
    stroke(165,188,238,floodArr[i].opacity);
    strokeWeight(floodArr[i].weight)
    ellipse(floodArr[i].x1, floodArr[i].y1, floodArr[i].x2, floodArr[i].y2);
    // floodArr[i].x1 += 7;
    floodArr[i].x2 += 20;
    // floodArr[i].x2 += 7

    //maybe try making the circle radiate outward like a puddle splash
    floodArr[i].y2 += 20;
  }

  //falling cube stuff
  for(var i = 0; i < rainCubeArr.length; i++){
    fill(255,255,255,rainCubeArr[i].opacity);
    stroke(255,255,255,255);
    strokeWeight(random(1,2));
    rect(rainCubeArr[i].x1, rainCubeArr[i].y1, rainCubeArr[i].x2, rainCubeArr[i].y2);
    rect(rainCubeArr[i].x3, rainCubeArr[i].y3, rainCubeArr[i].x4, rainCubeArr[i].y4);
    line(rainCubeArr[i].l1x1, rainCubeArr[i].l1y1, rainCubeArr[i].l1x2, rainCubeArr[i].l1y2);
    line(rainCubeArr[i].l2x1, rainCubeArr[i].l2y1, rainCubeArr[i].l2x2, rainCubeArr[i].l2y2);
    line(rainCubeArr[i].l3x1, rainCubeArr[i].l3y1, rainCubeArr[i].l3x2, rainCubeArr[i].l3y2);
    line(rainCubeArr[i].l4x1, rainCubeArr[i].l4y1, rainCubeArr[i].l4x2, rainCubeArr[i].l4y2);

    rainCubeArr[i].y1 += 7;
    rainCubeArr[i].y3 += 7;
    rainCubeArr[i].l1y1 += 7;
    rainCubeArr[i].l1y2 += 7;
    rainCubeArr[i].l2y1 += 7;
    rainCubeArr[i].l2y2 += 7;
    rainCubeArr[i].l3y1 += 7;
    rainCubeArr[i].l3y2 += 7;
    rainCubeArr[i].l4y1 += 7;
    rainCubeArr[i].l4y2 += 7;


  }

  //firefly stuff
  for(var i = 0; i < fireflyArr.length; i++){
    fill(255, 253, 147, fireflyArr[i].light);
    stroke(255, 253, 147,random(60,90));
    var xDir = random(-1,1);
    var yDir = random(-1,1);
    ellipse(fireflyArr[i].x + xDir, fireflyArr[i].y + yDir, fireflyArr[i].radius, fireflyArr[i].radius);
    fireflyArr[i].x += xDir;
    fireflyArr[i].y += yDir;

    if(fireflyArr[i].light >= 255){
      fireflyArr[i].light = 40;
    } else{
      fireflyArr[i].light += 5;
    }
  }
}

function keyPressed() {

  if (keyCode === UP_ARROW) {
    if(input < 2)
      input++
  } else if (keyCode === DOWN_ARROW) {
    if(input > 0)
    input--;
  } else if(keyCode == RIGHT_ARROW){
  if(level < 2){
    level++;
    input = 0;
      createCanvas(windowWidth, windowHeight);

      if(level == 1){
        //clear arrays
        floodArr = [];
        fireflyArr = [];
        rainCubeArr = [];

        cuteSound.pause();
        underwaterSound.pause();
        rainSound.currentTime = 0;
        rainSound.play();
      }
      if(level == 2){
        //clear arrays
        bubbleArr = [];
        magicArr = [];
        dustArr = [];


        rainSound.pause();
        cuteSound.pause();
        underwaterSound.currentTime = 0;
        underwaterSound.play();
      }
  }
  } else if(keyCode == LEFT_ARROW){
    if(level > 0){
      level--;
      input = 0;
        createCanvas(windowWidth, windowHeight);
      if(level == 1){
        //clear arrays
        floodArr = [];
        fireflyArr = [];
        rainCubeArr = [];

        underwaterSound.pause();
        cuteSound.pause();
        rainSound.currentTime = 0;
        rainSound.play();
      }
      if(level == 0){
        //clear arrays
        geometricArr = [];
        flowerArr = [];
        cuteBubbleArr = [];

        rainSound.pause();
        underwaterSound.pause();
        cuteSound.currentTime = 0;
        cuteSound.play();
      }
    }
  }
}
