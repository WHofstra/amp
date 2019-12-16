const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let centerRad = 200;
let min = 0.2;

let A = new DPoint(new Vector2d(getRandom(width), getRandom(height)), 25,
                  getRandomColor(), getRandomColor(), new Vector2d(0, 0), new Vector2d(0, 0),
                  false, "#FFFFFF");

let B = new Point(new Vector2d((canvas.width/2 + (Math.cos(Math.PI * 0.9) * centerRad)),
                  (canvas.height/2 + (Math.sin(Math.PI * 0.9) * centerRad))), 20,
                  "#D0A304", "#FFDF00", '土');
let C = new Point(new Vector2d((canvas.width/2 + (Math.cos(Math.PI * 1.7) * centerRad)),
                  (canvas.height/2 + (Math.sin(Math.PI * 1.7) * centerRad))), 20,
                  "#020202", "#18185C", '水', false,
                  "#FFFFFF", B.lineClr2);
let D = new Point(new Vector2d((canvas.width/2 + (Math.cos(Math.PI * 0.5) * centerRad)),
                  (canvas.height/2 + (Math.sin(Math.PI * 0.5) * centerRad))), 20,
                  "#790600", "#FF2600", '火', false,
                  "#FFFFFF", B.lineClr2);
let E = new Point(new Vector2d((canvas.width/2 + (Math.cos(Math.PI * 1.3) * centerRad)),
                  (canvas.height/2 + (Math.sin(Math.PI * 1.3) * centerRad))), 20,
                  "#B5D8E1", "#FDFDFD", '金', false,
                  "#000000", B.lineClr2);
let F = new Point(new Vector2d((canvas.width/2 + (Math.cos(Math.PI * 0.1) * centerRad)),
                  (canvas.height/2 + (Math.sin(Math.PI * 0.1) * centerRad))), 20,
                  "#00794B", "#00BB96", '木', false,
                  "#FFFFFF", B.lineClr2);

let difference = new Vector2d(0, 0);
let line;

let points = [];
let lines = [];

let count;

function start(){
  /*for (let i = 0; i < 5; i++){
    B = new Point(new Vector2d(getRandom(width), getRandom(height)), 20,
                      getRandomColor(), getRandomColor(), '火', true, "#FFFFFF");

    points.push(B);
  }*/

  points.push(B);
  points.push(C);
  points.push(D);
  points.push(E);
  points.push(F);

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
  changeVelocity(count);
}

start();

function animate(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  /*if (count < (points.length - 1)){
    A.velocity.differenceVector(points[count + 1].position, A.position);
  }
  else {
    A.velocity.differenceVector(points[0].position, A.position);
  }
  A.velocity.scalarMul(1.1);*/

  A.update();
  A.color1 = getRandomColor();
  A.color2 = getRandomColor();

    if (count < (points.length - 1)){
      if (((points[count + 1].position.dx - A.position.dx) < min &&
           (points[count + 1].position.dx - A.position.dx) > -min) &&
          ((points[count + 1].position.dy - A.position.dy) < min &&
           (points[count + 1].position.dy - A.position.dy) > -min)){
        count++;
        changeVelocity(count);
      }
    }
    else {
      if (((points[0].position.dx - A.position.dx) < min &&
           (points[0].position.dx - A.position.dx) > -min) &&
          ((points[0].position.dy - A.position.dy) < min &&
           (points[0].position.dy - A.position.dy) > -min)){
        count = 0;
        changeVelocity(count);
      }
    }

  for (let i = 0; i < points.length; i++){
    if (i < (points.length - 1)){
      lines[i].defineLineByTwoPoints(points[i], points[i + 1]);
    }
    else {
      lines[i].defineLineByTwoPoints(points[i], points[0]);
    }

    points[i].lineClr2 = getRandomColor();
  }

  context.beginPath();
  context.arc(canvas.width/2, canvas.height/2, centerRad, 0, 2 * Math.PI);
  context.strokeStyle = points[0].lineClr2;
  context.stroke();
  context.closePath();

  for (let i = 0; i < lines.length; i++){
    lines[i].draw(context);
  }
  A.draw(context);

  for (let i = 0; i < points.length; i++){
    points[i].draw(context);
  }
}

animate();

function changeVelocity(c){
  if (c < (points.length - 1)){
    A.velocity.differenceVector(points[c + 1].position, A.position);
  }
  else {
    A.velocity.differenceVector(points[0].position, A.position);
  }
  A.velocity.scalarMul(0.75);
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
