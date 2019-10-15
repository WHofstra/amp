const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d(getRandom(width), getRandom(height)),
 10, getRandomColor(), getRandomColor(), 'A', true);
let B = new Point(new Vector2d(getRandom(width), getRandom(height)),
 10, getRandomColor(),  getRandomColor(), 'B', true);
let C = new Point(new Vector2d(getRandom(width), getRandom(height)),
 10, getRandomColor(), getRandomColor(), 'C', true);
let D = new Point(new Vector2d(getRandom(width), getRandom(height)),
 10, getRandomColor(),  getRandomColor(), 'D', true);

let l = new LinearFunction(1, 1);
let m = new LinearFunction(1, 1);

let S = new Point(new Vector2d(getRandom(width), getRandom(height)),
 10, getRandomColor(),  getRandomColor(),'S', true);

function animate(){
  context.clearRect(0, 0, width, height);
  requestAnimationFrame(animate);

  l.defineLineByTwoPoints(A, B);
  l.draw(context);
  A.draw(context);
  B.draw(context);

  m.defineLineByTwoPoints(C, D);
  m.draw(context);
  C.draw(context);
  D.draw(context);

  S.draw(context);
  S.position.dx = (m.intercept-l.intercept)/(l.slope-m.slope);
  S.position.dy = (m.slope * S.position.dx) + m.intercept;
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
