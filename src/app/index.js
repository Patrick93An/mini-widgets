import React from "react";
import { render } from "react-dom";
import { WidgetsWrapper } from "./components/widgets/Widgets-wrapper";

class App extends React.Component {
	render() {
		return (
			<div>
				<WidgetsWrapper/>
			</div>
		);
	}
}

render(<App/>, window.document.getElementById('app'));


