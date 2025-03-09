import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import { HotTable, HotColumn } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
import "./App.css";
import { customBorders } from "./helpers/customBorders";

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

				const rowsJSON = XLSX.utils.sheet_to_json(worksheet, {
					header: 1,
				});
				setData(rowsJSON);

				const width = rowsJSON.reduce(
					(max, arr) => Math.max(max, arr.length),
					0
				);
				setWidth(width);

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
				setMergeCells(mergesConverted);
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
		<div className="ht-theme-main">
			{!loading && (
				<HotTable
					data={data}
					headerClassName="htLeft"
					colHeaders={true}
					rowHeaders={true}
					licenseKey="non-commercial-and-evaluation"
					mergeCells={mergeCells}
					customBorders={customBorders}
				>
					{arr.map((_, i) => (
						<HotColumn key={i} width={20} />
					))}
				</HotTable>
			)}
		</div>
	);
}

export default App;
