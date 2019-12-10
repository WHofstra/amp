const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new DPoint(new Vector2d(getRandom(width), getRandom(height)), 15,
                  getRandomColor(), getRandomColor(), new Vector2d(0, 0), new Vector2d(0, 0));
let B;

let difference = new Vector2d(0, 0);
let line;

let points = [];
let lines = [];

let count;

function start(){
  for (let i = 0; i < 5; i++){
    B = new Point(new Vector2d(getRandom(width), getRandom(height)), 20,
                      getRandomColor(), getRandomColor(), '', true);

    points.push(B);
  }

  for (let i = 0; i < points.length; i++){

    line = new LinearFunction(0, 0);
    if (i < (points.length - 1)){
      line.defineLineByTwoPoints(points[i], points[i + 1]);
    }
    else {
      line.defineLineByTwoPoints(points[i], points[0]);
    }

    lines.push(line);
  }

  A.position.dx = points[0].position.dx;
  A.position.dy = points[0].position.dy;
  count = 0;
}

start();

function animate(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  if (count < (points.length - 1)){
    A.velocity.differenceVector(points[count + 1].position, A.position);
    //difference = new Vector2d(points[count + 1].position.dx, points[count + 1].position.dy);
  }
  else {
    A.velocity.differenceVector(points[0].position, A.position);
    //difference = new Vector2d(points[0].position.dx, points[0].position.dy);
  }
  //difference.sub(A.position);
  A.velocity.scalarMul(1.1);
  A.update();

  if (A.velocity.magnitude < 2){
    if (count < (points.length - 1)){
      count++;
    }
    else {
      count = 0;
    }
  }

  for (let i = 0; i < points.length; i++){
    if (i < (points.length - 1)){
    lines[i].defineLineByTwoPoints(points[i], points[i + 1]);
    }
    else {
    lines[i].defineLineByTwoPoints(points[i], points[0]);
    }
  }

  for (let i = 0; i < lines.length; i++){
    lines[i].draw(context);
  }

  for (let i = 0; i < points.length; i++){
    points[i].draw(context);
  }
  A.draw(context);
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
