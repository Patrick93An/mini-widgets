import React from "react";

export class PuzzleState extends React.Component {
	constructor(props) {
		super(props);

		this.createOrUpdateGrid = num_arr => {
			return num_arr.map((x, i) => x == 0 ? 
				<li className='empty' key={i}>{x}</li> :
				<li key={i}>{x}</li>);
		}
	}

	render() {
		return(
			this.createOrUpdateGrid(this.props.num_arr)
		);
	}
}






