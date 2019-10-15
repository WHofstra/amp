const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A =  new Point(new Vector2d(getRandom(width), getRandom(height)), 10,
      '#E3CD31', '#4B429D', 'Mercury');
let B = new Point(new Vector2d(getRandom(width), getRandom(height)), 20,
      '#FCE27C', '#CD3A10', 'Venus');
let C = new Point(new Vector2d(getRandom(width), getRandom(height)), 20,
      '#3A6F13', '#1E15C4', 'Earth');
let D = new Point(new Vector2d(getRandom(width), getRandom(height)), 15,
      '#D32405', '#1C13C6', 'Mars');

let l = new LinearFunction(1, 1);
let m = new LinearFunction(1, 1);
let n = new LinearFunction(1, 1);
let o = new LinearFunction(1, 1);

function animate(){
  l.defineLineByTwoPoints(A, B);
  l.draw(context);
  m.defineLineByTwoPoints(B, C);
  m.draw(context);
  n.defineLineByTwoPoints(C, D);
  n.draw(context);
  o.defineLineByTwoPoints(A, D);
  o.draw(context);

  A.draw(context);
  B.draw(context);
  C.draw(context);
  D.draw(context);
}

animate();

function getRandom(max){
  return Math.floor(Math.random()*max);
}
