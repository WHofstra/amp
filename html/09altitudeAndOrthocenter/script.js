const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d((width / 2), (height * 1/4)),
    10, getRandomColor(), getRandomColor(), 'A', true);
let B = new Point(new Vector2d((width * 3/7), (height * 3/4 + 1)),
    10, getRandomColor(), getRandomColor(), 'B', true);
let C = new Point(new Vector2d((width * 4/7), (height * 3/4 - 1)),
    10, getRandomColor(), getRandomColor(), 'C', true);
let D = new Point(new Vector2d(getRandom(width), getRandom(height)),
    5, '#000000', '#2C588F', 'AB\'S', false);
let E = new Point(new Vector2d(getRandom(width), getRandom(height)),
    5, '#000000', '#2C588F', 'BC\'S', false);
let F = new Point(new Vector2d(getRandom(width), getRandom(height)),
    5, '#000000', '#2C588F', 'AC\'S', false);
let S = new Point(new Vector2d(getRandom(width), getRandom(height)),
    10, '#2C588F', '#FFFFFF', 'True S', false);

let a = new LinearFunction(1, 1);
let b = new LinearFunction(1, 1);
let c = new LinearFunction(1, 1);
let d = new LinearFunction(1, 1);
let e = new LinearFunction(1, 1);
let f = new LinearFunction(1, 1);

function animate(){

  requestAnimationFrame(animate);
  context.clearRect(0, 0, width, height);

  a.defineLineByTwoPoints(A, B);
  b.defineLineByTwoPoints(B, C);
  c.defineLineByTwoPoints(A, C);

  if (a.slope != 0){
    d.slope = -1 / (a.slope);
    d.intercept = (C.position.dx * (-d.slope)) + C.position.dy;
    D.position.dx = (d.intercept-a.intercept)/(a.slope-d.slope);
    D.position.dy = (a.slope * D.position.dx) + a.intercept;
  }

  if (b.slope != 0){
    e.slope = -1 / (b.slope);
    e.intercept = (A.position.dx * (-e.slope)) + A.position.dy;
    E.position.dx = (e.intercept-b.intercept)/(b.slope-e.slope);
    E.position.dy = (b.slope * E.position.dx) + b.intercept;
  }

  if (c.slope != 0){
    f.slope = -1 / (c.slope);
    f.intercept = (B.position.dx * (-f.slope)) + B.position.dy;
    F.position.dx = (f.intercept-c.intercept)/(c.slope-f.slope);
    F.position.dy = (c.slope * F.position.dx) + c.intercept;
  }

  if (a.slope != 0 && b.slope != 0){
    S.position.dx = (e.intercept-d.intercept)/(d.slope-e.slope);
    S.position.dy = (d.slope * S.position.dx) + d.intercept;
  }

  a.draw(context);
  b.draw(context);
  c.draw(context);
  d.draw(context);
  e.draw(context);
  f.draw(context);

  A.draw(context);
  B.draw(context);
  C.draw(context);
  D.draw(context);
  E.draw(context);
  F.draw(context);
  S.draw(context);
}

animate();

function getRandom(max){
  return Math.floor(Math.random()*max);
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
