import Sea from "./gameComponents/Sea.js";
import Sky from "./gameComponents/Sky.js";
import AirPlane from "./gameComponents/Plane/AirPlane.js";

// Container
const container = document.getElementById("world");

// Mouse Position
const mousePos = { x: 0, y: 0 };

// Scene
const scene = new THREE.Scene();

// Dimensions of Screen
let HEIGHT = window.innerHeight;
let WIDTH = window.innerWidth;
const aspectRatio = WIDTH / HEIGHT;

// Plane related variables
const fieldOfView = 60;
const nearPlane = 1;
const farPlane = 10000;

// Camera
const camera = new THREE.PerspectiveCamera(
	fieldOfView,
	aspectRatio,
	nearPlane,
	farPlane
);

// Position of the camera
camera.position.x = 0;
camera.position.z = 200;
camera.position.y = 100;

// Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

function handleWindowResize() {
	// Updating height and width of the renderer and the camera
	HEIGHT = window.innerHeight;
	WIDTH = window.innerWidth;
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

// Create Scene
function createScene() {
	// Fog effect
	scene.fog = new THREE.Fog(0xf7d9aa, 150, 800);

	renderer.setSize(WIDTH, HEIGHT);
	renderer.shadowMap.enabled = true;
	container.appendChild(renderer.domElement);

	window.addEventListener("resize", handleWindowResize, false);
}

// Light Variables
const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9); // the first parameter is the sky color, the second parameter is the ground color
const shadowLight = new THREE.DirectionalLight(0xffffff, 0.9); // The sun

// Create Lights
function createLights() {
	shadowLight.position.set(150, 350, 350);
	shadowLight.castShadow = true;
	shadowLight.shadow.camera.left = -400;
	shadowLight.shadow.camera.right = 400;
	shadowLight.shadow.camera.top = 400;
	shadowLight.shadow.camera.bottom = -400;
	shadowLight.shadow.camera.near = 1;
	shadowLight.shadow.camera.far = 1000;
	shadowLight.shadow.mapSize.width = 2048;
	shadowLight.shadow.mapSize.height = 2048;

	scene.add(hemisphereLight);
	scene.add(shadowLight);
}

// SEA
const sea = new Sea();
function createSea() {
	sea.mesh.position.y = -600;
	scene.add(sea.mesh);
}

// SKY
const sky = new Sky();
function createSky() {
	sky.mesh.position.y = -600;
	scene.add(sky.mesh);
}

// AIRPLANE
const airplane = new AirPlane();
function createPlane() {
	airplane.mesh.scale.set(0.25, 0.25, 0.25);
	airplane.mesh.position.y = 100;
	scene.add(airplane.mesh);
}

// Looping Animation
function loop() {
	// Sea animation
	sea.mesh.rotation.z += 0.003;
	// Sky animation
	sky.mesh.rotation.z += 0.01;

	// render the scene
	renderer.render(scene, camera);

	// Rotate the propeller, the sea and the sky
	airplane.rotate();

	// call the loop function again
	requestAnimationFrame(loop);
}

function initialize(event) {
	// Setup scene
	createScene();

	// Add lights
	createLights();

	// Add game components
	createSea();
	createSky();
	createPlane();

	// Loop that will update the objects' positions and render the scene on each frame
	loop();
}

window.addEventListener("load", initialize, false);
