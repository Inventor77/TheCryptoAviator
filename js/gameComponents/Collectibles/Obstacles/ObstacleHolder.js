import Obstacle from "./Obstacle.js";
import { world } from "../../../constants/world.js";
import { Colors } from "../../../utils/colors.js";

export default function ObstacleHolder() {
	this.mesh = new THREE.Object3D();
    this.obstaclesInUse = [];
    
    this.spawnObstacles = function (obstaclesPool) {
			const nObstacles = world.level;
			for (let i = 0; i < nObstacles; i++) {
				let obstacle;
				if (obstaclesPool.length) {
					obstacle = obstaclesPool.pop();
				} else {
					obstacle = new Obstacle();
				}

				obstacle.angle = -(i * 0.1);
				obstacle.distance =
					world.seaRadius +
					world.planeDefaultHeight +
					(-1 + Math.random() * 2) * (world.planeAmpHeight - 20);
				obstacle.mesh.position.y =
					-world.seaRadius + Math.sin(obstacle.angle) * obstacle.distance;
				obstacle.mesh.position.x = Math.cos(obstacle.angle) * obstacle.distance;

				this.mesh.add(obstacle.mesh);
				this.obstaclesInUse.push(obstacle);
			}
		};
    
    this.rotateObstacles = function (
			deltaTime,
			airplane,
			particlesHolder,
			obstaclesPool
		) {
			for (let i = 0; i < this.obstaclesInUse.length; i++) {
				const obstacle = this.obstaclesInUse[i];
				obstacle.angle += world.speed * deltaTime * world.obstaclesSpeed;

				if (obstacle.angle > Math.PI * 2) obstacle.angle -= Math.PI * 2;

				obstacle.mesh.position.y =
					-world.seaRadius + Math.sin(obstacle.angle) * obstacle.distance;
				obstacle.mesh.position.x = Math.cos(obstacle.angle) * obstacle.distance;
				obstacle.mesh.rotation.z += Math.random() * 0.1;
				obstacle.mesh.rotation.y += Math.random() * 0.1;
				const diffPos = airplane.mesh.position
					.clone()
					.sub(obstacle.mesh.position.clone());
				const d = diffPos.length();
				if (d < world.obstacleDistanceTolerance) {
					particlesHolder.spawnParticles(
						obstacle.mesh.position.clone(),
						15,
						Colors.red,
						3
					);

					obstaclesPool.unshift(this.obstaclesInUse.splice(i, 1)[0]);
					this.mesh.remove(obstacle.mesh);
					world.planeCollisionSpeedX = (100 * diffPos.x) / d;
					world.planeCollisionSpeedY = (100 * diffPos.y) / d;
					ambientLight.intensity = 2;
					// removeEnergy();
					i--;
				} else if (obstacle.angle > Math.PI) {
					obstaclesPool.unshift(this.obstaclesInUse.splice(i, 1)[0]);
					this.mesh.remove(obstacle.mesh);
					i--;
				}
			}
		};
};