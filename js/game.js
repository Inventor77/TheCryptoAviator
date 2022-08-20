// Container
const container = document.getElementById("world");

// Scene
const scene = new THREE.Scene();

// Dimensions of Screen
const HEIGHT = window.innerHeight;
const WIDTH = window.innerWidth;
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
	renderer.setSize(WIDTH, HEIGHT);
	camera.aspect = WIDTH / HEIGHT;
	camera.updateProjectionMatrix();
}

// Create Scene
function createScene() {
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

function initialize(event) {
	createScene();
}

window.addEventListener("load", initialize, false);
