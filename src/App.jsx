import { useEffect, useState } from "react";

import { HotTable, HotColumn } from "@handsontable/react-wrapper";
import { registerAllModules } from "handsontable/registry";
import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";
import "./App.css";
import {
	customBorders,
	fields,
	openXLSX,
	openJSON,
	generateInitialFieldState,
} from "./helpers";

registerAllModules();

function App() {
	const [data, setData] = useState(null);
	const [width, setWidth] = useState(0);
	const [mergeCells, setMergeCells] = useState([]);
	const [loading, setLoading] = useState(true);

	const [fieldsState, setFieldsState] = useState(null);

	useEffect(() => {
		//openXLSX("/sample-of-fill-upd-2024.xlsx")
		openJSON("/data.json")
			.then(({ rows, merges, width }) => {
				setData(rows.slice(0, 16));
				setWidth(width);
				setMergeCells(merges);
			})
			.then(() => {
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (data === null) return;
		setFieldsState(generateInitialFieldState(data));
	}, [data]);

	const arr = new Array(width).fill(null);

	const handleChange = (changes, source) => {
		if (source == "loadData" || source == "MergeCells") return;

		if (source == "edit") {
			const [row, col, prevValue, newValue] = changes[0];

			if (fieldsState[row] && fieldsState[row][col]) {
				setFieldsState((prevState) => ({
					...prevState,
					[row]: {
						[col]: {
							name: prevState[row][col].name,
							value: newValue,
						},
					},
				}));

				console.log(fieldsState[row][col]);
			}
		}
	};

	const saveXML = () => {
		let xmlContent = "";

		Object.values(fieldsState).forEach((row) => {
			Object.values(row).forEach((col) => {
				xmlContent += `<${col.name}>${
					col.value === null ? "" : col.value
				}</${col.name}>\n`;
			});
		});

		xmlContent =
			'<?xml version="1.0" encoding="UTF-8"?><root>' +
			xmlContent +
			"</root>";

		const blob = new Blob([xmlContent], { type: "application/xml" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "document.xml";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="ht-theme-main">
			{!loading && (
				<>
					<HotTable
						data={data}
						headerClassName="htLeft"
						colHeaders={true}
						rowHeaders={true}
						licenseKey="non-commercial-and-evaluation"
						renderAllRows={false}
						mergeCells={mergeCells}
						customBorders={customBorders}
						afterChange={handleChange}
					>
						{arr.map((_, i) => (
							<HotColumn key={i} width={20} />
						))}
					</HotTable>

					<button className="export-btn" onClick={saveXML}>
						Export XML
					</button>
				</>
			)}
		</div>
	);
}

export default App;
