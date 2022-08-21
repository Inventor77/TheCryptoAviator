export default function Particle() {
	const particleGeometry = new THREE.TetrahedronGeometry(3, 0);
	var particleMaterial = new THREE.MeshPhongMaterial({
		color: 0x009999,
		shininess: 0,
		specular: 0xffffff,
		flatShading: true,
	});
	this.mesh = new THREE.Mesh(particleGeometry, particleMaterial);

    
}
