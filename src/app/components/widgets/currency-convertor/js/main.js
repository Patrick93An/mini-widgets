import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"
import CurrencyConvertor from "./CurrencyConvertor"
import style from "../scss/style.scss"


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