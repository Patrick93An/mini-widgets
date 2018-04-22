import React from "react";

export class PuzzleState extends React.Component {
	constructor(props) {
		super(props);

		this.createOrUpdateGrid = num_arr => {
			return num_arr.map((x, i) => <li key={i}>{x}</li>);
		}
	}

	render() {
		return(
			this.createOrUpdateGrid(this.props.num_arr)
		);
	}
}






