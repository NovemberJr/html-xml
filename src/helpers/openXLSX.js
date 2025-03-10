import * as XLSX from "xlsx";

export const openXLSX = async (filename) => {
	const file = await fetch(filename);
	const data = await file.arrayBuffer();
	const workbook = XLSX.read(data, { type: "array" });
	const worksheet = workbook.Sheets[workbook.SheetNames[0]];

	const rowsJSON = XLSX.utils.sheet_to_json(worksheet, {
		header: 1,
	});

	const width = rowsJSON.reduce((max, arr) => Math.max(max, arr.length), 0);

	const merges = worksheet["!merges"] || [];
	const mergesConverted = merges
		.map(({ s, e }) => {
			const rowspan = e.r - s.r + 1;
			const colspan = Math.min(e.c, width - 1) - s.c + 1;

			if (rowspan === 1 && colspan === 1) return null;

			return {
				row: s.r,
				col: s.c,
				rowspan,
				colspan,
			};
		})
		.filter((item) => item !== null);

	console.log(rowsJSON);
	console.log(mergesConverted);

	return {
		rows: rowsJSON,
		merges: mergesConverted,
		width,
	};
};
