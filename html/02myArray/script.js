const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const max_dots = 10;

canvas.width = width;
canvas.height = height;

let dots = [];
var clicked = [];
var frames = 1;

//let point = new Point(new Vector2d(getRandom(width), getRandom(height)),
// 30, getRandomColor(), getRandomColor(), frames);
let mouseVector = new Vector2d(0, 0);
let difference = new Vector2d(0, 0);

for (let i = 0; i < max_dots; i++){
    clicked[i] = 0;
}

function animate(){
  context.clearRect(0, 0, width, height);

  requestAnimationFrame(animate);

  while (frames <= max_dots){
    let point = new Point(new Vector2d(getRandom(width), getRandom(height)),
     30, getRandomColor(), getRandomColor(), frames);
    //point.draw(context);
    dots.push(point);
    frames++;
  }

  for (let i = 0; i < dots.length; i++){
    dots[i].draw(context);


  }


}

animate();

window.addEventListener('click', (evt)=>{
  //console.log(evt.clientX, evt.clientY);

  for (let i = 0; i < dots.length; i++){
    mouseVector.dx = evt.clientX;
    mouseVector.dy = evt.clientY;
    //console.log(mouseVector);
    //console.log(dots[i].position);
    difference.differenceVector(dots[i].position, mouseVector);
    //console.log(difference);
    //console.log(difference.magnitude);

    if(difference.magnitude <= dots[i].radius){
      newClicked(i);
    }
    //console.log(checkAllBalls());
  }
})

function newClicked(i){
  dots[i].color1 = "rgb(0, 80, 255)";
  dots[i].color2 = "rgb(150, 200, 255)";
  //point.draw(context);
  dots[i].draw(context);

    clicked[i] = 1;
    console.log("Ball " + (i + 1) + " clicked!");
    console.log(clicked);
    //console.log(checkAllBalls());

    if (checkAllBalls()){
      console.log("Verschijn!");
      frames = 1;
      for (let i = 0; i < dots.length; i++){
          clicked[i] = 0;
        }
    }
}

function checkAllBalls(){
    for (let i = 0; i < dots.length; i ++){
      if (clicked[i] == 0){
        return false;
      }
    }

    //if (this == true){  //Ik probeerde het met dit...
    //  return false;
    //}

    dots.splice(0, dots.length);
    return true;
}

function getRandom(max){
  return Math.floor(Math.random()*max);
}

function getRandomMin(min, max){
  return Math.floor(Math.random()*(max - min) + min);
}

function getRandomColor()
{
    var color = "";
    for(var i = 0; i < 3; i++) {
        //Choose a random number and convert it to hexadecimal
        var sub = Math.floor(Math.random() * 256).toString(16);
        color += (sub.length == 1 ? "0" + sub : sub);
    }
    return "#" + color;
}
