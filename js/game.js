// Scene
const scene = new Three.Scene();

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

