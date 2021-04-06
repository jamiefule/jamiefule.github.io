var disp;
var globbies;

function setup(){
    var btmOfTxt = $("#title").offset().top + $("#title").outerHeight(true);
   disp = createCanvas(windowWidth * .8, windowHeight * .75);
   disp.position(windowWidth/10, btmOfTxt - 80, 'fixed');
   disp.background('white');
}

function draw(){
    //draw floor
    line(disp.width * .1, disp.height * .7, disp.width * .9, disp.height * .7)
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

function createGlobbie(c, n, s, i, b){
    var glob = {color: c,
                numEyes: n, 
                shape: s, 
                intellegence: i,
                bodyParts: b};

    globbies.push(glob);
}