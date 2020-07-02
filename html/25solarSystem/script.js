const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let scale = 1.0;

let sun = new Point(new Vector2d(width * 1/2, height * 1/2),
                    30 * scale, getRandomColor(), getRandomColor(), "Sun",
                    false, "#FFFFFF");
let earth = new Point(new Vector2d((width * 1/2) + (100 * scale), height * 1/2),
                      10 * scale, getRandomColor(), getRandomColor(), "Earth",
                      false, "#FFFFFF");
let moon = new Point(new Vector2d((width * 1/2) + (130 * scale), height * 1/2),
                     5 * scale, getRandomColor(), getRandomColor(), "Moon",
                     false, "#FFFFFF");

function animate(){
  context.clearRect(0, 0, width, height);
  requestAnimationFrame(animate);

  sun.draw(context);
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
