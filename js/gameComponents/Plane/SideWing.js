import { Colors } from "../../utils/colors.js";

export default function SideWing() {
	this.mesh = new THREE.Object3D();

	const sideWingGeometry = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
	const sideWingMaterial = new THREE.MeshPhongMaterial({
		color: Colors.red,
		shading: THREE.FlatShading,
	});
	const sideWing = new THREE.Mesh(sideWingGeometry, sideWingMaterial);
	sideWing.castShadow = true;
	sideWing.receiveShadow = true;

	this.mesh.add(sideWing);
}
