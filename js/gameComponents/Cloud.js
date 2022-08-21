import { Colors } from "../utils/colors.js";

export default function Cloud() {
	// Empty container to hold the different parts of the cloud
	this.mesh = new THREE.Object3D();

	// Cube geometry;
	const cube = new THREE.BoxGeometry(20, 20, 20); // this shape will be duplicated to create the cloud

	// Material
	const material = new THREE.MeshPhongMaterial({
		color: Colors.white,
	});

	// duplicate the geometry a random number of times
	const nBlocks = 5 + Math.floor(Math.random() * 5);
	for (let i = 0; i < nBlocks; i++) {
		// Mesh
		const m = new THREE.Mesh(cube, material);

		// The position and the rotation of each cube randomly
		m.position.x = i * 8;
		m.position.y = Math.random() * 10;
		m.position.z = Math.random() * 10;
		m.rotation.z = Math.random() * Math.PI * 2;
		m.rotation.y = Math.random() * Math.PI * 2;

		//  Size of the cube
		const s = 0.1 + Math.random() * 0.9;
		m.scale.set(s, s, s);

		// Cast and to Receive shadows
		m.castShadow = true;
		m.receiveShadow = true;

		// Add the cube to the container we first created
		this.mesh.add(m);

		this.rotate = () => {
			const l = this.mesh.children.length;
			for (let i = 0; i < l; i++) {
				const m = this.mesh.children[i];
				m.rotation.z += Math.random() * 0.005 * (i + 1);
				m.rotation.y += Math.random() * 0.002 * (i + 1);
			}
		}
	}
}
