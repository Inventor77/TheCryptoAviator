import Sea from "./gameComponents/Sea.js";
import Sky from "./gameComponents/Sky.js";
import AirPlane from "./gameComponents/Plane/AirPlane.js";
import { world } from "./constants/world.js";

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
const nearPlane = 0.1;
const farPlane = 10000;

// Game Variables
let newTime = new Date().getTime();
let oldTime = new Date().getTime();

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
camera.position.y = world.planeDefaultHeight;

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
const ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);

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
	scene.add(ambientLight);
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

function updatePlane() {
	const targetX = normalize(mousePos.x, -1, 1, -100, 100); // To move airplane between -100 and 100 on the horizontal axis
	const targetY = normalize(mousePos.y, -1, 1, 25, 175); // between 25 and 175 on the vertical axis

	// update the airplane's position
	airplane.mesh.position.y += (targetY - airplane.mesh.position.y) * 0.1;
	airplane.mesh.rotation.z = (targetY - airplane.mesh.position.y) * 0.0128;
	airplane.mesh.rotation.x = (airplane.mesh.position.y - targetY) * 0.0064;
	// Rotate the propeller, the sea and the sky
	airplane.rotate();
}

function normalize(v, vmin, vmax, tmin, tmax) {
	const nv = Math.max(Math.min(v, vmax), vmin);
	const dv = vmax - vmin;
	const pc = (nv - vmin) / dv;
	const dt = tmax - tmin;
	const tv = tmin + pc * dt;
	return tv;
}

// Looping Animation
function loop() {
	newTime = new Date().getTime();
	const deltaTime = newTime - oldTime;
	oldTime = newTime;

	// Sea animation
	sea.mesh.rotation.z += 0.003;
	if (sea.mesh.rotation.z > 2 * Math.PI) {
		sea.mesh.rotation.z -= 2 * Math.PI;
	}
	sea.tick(deltaTime);
	sea.updateColor();

	// Sky animation
	sky.mesh.rotation.z += 0.01;
	
	// Updated Plane movements
	updatePlane();

	// Cloud movement
	sky.moveClouds(deltaTime);

	// render the scene
	renderer.render(scene, camera);

	// call the loop function again
	requestAnimationFrame(loop);
}

function handleMouseMove(event) {
	const tx = -1 + (event.clientX / WIDTH) * 2; // The horizontal axis
	const ty = 1 - (event.clientY / HEIGHT) * 2; // The vertical axis

	mousePos.x = tx;
	mousePos.y = ty;
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

	//  Capture Mouse Movement
	document.addEventListener("mousemove", handleMouseMove, false);

	// Loop that will update the objects' positions and render the scene on each frame
	loop();
}

window.addEventListener("load", initialize, false);
