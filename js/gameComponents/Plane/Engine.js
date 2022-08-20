import { Colors } from "../../utils/colors.js";

export default function Engine() {
	this.mesh = new THREE.Object3D();

	const engineGeometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
	const engineMaterial = new THREE.MeshPhongMaterial({
		color: Colors.white,
		shading: THREE.FlatShading,
	});
	const engine = new THREE.Mesh(engineGeometry, engineMaterial);
	engine.position.x = 40;
	engine.castShadow = true;
	engine.receiveShadow = true;

	this.mesh.add(engine);
}
