import Cloud from "./Cloud.js";
import { world } from "../constants/world.js";

export default function Sky() {
	// Empty container
	this.mesh = new THREE.Object3D();

	// Number of clouds to be scattered in the sky
	this.nClouds = 35;

	this.clouds = [];

	// Distributing Clouds consistently in uniform angle
	const stepAngle = (Math.PI * 2) / this.nClouds;

	// Clouds
	for (let i = 0; i < this.nClouds; i++) {
		const cloud = new Cloud();
		this.clouds.push(cloud);
		// Rotation and the Position of each cloud;
		const a = stepAngle * i; // Final angle of cloud
		const h = world.seaLength + Math.random() * 200; // Distance between the center of the axis and the cloud itself

		// Converting polar coordinates (angle, distance) into Cartesian coordinates (x, y)
		cloud.mesh.position.y = Math.sin(a) * h;
		cloud.mesh.position.x = Math.cos(a) * h;

		// Rotate the cloud according to its position
		cloud.mesh.rotation.z = a + Math.PI / 2;

		// Position the clouds at random depths inside of the scene
		cloud.mesh.position.z = -200 - Math.random() * 400;

		// Random scale for each cloud
		const s = 1 + Math.random() * 2;
		cloud.mesh.scale.set(s, s, s);

		// Adding mesh of each cloud in the scene
		this.mesh.add(cloud.mesh);

		this.moveClouds = (deltaTime) => {
			for (let i = 0; i < this.nClouds; i++) {
				const c = this.clouds[i];
				c.rotate();
			}
			this.mesh.rotation.z += world.speed * deltaTime;
		};
	}
}
