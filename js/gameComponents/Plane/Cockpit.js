import { Colors } from "../../utils/colors.js";

export default function Cockpit() {
	this.mesh = new THREE.Object3D();

	const cockpitGeometry = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
	const cockpitMaterial = new THREE.MeshPhongMaterial({
		color: Colors.red,
		shading: THREE.FlatShading,
	});
	const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;

	this.mesh.add(cockpit);
}
