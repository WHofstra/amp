const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let moon, earth;

earth = new DPoint(new Vector2d(width / 2, height / 2), 30,
                   getRandomColor(), getRandomColor(),
                   new Vector2d(0, 0), new Vector2d(0, 0));
moon = new DPoint(new Vector2d(width / 2 - 400, height / 2 - 400), 10,
                   getRandomColor(), getRandomColor(),
                   new Vector2d(0, 0), new Vector2d(0, 0));

function animate(){
  context.clearRect(0, 0, width, height);
  requestAnimationFrame(animate);

  //Acceleraion is Radial/Difference
  //Distance Magnitude = 800/(Distance * Distance);

  earth.update();
  moon.update();
  earth.draw(context);
  moon.draw(context);
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
