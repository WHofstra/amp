const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let atom = [,];
let bounds = new Vector2d(width, height);

function setup() {
  atom[0] = initPart(1, 30, 300.0); //Core (protons and neutrons)
  atom[1] = initPart(3, 10, 100.0); //Electrons

  //Set properties
  atom[1] = setParent(atom[1], atom[0][0]);
  atom[0][0].velocity = new Vector2d(0, 0);
  atom[1][0].position.dx += 100;
  atom[1][1].position.dx += 105 + atom[1][0].radius + atom[1][1].radius;
  atom[1][2].position.dx += 110 + atom[1][1].radius + atom[1][2].radius;

  console.log(atom);
}

function initPart(amount, radius, mass) {
  let array = [];

  for (let i = 0; i < amount; i++) {
    let part = new DPoint(new Vector2d(width / 2, height / 2), radius, getRandomColor(), getRandomColor(),
                          new Vector2d(getRandomMin(-10, 10) * 100, getRandomMin(-10, 10) * 100), new Vector2d(0, 0));
    part.mass = mass;
    array.push(part);
  }
  return array;
}

function setParent(list, parentToSet) {
  for (let i = 0; i < list.length; i++) {
    list[i].parent = parentToSet;
  }
  return list;
}

function setDifferenceTo(thisPos, parentPos) {
  let diff = new Vector2d(thisPos.dx - parentPos.dx, thisPos.dy - parentPos.dy);
  return diff;
}

function setAccelleration(diff, mass, parentMass) {
  let tempMagn = new Vector2d(parentMass - mass, parentMass - parentMass);
  let acVec = new Vector2d((-diff.dx / 2) * (tempMagn.magnitude / 5),
                           (-diff.dy / 2) * (tempMagn.magnitude / 5));
  return acVec;
}

/*
function checkCollision(ball){
  if (dot.difference.magnitude <= (dot.parent.radius + dot.radius))
  {
    dot.rad = new Vector2d(0, 0);
    dot.parent.rad = new Vector2d(0, 0);
    dot.tan = new Vector2d(0, 0);
    dot.parent.tan = new Vector2d(0, 0);

    dot.rad.equals(dot.difference);
    dot.parent.rad.equals(dot.difference);
    dot.parent.rad *= -1;
    dot.rad.magnitude = 1;
    dot.parent.rad.magnitude = 1;

    dot.tan.perpendicular(dot.rad);
    dot.parent.tan.perpendicular(dot.parent.rad);

    dot.rad.magnitude = dot.rad.dot(new Vector2d(dot.velocity.dx + dot.accell.dx, dot.velocity.dy + dot.accell.dy));
    dot.parent.rad.magnitude = dot.parent.rad.dot(new Vector2d(dot.parent.velocity.dx + dot.parent.accell.dx, dot.parent.velocity.dy + dot.parent.accell.dy));

    let tempRad = new Vector2d(0, 0);
    tempRad.equals(dot.parent.rad);
    dot.parent.rad.equals(dot.rad);
    dot.rad.equals(tempRad);

    dot.velocity.equals(dot.tan);
    dot.velocity.add(dot.rad);
  }
}//*/

function animate(){
  context.clearRect(0, 0, width, height);
  requestAnimationFrame(animate);

  //*
  atom[1].map((dot)=>{
    if (dot.parent != null) {
      dot.difference = setDifferenceTo(dot.position, dot.parent.position);
      dot.accell = setAccelleration(dot.difference, dot.mass, dot.parent.mass);
    }
  });//*/

  for (let i = 0; i < atom.length; i++) {
    atom[i].map((dot)=>{
      dot.bounce(bounds);
      dot.update();
      dot.draw(context);
    });
  }
}

setup();
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
