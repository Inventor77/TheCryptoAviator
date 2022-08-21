import { Colors } from "../../utils/colors.js";
import { utils } from "../../utils/utils.js";

export default function Cockpit() {
	this.mesh = new THREE.Object3D();
	// Cockpit Geometry vertices
	const frontUR = [40, 25, -25];
	const frontUL = [40, 25, 25];
	const frontLR = [40, -25, -25];
	const frontLL = [40, -25, 25];
	const backUR = [-40, 15, -5];
	const backUL = [-40, 15, 5];
	const backLR = [-40, 5, -5];
	const backLL = [-40, 5, 5];

	const vertices = new Float32Array(
		utils
			.makeTetrahedron(frontUL, frontUR, frontLL, frontLR)
			.concat(
				// front
				utils.makeTetrahedron(backUL, backUR, backLL, backLR)
			)
			.concat(
				// back
				utils.makeTetrahedron(backUR, backLR, frontUR, frontLR)
			)
			.concat(
				// side
				utils.makeTetrahedron(backUL, backLL, frontUL, frontLL)
			)
			.concat(
				// side
				utils.makeTetrahedron(frontUL, backUL, frontUR, backUR)
			)
			.concat(
				// top
				utils.makeTetrahedron(frontLL, backLL, frontLR, backLR)
			) // bottom
	);

	const cockpitGeometry = new THREE.BufferGeometry();
	cockpitGeometry.setAttribute(
		"position",
		new THREE.BufferAttribute(vertices, 3)
	);
	const cockpitMaterial = new THREE.MeshPhongMaterial({
		color: Colors.red,
		flatShading: true,
		side: THREE.DoubleSide,
	});
	const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
	cockpit.castShadow = true;
	cockpit.receiveShadow = true;

	this.mesh.add(cockpit);
}
