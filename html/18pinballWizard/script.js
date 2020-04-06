const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let amount = 60,
      rowX = 10,
    radius = 25,
rowDistance = 4.2 * radius,
    beginX = 2 * radius,
    beginY = 2 * radius;

let bounds = new Vector2d(canvas.width, canvas.height);

let vector = new Vector2d(0, 0);
let rad = new Vector2d(0, 0);
let tan = new Vector2d(0, 0);

let turn;
let dots = [];
let ballColors = [ getRandomColor(), getRandomColor() ];
let bumpArr = setup();

let D = new DPoint(new Vector2d(getRandomMin(30, canvas.width/2 - 30),
                   getRandomMin(30, canvas.height/2 - 30)),
                   radius * 0.5, getRandomColor(), getRandomColor(),
                   new Vector2d(getRandomMin(-50, 50) * 10, getRandomMin(-50, 50) * 10));

function pushBalls(array, xPos, yPos, number) {
  let B = new Point(new Vector2d(xPos, yPos), radius,
                    ballColors[0], ballColors[1], "#" + number);
  array.push(B);
  return array;
}

function setup() {
  let k = 1;

  for (let j = 0; j < Math.floor(amount / rowX); j++) {
    for (let i = 0; i < rowX; i++) {
      dots = pushBalls(dots, beginX + (i * rowDistance),
                       beginY + (j * rowDistance), k);
      k++;
    }
  }

  if ((amount % rowX) > 0) {
    for (let i = 0; i < Math.floor(amount % rowX); i++) {
      dots = pushBalls(dots, beginX + (i * rowDistance),
                       beginY + (Math.floor(amount / rowX) * rowDistance), k);
      k++;
    }
  }
  return dots;
}

function animate() {
    context.clearRect(0, 0, width, height);
    requestAnimationFrame(animate);

    vector.dx = D.velocity.dx;
    vector.dy = D.velocity.dy;

    bumpArr.map((bumper, i) => {
      rad.dx = D.position.dx - bumper.position.dx;
      rad.dy = D.position.dy - bumper.position.dy;
      tan.dx = -D.position.dy + bumper.position.dy;
      tan.dy = D.position.dx - bumper.position.dx;

      if ((rad.magnitude - D.radius - bumper.radius) <= 0) {
        bumper.color1 = getRandomColor();
        bumper.color2 = getRandomColor();
        turn = true;
      }
      else {
        bumper.color1 = ballColors[0];
        bumper.color2 = ballColors[1];
        turn = false;
      }

      rad.magnitude = 1;
      tan.magnitude = 1;
      rad.magnitude = vector.dot(rad);
      tan.magnitude = vector.dot(tan);

      if (turn) {
        rad.dx    *= -1;
        rad.dy    *= -1;
        vector.dx = (rad.dx + tan.dx);
        vector.dy = (rad.dy + tan.dy);
        D.velocity.dx = vector.dx;
        D.velocity.dy = vector.dy;
        turn = false;
      }

      bumper.draw(context);
    });

    D.update();
    D.bounce(bounds);
    D.draw(context);
}

//setup();
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
