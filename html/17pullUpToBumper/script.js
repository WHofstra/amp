const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let bounds = new Vector2d(canvas.width, canvas.height);
let scale  = 0.4;
let turn = false;

let A = new Point(new Vector2d(canvas.width / 2, canvas.height / 2), 60,
                  getRandomColor(), getRandomColor(), '');
let B = new DPoint(new Vector2d(getRandomMin(30, canvas.width/2 - 30),
                   getRandomMin(30, canvas.height/2 - 30)), 20,
                   getRandomColor(), getRandomColor(),
                   new Vector2d(getRandomMin(-50, 50) * 10, getRandomMin(-50, 50) * 10));
                   //new Vector2d(200, 300));

let vector = new Vector2d(B.velocity.dx * scale, B.velocity.dy * scale);
let tan = new Vector2d(0, 0);
let rad = new Vector2d(0, 0);

let C = new Arrow(B.position, new Vector2d(vector.magnitude - 20, 20),
                  new Vector2d(B.radius * 0.5, B.radius),
                  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
let D = new Arrow(B.position, new Vector2d(20, 20),
                  new Vector2d(B.radius * 0.5, B.radius),
                  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());
let E = new Arrow(B.position, new Vector2d(20, 20),
                  new Vector2d(B.radius * 0.5, B.radius),
                  getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor());

function animate(){
    context.clearRect(0, 0, width, height);
    requestAnimationFrame(animate);

    vector.dx = B.velocity.dx * scale;
    vector.dy = B.velocity.dy * scale;
    rad.dx    = B.position.dx - A.position.dx;
    rad.dy    = B.position.dy - A.position.dy;
    tan.dx   = -B.position.dy + A.position.dy;
    tan.dy    = B.position.dx - A.position.dx;

    if ((rad.magnitude - B.radius - A.radius) <= 0)
    {
      rad.dx    = -B.position.dx + A.position.dx;
      rad.dy    = B.position.dx - A.position.dx;
      vector.dx = (rad.dx + tan.dx);
      vector.dy = (rad.dy + tan.dy);
      turn = true;
    }
    else {
      turn = false;
    }

    rad.magnitude = 1;
    tan.magnitude = 1;
    rad.magnitude = vector.dot(rad);
    tan.magnitude = vector.dot(tan);

    if (turn){
      B.velocity.magnitude = vector.magnitude;
    }

    //Vector
    C.angle = (Math.atan2(vector.dy, vector.dx) / Math.PI * 180);

    //Radial
    D.shaftLength = rad.magnitude - B.radius;
    D.angle = (Math.atan2(rad.dy, rad.dx) / Math.PI * 180);

    //Tangerial
    E.shaftLength = tan.magnitude - B.radius;
    E.angle = (Math.atan2(tan.dy, tan.dx) / Math.PI * 180);

    B.update();
    B.bounce(bounds);
    A.draw(context);
    E.draw(context);
    D.draw(context);
    C.draw(context);
    B.draw(context);
}

animate();

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
