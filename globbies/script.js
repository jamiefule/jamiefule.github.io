function setup(){
    var btmOfTxt = $("#title").offset().top + $("#title").outerHeight(true);
   let disp = createCanvas(windowWidth * .8, windowHeight * .75);
   disp.position(windowWidth/10, btmOfTxt - 80, 'fixed');
   disp.background('white');
}

function draw(){

}