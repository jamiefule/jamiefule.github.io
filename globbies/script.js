var disp;
var globbies = [];
var blobglobbies = [];
let hit;
let eye;
let mouth;
let mousePoly = []
var colliding = false;
var collideIndex;
var pressed = false;

function preload() {
    //setup eye and mouth paths
   eye = loadImage('https://raw.githubusercontent.com/jamiefule/jamiefule.github.io/master/globbies/assets/emojis/eye-small.png');
   mouth = loadImage('https://raw.githubusercontent.com/jamiefule/jamiefule.github.io/master/globbies/assets/emojis/mouth-small.png');
   
}

function setup(){
    var btmOfTxt = $("#title").offset().top + $("#title").outerHeight(true);
    disp = createCanvas(windowWidth * .8, windowHeight * .75);
    disp.position(windowWidth/10, btmOfTxt - 80, 'fixed');
    disp.background('white');
    frameRate(60);
    smooth();

   //setup first globbie
   let r = random(255);
   let g = random(255);
   let b = random(255);
   
   createLineGlobbie(color(r, g, b), int(random(3))+1, generateShape(30, 30), random(10), [], [random(disp.width * .1, disp.width * .3), random(disp.height * .69, disp.height * .9)], []);

    //setup second globbie
    r = random(255);
    g = random(255);
    b = random(255);
    
    createLineGlobbie(color(r, g, b), int(random(3))+1, generateShape(30, 30), random(10), [], [random(disp.width * .3, disp.width * .6), random(disp.height * .69, disp.height * .9)], []);

    //set up third globbie
   r = random(255);
   g = random(255);
   b = random(255);
   
   createBlobGlobbie(int(random(3))+1, random(10), [random(disp.width * .6, disp.width * .9), random(disp.height * .69, disp.height * .9)]);

}

function windowResized() {
    resizeCanvas(windowWidth * .8, windowHeight * .75);
  }

  function mousePressed() {
      pressed = true;
    }

    function mouseReleased() {
        colliding = false;
        pressed = false;
        collideIndex = "";
      }
    
      
    function draw(){
        //clear canvas each time
        disp.background('white');
        
        //draw floor
        stroke(0);
        strokeWeight(2)
        line(disp.width * .1, disp.height * .7, disp.width * .9, disp.height * .7)
        
        //draw line globbies
        drawLineGlobbies();
        
        //draw blob globbies
        drawBlobGlobbies()
    
    //linear globbie movement
    for(var i = 0; i < globbies.length; i++){
        if(collideCirclePoly(mouseX,mouseY, 5, globbies[i].vertices)){
            colliding = true;
            collideIndex = i;
        } else{
            if(!pressed)
                colliding = false
        }
    
        if(colliding && pressed){
            globbies[collideIndex].pos = [mouseX, mouseY]
        }
    }
    
}

function getRandomSign(){
    if(random(10) >= 5)
        return 1;
    return -1;
}





