import Cockpit from "./Cockpit.js";
import Engine from "./Engine.js";
import Propeller from "./Propeller.js";
import SideWing from "./SideWing.js";
import Tail from "./Tail.js";

export default function AirPlane() {
	this.mesh = new THREE.Object3D();

	// Create the cabin
	const cockpit = new Cockpit();
	this.mesh.add(cockpit.mesh);

	// Create the engine
	const engine = new Engine();
	this.mesh.add(engine.mesh);

	// Create the tail
	const tail = new Tail();
	this.mesh.add(tail.mesh);

	// Create the wing
	const sideWing = new SideWing();
	this.mesh.add(sideWing.mesh);

	// propeller
	const propeller = new Propeller();
	this.mesh.add(propeller.mesh);

	this.rotate = () => (propeller.mesh.rotation.x += 0.3);
}
