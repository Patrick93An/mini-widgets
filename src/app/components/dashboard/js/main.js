import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"
import Dashboard from "./Dashboard"


export default class DashboardMain extends React.Component {
	constructor() {
		super();
	}

	render() {
		return(
			<Provider store={store}>
				<Dashboard/>
			</Provider>
		);
	}
}

