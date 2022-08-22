import Particle from "./Particle";

export default function ParticlesHolder() {
	this.mesh = new THREE.Object3D();
	this.particlesInUse = [];

	this.spawnParticles = function (pos, density, color, scale) {
		const nPArticles = density;
		for (let i = 0; i < nPArticles; i++) {
			let particle;
			if (particlesPool.length) {
				particle = particlesPool.pop();
			} else {
				particle = new Particle();
			}
			this.mesh.add(particle.mesh);
			particle.mesh.visible = true;
			const _this = this;
			particle.mesh.position.y = pos.y;
			particle.mesh.position.x = pos.x;
			particle.explode(pos, color, scale);
		}
	};
}
