import React from "react";
import { render } from "react-dom";

export default module = {
	init_number: 16,
	showEle: e => {
	},
	createOrUpdateGrid: num_arr => {
		return num_arr.map((x, i) => <li key={i}>{i}</li>);
	},

}
