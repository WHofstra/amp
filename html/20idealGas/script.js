const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let bounds = new Vector2d(canvas.width, canvas.height);

let amount = 36,
      rowX = 9,
    radius = 30,
rowDistance = 3.5 * radius,
    beginX = 2 * radius,
    beginY = 2 * radius;

let dots = [];
let colors = [ getRandomColor(), getRandomColor() ];
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
                     new Vector2d(getRandomMin(-10, 10) * 50, getRandomMin(-10, 10) * 50),
                     new Vector2d(0, 0));
  A.rad = new Vector2d(1, 1);
  A.tan = new Vector2d(1, 1);
  A.collision = false;
  A.index = ind;

  array.push(A);
  return array;
}

function changeMagnitude(molec, anotherMolec) {
  molec.rad.magnitude        = 0.5;
  anotherMolec.rad.magnitude = 0.5;
  molec.tan.magnitude        = 0.5;
  anotherMolec.tan.magnitude = 0.5;

  molec.rad.magnitude        = molec.velocity.dot(molec.rad);
  anotherMolec.rad.magnitude = anotherMolec.velocity.dot(anotherMolec.rad);
  molec.tan.magnitude        = molec.velocity.dot(molec.tan);
  anotherMolec.tan.magnitude = anotherMolec.velocity.dot(anotherMolec.tan);
}

function changeVelocity(molec, anotherMolec) {
  let tempRad = [ molec.velocity.dx, molec.velocity.dy ];

  //Radial Switch
  molec.rad.dx = anotherMolec.rad.dx;
  molec.rad.dy = anotherMolec.rad.dy;
  anotherMolec.rad.dx = tempRad[0];
  anotherMolec.rad.dy = tempRad[1];

  //Velocity Change
  molec.velocity.dx        = (molec.rad.dx + molec.tan.dx);
  molec.velocity.dy        = (molec.rad.dy + molec.tan.dy);
  anotherMolec.velocity.dx = (anotherMolec.rad.dx + anotherMolec.tan.dx);
  anotherMolec.velocity.dy = (anotherMolec.rad.dy + anotherMolec.tan.dy);
}

function animate() {
    context.clearRect(0, 0, width, height);
    requestAnimationFrame(animate);

    balls.map((mol) => {
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
          } else {
            mol.collision = false;
            anotherMol.collision = false;
          }

          changeMagnitude(mol, anotherMol);

          if (mol.collision || anotherMol.collision)
          {
            changeVelocity(mol, anotherMol);
          }
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
