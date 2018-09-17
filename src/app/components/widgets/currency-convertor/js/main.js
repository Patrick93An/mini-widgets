import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"
import CurrencyConvertor from "./CurrencyConvertor"


export default class CurrencyConvertorMain extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<Provider store={store}>
				<CurrencyConvertor/>
			</Provider>
		);
	}
}