function createLineGlobbie(p){
    var glob = {color: color(random(255), random(255), random(255)),
                numEyes: int(random(3))+1, 
                intellegence: int(random(10)),
                bodyParts: [],
                pos: p,
                vertices: generateShape(30, 30),
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
            var tempx = random(lastx + random(-10,10), sizeLimit + lastx);
            var tempy = random(lasty - random(-10,10), lasty - sizeLimit);
        } 
        else if(i > numPoints/2){ //third quarter
            var tempx = random(lastx - random(-10,10), lastx - sizeLimit);
            var tempy = random(lasty - random(-10,10), lasty - sizeLimit);
        }
        else if(i > numPoints/4){ //second quarter
            var tempx = random(lastx - random(-10,10), lastx - sizeLimit);
            var tempy = random(lasty + random(-10,10), sizeLimit + lasty);
        }
        else{
            if(i != 0){
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

function drawLineGlobbies(){
    for(var i = 0; i < globbies.length; i++){
        var firstx, firsty;
        var lastx, lasty;
        var test = globbies;
        
        //set style
        fill(globbies[i].color)
        strokeWeight(3)
        stroke(lerpColor(globbies[i].color, color(50,50,50), 0.33));

        beginShape();
        for(var s = 0; s < globbies[i].vertices.length; s++){
            
            var x = globbies[i].pos[0] - globbies[i].vertices[s]["x"] + (noise(random(-5,5)));
            var y = globbies[i].pos[1] - globbies[i].vertices[s]["y"] + (noise(random(-5,5)));


            //update globbies point occasionally
            if(int(random(10)) % 7 == 0)
                globbies[i].vertices[s]["x"] = globbies[i].pos[0] - x; 
                globbies[i].vertices[s]["y"] = globbies[i].pos[1] - y; 


            //set approx center
            if(s == int(globbies[i].vertices.length/2)){
                globbies[i].center = (globbies[i].pos[0] + x)/2  + "," + (globbies[i].pos[1] + y)/2
            }

            if(s == 0){
                firstx = x
                firsty = y
            }
            if(s == globbies[i].vertices.length - 2){
                lastx = x
                lasty = y 
            }
            
            globbies[i].vertices[s] = createVector(x, y) 
            curveVertex(x, y)
        }
        endShape();

        //connect remaining line
        textSize(20)
        image(mouth, firstx - 10, firsty - 5)

        drawEyesLineGlobbies(i);
    }

}

//draw eyes on globbies
function drawEyesLineGlobbies(i){
    var n = globbies[i].numEyes;
    for(var s = 0; s < globbies[i].vertices.length; s++){
        var x = globbies[i].pos[0] - globbies[i].vertices[s]["x"];
        var y = globbies[i].pos[1] - globbies[i].vertices[s]["y"];
        var center = globbies[i].center;

        if(n == 1){
            if(s == int(globbies[i].vertices.length/2))
                image(eye, x - 20, y + 20)
        }

        if(n == 2){
            if(s == int(globbies[i].vertices.length/3))
                image(eye, x - 20, y + 20)
            if(s == int(globbies[i].vertices.length/6))
                image(eye, x, y - 20)
        }

        if(n == 3){
            // console.log("3, s: "+s+" len: " + globbies[i].vertices.length )
            if(s == int(globbies[i].vertices.length/3))
                image(eye, x - 20, y + 20)
            if(s == int(globbies[i].vertices.length/5))
                image(eye, x + 5, y - 20)
            if(s == int(globbies[i].vertices.length/7))
                image(eye, x + 20, y)
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

  function addPoints(i){
      //pick a random spot
    var r = random(0, globbies[i].vertices.length)

    var first = globbies[i].verticies.slice(0, r);
    var second = globbies[i].vertices.slice(r + 1);

    //get last of first
    var firstX = first[first.length][0]
    var firstY = first[first.length][1]

    //get first of second
    var secondX = second[0][0];
    var secondY = second[0][1];

    var randomX = random(-10,10)
    var randomY = random(-10,10)

    first.push([secondX - firstX + randomX, secondY - firstY + randomY])

    globbies[i].vertices = first.concat(second)
  }