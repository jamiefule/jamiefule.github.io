var disp;
var globbies = [];
let hit;

function setup(){
    var btmOfTxt = $("#title").offset().top + $("#title").outerHeight(true);
   disp = createCanvas(windowWidth * .8, windowHeight * .75);
   disp.position(windowWidth/10, btmOfTxt - 80, 'fixed');
   disp.background('white');
   frameRate(15);
   smooth();

   //setup first globbie
   let r = random(255);
   let g = random(255);
   let b = random(255);
   
   createGlobbie(color(r, g, b), int(random(3))+1, generateShape(30, 30), random(10), [], [random(disp.width * .1, disp.width * .3), random(disp.height * .69, disp.height)], []);

    //setup second globbie
    r = random(255);
    g = random(255);
    b = random(255);
    
    createGlobbie(color(r, g, b), int(random(3))+1, generateShape(30, 30), random(10), [], [random(disp.width * .3, disp.width * .6), random(disp.height * .69, disp.height)], []);

    //set up third globbie
   r = random(255);
   g = random(255);
   b = random(255);
   
   createGlobbie(color(r, g, b), int(random(3))+1, generateShape(30, 30), random(10), [], [random(disp.width * .6, disp.width * .9), random(disp.height * .69, disp.height)], []);

}

function windowResized() {
    resizeCanvas(windowWidth * .8, windowHeight * .75);
  }

function draw(){
    //clear each time
    disp.background('white');
    //draw floor
    stroke(0);
    line(disp.width * .1, disp.height * .7, disp.width * .9, disp.height * .7)
    drawGlobbies();
    //moveGlobbies();

    //check collision
    for(var i = 0; i < globbies.length; i++){
        for(var s = 0;  s < globbies[i].shape.length; s++){
            //compare shapes to the other globbies
            for(var j = 0; j < globbies.length; j++){
                var col = polyPoint(globbies[j].vertices, globbies[i].shape[s].split(',')[0], globbies[i].shape[s].split(',')[1]);
                if(col){
                    console.log("!")
                    //move odd globs left and even globs right
                    if(i % 2 == 0){
                        globbies[i].pos[0] = globbies[i].pos[0] + 3
                    } else{
                        globbies[i].pos[0] = globbies[i].pos[0] - 3
                    }
                }
            }
        }
    }
    
}

//make sure creature is within the floor bounds
function checkBoundaries(obj){
    if(obj.right > disp.width * .9)
        return false
    if(obj.left > disp.width * .1)
        return false
    if(obj.bottom > disp.height * .69)
        return false
    if(obj.bottom > disp.height - 1)
        return false
}

function createGlobbie(c, n, s, i, b, p, v){
    var glob = {color: c,
                numEyes: n, 
                shape: s, 
                intellegence: i,
                bodyParts: b,
                pos: p,
                vertices: v,
                center: []};

    globbies.push(glob);
}

function generateShape(pointLimit, sizeLimit){
    var numPoints = random(6, pointLimit);
    var points = []; 
    var lastx = 0;
    var lasty = 0;

    for(var i = 0; i < numPoints; i++){
        if(i > (numPoints/2 + numPoints/4)){ //fourth quarter
            console.log("1")
            var tempx = random(lastx + random(-10,10), sizeLimit + lastx);
            var tempy = random(lasty - random(-10,10), lasty - sizeLimit);
        } 
        else if(i > numPoints/2){ //third quarter
            console.log("2")

            var tempx = random(lastx - random(-10,10), lastx - sizeLimit);
            var tempy = random(lasty - random(-10,10), lasty - sizeLimit);
        }
        else if(i > numPoints/4){ //second quarter
            console.log("3")

            var tempx = random(lastx - random(-10,10), lastx - sizeLimit);
            var tempy = random(lasty + random(-10,10), sizeLimit + lasty);
        }
        else{
            if(i != 0){
            console.log("4")

                var tempx = random(lastx + random(-10,10), sizeLimit + lastx);
                var tempy = random(lasty + random(-10,10), sizeLimit + lasty);
            }else{
                var tempx = random(0, 0);
                var tempy = random(0, 0);
            }
        }
        
        points.push(tempx + "," + tempy);

        lastx = tempx;
        lasty = tempy;



    }
    //ensure shape is enclosed
    points.push(points[0])
    points.push(points[0])


    return points;
}

