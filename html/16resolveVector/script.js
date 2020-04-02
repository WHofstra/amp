const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let radius = 10;

let A = new Point(new Vector2d(getRandom(canvas.width), getRandom(canvas.height)), radius,
                  getRandomColor(), getRandomColor(), 'A', true);
let B = new Point(new Vector2d(getRandom(canvas.width), getRandom(canvas.height)), radius,
                  getRandomColor(), getRandomColor(), 'B', true);
let C = new Point(new Vector2d(getRandom(canvas.width), getRandom(canvas.height)), radius,
                  getRandomColor(), getRandomColor(), 'C', true);

let vector = new Vector2d(0, 0);
let tan = new Vector2d(0, 0);
let rad = new Vector2d(0, 0);

let D = new Arrow(A.position, new Vector2d(0, 20), new Vector2d(radius * 0.5, radius * 0.5 + 10),
                  C.color1, C.color2, C.lineClr2, C.color1);
let E = new Arrow(A.position, new Vector2d(0, 20), new Vector2d(radius * 0.5, radius * 0.5 + 10),
                  B.color1, B.color2, B.lineClr2, B.color1);
let F = new Arrow(A.position, new Vector2d(0, 20), new Vector2d(radius * 0.5, radius * 0.5 + 10),
                  A.color1, A.color2, A.lineClr2, A.color1);

let lineA = new LinearFunction(1, 1);
let lineB = new LinearFunction(1, 1);

function animate(){
    context.clearRect(0, 0, width, height);
    requestAnimationFrame(animate);

    lineA.defineLineByTwoPoints(A, B);

    if (lineA.slope != 0)
    {
      lineB.slope = -1 / lineA.slope;
      lineB.intercept = (A.position.dx * - lineB.slope) + A.position.dy;
    }

    lineA.draw(context);
    lineB.draw(context);

    vector.dx = C.position.dx - A.position.dx;
    vector.dy = C.position.dy - A.position.dy;
    tan.dx    = B.position.dx - A.position.dx;
    tan.dy    = B.position.dy - A.position.dy;
    rad.dx   = -B.position.dy + A.position.dy;
    rad.dy    = B.position.dx - A.position.dx;

    tan.magnitude = 1;
    rad.magnitude = 1;
    tan.magnitude = vector.dot(tan);
    rad.magnitude = vector.dot(rad);

    //Vector
    D.shaftLength = vector.magnitude - radius - 20;
    D.angle = (Math.atan2(vector.dy, vector.dx) / Math.PI * 180);

    //Tangerial
    E.shaftLength = tan.magnitude - radius - 20;
    E.angle = (Math.atan2(tan.dy, tan.dx) / Math.PI * 180);

    //Radial
    F.shaftLength = rad.magnitude - radius - 20;
    F.angle = (Math.atan2(rad.dy, rad.dx) / Math.PI * 180);

    B.draw(context);
    C.draw(context);
    D.draw(context);
    E.draw(context);
    F.draw(context);
    A.draw(context);
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
