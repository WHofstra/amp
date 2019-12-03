const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new DPoint(new Vector2d(getRandom(width), getRandom(height)), 15,
                  getRandomColor(), getRandomColor(), new Vector2d(0, 0), new Vector2d(0, 0));
let B;

let points = [];

function start(){
  for (let i = 0; i < 3; i++){
    B = new Point(new Vector2d(getRandom(width), getRandom(height)), 20,
                      getRandomColor(), getRandomColor(), '', true);

    points.push(B);
  }

  A.position.dx = points[0].position.dx;
  A.position.dy = points[0].position.dy;
}

start();

function animate(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);

  A.velocity.differenceVector(points[1].position, A.position);
  A.velocity.scalarMul(0.1);
  A.update();

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
