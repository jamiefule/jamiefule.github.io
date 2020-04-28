//Jamie Fule, ART final project

//Face tracking demo code used, see below for credit to example code (mainly position setup)
// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2

//song credit: Horizon Ending - Soft and Furious

var horizontalOffset = 0;
var globalRefreshRate = 125;
var globalRefreshNum = 0

var globalMic = true;
var globalCam = true;

var capture;
var tracker
var w = 500,
    h = 500;

var assetArr = [
  'animalCrossing.gif',
  'anime study.gif',
  'anonymous.gif',
  'bored-2.gif',
  'bored.gif',
  'cat-type.gif',
  'ditto.gif',
  'doja-cat-cyber.gif',
  'dojacat.gif',
  'eyes.gif',
  'file.txt',
  'fish.png',
  'glitch.gif',
  'hamster.jpg',
  'jennifer.gif',
  'lines.gif',
  'matrix.gif',
  'mememe.gif',
  'mememe2.gif',
  'notes.gif',
  'pbj.gif',
  'potatoes.gif',
  'sleep.gif',
  'static.gif',
  'takeOnMe.gif',
  'totoro-toilet.gif',
  'walter.jpeg'
];

var msgArr = [

  'p̶̜͍̾̂̌̉̑͊a̷̱͔̖̲̲̰͂̈̈́̎y̶̟̲͙͔͓̔ͅ ̵̜̳̟͑́a̴̧̢̧̯̬̒̈́͒̔̓̈́t̶͍̀t̶̜̥͓̥͐ȩ̵̝̥̪͕͂̈́͊͜n̴̦̍͆̍͗͌ͅṯ̴͌̈̈́͒̎í̵̬̜͎o̶̘͚̜͑̋n̶͈͚͕̜̍̐́̔͗̈́ͅ!̵   ',

  ' ȃ̶̗r̵͔̈e̴͎̓ ̵͉͐y̶͙͒o̵͍͒ǘ̸̢ ̴̩̌l̴͓̔ĭ̵̱s̸̞͗t̸̤̒e̴̱̿ṅ̵͔i̷͒ͅṇ̵̂g̷̬̑?̸̠̚?̷̟̎     ',

  '  H̴̜̜̰̏͑̋̄͝É̸͚̠̫̃̄̓͐Y̶̧̿̋̎ͅ ̴͖̯͓̐̆W̵̺̉̆Ḥ̴͎͇̥͍͛͝E̷͓̘͐̊̕R̷͎͍̞̉͗E̵̞̒̍̐͋͝ͅ ̶̤͓̑̍D̴̻̈́̀̂͂͠ͅͅÍ̶̯̤̖̐̽̆D̴̝͆̕ ̶̜͐͜Ỳ̴̛͓̲̻̣̺̇͊̏O̶͖͝Û̵͍̣̲͙͕ ̴̛̛̦̱͉͇̥̊̽G̵̛̥͚͈͐͌̃O̶̱͒͑͂̐!̷̨̛̬̼́̈̐̒?̷̻̹̰̂͘  ',

  '  c̷̨̝̦͙̝̏̇̍͘ō̷̞͕m̴̧̺̜̫̼̂e̵̤̪͍̋͋̎̇̕ ̷̜͖̙̿̅̑̿̑b̵͚͋̓̃͘a̶͎͉̻̰͈̚͝c̴̘̙͐̾k̵̗͖͍͕̫̓̎̾ ̵̨̦̓t̶̞͇̦̣̚͘ỏ̸̭̳͖͋̊͑̎ ̸̮͚̍́̿e̷̛̼͈å̴̻̟͕̙̽̆̕͜r̶͍̽͒̈́ṯ̴̲̝̞̗̀̄͗̿̚h̶̛͚͂̂͑  ',

  '  h̸̻̽a̴̹͂v̷̜̕e̴͇͑ ̵̲̋w̸̱͘ê̸͇ ̴̦͑l̵̫̃o̸̯̿s̷͇͠t̴͓͆ ̷̪͝y̴͇̒o̵͉̓u̴̘͛ ̶͇̉f̵͇̂o̷͕̽r̵̻͗ȩ̴̐v̴̟́ë̶͓́r̴̺̎?̵̲͗  ',

  '  i̴͓̓̓ ̸̣̏̑m̶̪̀̇̿i̴̧͍̦̍͐̈́ş̷̪̖̓s̴̻̗͑ ̸̨̫̃̃y̶̛ͅo̷̼͑ǘ̵̯͕̘  ',

  '     a̵̠̽r̴͔͋ë̷͕́ ̶͕̈y̸͔̕o̸͂ͅu̷̟͊ ̴̧̔s̸͈͝t̸͇̓î̸̥ľ̶̼l̵͇͝ ̶͉̂t̴͇̃h̷̾͜ę̵̚r̴͇͝e̴͈͝?̷͝ͅ?̵̰̓?̴̐͜    '


];


