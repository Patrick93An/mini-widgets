import React from "react";
import { render } from "react-dom";
import { Puzzle } from "./puzzle/main"

export class WidgetsWrapper extends React.Component {
	render() {
		return(
			<div>
				<Puzzle/>
			</div>
		);
	}
}