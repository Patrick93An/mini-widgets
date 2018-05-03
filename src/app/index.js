import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { WidgetsWrapper } from "./components/widgets/widgets-wrapper";
import { ConnectedRouter as Router, routerReducer, routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

// const history = createHistory();
// const router_middleware = routerMiddleware(history);
// const router_reducer = routerReducer
// const router_store = createStore(router_reducer, applyMiddleware(router_middleware))


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


