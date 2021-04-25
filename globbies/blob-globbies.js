var globalCounter = 0;

function createBlobGlobbie(n, i, p){
    let r = random(255);
    let g = random(255);
    let b = random(255);

    let rad = random(10,40)

    let s = generateBlobGlobbies(rad, random(0,360), random(30,50))
    let ls = s;

    let eyes = []

    for(var i = 0; i < n; i++){
        eyes.push(int(random(0,s.length)))
    }

    var glob = {color: color(r,g,b),
                lerping: false,
                numEyes: n, 
                shape: ls, 
                lastShape: s,
                intellegence: i,
                bodyParts: [],
                lastPos: p,
                pos: p,
                radius: rad,
                center: [0,0],
                eyeNodes: eyes};

    blobglobbies.push(glob);
}

//create basic shape for blob globbie
function generateBlobGlobbies(radius, rotateAngle, points){
    var pointsArr = [];

    for(var i = 0; i < points; i++){
        var x = radius * sin(rotateAngle);
        var y = radius * cos(rotateAngle);

        pointsArr.push([x, y, random(30,40)])

        rotateAngle += points;
    }

    return pointsArr;
}

function drawBlobGlobbies(){
    for(var i = 0; i < blobglobbies.length; i++){
        //set style
        fill(blobglobbies[i].color)
        strokeWeight(0)
        
        var xoff = blobglobbies[i].pos[0]
        var yoff = blobglobbies[i].pos[1]
        
        //add center circle
        ellipse(xoff, yoff, rad + random(-1,1))
        
        for(var s = 0; s < blobglobbies[i].shape.length; s++){
            var x = blobglobbies[i].lastShape[s][0];
            var y = blobglobbies[i].lastShape[s][1];
            var rad = blobglobbies[i].lastShape[s][2];
    
            exceedsBoundary(x + xoff, y + yoff, rad, i, s)
            ellipse(x + xoff, y + yoff, rad + random(-1,1))

            //randomly change stuff up
            if(int(random(100)) == 1){
                blobglobbies[i].lerping = true;
               // console.log(blobglobbies[i].shape[s][0])
               blobglobbies[i].shape[s][0] += random(-5,5) 
               // console.log(blobglobbies[i].shape[s][0] + "," + blobglobbies[i].lastShape[s][0])
                blobglobbies[i].shape[s][1] += random(-5,5) 
                blobglobbies[i].shape[s][2] += random(-5,5) 
                // console.log("----------------")
            }

            if(blobglobbies[i].lerping)
            lerpGlobbie(i)
            
            if(globalCounter >= 1000){
                shrinkDown(i, s)
                globalCounter = 0;
            }
        }
        globalCounter++;
        
        //add mouth with a little jitter
        image(mouth, xoff + random(-1,1), yoff + random(-1,1))

        drawEyesBlobGlobbies(i)

    }

}

//smooth out what changes
function lerpGlobbie(i){
    for(var s = 0; s < blobglobbies[i].shape.length; s++){

        var a = blobglobbies[i].shape[s][0]
        var b = blobglobbies[i].lastShape[s][0]

        if(a != b){
            var x = lerp(blobglobbies[i].lastShape[s][0], blobglobbies[i].shape[s][0], .2)
            var y = lerp(blobglobbies[i].lastShape[s][1], blobglobbies[i].shape[s][1], .2)
            var r = lerp(blobglobbies[i].lastShape[s][2], blobglobbies[i].shape[s][2], .2)

            blobglobbies[i].lastShape[s][0] = x;
            blobglobbies[i].lastShape[s][0] = y;
            blobglobbies[i].lastShape[s][0] = r;

            //if any lerping has fully completed, stop lerping
            if(x == blobglobbies[i].shape[s][0] || y == blobglobbies[i].shape[s][1] || r == blobglobbies[i].shape[s][2])
                blobglobbies[i].lerping = false;


        }
    }
}

