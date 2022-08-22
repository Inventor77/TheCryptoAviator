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

	// Coins
	coinsSpeed: 0.5,
	coinDistanceTolerance: 15,
	coinValue: 3,
	coinLastSpawn: 0,
	distanceForCoinsSpawn: 100,
};