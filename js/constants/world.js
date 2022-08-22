export const world = {
	speed: 0,
	status: "playing",

	distance: 0,
	ratioSpeedDistance: 50,
	energy: 100,
	ratioSpeedEnergy: 3,

	// Level
	level: 1,
	levelLastUpdate: 0,
	distanceForLevelUpdate: 1000,

	// Sea
	seaRadius: 600,
	seaLength: 750,
	wavesMinAmp: 5,
	wavesMaxAmp: 20,
	wavesMinSpeed: 0.001,
	wavesMaxSpeed: 0.003,

	// Plane
	planeDefaultHeight: 100,
	planeAmpHeight: 80,
	planeAmpWidth: 75,

	// Plane speed
	planeMinSpeed: 1.2,
	planeMaxSpeed: 1.6,
	planeSpeed: 0,
	planeCollisionDisplacementX: 0,
	planeCollisionSpeedX: 0,
	planeCollisionDisplacementY: 0,
	planeCollisionSpeedY: 0,

	// Coins
	coinsSpeed: 0.5,
	coinDistanceTolerance: 15,
	coinValue: 3,
	coinLastSpawn: 0,
	distanceForCoinsSpawn: 100,

	// Obstacle
	obstacleDistanceTolerance: 10,
	obstacleValue: 10,
	obstaclesSpeed: 0.6,
	obstacleLastSpawn: 0,
	distanceForObstaclesSpawn: 50,
};