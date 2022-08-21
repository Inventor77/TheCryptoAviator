export const utils = {
	normalize: function (v, vmin, vmax, tmin, tmax) {
		var nv = Math.max(Math.min(v, vmax), vmin);
		var dv = vmax - vmin;
		var pc = (nv - vmin) / dv;
		var dt = tmax - tmin;
		var tv = tmin + pc * dt;
		return tv;
	},

	findWhere: function (list, properties) {
		for (const elem of list) {
			let all = true;
			for (const key in properties) {
				if (elem[key] !== properties[key]) {
					all = false;
					break;
				}
			}
			if (all) {
				return elem;
			}
		}
		return null;
	},

	randomOneOf: function (choices) {
		return choices[Math.floor(Math.random() * choices.length)];
	},

	randomFromRange: function (min, max) {
		return min + Math.random() * (max - min);
	},

	collide: function (mesh1, mesh2, tolerance) {
		const diffPos = mesh1.position.clone().sub(mesh2.position.clone());
		const d = diffPos.length();
		return d < tolerance;
	},

	makeTetrahedron: function (a, b, c, d) {
		return [
			a[0],
			a[1],
			a[2],
			b[0],
			b[1],
			b[2],
			c[0],
			c[1],
			c[2],
			b[0],
			b[1],
			b[2],
			c[0],
			c[1],
			c[2],
			d[0],
			d[1],
			d[2],
		];
	},
};
