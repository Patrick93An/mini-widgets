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
				<div className="grid-input">
					<input 
						type="number" 
						value={this.props.grid.grid_size == 0 ? '' : this.props.grid.grid_size} 
						onChange={this.props.changeGridSize} 
						min='2'
						max='30'/>
					<button onClick={this.props.shuffleArr} data-size={this.props.grid.grid_size}>START</button>
				</div>
				<ul className="puzzle-grid">
					<PuzzleState num_arr={this.props.grid.grid_arr_numbers}/>
				</ul>
				<div className="control">
					<button onClick={this.props.changeArr} data-name="LEFT">LEFT</button>
					<button onClick={this.props.changeArr} data-name="RIGHT">RIGHT</button>
					<button onClick={this.props.changeArr} data-name="UP">UP</button>
					<button onClick={this.props.changeArr} data-name="DOWN">DOWN</button>
				</div>
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
			updated_number = Number.isNaN(updated_number) ? 2 : updated_number;
			updated_number = updated_number >= 30 ? 30 : updated_number;
			dispatch({
				type: "CHANGE_GRID_NUMBER",
				grid_size: updated_number
			})
		},
		changeArr: e => {
			dispatch({
				type: e.currentTarget.getAttribute('data-name'),
			})
		},

		shuffleArr: e => {
			let size_n = e.currentTarget.getAttribute('data-size');
			let dir = ['LEFT', 'RIGHT', 'UP', 'DOWN'];
			let ran_dir;
			let ran_time;
			for (let i = 0; i < 2000; i++) {
				ran_dir = dir[Math.floor(Math.random() * 4)]
				for (let j = 0; j < Math.floor(Math.random() * size_n); j++) {
					dispatch({
						type: ran_dir,
					})
				}
			}
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);