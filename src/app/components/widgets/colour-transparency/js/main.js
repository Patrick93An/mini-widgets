import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"
import ColourContainer from "./color-container"


export default class ColourTransparency extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<Provider store={store}>
				<ColourContainer/>
			</Provider>
		);
	}
}

