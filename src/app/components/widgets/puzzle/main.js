import React from "react";
import { render } from "react-dom";
import grid_module from "./grid"
import './style.scss';

export class Puzzle extends React.Component {
	constructor() {
		super();
		this.grid_numbers = [...Array(grid_module.init_number)].map((x, i) => i);
	}

	componentDidMount() {
		console.log('added');
		this.grid = document.querySelector('.puzzle-grid').addEventListener('click', grid_module.showEle);
	}

	render() {
		return(
			<div className="puzzle-wrapper">
				<ul className="puzzle-grid">
					{grid_module.createOrUpdateGrid(this.grid_numbers)}
				</ul>
			</div>
		);
	}
}