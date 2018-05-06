import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { App } from "./components/app";
import { ConnectedRouter as Router } from "react-router-redux";
import { history, router_store } from "./store";

class Root extends React.Component {
	render() {
		return (
			<Provider store={router_store}>
				<Router history={history}>
					<div>
						<App/>
					</div>
				</Router>
			</Provider>
		);
	}
}

render(<Root/>, window.document.getElementById('root'));


