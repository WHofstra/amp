const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Arrow(new Vector2d(0, 0), new Vector2d(65, 40), new Vector2d(10, 20),
 getRandomColor(), getRandomColor(), getRandomColor(), getRandomColor(), 270, false);
let B = new DPoint(new Vector2d(canvas.width / 2, canvas.height / 2), 20,
 getRandomColor(), getRandomColor(), new Vector2d(100, 100), new Vector2d(0, 0));

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  A.position = B.position;
  A.angle = Math.atan(B.velocity.dy / B.velocity.dx);
  A.draw(context);

  B.update();
  B.draw(context);
  B.bounce(new Vector2d(canvas.width, canvas.height));
}

animate();

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