function setup() {

document.getElementById("confirmation").addEventListener("click",function(){

  //start music
  var audio = document.createElement('audio');
  audio.setAttribute('src', 'assets/bgm.mp3');
  audio.loop = true;
  audio.play();

  document.getElementById("connecting").setAttribute("hidden","true");
})

  //toggle fake mic settings
  document.getElementById("mic").addEventListener("click",function(){
    console.log("clicked mic");
    if(globalMic == true){
      document.getElementById("mic").src = "./assets/mic-off.png";
      globalMic = false;
    } else{
      globalMic = true;
      document.getElementById("mic").src = "./assets/mic-on.png";
    }
  })

//toggle fake video settings
  document.getElementById("cam").addEventListener("click",function(){
    console.log("clicked cam");
    if(globalCam == true){
      document.getElementById("cam").src = "./assets/cam-off.png";
      globalCam = false;
      background(0);
    } else{
      globalCam = true;
      document.getElementById("cam").src = "./assets/cam-on.png";
    }
  })


    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    var canvas = createCanvas(w, h);
    canvas.position(window.windowWidth/2 - 250, window.windowHeight/2 - 150);
    background(0);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {

  //color shift gifs
document.getElementById("td-1").style.filter="hue-rotate("+random(0,360)+"deg)";
document.getElementById("td-2").style.filter="hue-rotate("+random(0,360)+"deg)";
document.getElementById("td-3").style.filter="hue-rotate("+random(0,360)+"deg)";
document.getElementById("td-4").style.filter="hue-rotate("+random(0,360)+"deg)";
document.getElementById("td-5").style.filter="hue-rotate("+random(0,360)+"deg)";

if(globalRefreshRate == 0){
  document.getElementById("td-1").style.backgroundImage = "url(./assets/" + assetArr[parseInt(random(assetArr.length))] + ")"

  //if cam is off, increase chance of angry gifs showing, but don't force 100% angry gifs
  if(globalCam == false){
    //if(parseInt(random(3)) % 2 == 0)
        document.getElementById("td-1").style.backgroundImage = "url(./assets/angry-1.gif)"

  }

  globalRefreshRate = 125;
}
else if(globalRefreshRate == 25){
  document.getElementById("td-4").style.backgroundImage = "url(./assets/" + assetArr[parseInt(random(assetArr.length))] + ")"

  //if cam is off, increase chance of angry gifs showing, but don't force 100% angry gifs
  if(globalCam == false){
    //if(parseInt(random(3)) % 2 == 0)
        document.getElementById("td-4").style.backgroundImage = "url(./assets/angry-2.gif)"



}
}
else if(globalRefreshRate == 50){
  document.getElementById("td-3").style.backgroundImage = "url(./assets/" + assetArr[parseInt(random(assetArr.length))] + ")"

  //if cam is off, increase chance of angry gifs showing, but don't force 100% angry gifs
  if(globalCam == false){
    //if(parseInt(random(3)) % 2 == 0)
        document.getElementById("td-3").style.backgroundImage = "url(./assets/angry-3.gif)"



}
}
else if(globalRefreshRate == 75){
  document.getElementById("td-2").style.backgroundImage = "url(./assets/" + assetArr[parseInt(random(assetArr.length))] + ")"

  //if cam is off, increase chance of angry gifs showing, but don't force 100% angry gifs
  if(globalCam == false){
    //if(parseInt(random(3)) % 2 == 0)
        document.getElementById("td-2").style.backgroundImage = "url(./assets/angry-4.gif)"



}
}
else if(globalRefreshRate == 100){
  document.getElementById("td-5").style.backgroundImage = "url(./assets/" + assetArr[parseInt(random(assetArr.length))] + ")"

  //if cam is off, increase chance of angry gifs showing, but don't force 100% angry gifs
  if(globalCam == false){
    //if(parseInt(random(3)) % 2 == 0){
        document.getElementById("td-5").style.backgroundImage = "url(./assets/angry-5.gif)"

  }

}

globalRefreshRate--;

if(globalCam)
  background(0)

if(globalCam){
  //-------------------------horizontal filter------------------------------
  for(var i = 0; i < 800; i+=10){
    strokeWeight(5);
    stroke('rgba(255,0,255,.10)');
   line(0,i + horizontalOffset,1200, i + horizontalOffset);
  }

  if(horizontalOffset > 10)
    horizontalOffset = 0;
  else
    horizontalOffset++;
  strokeWeight(2);

}


  if(globalCam == true){
    document.getElementById("cryptic").setAttribute("hidden", "true");
    document.getElementById("cryptic2").setAttribute("hidden", "true");
    if(globalMic == true)
    drawFeaturesNormal();
    else
    drawFeaturesLimited();
  } else{

      //fun cursor
      ellipse(mouseX,mouseY,random(10), random(10));


    document.getElementById("cryptic").removeAttribute("hidden");
    if(globalRefreshRate == 75){
      document.getElementById("cryptic").innerHTML = msgArr[parseInt(random(msgArr.length))]
    }

    document.getElementById("cryptic2").removeAttribute("hidden");
    if(globalRefreshRate == 0){
      document.getElementById("cryptic2").innerHTML = msgArr[parseInt(random(msgArr.length))]
    }
  }

  //draw border
  noFill();
  strokeWeight(5);
  stroke(random(255),random(255),random(255));
  rect(0,0,500,500);
  strokeWeight(2);

}

//------------------------------------------------------------------End of setup & Draw Functions--------------------------------------------

function drawFeaturesNormal(){
  var positions = tracker.getCurrentPosition();

  noFill();
  stroke(255);
  //face shape
  beginShape();
  for (var i = 0; i < positions.length; i++) {
    if(i <= 14){
      vertex(positions[i][0], positions[i][1]);
    }

  }
  endShape();

  //lip ouline
  beginShape();
  fill(0);
  for (var i = 44; i < positions.length; i++) {
    if(i <= 55){
      vertex(positions[i][0], positions[i][1]);
    }
    if(i == 55)
      vertex(positions[44][0], positions[44][1]);
  }
  endShape();

  //inner-lip
  beginShape();
  fill(random(255),random(255),random(255));
  for (var i = 44; i < positions.length; i++) {
    if(i <= 61){
      if(i == 58)
        vertex(positions[50][0], positions[50][1]);
        else if (i == 56)
          vertex(positions[44][0], positions[44][1]);
        else
           vertex(positions[i][0], positions[i][1]);
    }
    if(i == 62)
      vertex(positions[44][0], positions[44][1]);
  }
  endShape();

//nose (left half)
  beginShape();
  noFill();
  for (var i = 34; i < positions.length; i++) {
    if(i < 37)
        vertex(positions[i][0], positions[i][1]);
  }
  endShape();

//nose (right half)
      beginShape();
      noFill();
      for (var i = 38; i < positions.length; i++) {
        if(i <= 40)
            vertex(positions[i][0], positions[i][1]);
      }
      endShape();

//nose (bridge)
      beginShape();
      noFill();
      for (var i = 33; i < positions.length; i++) {
        if(i == 33 || i == 41 || i == 62)
            vertex(positions[i][0], positions[i][1]);
      }
      endShape();

//eyes
for (var i = 0; i < positions.length; i++) {
if(i == 27 || i ==32){
  fill(random(255),random(255),random(255));
  ellipse(positions[i][0], positions[i][1],15,15);
}

}

//left eyebrow
beginShape();
noFill();
for (var i = 19; i < positions.length; i++) {
if(i <= 22){
  vertex(positions[i][0], positions[i][1]);
}

}
endShape();

//right eyebrow
beginShape();
noFill();
for (var i = 15; i < positions.length; i++) {
  if(i <= 18){
    vertex(positions[i][0], positions[i][1]);
  }

}
  endShape();

  noStroke();

}

function drawFeaturesLimited(){
  var positions = tracker.getCurrentPosition();

  noFill();
  stroke(255);
  //face shape
  beginShape();
  for (var i = 0; i < positions.length; i+=4) {
    if(i <= 14){
      vertex(positions[i][0], positions[i][1]);
    }

  }
  endShape();

  //lip ouline
  beginShape();
  fill(0);
  for (var i = 44; i < positions.length; i+=2) {
    if(i <= 55){
      vertex(positions[i][0], positions[i][1]);
    }
    if(i == 55)
      vertex(positions[44][0], positions[44][1]);
  }
  endShape();

  //inner-lip
  beginShape();
  fill(random(255),random(255),random(255));
  for (var i = 44; i < positions.length; i+=2) {
    if(i <= 61){
      if(i == 58)
        vertex(positions[50][0], positions[50][1]);
        else if (i == 56)
          vertex(positions[44][0], positions[44][1]);
        else
           vertex(positions[i][0], positions[i][1]);
    }
    if(i == 62)
      vertex(positions[44][0], positions[44][1]);
  }
  endShape();

//nose (left half)
  beginShape();
  noFill();
  for (var i = 34; i < positions.length; i+=2) {
    if(i < 37)
        vertex(positions[i][0], positions[i][1]);
  }
  endShape();

//nose (right half)
      beginShape();
      noFill();
      for (var i = 38; i < positions.length; i+=2) {
        if(i <= 40)
            vertex(positions[i][0], positions[i][1]);
      }
      endShape();

//nose (bridge)
      beginShape();
      noFill();
      for (var i = 33; i < positions.length; i++) {
        if(i == 33 || i == 41 || i == 62)
            vertex(positions[i][0], positions[i][1]);
      }
      endShape();

//eyes
for (var i = 0; i < positions.length; i++) {
if(i == 27 || i ==32){
  fill(random(255),random(255),random(255));
  rect(positions[i][0], positions[i][1],15,15);
}

}

//left eyebrow
beginShape();
noFill();
for (var i = 19; i < positions.length; i+=2) {
if(i <= 22){
  vertex(positions[i][0], positions[i][1]);
}

}
endShape();

//right eyebrow
beginShape();
noFill();
for (var i = 15; i < positions.length; i+=2) {
  if(i <= 18){
    vertex(positions[i][0], positions[i][1]);
  }

}
  endShape();

  noStroke();

}
