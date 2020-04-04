const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let arrows = [];
let points = [];
let bounds = new Vector2d(canvas.width, canvas.height);

function start(){
  for (let i = 0; i < 7; i++){
    let A = new Arrow(new Vector2d(0, 0), new Vector2d(65, 40), new Vector2d(10, 20),
      getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), 270);
    let B = new DPoint(new Vector2d(getRandom(canvas.width), getRandom(canvas.height)), 20,
      getRandomColor(), getRandomColor(), new Vector2d(220, getRandomMin(30, 400)), 10, true);

    arrows.push(A);
    points.push(B);
  }
}

start();

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < points.length; i++){
    points[i].bounce(bounds);
    points[i].update();
    arrows[i].position = points[i].position;
    arrows[i].checkBall(points[i]);
    arrows[i].shaftLength = (points[i].velocity.magnitude / 4);

    arrows[i].draw(context);
    points[i].draw(context);
  }
}

animate();

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
