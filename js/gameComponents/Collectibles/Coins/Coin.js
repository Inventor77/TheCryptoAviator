export default function Coin() {
	const coinGeometry = new THREE.TetrahedronGeometry(5, 0);
	const coinMaterial = new THREE.MeshPhongMaterial({
		color: 0x009999,
		shininess: 0,
		specular: 0xffffff,
		shading: THREE.FlatShading,
	});
	this.mesh = new THREE.Mesh(coinGeometry, coinMaterial);
	this.mesh.castShadow = true;
	this.angle = 0;
	this.dist = 0;
};