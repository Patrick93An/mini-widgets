import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"
import Puzzle from "./puzzle"


export default class PuzzleMain extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<Provider store={store}>
				<Puzzle/>
			</Provider>
		);
	}
}

