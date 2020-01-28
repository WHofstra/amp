const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d(getRandom(width), getRandom(height)), 10,
                  getRandomColor(), getRandomColor(), 'A', true);
let B = new Point(new Vector2d(getRandom(width), getRandom(height)), A.radius,
                  A.color1, A.color2, 'B', true);
let C = new DPoint(new Vector2d(getRandom(width), getRandom(height)), 15,
                  getRandomColor(), getRandomColor(), new Vector2d(30, 70), 0);
let S = new Point(new Vector2d(0, 0), 10, '#2C588F', '#FFFFFF', 'S', false);

let a = new LinearFunction(1, 1);
let s = new LinearFunction(1, 1);

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
    C.bounce(new Vector2d(canvas.width, canvas.height));

    a.draw(context);
    s.draw(context);

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
