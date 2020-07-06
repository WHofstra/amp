const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let scale = 0.55; //To zoom in or out
let hierarchy = [,];

function setup(){
  //Initialize main astronomical objects in the Solar System
  hierarchy[0] = initRocks(1, 40); //Sun
  hierarchy[1] = initRocks(9, 10); //Planets + Pluto
  hierarchy[2] = initRocks(1, 5); //Earth's satellite (Moon)
  hierarchy[3] = initRocks(2, 5); //Mars' satellites
  hierarchy[4] = initRocks(4, 5); //Jupiter's satellites
  hierarchy[5] = initRocks(8, 5); //Saturn's satellites
  hierarchy[6] = initRocks(5, 5); //Uranus' satellites
  hierarchy[7] = initRocks(1, 5); //Neptune's satellite (Triton)
  hierarchy[8] = initRocks(1, 5); //Pluto's satellite (Charon)

  initNames();
  setSizes();
  setColors();
  setSpeed();

  //Assign parents to objects, the Sun does not have one
  hierarchy[1] = setParentTo(hierarchy[1], hierarchy[0][0]); //Planets to Sun
  for (let i = 2; i < hierarchy.length; i++) {
    hierarchy[i] = setParentTo(hierarchy[i], hierarchy[1][i]); //Satellites to planets
  }

  setDistances();
}

function initNames() {
  //Naming and tagging
  hierarchy[0][0].char = "☉ Sun";
  hierarchy[1][0].char = "☿ Mercury";
  hierarchy[1][1].char = "♀︎ Venus";
  hierarchy[1][2].char = "⊕ Earth";
  hierarchy[1][3].char = "♂ Mars";
  hierarchy[1][4].char = "♃ Jupiter";
  hierarchy[1][5].char = "♄ Saturn";
  hierarchy[1][6].char = "⛢ Uranus";
  hierarchy[1][7].char = "♆ Neptune";
  hierarchy[1][8].char = "♇ Pluto";
  /*
  hierarchy[2][0].char = "☾ Moon";
  hierarchy[3][0].char = "Phobos";
  hierarchy[3][1].char = "Deimos";
  hierarchy[4][0].char = "Io";
  hierarchy[4][1].char = "Europa";
  hierarchy[4][2].char = "Ganymede";
  hierarchy[4][3].char = "Callisto";
  hierarchy[5][0].char = "Mimas";
  hierarchy[5][1].char = "Enceladus";
  hierarchy[5][2].char = "Tethys";
  hierarchy[5][3].char = "Dione";
  hierarchy[5][4].char = "Rhea";
  hierarchy[5][5].char = "Titan";
  hierarchy[5][6].char = "Hyperion";
  hierarchy[5][7].char = "Iapetus";
  hierarchy[6][0].char = "Miranda";
  hierarchy[6][1].char = "Ariel";
  hierarchy[6][2].char = "Umbriel";
  hierarchy[6][3].char = "Titania";
  hierarchy[6][4].char = "Oberon";
  hierarchy[7][0].char = "Triton";
  hierarchy[8][0].char = "Charon";//*/
}

function setSizes() {
  //Set sizes
  hierarchy[1][0].radius = 7 * scale;
  hierarchy[1][3].radius = 9 * scale;
  hierarchy[3][0].radius = 3 * scale;
  hierarchy[3][1].radius = 3 * scale;
  hierarchy[1][4].radius = 20 * scale;
  hierarchy[1][5].radius = 20 * scale;
  hierarchy[5][0].radius = 4 * scale;
  hierarchy[5][1].radius = 4 * scale;
  hierarchy[5][2].radius = 4 * scale;
  hierarchy[5][3].radius = 4 * scale;
  hierarchy[5][4].radius = 4 * scale;
  hierarchy[5][6].radius = 4 * scale;
  hierarchy[5][7].radius = 4 * scale;
  hierarchy[1][6].radius = 15 * scale;
  hierarchy[6][0].radius = 4 * scale;
  hierarchy[6][1].radius = 4 * scale;
  hierarchy[6][2].radius = 4 * scale;
  hierarchy[6][3].radius = 4 * scale;
  hierarchy[6][4].radius = 4 * scale;
  hierarchy[1][7].radius = 15 * scale;
  hierarchy[1][8].radius = 5 * scale;
  hierarchy[8][0].radius = 4 * scale;
}