function getRandomSign(){
    if(random(10) >= 5)
        return 1;
    return -1;
}

function drawGlobbies(){
    for(var i = 0; i < globbies.length; i++){
        var firstx, firsty;
        var lastx, lasty;
        
        //set style
        fill(globbies[i].color)
        strokeWeight(3)
        stroke(lerpColor(globbies[i].color, color(50,50,50), 0.33));

        beginShape();
        for(var s = 0; s < globbies[i].shape.length; s++){
            
            var x = globbies[i].pos[0] - globbies[i].shape[s].split(',')[0] + (noise(random(-5,5))*3*getRandomSign());
            var y = globbies[i].pos[1] - globbies[i].shape[s].split(',')[1] + (noise(random(-5,5))*3*getRandomSign());


            //update globbies point occasionally
            if(int(random(10)) % 7 == 0)
                globbies[i].shape[s] = (globbies[i].pos[0] - x)+","+(globbies[i].pos[1] - y); 

            //set approx center
            if(s == int(globbies[i].shape.length/2)){
                globbies[i].center = (globbies[i].pos[0] + x)/2  + "," + (globbies[i].pos[1] + y)/2
            }

            if(s == 0){
                firstx = x
                firsty = y
            }
            if(s == globbies[i].shape.length - 2){
                lastx = x
                lasty = y 
            }
            
            globbies[i].vertices[s] = createVector(x, y) 
            curveVertex(x, y)
        }
        endShape();

        //connect remaining line
        textSize(20)
        text('👄', firstx - 10, firsty - 5)

        drawEyes(i);
    }

}

//draw eyes on globbies
function drawEyes(i){
            var n = globbies[i].numEyes;
            for(var s = 0; s < globbies[i].shape.length; s++){
                var x = globbies[i].pos[0] - globbies[i].shape[s].split(',')[0];
                var y = globbies[i].pos[1] - globbies[i].shape[s].split(',')[1];
                var center = globbies[i].center;

                if(n == 1){
                    if(s == int(globbies[i].shape.length/2))
                        text('👁‍🗨', center.split(',')[0], center.split(',')[1])
                }

                if(n == 2){
                    if(s == int(globbies[i].shape.length/3))
                        text('👁‍🗨', int(center.split(',')[0]) + 10 + getRandomSign(), int(center.split(',')[1]) - 10 + getRandomSign())
                    if(s == int(globbies[i].shape.length/6))
                        text('👁‍🗨', int(center.split(',')[0]) - 25 + getRandomSign(), int(center.split(',')[1]) + 15 + getRandomSign())
                }

                if(n == 3){
                    // console.log("3, s: "+s+" len: " + globbies[i].shape.length )
                    if(s == int(globbies[i].shape.length/3))
                        text('👁‍🗨', x - 20, y + 20)
                    if(s == int(globbies[i].shape.length/5))
                        text('👁‍🗨', int(center.split(',')[0]) + 10 + getRandomSign(), int(center.split(',')[1]) - 10 + getRandomSign())
                    if(s == int(globbies[i].shape.length/7))
                        text('👁‍🗨', x + 20, y)
                }
            }
}

//polyPoint function from: https://editor.p5js.org/xinxin/sketches/WmIhRxLL
function polyPoint(vertices, px, py) {

    let collision = false;
  
    let next = 0;
  
    for (let current = 0; current < vertices.length; current++) {
  
      next = current + 1;
  
      if (next == vertices.length) {
        next = 0;
      }
  
      let vc = vertices[current];
      let vn = vertices[next];
      
      // compare position, flip 'collision' variable
      // back and forth
      if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
           (px < (vn.x-vc.x)*(py-vc.y) / (vn.y-vc.y)+vc.x)) {
              collision = !collision;
      }
      
     //print(collision);
  
    }
  
  return collision;
  
  }

function moveGlobbies(){
    for(var i = 0; i < globbies.length; i++){
        for(var s = 0; s < globbies[i].shape.length; s++){
            globbies[i].pos[0] += noise(1) * random(-1,1);
            globbies[i].pos[1] += noise(1) * random(-1,1)
        }
    }
}
