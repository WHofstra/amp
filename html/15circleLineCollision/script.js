const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let scale = 0.8;
let movPointRad = 30;
let turn = false;
let bounds = new Vector2d(canvas.width, canvas.height);

let A = new Point(new Vector2d(getRandom(width), getRandom(height)), 10,
                  getRandomColor(), getRandomColor(), 'A', true);
let B = new Point(new Vector2d(getRandom(width), getRandom(height)), A.radius,
                  A.color1, A.color2, 'B', true);
let C = new DPoint(new Vector2d(getRandom(width - (2 * movPointRad)) + movPointRad,
                  getRandom(height - (2 * movPointRad)) + movPointRad), movPointRad,
                  getRandomColor(), getRandomColor(),
                  new Vector2d(getRandom(150) + 50, getRandom(150) + 50), 0);
let S = new Point(new Vector2d(0, 0), A.radius, '#2C588F', '#FFFFFF', 'S', false);

let a = new LinearFunction(1, 1);
let s = new LinearFunction(1, 1);

let vector = new Vector2d(C.velocity.dx * scale, C.velocity.dy * scale);
let rad = new Vector2d(C.position.dx - S.position.dx, C.position.dy - S.position.dy);
let tan = new Vector2d(1, 1);

let D = new Arrow(C.position, new Vector2d(vector.magnitude - 20, 20),
                  new Vector2d(C.radius * 0.5, C.radius * 0.5 + 10),
                  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
let E = new Arrow(C.position, new Vector2d(rad.magnitude - S.radius - 20, 20),
                  new Vector2d(C.radius * 0.5, C.radius * 0.5 + 10),
                  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
let F = new Arrow(C.position, new Vector2d(tan.magnitude - 20, 20),
                  new Vector2d(C.radius * 0.5, C.radius * 0.5 + 10),
                  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());

function animate(){
    context.clearRect(0, 0, width, height);
    requestAnimationFrame(animate);

    a.defineLineByTwoPoints(A, B);

    if (a.slope != 0){
      s.slope = -1 / (a.slope);
      s.intercept = (C.position.dx * (-s.slope)) + C.position.dy;
    }

    if (a.slope != 0 && s.slope != 0){
      S.position.dx = (s.intercept-a.intercept)/(a.slope-s.slope);
      S.position.dy = (s.slope * S.position.dx) + s.intercept;
    }

    C.update();
    C.bounce(bounds);

    vector.dx = C.velocity.dx;
    vector.dy = C.velocity.dy;
    rad.dx    = C.position.dx - S.position.dx;
    rad.dy    = C.position.dy - S.position.dy;
    tan.dx   = -C.position.dy + S.position.dy;
    tan.dy    = C.position.dx - S.position.dx;

    if ((rad.magnitude - S.radius - C.radius) <= 0) {
      //console.log("No.");
      turn = true;
    }
    else {
      turn = false;
    }

    rad.magnitude = 1;
    tan.magnitude = 1;
    rad.magnitude = vector.dot(rad);
    tan.magnitude = vector.dot(tan);

    if (turn) {
      //console.log("No.");
      rad.dx    *= -1;
      rad.dy    *= -1;
      //tan.dx    *= -1;
      //tan.dy    *= -1;
      vector.dx = (rad.dx + tan.dx);
      vector.dy = (rad.dy + tan.dy);
      C.velocity.dx = vector.dx;
      C.velocity.dy = vector.dy;
    }

    //Vector
    D.angle = (Math.atan2(vector.dy, vector.dx) / Math.PI * 180);

    //Radial
    E.shaftLength = rad.magnitude - S.radius;
    E.angle = (Math.atan2(rad.dy, rad.dx) / Math.PI * 180);

    //Tangerial
    F.shaftLength = tan.magnitude - S.radius;
    F.angle = (Math.atan2(tan.dy, tan.dx) / Math.PI * 180);

    a.draw(context);
    s.draw(context);

    E.draw(context);
    F.draw(context);
    D.draw(context);
    A.draw(context);
    B.draw(context);
    C.draw(context);
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
