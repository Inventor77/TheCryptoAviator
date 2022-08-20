import { Colors } from "../../utils/colors.js";

export default function Blade() {
	this.mesh = new THREE.Object3D();

	const bladeGeometry = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
	const bladeMaterial = new THREE.MeshPhongMaterial({
		color: Colors.brownDark,
		shading: THREE.FlatShading,
	});
	const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
	blade.position.set(8, 0, 0);
	blade.castShadow = true;
	blade.receiveShadow = true;

	this.mesh.add(blade);
}
