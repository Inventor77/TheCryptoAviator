import { Colors } from "../../../utils/colors";

export default function Obstacle() {
	const obstacleGeometry = new THREE.TetrahedronGeometry(8, 2);
	const obstacleMaterial = new THREE.MeshPhongMaterial({
		color: Colors.red,
		shininess: 0,
		specular: 0xffffff,
		flatShading: true,
	});
	this.mesh = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
	this.mesh.castShadow = true;
	this.angle = 0;
	this.dist = 0;
};
