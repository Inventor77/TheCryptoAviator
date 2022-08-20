import { Colors } from "../utils/colors.js";

export default function Sea() {
	// Cylinder Geometry;
	const seaGeometry = new THREE.CylinderGeometry(600, 600, 800, 40, 10); // the parameters are: radius top, radius bottom, height, number of segments on the radius, number of segments vertically
	// rotate the geometry on the x axis
	seaGeometry.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	// Material
	const seaMaterial = new THREE.MeshPhongMaterial({
		color: Colors.blue,
		transparent: true,
		opacity: 0.6,
		shading: THREE.FlatShading,
	});

	// Mesh
	this.mesh = new THREE.Mesh(seaGeometry, seaMaterial);

	// Allow the sea to receive shadows
	this.mesh.receiveShadow = true;
}