function setColors() {
  //Set colors
  hierarchy[0][0].color1 = "#FDD700"; //Sun
  hierarchy[0][0].color2 = "#FD3300";
  hierarchy[1][0].color1 = "#FFE2A6"; //Mercury
  hierarchy[1][0].color2 = "#6C6895";
  hierarchy[1][1].color1 = "#FD9800"; //Venus
  hierarchy[1][1].color2 = "#BB3800";
  hierarchy[1][2].color1 = "#0107FC"; //Earth
  hierarchy[1][2].color2 = "#CBF037";
  hierarchy[2][0].color1 = "#DBDDF0"; //Moon
  hierarchy[2][0].color2 = "#ACB0E6";
  hierarchy[1][3].color1 = "#DC3214"; //Mars
  hierarchy[1][3].color2 = "#FF673C";
  hierarchy[3][0].color1 = "#E48D58"; //Phobos
  hierarchy[3][0].color2 = "#ACB0E6";
  hierarchy[3][1].color1 = "#E48D58"; //Deimos
  hierarchy[3][1].color2 = "#E7EAF1";
  hierarchy[1][4].color1 = "#FDD8B3"; //Jupiter
  hierarchy[1][4].color2 = "#E48D58";
  hierarchy[4][0].color1 = "#A46715"; //Io
  hierarchy[4][0].color2 = "#FFF542";
  hierarchy[4][1].color1 = "#D2E8FF"; //Europa
  hierarchy[4][1].color2 = "#DC3214";
  hierarchy[4][2].color1 = "#3300FD"; //Ganymede
  hierarchy[4][2].color2 = "#3A9300";
  hierarchy[4][3].color1 = "#0107FC"; //Callisto
  hierarchy[4][3].color2 = "#FDD700";
  hierarchy[1][5].color1 = "#FFF259"; //Saturn
  hierarchy[1][5].color2 = "#FDD8B3";
  hierarchy[5][0].color1 = "#DBDDF0"; //Mimas
  hierarchy[5][0].color2 = "#ACB0E6";
  hierarchy[5][1].color1 = "#D2E8FF"; //Enceladus
  hierarchy[5][1].color2 = "#84A9FF";
  hierarchy[5][2].color1 = "#DBDDF0"; //Tethys
  hierarchy[5][2].color2 = "#ACB0E6";
  hierarchy[5][3].color1 = "#DBDDF0"; //Dione
  hierarchy[5][3].color2 = "#ACB0E6";
  hierarchy[5][4].color1 = "#DBDDF0"; //Rhea
  hierarchy[5][4].color2 = "#ACB0E6";
  hierarchy[5][5].color1 = "#00FD85"; //Titan
  hierarchy[5][5].color2 = "#FDD700";
  hierarchy[5][6].color1 = "#DBDDF0"; //Hyperion
  hierarchy[5][6].color2 = "#ACB0E6";
  hierarchy[5][7].color1 = "#E7EAF1"; //Iapetus
  hierarchy[5][7].color2 = "#60460B";
  hierarchy[1][6].color1 = "#D2E8FF"; //Uranus
  hierarchy[1][6].color2 = "#84A9FF";
  hierarchy[6][0].color1 = "#DBDDF0"; //Miranda
  hierarchy[6][0].color2 = "#ACB0E6";
  hierarchy[6][1].color1 = "#DBDDF0"; //Ariel
  hierarchy[6][1].color2 = "#ACB0E6";
  hierarchy[6][2].color1 = "#DBDDF0"; //Umbriel
  hierarchy[6][2].color2 = "#ACB0E6";
  hierarchy[6][3].color1 = "#DBDDF0"; //Titania
  hierarchy[6][3].color2 = "#ACB0E6";
  hierarchy[6][4].color1 = "#DBDDF0"; //Oberon
  hierarchy[6][4].color2 = "#ACB0E6";
  hierarchy[1][7].color1 = "#3960FB"; //Neptune
  hierarchy[1][7].color2 = "#0107FC";
  hierarchy[7][0].color1 = "#D2E8FF"; //Triton
  hierarchy[7][0].color2 = "#84A9FF";
  hierarchy[1][8].color1 = "#590000"; //Pluto
  hierarchy[1][8].color2 = "#D6D3A3";
  hierarchy[8][0].color1 = "#DBDDF0"; //Charon
  hierarchy[8][0].color2 = "#ACB0E6";
}

