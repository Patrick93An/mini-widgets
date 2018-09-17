import React from "react";
import action_types from "./action-types";


export default class NumberPad extends React.Component {
	constructor(props) {
		super(props);

		this.single_units = [...Array(9).keys()]
			.map(x => <li key={x}>{x + 1}</li>);

		this.ten_units = [...Array(9).keys()]
			.map(x => <li key={x}>{(x + 1) * 10}</li>);

		this.hundred_units = [...Array(9).keys()]
			.map(x => <li key={x}>{(x + 1) * 100}</li>);
	}

	render() {
		return(
			<div className="numberpad">
				<ul onClick={this.props.clickNumberPad}>{this.hundred_units}</ul>
				<ul onClick={this.props.clickNumberPad}>{this.ten_units}</ul>
				<ul onClick={this.props.clickNumberPad}>{this.single_units}</ul>
			</div>
		)
	}
}



