const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let mousePos = new Vector2d(0, 0);
let difference = new Vector2d(0, 0);
let A = new Arrow(new Vector2d((width/2), (height/2)), new Vector2d(80, 50),
                  new Vector2d(20, 40), "#000040", "#800000", 270);

function animate(){

   requestAnimationFrame(animate);
   context.clearRect(0, 0, width, height);

   A.draw(context);
}

animate();

window.addEventListener('click', (evt)=>{
   mousePos.dx = evt.clientX;
   mousePos.dy = evt.clientY;
   difference.dx = mousePos.dx - A.position.dx;
   difference.dy = mousePos.dy - A.position.dy;

   /*if (difference.dx > 0){

   }
   else if (difference.dx < 0){

   }
   else {

   }*/

   console.log(difference);
});
