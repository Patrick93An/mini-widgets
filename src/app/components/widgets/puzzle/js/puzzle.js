import React from "react";
import styles from '../scss/style.scss';
import { PuzzleState } from "./grid";
import { connect } from "react-redux"
import action_types from "./action-type";
import { setCssProperty } from "../../../helper";


class Puzzle extends React.Component {
	constructor() {
		super();
		this.state = {}
		this.puzzle_grid_wrapper = React.createRef();
		this.setGridWidth = setCssProperty('--grid-width')('%');
		this.setGridHeight = setCssProperty('--grid-height')('%');
		this.setGridFontSize = setCssProperty('--grid-font-size')('px');
	}

	componentDidUpdate() {
		let prev_grid_size = this.props.grid.some_prev_state.grid_size;
		let curr_grid_size = this.props.grid.grid_size;
		let puzzle_grid_wrapper_ele = this.puzzle_grid_wrapper.current
		if (prev_grid_size != curr_grid_size && puzzle_grid_wrapper_ele) {
			this.setGridWidth(puzzle_grid_wrapper_ele)(100 / curr_grid_size);
			this.setGridHeight(puzzle_grid_wrapper_ele)(100 / curr_grid_size);
			this.setGridFontSize(puzzle_grid_wrapper_ele)(((15 - curr_grid_size) / 13 * 86) * 2 / curr_grid_size + 14);
		}
	}

	render() {
		return(
			<div className="puzzle-wrapper" tabIndex="0" onKeyPress={this.props.changeArrByKeyPress}>
				<ul className="puzzle-grid" ref={this.puzzle_grid_wrapper}>
					<PuzzleState num_arr={this.props.grid.grid_arr_numbers}/>
				</ul>
				<div className="configuration-section">
					<div className="grid-input">
						<input 
							type="number" 
							value={this.props.grid.grid_size_input} 
							onChange={this.props.changeGridSize} 
							min='2'
							max='15'/>
						<button onClick={this.props.shuffleArr} data-size={this.props.grid.grid_size}>START</button>
					</div>
					<div className="control">
						<button onClick={this.props.changeArr} data-name={action_types.dir.LEFT}>LEFT</button>
						<button onClick={this.props.changeArr} data-name={action_types.dir.RIGHT}>RIGHT</button>
						<button onClick={this.props.changeArr} data-name={action_types.dir.UP}>UP</button>
						<button onClick={this.props.changeArr} data-name={action_types.dir.DOWN}>DOWN</button>
					</div>
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
			updated_number = Number.isNaN(updated_number) || updated_number < 2 ? 2 : updated_number;
			updated_number = updated_number >= 15 ? 15 : updated_number;
			dispatch({
				type: action_types.CHANGE_GRID_INPUT_NUMBER,
				grid_size: updated_number
			})
		},

		changeArr: e => {
			dispatch({
				type: e.currentTarget.getAttribute('data-name'),
			})
		},

		changeArrByKeyPress: e => {
			switch (e.key) {
				case 'a':
				case 'j':
					dispatch({
						type: action_types.dir.LEFT
					})
					break;
				case 'w':
				case 'i':
					dispatch({
						type: action_types.dir.UP
					})
					break;
				case 'd':
				case 'l':
					dispatch({
						type: action_types.dir.RIGHT
					})
					break;
				case 's':
				case 'k':
					dispatch({
						type: action_types.dir.DOWN
					})
					break;

			}
		},

		shuffleArr: e => {
			let size_n = e.currentTarget.getAttribute('data-size');
			let dir = [
				action_types.dir.LEFT,
				action_types.dir.RIGHT,
				action_types.dir.UP,
				action_types.dir.DOWN
			];
			let ran_dir;
			let ran_time;
			for (let i = 0; i < 10000; i++) {
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