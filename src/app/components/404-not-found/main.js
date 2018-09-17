import React from "react";
import { render } from "react-dom";


export default class NotFound404 extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<h1>404 Not Found!</h1>
			</div>
		);
	}
}