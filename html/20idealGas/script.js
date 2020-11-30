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
let addVec = [ new Vector2d(1, 1), new Vector2d(1, 1), new Vector2d(1, 1) ];
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

function addVectors(posit, velocit) {
  let tempVec = new Vector2d(1, 1);
  tempVec.dx = velocit.dx;
  tempVec.dy = velocit.dy;
  tempVec.add(posit);
  return tempVec;
}

function changeMagnitude(molec, anotherMolec) {
  molec.rad.magnitude        = 1;
  anotherMolec.rad.magnitude = 1;
}

function changeRad(molec, anotherMolec) {
  //Radial Switch
  addVec[2] = new Vector2d(molec.rad.dx, molec.rad.dy);
  molec.rad.dx = anotherMolec.rad.dx;
  molec.rad.dy = anotherMolec.rad.dy;
  anotherMolec.rad.dx = addVec[2].dx;
  anotherMolec.rad.dy = addVec[2].dy;
}

function animate() {
    context.clearRect(0, 0, width, height);
    requestAnimationFrame(animate);

    balls.map((mol) => {
      mol.update();
      mol.bounce(bounds);

      balls.map((anotherMol) => {
        if (mol.index != anotherMol.index) {
          addVec[0] = new Vector2d(1, 1);
          addVec[1] = new Vector2d(1, 1);
          addVec[0] = addVectors(mol.position, mol.velocity);
          addVec[1].differenceVector(anotherMol.position, mol.position);

          if ((addVec[1].magnitude - (2 * radius)) <= 0) {
            //Radials
            mol.rad.dx        = addVec[1].dx;
            mol.rad.dy        = addVec[1].dy;
            anotherMol.rad.dx = -addVec[1].dx;
            anotherMol.rad.dy = -addVec[1].dy;

            changeMagnitude(mol, anotherMol);

            //Tangents
            mol.tan.perpendicular(mol.rad);
            anotherMol.tan.perpendicular(anotherMol.rad);

            changeRad(mol, anotherMol);

            //Change velocity


            //console.log(mol.index + " and " + anotherMol.index + " touched eachother, eww."); //Debug
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
