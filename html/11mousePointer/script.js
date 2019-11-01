const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Arrow(new Vector2d((width/5 * 1), (height/5 * 1)),
 new Vector2d(180, 50), new Vector2d(10, 20),
 "#00F4FF", "#FFFFFF", "#0000FF", "#00F4FF", 270, true);
let B = new Arrow(new Vector2d((width/5 * 4), (height/5 * 1)),
 new Vector2d(180, 50), new Vector2d(10, 20),
 "#A6FF00", "#FFFFFF", "#00FF00", "#A6FF00", 270, true);
let C = new Arrow(new Vector2d((width/5 * 1), (height/5 * 4)),
 new Vector2d(180, 50), new Vector2d(10, 20),
 "#FF0000", "#FFFFFF", "#960000", "#FF0000", 270, true);
let D = new Arrow(new Vector2d((width/5 * 4), (height/5 * 4)),
 new Vector2d(180, 50), new Vector2d(10, 20),
 "#800060", "#FFFFFF", "#530080", "#800060", 270, true);

function animate(){

   requestAnimationFrame(animate);
   context.clearRect(0, 0, width, height);

   A.draw(context);
   B.draw(context);
   C.draw(context);
   D.draw(context);
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
