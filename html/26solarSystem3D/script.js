// Our Javascript will go here.
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loader = new THREE.TextureLoader();

let testGeo = new THREE.BoxGeometry(1, 1, 1);
let testMat = new THREE.MeshBasicMaterial({color:0xffffff, wireframe:true});
let testMesh = new THREE.Mesh(testGeo, testMat);

let sphereGeo = new THREE.SphereGeometry(0.8, 16, 16);
let earthMat = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
//let earthMat = new THREE.MeshLambertMaterial({ map: loader.load('textures/earth_day.jpg') }); //Doesn't work
let earth = new THREE.Mesh(sphereGeo, earthMat);

let directLight = new THREE.PointLight(0xffffff, 1, 100);
let earthShperical = new THREE.Spherical(2, Math.PI / 2, 1);

camera.position.z = 10;
camera.lookAt(new THREE.Vector3(0, 0, 0));
earth.position.x = 8;

scene.add(directLight);
scene.add(testMesh);
scene.add(earth);

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  testMesh.rotation.x += 0.01;
  testMesh.rotation.y += 0.01;

  earthShperical.theta += 0.01;
  earth.position.setFromSpherical(earthShperical);
  earth.rotation.y += 0.01;
}

animate();
