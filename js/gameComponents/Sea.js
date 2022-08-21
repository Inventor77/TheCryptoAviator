import { Colors, COLOR_SEA_LEVEL } from "../utils/colors.js";
import { world } from "../contants/world.js";

export default function Sea() {
	// Cylinder Geometry;
	const seaGeometry = new THREE.CylinderGeometry(
		world.seaRadius,
		world.seaRadius,
		world.seaLength,
		40,
		10
	); // the parameters are: radius top, radius bottom, height, number of segments on the radius, number of segments vertically
	// rotate the geometry on the x axis
	seaGeometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	// Waves
	this.waves = [];
	const arr = seaGeometry.attributes.position.array;
	for (let i = 0; i < arr.length / 3; i++) {
		this.waves.push({
			x: arr[i * 3 + 0],
			y: arr[i * 3 + 1],
			z: arr[i * 3 + 2],
			ang: Math.random() * Math.PI * 2,
			amp:
				world.wavesMinAmp +
				Math.random() * (world.wavesMaxAmp - world.wavesMinAmp),
			speed:
				world.wavesMinSpeed +
				Math.random() * (world.wavesMaxSpeed - world.wavesMinSpeed),
		});
	}

	// Material
	const seaMaterial = new THREE.MeshPhongMaterial({
		color: COLOR_SEA_LEVEL[0],
		transparent: true,
		opacity: 0.8,
		flatShading: true,
	});

	// Mesh
	this.mesh = new THREE.Mesh(seaGeometry, seaMaterial);

	// Allow the sea to receive shadows
	this.mesh.receiveShadow = true;

	this.tick = (deltaTime) => {
		const arr = this.mesh.geometry.attributes.position.array;
		for (let i = 0; i < arr.length / 3; i++) {
			var wave = this.waves[i];
			arr[i * 3 + 0] = wave.x + Math.cos(wave.ang) * wave.amp;
			arr[i * 3 + 1] = wave.y + Math.sin(wave.ang) * wave.amp;
			wave.ang += wave.speed * deltaTime;
		}
		this.mesh.geometry.attributes.position.needsUpdate = true;
	};

	this.updateColor = () => {
		this.mesh.material = new THREE.MeshPhongMaterial({
			color: COLOR_SEA_LEVEL[3 % COLOR_SEA_LEVEL.length],
			transparent: true,
			opacity: 0.8,
			flatShading: true,
		});
	};
}
