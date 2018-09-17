import React from "react";
import action_types from "./action-types";


export default class InputFieldsWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="input-fields-wrapper">
				<div className="inputs-row-1">
					<input
						type="text"
						onChange={this.props.changeFromCurrency}
						value={this.props.from_currency} />
					<button onClick={this.props.swapCurrency}>&lt; &gt;</button>
					<input
						type="text"
						onChange={this.props.changeToCurrency}
						value={this.props.to_currency} />
				</div>
				<div className="inputs-row-2">
					<span>{this.props.from_value}</span>
					<input
						type="number"
						step="0.1"
						onChange={this.props.changeCurrencyRate}
						value={this.props.currency_rate} />
					<span>{this.props.to_value}</span>
				</div>
			</div>
		)
	}
}



