import React from "react";
import { render } from "react-dom";
import Puzzle from "./puzzle/js/main"
import { routeTo } from "../helper"
import { Switch, Route } from 'react-router-dom';
import { NotFound404 } from "../404-not-found/main";

const urlpath = "/widgets/"

export class WidgetsWrapper extends React.Component {
	render() {
		return(
			<div>
			<ul>
				<li onClick={routeTo(urlpath + "puzzle")}>Puzzle</li>
			</ul>
			<div>
				<Switch>
					<Route exact path={urlpath + "puzzle"} component={Puzzle}/>
				</Switch>
			</div>
			</div>
		);
	}
}