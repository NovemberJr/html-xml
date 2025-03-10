const bottom = { width: 1, color: "black" };

const underlines = [
	{ row: 1, col: 17, bottom },
	{ row: 2, col: 17, bottom },
	{ row: 1, col: 27, bottom },
	{ row: 2, col: 27, bottom },
	{ row: 4, col: 24, bottom },
	{ row: 5, col: 24, bottom },
	{ row: 6, col: 24, bottom },
	{ row: 7, col: 24, bottom },
	{ row: 8, col: 24, bottom },
	{ row: 9, col: 26, bottom },
	{ row: 9, col: 36, bottom },
	{ row: 10, col: 26, bottom },
	{ row: 10, col: 36, bottom },
	{ row: 11, col: 24, bottom },
	{ row: 12, col: 24, bottom },
	{ row: 13, col: 24, bottom },
	{ row: 14, col: 24, bottom },
	{ row: 15, col: 24, bottom },

	{ row: 27, col: 25, bottom },
	{ row: 27, col: 32, bottom },
	{ row: 27, col: 63, bottom },
	{ row: 27, col: 72, bottom },

	{ row: 28, col: 0, bottom },

	{ row: 29, col: 25, bottom },
	{ row: 29, col: 32, bottom },
	{ row: 29, col: 63, bottom },

	{ row: 32, col: 22, bottom },
	{ row: 34, col: 16, bottom },

	{ row: 37, col: 0, bottom },
	{ row: 37, col: 14, bottom },
	{ row: 37, col: 25, bottom },
	{ row: 37, col: 43, bottom },
	{ row: 37, col: 57, bottom },
	{ row: 37, col: 69, bottom },

	{ row: 39, col: 16, bottom },
	{ row: 39, col: 19, bottom },
	{ row: 39, col: 27, bottom },
	{ row: 39, col: 57, bottom },
	{ row: 39, col: 63, bottom },
	{ row: 39, col: 75, bottom },

	{ row: 41, col: 0, bottom },
	{ row: 41, col: 72, bottom },

	{ row: 44, col: 0, bottom },
	{ row: 44, col: 14, bottom },
	{ row: 44, col: 25, bottom },
	{ row: 44, col: 43, bottom },
	{ row: 44, col: 57, bottom },
	{ row: 44, col: 69, bottom },

	{ row: 47, col: 0, bottom },
	{ row: 47, col: 72, bottom },

	{
		range: {
			from: { row: 1, col: 8 },
			to: { row: 30, col: 83 },
		},
		top: { width: 2, color: "black" },
		left: { width: 2, color: "black" },
		bottom: { width: 2, color: "black" },
		right: { width: 2, color: "black" },
	},
];

const tableBorders = [];

for (let i = 17; i <= 25; i += 1) {
	for (let j = 0; j <= 80; j += 1) {
		tableBorders.push({
			row: i,
			col: j,
			top: { width: 1, color: "black" },
			right: { width: 1, color: "black" },
		});
	}
}

export const customBorders = [...underlines, ...tableBorders];
