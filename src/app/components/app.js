import React from "react";
import { Switch, Route } from 'react-router-dom';
import Home from "./home/js/main";
import DashboardMain from "./dashboard/js/main";
import WidgetsWrapper from "./widgets/Widgets-wrapper";
import NotFound404 from "./404-not-found/main";
import { connect } from "react-redux"
import { routeTo } from "./helper"
import { bindActionCreators } from 'redux';

export class App extends React.Component {
	constructor(props) {
	   super(props);
	}

	render() {
		return (
			<div>
				<header>
					<nav>
						<ul>
							<li onClick={routeTo('/')}>Home with redux</li>
							<li onClick={routeTo('/widgets')}>Dashboard</li>
							<li onClick={routeTo('/widgets')}>Widgets with redux</li>
						</ul>
					</nav>
				</header>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/dashboard" component={DashboardMain}/>
					<Route path="/widgets" component={WidgetsWrapper}/>
					<Route component={NotFound404} />
				</Switch>


			</div>
		);
	}
}
