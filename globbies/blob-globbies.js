var globalCounter = 0;

function createBlobGlobbie(n, i, p){
    let r = random(255);
    let g = random(255);
    let b = random(255);

    let rad = random(10,40)

    let s = generateBlobGlobbies(rad, random(0,360), random(30,50))
    let ls = s;

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
                center: [0,0]};

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
    
            ellipse(x + xoff, y + yoff, rad + random(-1,1))

            //randomly change stuff up
            if(int(random(100)) == 1){
                blobglobbies[i].lerping = true;
                console.log(blobglobbies[i].shape[s][0])
                blobglobbies[i].shape[s][0] += random(-5,5) 
                console.log(blobglobbies[i].shape[s][0] + "," + blobglobbies[i].lastShape[s][0])
                blobglobbies[i].shape[s][1] += random(-5,5) 
                blobglobbies[i].shape[s][2] += random(-5,5) 
                console.log("----------------")
            }

            if(blobglobbies[i].lerping)
                lerpGlobbie(i)
        }

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

            console.log("test")
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
    var n = blobglobbies[i].numEyes;
    for(var s = 0; s < blobglobbies[i].shape.length; s++){
        var x = blobglobbies[i].pos[0] - blobglobbies[i].shape[s][0];
        var y = blobglobbies[i].pos[1] - blobglobbies[i].shape[s][1];
        var center = blobglobbies[i].pos;

        if(n == 1){
            if(s == int(blobglobbies[i].shape.length/2))
                text(eye, x - 20, y + 20)
        }

        if(n == 2){
            if(s == int(blobglobbies[i].shape.length/3))
                image(eye, x - 20, y + 20)
            if(s == int(blobglobbies[i].shape.length/6))
                image(eye, x, y - 20)
        }

        if(n == 3){
            // console.log("3, s: "+s+" len: " + blobglobbies[i].shape.length )
            if(s == int(blobglobbies[i].shape.length/3))
                image(eye, x - 20, y + 20)
            if(s == int(blobglobbies[i].shape.length/5))
                image(eye, x + 5, y - 20)
            if(s == int(blobglobbies[i].shape.length/7))
                image(eye, x + 20, y)
        }
    }
}