function setDistances() {
  //Set distances
  hierarchy[1][0].position.dx += (width * 5/234 * scale) + setPositionOffset(hierarchy[1][0], 0);
  hierarchy[1][1].position.dx += (width * 5/78 * scale)  + setPositionOffset(hierarchy[1][1], 0);
  hierarchy[1][2].position.dx += (width * 5/39 * scale)  + setPositionOffset(hierarchy[1][2], 0);
  hierarchy[2][0].position.dx += (width * 5/39 * scale)  + setPositionOffset(hierarchy[2][0], 0);
  hierarchy[1][3].position.dx += (width * 5/26 * scale)  + setPositionOffset(hierarchy[1][3], 0);
  hierarchy[3][0].position.dx += (width * 5/26 * scale)  + setPositionOffset(hierarchy[3][0], 0);
  hierarchy[3][1].position.dx += (width * 5/26 * scale)  + setPositionOffset(hierarchy[3][1], 1);
  hierarchy[1][4].position.dx += (width * 15/52 * scale) + setPositionOffset(hierarchy[1][4], 0);
  hierarchy[4][0].position.dx += (width * 15/52 * scale) + setPositionOffset(hierarchy[4][0], 0);
  hierarchy[4][1].position.dx += (width * 15/52 * scale) + setPositionOffset(hierarchy[4][1], 1);
  hierarchy[4][2].position.dx += (width * 15/52 * scale) + setPositionOffset(hierarchy[4][2], 2);
  hierarchy[4][3].position.dx += (width * 15/52 * scale) + setPositionOffset(hierarchy[4][3], 3);
  hierarchy[1][5].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[1][5], 0);
  hierarchy[5][0].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[5][0], 0);
  hierarchy[5][1].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[5][1], 1);
  hierarchy[5][2].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[5][2], 2);
  hierarchy[5][3].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[5][3], 3);
  hierarchy[5][4].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[5][4], 4);
  hierarchy[5][5].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[5][5], 5);
  hierarchy[5][6].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[5][6], 6);
  hierarchy[5][7].position.dx += (width * 35/78 * scale) + setPositionOffset(hierarchy[5][7], 7);
  hierarchy[1][6].position.dx += (width * 15/26 * scale) + setPositionOffset(hierarchy[1][6], 0);
  hierarchy[6][0].position.dx += (width * 15/26 * scale) + setPositionOffset(hierarchy[6][0], 0);
  hierarchy[6][1].position.dx += (width * 15/26 * scale) + setPositionOffset(hierarchy[6][1], 1);
  hierarchy[6][2].position.dx += (width * 15/26 * scale) + setPositionOffset(hierarchy[6][2], 2);
  hierarchy[6][3].position.dx += (width * 15/26 * scale) + setPositionOffset(hierarchy[6][3], 3);
  hierarchy[6][4].position.dx += (width * 15/26 * scale) + setPositionOffset(hierarchy[6][4], 4);
  hierarchy[1][7].position.dx += (width * 55/78 * scale) + setPositionOffset(hierarchy[1][7], 0);
  hierarchy[7][0].position.dx += (width * 55/78 * scale) + setPositionOffset(hierarchy[7][0], 0);
  hierarchy[1][8].position.dx += (width * 5/6 * scale)   + setPositionOffset(hierarchy[1][8], 0);
  hierarchy[8][0].position.dx += (width * 5/6 * scale)   + setPositionOffset(hierarchy[8][0], 0);
}