//draw eyes on globbies
function drawEyesBlobGlobbies(i){


    for(var j = 0; j < blobglobbies[i].eyeNodes.length; j++){
        var x = blobglobbies[i].pos[0] - blobglobbies[i].shape[blobglobbies[i].eyeNodes[j]][0];
        var y = blobglobbies[i].pos[1] - blobglobbies[i].shape[blobglobbies[i].eyeNodes[j]][1];
        image(eye, x, y)

    }
}

function addCircle(i){
    if(blobglobbies[i].shape.length <= 150){
        let x = random(-50,50)
        let y = random(-50,50)
        let r = random(5,30)
    
        blobglobbies[i].shape.push(x,y,r)
        blobglobbies[i].lastShape.push(x,y,r)

        //add noise 
            for(var j = 0; j < blobglobbies[i].shape.length; j++){
                blobglobbies[i].lastShape[j] = [blobglobbies[i].lastShape[j][0] + random(-5,5), blobglobbies[i].lastShape[j][1] + random(-5,5), blobglobbies[i].lastShape[j][2] + random(-5,5)]
                blobglobbies[i].shape[j] = [blobglobbies[i].shape[j][0] + random(-5,5), blobglobbies[i].shape[j][1] + random(-5,5), blobglobbies[i].shape[j][2] + random(-5,5)]
            }
    } else{
        //if theres already at least 150 circles, don't add more, just add noise (stronger)
            for(var j = 0; j < blobglobbies[i].shape.length; j++){
                blobglobbies[i].lastShape[j] = [blobglobbies[i].lastShape[j][0] + random(-20,20), blobglobbies[i].lastShape[j][1] + random(-20,20), blobglobbies[i].lastShape[j][2] + random(-10,10)]
                blobglobbies[i].shape[j] = [blobglobbies[i].shape[j][0] + random(-20,20), blobglobbies[i].shape[j][1] + random(-20,20), blobglobbies[i].shape[j][2] + random(-10,10)]
            }
    }

}

//squish the circles back in
function exceedsBoundary(x,y,r, i, s){
    if (x > width - r || x < r || y > height - r || y < r) {
        //check x sign
        if(Math.sign(blobglobbies[i].shape[s][0]) == -1){
            blobglobbies[i].shape[s][0] += 3;
        } else{
            blobglobbies[i].shape[s][0] -= 3;
        }
        //check y sign
        if(Math.sign(blobglobbies[i].shape[s][1]) == -1){
            blobglobbies[i].shape[s][1] += 3;
        } else{
            blobglobbies[i].shape[s][1] -= 3;
        }

        blobglobbies[i].shape[s] = [0,0,r - 2]

      }
    
      var x2 = blobglobbies[i].shape[s][0] + blobglobbies[i].pos[0];
      var y2 = blobglobbies[i].shape[s][1] + blobglobbies[i].pos[1];

      var dist = Math.sqrt( Math.pow((x-x2), 2) + Math.pow((y-y2), 2) )
      if(dist > 100){
        if(Math.sign(blobglobbies[i].shape[s][0]) == -1){
            blobglobbies[i].shape[s][0] += 3;
        } else{
            blobglobbies[i].shape[s][0] -= 3;
        }
        if(Math.sign(blobglobbies[i].shape[s][1]) == -1){
            blobglobbies[i].shape[s][1] += 3;
        } else{
            blobglobbies[i].shape[s][1] -= 3;
        }
      }
}


function shrinkDown(i, s){
    if(Math.sign(blobglobbies[i].shape[s][0]) == -1){
        blobglobbies[i].shape[s][0] += 3;
    } else{
        blobglobbies[i].shape[s][0] -= 3;
    }
    if(Math.sign(blobglobbies[i].shape[s][1]) == -1){
        blobglobbies[i].shape[s][1] += 3;
    } else{
        blobglobbies[i].shape[s][1] -= 3;
    }
    blobglobbies[i].shape[s][2] -= 1;
}