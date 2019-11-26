const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Arrow(new Vector2d(0, 0), new Vector2d(65, 40), new Vector2d(10, 20),
  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), 270);
let B = new DPoint(new Vector2d(getRandom(canvas.width), getRandom(canvas.height)), 20,
  getRandomColor(), getRandomColor(), new Vector2d(220, getRandomMin(30, 400)), 10, true);
let C = new Arrow(new Vector2d(0, 0), new Vector2d(65, 40), new Vector2d(10, 20),
  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), 270);
let D = new DPoint(new Vector2d(getRandom(canvas.width), getRandom(canvas.height)), 20,
  getRandomColor(), getRandomColor(), new Vector2d(220, getRandomMin(30, 400)), 10, true);
let E = new Arrow(new Vector2d(0, 0), new Vector2d(65, 40), new Vector2d(10, 20),
  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), 270);
let F = new DPoint(new Vector2d(getRandom(canvas.width), getRandom(canvas.height)), 20,
   getRandomColor(), getRandomColor(), new Vector2d(220, getRandomMin(30, 400)), 10, true);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  B.bounce(new Vector2d(canvas.width, canvas.height));
  D.bounce(new Vector2d(canvas.width, canvas.height));
  F.bounce(new Vector2d(canvas.width, canvas.height));

  B.update();
  D.update();
  F.update();
  A.position = B.position;
  C.position = D.position;
  E.position = F.position;
  A.checkBall(B);
  C.checkBall(D);
  E.checkBall(F);

  A.shaftLength = (B.velocity.magnitude / 4);
  C.shaftLength = (D.velocity.magnitude / 4);
  E.shaftLength = (F.velocity.magnitude / 4);

  A.draw(context);
  B.draw(context);
  C.draw(context);
  D.draw(context);
  E.draw(context);
  F.draw(context);
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
