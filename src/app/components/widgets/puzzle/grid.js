import React from "react";
import { render } from "react-dom";

export default module = {
	init_number: 16,
	showEle: e => {
	},
	createOrUpdateGrid: num_arr => {
		return num_arr.map((x, i) => <li key={i}>{i}</li>);
	},

<<<<<<< Updated upstream
=======
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
>>>>>>> Stashed changes
}
