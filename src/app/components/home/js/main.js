import React from "react";
import { render } from "react-dom";
import { WidgetsWrapper } from "../../widgets/Widgets-wrapper";
import { Route } from 'react-router-dom';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<h1>This is home page!</h1>
			</div>
		);
	}
}
