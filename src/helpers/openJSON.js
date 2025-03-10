export const openJSON = async (filename) => {
	const file = await fetch(filename);
	const { rows, merges } = await file.json();

	const width = rows.reduce((max, arr) => Math.max(max, arr.length), 0);

	return { rows, merges, width };
};