function setSpeed() {
  //Set velocity at which the body is orbiting around the parent
  hierarchy[1][0].speed = 47/12;
  hierarchy[1][1].speed = 35/12;
  hierarchy[1][2].speed = 5/2;
  hierarchy[1][3].speed = 2;
  hierarchy[1][4].speed = 13/12;
  hierarchy[1][5].speed = 5/6;
  hierarchy[1][6].speed = 7/12;
  hierarchy[1][7].speed = 5/12;
  hierarchy[1][8].speed = 5/12;
  hierarchy[2][0].speed = 1/12;
  hierarchy[3][0].speed = 1/6;
  hierarchy[3][1].speed = 1/12;
  hierarchy[4][0].speed = 17/12;
  hierarchy[4][1].speed = 7/6;
  hierarchy[4][2].speed = 11/12;
  hierarchy[4][3].speed = 2/3;
  hierarchy[5][0].speed = 7/6;
  hierarchy[5][1].speed = (getRandomMin(1, 100) * 0.01)/12; //Orbital speed unknown
  hierarchy[5][2].speed = 11/12;
  hierarchy[5][3].speed = (getRandomMin(1, 100) * 0.01)/12; //Orbital speed unknown
  hierarchy[5][4].speed = 2/3;
  hierarchy[5][5].speed = 1/2;
  hierarchy[5][6].speed = (getRandomMin(1, 100) * 0.01)/12; //Orbital speed unknown
  hierarchy[5][7].speed = 1/4;
  hierarchy[6][0].speed = 7/12;
  hierarchy[6][1].speed = 1/2;
  hierarchy[6][2].speed = 5/12;
  hierarchy[6][3].speed = 1/3;
  hierarchy[6][4].speed = 1/4;
  hierarchy[7][0].speed = -(hierarchy[1][7].speed + 1/3); //Retrograde orbit
  hierarchy[8][0].speed = 1/24;
}

function initRocks(amount, rad) {
  let rocks = [];
  let rock;

  for (let i = 0; i < amount; i++) {
    rock = new Point(new Vector2d(width * 1/2, height * 1/2),
                         rad * scale, getRandomColor(), getRandomColor(), '',
                         false, "#FFFFFF");
    rocks.push(rock);
  }

  return rocks;
}

function setParentTo(list, parentToSet) {
  for (let i = 0; i < list.length; i++){
    list[i].parent = parentToSet;
  }
  return list;
}

function setPositionOffset(planet, index)
{
  let dist = 0;
  if (planet.parent.parent != null) {
    dist = (9 * (index) + 5 + planet.parent.radius * 2.5 +
            planet.parent.parent.radius) * 1.5 * scale;
  }
  else {
    dist = (planet.radius + planet.parent.radius) * 1.5 * scale;
  }
  return dist;
}

function setDifferenceTo(thisPos, parentPos){
  let diff = new Vector2d(thisPos.dx - parentPos.dx, thisPos.dy - parentPos.dy);
  return diff;
}

function animate(){
  context.clearRect(0, 0, width, height);
  requestAnimationFrame(animate);

   hierarchy[1].map((dot) => {
     if (dot.parent != null)
     {
       dot.difference = setDifferenceTo(dot.position, dot.parent.position);
       dot.difference.angle -= (0.0005 * dot.speed);
       dot.difference.add(dot.parent.position);
       dot.position.equals(dot.difference);
     }
   });

   for (let i = 2; i < hierarchy.length; i++)
   {
     hierarchy[i].map((dot) => {
       if (dot.parent != null)
       {
         dot.difference = setDifferenceTo(dot.position, dot.parent.position);
         dot.difference.angle -= ((0.1 * dot.parent.speed) + (0.1 * dot.speed));
         dot.difference.add(dot.parent.position);
         dot.position.equals(dot.difference);
       }
     });
   }

   for (let i = 0; i < hierarchy.length; i++)
   {
     hierarchy[i].map((dot) => {
       dot.draw(context);
     });
   }
}

setup();
animate();

function getRandom(max) {
  return Math.floor(Math.random()*max);
}

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
