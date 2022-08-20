import { Colors } from "../../utils/colors.js";

export default function Tail() {
	this.mesh = new THREE.Object3D();

	const tailGeometry = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
	const tailMaterial = new THREE.MeshPhongMaterial({
		color: Colors.red,
		shading: THREE.FlatShading,
	});
	const tail = new THREE.Mesh(tailGeometry, tailMaterial);
	tail.position.set(-35, 25, 0);
	tail.castShadow = true;
	tail.receiveShadow = true;

	this.mesh.add(tail);
}
