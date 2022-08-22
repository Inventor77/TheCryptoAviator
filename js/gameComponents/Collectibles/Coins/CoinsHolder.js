import Coin from "./Coin.js";
import { world } from "../../../constants/world.js";

export default function CoinsHolder(nCoins) {
	this.mesh = new THREE.Object3D();
	this.coinsInUse = [];
	this.coinsPool = [];
	for (let i = 0; i < nCoins; i++) {
		const coin = new Coin();
		this.coinsPool.push(coin);
	}

	this.spawnCoins = function () {
		const nCoins = 1 + Math.floor(Math.random() * 10);
		const d =
			world.seaRadius +
			world.planeDefaultHeight +
			(-1 + Math.random() * 2) * (world.planeAmpHeight - 20);
		const amplitude = 10 + Math.round(Math.random() * 10);
		for (let i = 0; i < nCoins; i++) {
			let coin;
			if (this.coinsPool.length) {
				coin = this.coinsPool.pop();
			} else {
				coin = new Coin();
			}
			this.mesh.add(coin.mesh);
			this.coinsInUse.push(coin);
			coin.angle = -(i * 0.02);
			coin.distance = d + Math.cos(i * 0.5) * amplitude;
			coin.mesh.position.y =
				-world.seaRadius + Math.sin(coin.angle) * coin.distance;
			coin.mesh.position.x = Math.cos(coin.angle) * coin.distance;
		}
	};

	this.rotateCoins = function (
		deltaTime,
		airplane,
		particlesHolder,
		particlesPool
	) {
		for (let i = 0; i < this.coinsInUse.length; i++) {
			let coin = this.coinsInUse[i];
			if (coin.exploding) continue;
			coin.angle += world.speed * deltaTime * world.coinsSpeed;
			if (coin.angle > Math.PI * 2) coin.angle -= Math.PI * 2;
			coin.mesh.position.y =
				-world.seaRadius + Math.sin(coin.angle) * coin.distance;
			coin.mesh.position.x = Math.cos(coin.angle) * coin.distance;
			coin.mesh.rotation.z += Math.random() * 0.1;
			coin.mesh.rotation.y += Math.random() * 0.1;

			const diffPos = airplane.mesh.position
				.clone()
				.sub(coin.mesh.position.clone());
			const d = diffPos.length();
			if (d < world.coinDistanceTolerance) {
				this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0]);
				this.mesh.remove(coin.mesh);
				particlesHolder.spawnParticles(
					coin.mesh.position.clone(),
					5,
					0x009999,
					0.8,
					particlesPool
				);
				// addEnergy();	
				i--;
			} else if (coin.angle > Math.PI) {
				this.coinsPool.unshift(this.coinsInUse.splice(i, 1)[0]);
				this.mesh.remove(coin.mesh);
				i--;
			}
		}
	};
}
