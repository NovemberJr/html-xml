import { useEffect, useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

import { HotTable, HotColumn } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

registerAllModules();

function App() {
	const [data, setData] = useState({});
	const [width, setWidth] = useState(0);
	const [mergeCells, setMergeCells] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/upd-2024.xlsx")
			.then((res) => {
				return res.arrayBuffer();
			})
			.then((data) => {
				const workbook = XLSX.read(data, { type: "array" });
				const worksheet = workbook.Sheets[workbook.SheetNames[0]];

				const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
				setData(json);
				console.log(json);

				const width = json.reduce(
					(max, arr) => Math.max(max, arr.length),
					0
				);
				setWidth(width);

				const merges = worksheet["!merges"] || [];
				const mergesConverted = merges
					.map(({ s, e }) => ({
						row: s.r,
						col: s.c,
						rowspan: e.r - s.r + 1,
						colspan: e.c - s.c + 1,
					}))
					.slice(61, 62);
				setMergeCells(mergesConverted);
				console.log(mergesConverted);
			})
			.then(() => {
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const arr = new Array(width).fill(null);

	return (
		<div className="ht-theme-main-dark-auto">
			{!loading && (
				<HotTable
					data={data}
					headerClassName="htLeft"
					colHeaders={true}
					rowHeaders={true}
					licenseKey="non-commercial-and-evaluation"
					mergeCells={mergeCells}
				>
					{arr.map((_, i) => (
						<HotColumn key={i} />
					))}
				</HotTable>
			)}
		</div>
	);
}

export default App;
