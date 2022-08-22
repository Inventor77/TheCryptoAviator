export default function Particle() {
	const particleGeometry = new THREE.TetrahedronGeometry(3, 0);
	var particleMaterial = new THREE.MeshPhongMaterial({
		color: 0x009999,
		shininess: 0,
		specular: 0xffffff,
		flatShading: true,
	});
	this.mesh = new THREE.Mesh(particleGeometry, particleMaterial);

	this.explode = function (pos, color, scale) {
		const _this = this;
		const _p = this.mesh.parent;
		this.mesh.material.color = new THREE.Color(color);
		this.mesh.material.needsUpdate = true;
		this.mesh.scale.set(scale, scale, scale);
		const targetX = pos.x + (-1 + Math.random() * 2) * 50;
		const targetY = pos.y + (-1 + Math.random() * 2) * 50;
		const speed = 0.6 + Math.random() * 0.2;
		TweenMax.to(this.mesh.rotation, speed, {
			x: Math.random() * 12,
			y: Math.random() * 12,
		});
		TweenMax.to(this.mesh.scale, speed, { x: 0.1, y: 0.1, z: 0.1 });
		TweenMax.to(this.mesh.position, speed, {
			x: targetX,
			y: targetY,
			delay: Math.random() * 0.1,
			ease: Power2.easeOut,
			onComplete: function () {
				if (_p) _p.remove(_this.mesh);
				_this.mesh.scale.set(1, 1, 1);
				particlesPool.unshift(_this);
			},
		});
	};
}