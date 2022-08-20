import { Colors } from "../../utils/colors.js";
import Blade from "./Blade.js";

export default function Propeller() {
	this.mesh = new THREE.Object3D();

	const propellerGeometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
	const propellerMaterial = new THREE.MeshPhongMaterial({
		color: Colors.brown,
		shading: THREE.FlatShading,
	});
	const propeller = new THREE.Mesh(propellerGeometry, propellerMaterial);
	propeller.castShadow = true;
	propeller.receiveShadow = true;
	propeller.position.set(50, 0, 0);

	// blades
	const blade = new Blade();
    propeller.add(blade.mesh);
    
	this.mesh.add(propeller);
}
