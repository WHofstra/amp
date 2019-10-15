const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let dots = [];
var frames = 1;

function animate(){
    if (frames > 300){
      context.clearRect(0, 0, width, height);
      frames = 1;
    }

    requestAnimationFrame(animate);

    let A = new Point(new Vector2d(getRandom(width), getRandom(height)),
     getRandomMin(10, 30), getRandomColor(), getRandomColor(), frames);
    //A.draw(context);
    dots.push(A);
    frames++;

    for(let i = 0; i<dots.length;i++){
    dots[i].radius += 1;
    dots[i].draw(context);
    if(dots[i].radius > 30){
      dots.splice(i,1);
    }
  }
}

animate();

function getRandom(max){
  return Math.floor(Math.random()*max);
}

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
