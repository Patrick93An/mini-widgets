import React from "react";
import action_types from "./action-types";

export default class SaveList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let list = this.props.save_list.map((x, i) => 
			<tr key={i} data-index={i} onClick={this.props.deleteRow}>
				<td className="delete">&times;</td>
				<td>{x.from_value}</td>
				<td className="arrow">></td>
				<td>{x.to_value}</td>
			</tr>);
		return(
			<div className="save-list">
				<table>
					<thead>
						<tr>
							<th></th>
							<th>{this.props.from_currency}</th>
							<th></th>
							<th>{this.props.to_currency}</th>
						</tr>
					</thead>
					<tbody>
						{list}
					</tbody>
				</table>
			</div>
		)
	}
}



