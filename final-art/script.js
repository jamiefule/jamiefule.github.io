//Jamie Fule, ART 150 final project

//Face tracking demo code used, see below for credit to example code (mainly position setup)
// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2

var globalRefreshRate = 5;
var globalRefreshNum = 0

var globalMic = true;
var globalCam = true;

var capture;
var tracker
var w = 500,
    h = 500;

var assetArr;


function setup() {

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
    canvas.position(window.windowWidth/2 - 250, window.windowHeight/2 - 100);
    background(0);
    capture.size(w, h);
    capture.hide();

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
}

function draw() {
document.getElementById("td-1").style.filter="hue-rotate("+random(0,360)+"deg)";
document.getElementById("td-2").style.filter="hue-rotate("+random(0,360)+"deg)";
document.getElementById("td-3").style.filter="hue-rotate("+random(0,360)+"deg)";
document.getElementById("td-4").style.filter="hue-rotate("+random(0,360)+"deg)";
document.getElementById("td-5").style.filter="hue-rotate("+random(0,360)+"deg)";


background(0)
  //  image(capture, 0, 0, w, h)

  if(globalCam == true){
    document.getElementById("cryptic").setAttribute("hidden", "true");
    if(globalMic == true)
    drawFeaturesNormal();
    else
    drawFeaturesLimited();
  } else{
    document.getElementById("cryptic").removeAttribute("hidden");
  }
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
