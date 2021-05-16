//jfule2
function plant1(){
  console.log("Success!");
  var num = document.getElementById("plant1").src;
  num = num.charAt(num.length-5);
  console.log(num);
  num++;
  if(num != 7)
    document.getElementById("plant1").src="assets/plant-1/" + num + ".png";
  
}

function plant2(){
  console.log("Success!");
  var num = document.getElementById("plant2").src;
  num = num.charAt(num.length-5);
  console.log(num);
  num++;
  if(num != 7)
    document.getElementById("plant2").src="assets/plant-2/" + num + ".png";

}

function plant3(){
  console.log("Success!");
  var num = document.getElementById("plant3").src;
  num = num.charAt(num.length-5);
  console.log(num);
  num++;
  if(num != 7)
    document.getElementById("plant3").src="assets/plant-3/" + num + ".png";

}

function printSecret(){
  var warning = new Audio('assets/warning.mp3');
  var error = new Audio('assets/error.mp3');
  //sound clips from zedge.net
document.getElementsByClassName("order")[0].style.visibility = "hidden";
document.getElementsByClassName("pill")[0].style.visibility = "visible";
warning.play();
setTimeout(function() {
  document.getElementsByClassName("singles")[0].style.visibility = "visible";
  warning.play();
}, 1500);
setTimeout(function() {
  document.getElementsByClassName("error")[0].style.visibility = "visible";
  error.play();
}, 2000);
setTimeout(function() {
  document.getElementsByClassName("error")[1].style.visibility = "visible";
  error.play();
}, 3500);
setTimeout(function() {
  document.getElementsByClassName("error")[2].style.visibility = "visible";
  error.play();
}, 4700);
}
