const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let radius = [ 20, 50 ];
let scale  = 0.75,
headLength = 20;
let bounds = new Vector2d(canvas.width, canvas.height);

let A = new DPoint(new Vector2d(getRandomMin(radius[0], canvas.width - radius[0]),
                                getRandomMin(radius[0], canvas.height - radius[0])),
                   radius[0], getRandomColor(), getRandomColor(),
                   new Vector2d(getRandomMin(-30, 30) * 10, getRandomMin(-30, 30) * 10));
let B = new DPoint(new Vector2d(getRandomMin(radius[1], canvas.width - radius[1]),
                                getRandomMin(radius[1], canvas.height - radius[1])),
                   radius[1], getRandomColor(), getRandomColor(),
                   new Vector2d(getRandomMin(-30, 30) * 10, getRandomMin(-30, 30) * 10));

let head = new Vector2d(15, 20),
    tail = new Vector2d(30 + headLength, headLength);
let turn = false;

function setup() {
  A.vector = new Arrow(A.position, tail, head,
                       getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
  A.rad    = new Arrow(A.position, tail, head,
                       getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
  A.tan    = new Arrow(A.position, tail, head,
                       getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
  B.vector = new Arrow(B.position, tail, head,
                       getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
  B.rad    = new Arrow(B.position, tail, head,
                       getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
  B.tan    = new Arrow(B.position, tail, head,
                       getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());

  A.vector.vec = new Vector2d(1, 1);
  B.vector.vec = new Vector2d(1, 1);
  A.rad.vec    = new Vector2d(1, 1);
  B.rad.vec    = new Vector2d(1, 1);
  A.tan.vec    = new Vector2d(1, 1);
  B.tan.vec    = new Vector2d(1, 1);

  A.mass = A.radius * A.radius;
  B.mass = B.radius * B.radius;
}

function arrowCalculations() {
  A.vector.vec.dx = A.velocity.dx;
  A.vector.vec.dy = A.velocity.dy;
  B.vector.vec.dx = B.velocity.dx;
  B.vector.vec.dy = B.velocity.dy;

  A.rad.vec.differenceVector(B.position, A.position);
  B.rad.vec.differenceVector(A.position, B.position);

  A.tan.vec.perpendicular(A.rad.vec);
  B.tan.vec.perpendicular(B.rad.vec);

  checkDistance(A, B);

  A.rad.vec.magnitude = 1;
  B.rad.vec.magnitude = 1;
  A.tan.vec.magnitude = 1;
  B.tan.vec.magnitude = 1;

  A.rad.vec.magnitude = A.vector.vec.dot(A.rad.vec);
  B.rad.vec.magnitude = B.vector.vec.dot(B.rad.vec);
  A.tan.vec.magnitude = A.vector.vec.dot(A.tan.vec);
  B.tan.vec.magnitude = B.vector.vec.dot(B.tan.vec);

  if (turn) {
    changeVelocity(A, B);
  }
}

function drawArrows() {
  A.vector.shaftLength = A.vector.vec.magnitude * scale;
  A.vector.angle = (Math.atan2(A.vector.vec.dy, A.vector.vec.dx) / Math.PI * 180);
  B.vector.shaftLength = B.vector.vec.magnitude * scale;
  B.vector.angle = (Math.atan2(B.vector.vec.dy, B.vector.vec.dx) / Math.PI * 180);

  A.rad.shaftLength = A.rad.vec.magnitude * scale;
  A.rad.angle = (Math.atan2(A.rad.vec.dy, A.rad.vec.dx) / Math.PI * 180);
  B.rad.shaftLength = B.rad.vec.magnitude * scale;
  B.rad.angle = (Math.atan2(B.rad.vec.dy, B.rad.vec.dx) / Math.PI * 180);

  A.tan.shaftLength = A.tan.vec.magnitude * scale;
  A.tan.angle = (Math.atan2(A.tan.vec.dy, A.tan.vec.dx) / Math.PI * 180);
  B.tan.shaftLength = B.tan.vec.magnitude * scale;
  B.tan.angle = (Math.atan2(B.tan.vec.dy, B.tan.vec.dx) / Math.PI * 180);

  A.vector.draw(context);
  B.vector.draw(context);
  A.rad.draw(context);
  B.rad.draw(context);
  A.tan.draw(context);
  B.tan.draw(context);
}

function checkDistance(a, b) {
  if (((a.rad.vec.magnitude - (a.radius + b.radius)) <= 0) ||
      ((b.rad.vec.magnitude - (a.radius + b.radius)) <= 0))
  {
    turn = true;
  } else {
    turn = false;
  }
}

function changeVelocity(a, b) {
  let tempRadVec = [a.rad.vec.dx, a.rad.vec.dy];

  a.rad.vec.dx = b.rad.vec.dx;
  a.rad.vec.dy = b.rad.vec.dy;
  b.rad.vec.dx = tempRadVec[0];
  b.rad.vec.dy = tempRadVec[1];

  a.vector.vec.dx = (a.rad.vec.dx + a.tan.vec.dx);
  a.vector.vec.dy = (a.rad.vec.dy + a.tan.vec.dy);
  b.vector.vec.dx = (b.rad.vec.dx + b.tan.vec.dx);
  b.vector.vec.dy = (b.rad.vec.dy + b.tan.vec.dy);

  a.velocity.dx = a.vector.vec.dx;
  a.velocity.dy = a.vector.vec.dy;
  b.velocity.dx = b.vector.vec.dx;
  b.velocity.dy = b.vector.vec.dy;
}

function animate() {
  context.clearRect(0, 0, width, height);
  requestAnimationFrame(animate);

  A.update();
  B.update();
  A.bounce(bounds);
  B.bounce(bounds);

  arrowCalculations();
  drawArrows();

  A.draw(context);
  B.draw(context);
}

setup();
animate();

function getRandomMin(min, max) {
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
