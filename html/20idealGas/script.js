const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let bounds = new Vector2d(canvas.width, canvas.height);

let amount = 4,
      rowX = 9,
    radius = 30,
rowDistance = 3.5 * radius,
    beginX = 2 * radius,
    beginY = 2 * radius;

let dots = [];
let colors = [ getRandomColor(), getRandomColor() ];//, getRandomColor(), getRandomColor() ];
let balls = fillArray();

function fillArray() {
  let k = 0;
  for (let j = 0; j < Math.floor(amount / rowX); j++) {
    for (let i = 0; i < rowX; i++) {
      dots = pushBalls(dots, beginX + (i * rowDistance), beginY + (j * rowDistance), k);
      k++;
    }
  }

  if ((amount % rowX) > 0) {
    for (let i = 0; i < Math.floor(amount % rowX); i++) {
      dots = pushBalls(dots, beginX + (i * rowDistance),
                       beginY + (Math.floor(amount / rowX) * rowDistance), k);
      k++;
    }
  }
  return dots;
}

function pushBalls(array, xPos, yPos, ind) {
  let A = new DPoint(new Vector2d(xPos, yPos), radius, colors[0], colors[1],
                     new Vector2d(getRandomMin(-10, 10) * 20, getRandomMin(-10, 10) * 20),
                     new Vector2d(0, 0));
  A.rad = new Vector2d(1, 1);
  A.tan = new Vector2d(1, 1);
  A.collision = false;
  A.index = ind;

  array.push(A);
  return array;
}

/*
function changeColors(obj) {
  obj.color1 = colors[2];
  obj.color2 = colors[3];
}

function changeBack(obj) {
  obj.color1 = colors[0];
  obj.color2 = colors[1];
}//*/

function animate() {
    context.clearRect(0, 0, width, height);
    requestAnimationFrame(animate);

    balls.map((mol) => {
      mol.collision = false;
      mol.update();
      mol.bounce(bounds);

      balls.map((anotherMol) => {
        if (mol.index != anotherMol.index) {
          //Radials
          mol.rad.differenceVector(anotherMol.position, mol.position);
          anotherMol.rad.differenceVector(mol.position, anotherMol.position);

          //Tangents
          mol.tan.perpendicular(mol.rad);
          anotherMol.tan.perpendicular(anotherMol.rad);

          if ((mol.rad.magnitude - (2 * radius) < 0) ||
              (anotherMol.rad.magnitude - (2 * radius) < 0))
          {
            mol.collision = true;
            anotherMol.collision = true;
            //console.log(mol.index + " and " + anotherMol.index + " touched eachother, eww."); //Debug
          }

          mol.rad.magnitude = 1;
          anotherMol.rad.magnitude = 1;
          mol.tan.magnitude = 1;
          anotherMol.tan.magnitude = 1;
        }
      });

      mol.draw(context);
    });
}

animate();

function getRandomMin(min, max) {
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
