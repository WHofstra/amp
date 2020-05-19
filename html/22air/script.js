const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let air = initDots();

let rowX = 9,
  amount = 40,
distance = 120,
  beginX = 40,
  beginY = 40;

function initDots()
{
  let dots = [];

  for (let i = 0; i < amount; i++) {
    let x = beginX + i % rowX * distance;
    let y = beginY + Math.floor(i / rowX) * distance;
    let randMass = getRandomMin(1, 5);

    let A = new DPoint(new Vector2d(x, y), 20,
    getRandomColor(), getRandomColor(),
    new Vector2d(getRandomMin(-1, 1) * 50, getRandomMin(-1, 1) * 50), new Vector2d(0, 0));
    A.index = i;
    A.mass = randMass;
    dots.push(A);
  }
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0, 0, width, height);

  air.map((mol) => {
    //mol.update();
    air.map((anotherMol) => {
      if (mol.index != anotherMol.index) {
        let distance = new Vector2d(1, 1);
        //distance.differenceVector(anotherMol.position, mol.position);
        //distance.add(mol.velocity);
        //distance.add(anotherMol.velocity);

        if (distance.magnitude < mol.radius + anotherMol.radius) {
          //console.log("Collision: { " + mol.index + ", " + anotherMol.index + "}" );
          //mol.rad.equals(distance);
          //anotherMol.rad.equals(distance);

          //mol.tan.perpendicular(mol.rad);
          //anotherMol.tan.perpendicular(anotherMol.rad);

          //mol.rad.magnitude = mol.rad.dot(mol.velocity);
          //anotherMol.rad.magnitude = anotherMol.rad.dot(anotherMol.velocity);

          //let massSum = mol.mass + anotherMol.mass;
          //let massAB = mol.mass - anotherMol.mass;
          //let massBA = anotherMol.mass - mol.mass;

          //let P = new Vector2d(0, 0);// P.equals(massAB / massSum);
          //let Q = new Vector2d(0, 0);// Q.equals(2 * anotherMol.mass / massSum);
          //let R = new Vector2d(0, 0);// R.equals(2 * mol.mass / massSum);
          //let S = new Vector2d(0, 0);// S.equals(massBA / massSum);

          //mol.rad.sum(P, Q);
          //anotherMol.rad.sum(R, S);

          //mol.vel.sum(mol.rad, mol.tan);
          //anotherMol.vel.sum(anotherMol.rad, anotherMol.tan);
        }
      }
    });
    mol.draw(context);
  });
}

animate();

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
