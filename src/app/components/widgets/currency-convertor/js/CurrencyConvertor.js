import React from "react";
import action_types from "./action-types";
import InputFieldsWrapper from "./InputFieldsWrapper"
import NumberPad from "./NumberPad"
import SaveList from "./SaveList"
import { connect } from "react-redux"

class CurrencyConvertor extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<div className="currency-convertor-wrapper">
				<div className="currency-convertor">
					<InputFieldsWrapper
						from_currency={this.props.state.from_currency} 
						to_currency={this.props.state.to_currency} 
						from_value={this.props.state.from_value} 
						to_value={this.props.state.to_value} 
						currency_rate={this.props.state.currency_rate} 
						swapCurrency={this.props.swapCurrency} 
						changeFromCurrency={this.props.changeFromCurrency} 
						changeToCurrency={this.props.changeToCurrency} 
						changeCurrencyRate={this.props.changeCurrencyRate} 
						clearValueList={this.props.clearValueList} 
						saveValue={this.props.saveValue} 
					/>
					<SaveList
						save_list={this.props.state.save_list}
						from_currency={this.props.state.from_currency}
						to_currency={this.props.state.to_currency}
						deleteRow={this.props.deleteRow}
					/>
					<NumberPad
						clickNumberPad={this.props.clickNumberPad}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		state,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeFromCurrency: e => {
			dispatch({
				type: action_types.CHANGE_FROM_CURRENCY,
				from_currency: e.currentTarget.value
			})
		},

		swapCurrency: e => {
			dispatch({
				type: action_types.SWAP_CURRENCY,
			})
		},

		changeToCurrency: e => {
			dispatch({
				type: action_types.CHANGE_TO_CURRENCY,
				to_currency: e.currentTarget.value
			})
		},

		changeCurrencyRate: e => {
			dispatch({
				type: action_types.CHANGE_CURRENCY_RATE,
				currency_rate: parseFloat(e.currentTarget.value)
			})
		},

		clickNumberPad: e => {
			dispatch({
				type: action_types.CLICK_NUMBER_PAD,
				event: e.target
			})
		},

		clearValueList: e => {
			dispatch({
				type: action_types.CLEAR_VALUE_LIST,
			})
		},

		saveValue: e => {
			dispatch({
				type: action_types.SAVE_VALUE,
			})
		},

		deleteRow: e => {
			dispatch({
				type: action_types.DELETE_ROW,
				delete_index: parseInt(e.currentTarget.getAttribute('data-index'))
			})
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyConvertor);
