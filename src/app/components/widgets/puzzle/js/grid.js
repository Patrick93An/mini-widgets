import React from "react";

export class PuzzleState extends React.Component {
	constructor(props) {
		super(props);

		this.createOrUpdateGrid = num_arr => {
			return num_arr.map((x, i) => x == 0 ? 
				<li className='empty' key={i}><span>{x}</span></li> :
				<li key={i}><span>{x}</span></li>);
		}
	}

	render() {
		return(
			this.createOrUpdateGrid(this.props.num_arr)
		);
	}
}






