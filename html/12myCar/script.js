const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let background = new Image();
background.src = "images/Background001.png";
background.pos = new Vector2d(0, 0);

let carFrame = new Image();
carFrame.src = "images/CarFrame01.png";
carFrame.pos = new Vector2d(0, 0);
carFrame.vel = new Vector2d(-7, 0);

let wheelA = new Image();
wheelA.src = "images/CarWheel01.png";
wheelA.pos = new Vector2d(0, 0);
wheelA.angle  = 0;

let wheelB = new Image();
wheelB.src = wheelA.src;
wheelB.pos = new Vector2d(0, 0);

carFrame.addEventListener('load',()=>{
  carFrame.pos.dy = canvas.height - carFrame.height - 80;
  carFrame.pos.dx = canvas.width/2 - carFrame.width/2 + 300;
  animate();
})

function animate()
{
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);

  carFrame.pos.add(carFrame.vel);

  wheelA.pos.dx = carFrame.pos.dx;
  wheelA.pos.dy = carFrame.pos.dy;
  wheelA.pos.add(new Vector2d(500, 110));

  wheelB.pos.dx = carFrame.pos.dx;
  wheelB.pos.dy = carFrame.pos.dy;
  wheelB.pos.add(new Vector2d(65, 110));

  context.drawImage(background, background.pos.dx, background.pos.dy);
  context.drawImage(carFrame, carFrame.pos.dx, carFrame.pos.dy);

  wheelA.angle += carFrame.vel.dx;

  context.save();
  context.translate(wheelA.pos.dx + (wheelA.width / 2),
                    wheelA.pos.dy + (wheelA.height / 2));
  context.rotate(wheelA.angle / (wheelA.width/2));
  context.drawImage(wheelA, -(wheelA.width / 2), -(wheelA.height / 2));
  context.restore();

  context.save();
  context.translate(wheelB.pos.dx + (wheelB.width / 2),
                    wheelB.pos.dy + (wheelB.height / 2));
  context.rotate(wheelA.angle / (wheelB.width/2));
  context.drawImage(wheelB, -(wheelB.width / 2), -(wheelB.height / 2));
  context.restore();

  clamp();
}

function clamp(){
  if(carFrame.pos.dx < -carFrame.width){
    carFrame.pos.dx = canvas.width;
  }
}
