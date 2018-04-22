import React from "react";
import './style.scss';
import { PuzzleState } from "./grid";
import { connect } from "react-redux"

class Puzzle extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<div className="puzzle-wrapper">
				<input 
					type="number" 
					value={this.props.grid.grid_size == 0 ? '' : this.props.grid.grid_size} 
					onChange={this.props.changeGridSize} 
					min='0'
					max='30'/>
				<button onClick={this.props.changeArr}>LEFT</button>
				<button onClick={this.props.changeArr("RIGHT")}>RIGHT</button>
				<ul className="puzzle-grid">
					<PuzzleState num_arr={this.props.grid.grid_arr_numbers}/>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		grid: state,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeGridSize: e => {
			let updated_number = parseInt(e.currentTarget.value)
			updated_number = Number.isNaN(updated_number) ? 0 : updated_number;
			updated_number = updated_number >= 30 ? 30 : updated_number;
			dispatch({
				type: "CHANGE_GRID_NUMBER",
				grid_size: updated_number
			})
		},
		// changeArr: dir => {
		// 	e => {
		// 		dispatch({
		// 			type: dir,
		// 		})
		// 	}
		// }

		changeArr: e => {
			dispatch({
				type: 'LEFT',
			})
		}
	}
};



export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);