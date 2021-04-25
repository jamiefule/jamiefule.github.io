var disp;
var globbies = [];
var blobglobbies = [];
let hit;
let eye;
let mouth;
let mousePoly = []
var colliding = false;
var collideIndex;
var collidingBlob = false;
var collideIndexBlob;
var pressed = false;
var foods = []

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
   r = random(255);
   g = random(255);
   b = random(255);
   
   createBlobGlobbie(int(random(3))+1, random(10), [random(disp.width * .3, disp.width * .6), random(disp.height * .69, disp.height * .9)]);

    //set up second globbie
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

            //add food
            if(!colliding && !collidingBlob){
                createFood(mouseX, mouseY)
            }

    }

    function mouseReleased() {
        colliding = false;
        collidingBlob = false;

        pressed = false;
        collideIndex = "";
        collideBlob = "";

      }

    
      
    function draw(){
        //clear canvas each time
        disp.background('white');
        
        //draw floor
        stroke(0);
        strokeWeight(2)
        line(disp.width * .1, disp.height * .7, disp.width * .9, disp.height * .7)
        
        //draw blob globbies
        drawBlobGlobbies()

        //blobglobbie movement
        for(var i = 0; i < blobglobbies.length; i++){
            for(var j = 0; j < blobglobbies[i].shape.length; j++){
               if(collideCircleCircle(mouseX, mouseY, 5, blobglobbies[i].pos[0] - blobglobbies[i].shape[j][0], blobglobbies[i].pos[1] - blobglobbies[i].shape[j][1], blobglobbies[i].shape[j][2])){
                    collidingBlob = true;
                    collideIndexBlob = i;
               }

               else{
                if(!pressed)
                    collidingBlob = false
                }
        
                if(collidingBlob && pressed){
                    blobglobbies[collideIndexBlob].pos = [mouseX, mouseY]
                }

                //food collision
                for(var l = 0; l < foods.length; l++){
                    if(collideCircleCircle(foods[l].pos[0], foods[l].pos[1], 10, blobglobbies[i].pos[0] - blobglobbies[i].shape[j][0], blobglobbies[i].pos[1] - blobglobbies[i].shape[j][1], blobglobbies[i].shape[j][2])){
                        eatFoods(l, i, blobglobbies)
                        addCircle(i)
                    }
                }

            }
        }
    
        //draw foods
        drawFoods()
}

function getRandomSign(){
    if(random(10) >= 5)
        return 1;
    return -1;
}

//add to the foods array 
function createFood(x, y){
    var foodTypes = ["🍓", "🍖", "🍄"]
    var typeRandom = foodTypes[int(random(0,3))] 

    var food = {
        pos: [mouseX, mouseY],
        type: typeRandom
    }

    if(keyIsDown(SHIFT)){
        food.type = "🧪"
    }

    foods.push(food);
}

function drawFoods(){
    for(var i = 0; i < foods.length; i++){
        text(foods[i].type, foods[i].pos[0], foods[i].pos[1])
        
        //make foods fall
        foods[i].pos[1] += 2;

        //kill foods that fall off screen
        if(foods[i].pos[1] >= windowHeight - 100)
            foods.splice(i, 1)
    }

}

//kill food on function call
function eatFoods(i, glob, arr){
    if(foods[i].type == "🍄"){
        arr[glob].color = color(random(255), random(255), random(255))
    }
    else if(foods[i].type == "🧪"){
        //shrink it up
        for(var j = 0; j < arr[glob].shape.length; j++){
            arr[glob].shape[j][0] = random(-10,10)
            arr[glob].shape[j][1] = random(-10,10)
            arr[glob].shape[j][0] = random(5, 10)
        }

        arr[glob].lastShape = arr[glob].shape
        
        //regen eyes
        let eyes = []
        
        for(var k = 0; k < arr[glob].numEyes; k++){
            eyes.push(int(random(0, arr[glob].shape.length)))
        }

        arr[glob].eyeNodes = eyes;
    }

    foods.splice(i,1);
}





