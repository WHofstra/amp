const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const differVar = 100;
const arrowLength = new Vector2d(65, 40);
const arrowHeight = new Vector2d(10, 20);

canvas.width = width;
canvas.height = height;

let A = new Arrow(new Vector2d((width/2 - differVar), (height/2 - differVar)),
 arrowLength, arrowHeight, getRandomColor(),
 getRandomColor(), getRandomColor(), getRandomColor(), 270, true);
let B = new Arrow(new Vector2d((width/2 + differVar), (height/2 - differVar)),
 arrowLength, arrowHeight, A.color1, A.color2, A.color3, A.color4, 270, true);
let C = new Arrow(new Vector2d((width/2 - differVar), (height/2 + differVar)),
 arrowLength, arrowHeight, A.color1, A.color2, A.color3, A.color4, 270, true);
let D = new Arrow(new Vector2d((width/2 + differVar), (height/2 + differVar)),
 arrowLength, arrowHeight, A.color1, A.color2, A.color3, A.color4, 270, true);
let E = new Arrow(new Vector2d((width/2), (height/2)),
 arrowLength, arrowHeight, A.color1, A.color2, A.color3, A.color4, 270, true);

function animate(){

   requestAnimationFrame(animate);
   context.clearRect(0, 0, width, height);

   A.draw(context);
   B.draw(context);
   E.draw(context);
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
