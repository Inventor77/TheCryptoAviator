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

function initialize(event) {
	createScene();
}

window.addEventListener("load", initialize, false);
