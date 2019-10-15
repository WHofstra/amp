const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let f = new LinearFunction(2, 10);
//console.log(f.calcY(10));

for (let x = 0; x < width ; x+=10){
//  let point = new Point(new Vector2d(x, f.calcY(x)), 10)
}
