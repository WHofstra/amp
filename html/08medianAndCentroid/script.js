const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d((width / 2) + 1, (height * 1/4)),
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

  D.position.dx = 0.5 * (A.position.dx + B.position.dx);
  D.position.dy = 0.5 * (A.position.dy + B.position.dy);
  E.position.dx = 0.5 * (B.position.dx + C.position.dx);
  E.position.dy = 0.5 * (B.position.dy + C.position.dy);
  F.position.dx = 0.5 * (A.position.dx + C.position.dx);
  F.position.dy = 0.5 * (A.position.dy + C.position.dy);

  a.defineLineByTwoPoints(A, B);
  b.defineLineByTwoPoints(B, C);
  c.defineLineByTwoPoints(A, C);
  d.defineLineByTwoPoints(C, D);
  e.defineLineByTwoPoints(A, E);
  f.defineLineByTwoPoints(B, F);

  if (d.slope != 0 && e.slope != 0){
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
