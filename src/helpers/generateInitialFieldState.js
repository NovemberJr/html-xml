import { fields } from ".";

export const generateInitialFieldState = (data) => {
	const newState = {};

	for (const [rowId, row] of Object.entries(fields)) {
		newState[rowId] = {};
		for (const [colId, cell] of Object.entries(row)) {
			newState[rowId][colId] = { ...cell, value: data[rowId][colId] };
		}
	}

	return newState;
};
