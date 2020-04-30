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
let addVec = [ new Vector2d(0, 0), new Vector2d(0, 0) ];
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

/*
function addVectors(vector, posit, velocit) {
  vector.dx = velocit.dx;
  vector.dy = velocit.dy;
  vector.add(posit);
  return vector;
}//*/

function changeMagnitude(molec) {
  molec.rad.magnitude        = 1;
  molec.tan.magnitude        = 1;

  molec.rad.magnitude        = molec.velocity.dot(molec.rad);
  molec.tan.magnitude        = molec.velocity.dot(molec.tan);
}

function changeVelocity(molec) {
    //Radial Switch
  molec.rad.dx *= -1;// anotherMolec.rad.dx;
  molec.rad.dy *= -1;// anotherMolec.rad.dy;
  //anotherMolec.rad.dx = tempRad[0];
  //anotherMolec.rad.dy = tempRad[1];

  //Velocity Change
  molec.velocity = new Vector2d(0, 0);
  molec.velocity.add(molec.rad);
  molec.velocity.add(molec.tan);
}

function animate() {
    context.clearRect(0, 0, width, height);
    requestAnimationFrame(animate);

    balls.map((mol) => {
      mol.update();
      mol.bounce(bounds);

      balls.map((anotherMol) => {
        if (mol.index != anotherMol.index) {
          //addVec[0] = addVectors(addVec[0], mol.position, mol.velocity);
          //addVec[1] = addVectors(addVec[1], anotherMol.position, anotherMol.velocity);

          //Radials
          //mol.rad.differenceVector(addVec[1], addVec[0]);
          //anotherMol.rad.differenceVector(addVec[0], addVec[1]);
          mol.rad.differenceVector(anotherMol.position, mol.position);
          anotherMol.rad.differenceVector(mol.position, anotherMol.position);

          //Tangents
          mol.tan.perpendicular(mol.rad);

          if (((mol.rad.magnitude - (2 * radius)) <= 0) ||
              ((anotherMol.rad.magnitude - (2 * radius)) <= 0))
          {
            mol.collision        = true;
            anotherMol.collision = true;
            //console.log(mol.index + " and " + anotherMol.index + " touched eachother, eww."); //Debug
          }
          else {
            mol.collision        = false;
            anotherMol.collision = false;
          }
        }
      });
      changeMagnitude(mol);

      if (mol.collision)
      {
        changeVelocity(mol);
      }

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
