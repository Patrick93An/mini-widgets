import React from "react";
import { render } from "react-dom";
import Puzzle from "./puzzle/js/main"
import ColourTransparency from "./colour-transparency/js/main"
import CurrencyConvertor from "./currency-convertor/js/main"
import { routeTo } from "../helper"
import { Switch, Route } from 'react-router-dom';
import { NotFound404 } from "../404-not-found/main";

const urlpath = "/widgets/"

export default class WidgetsWrapper extends React.Component {
	render() {
		return(
			<div>
				<ul>
					<li onClick={routeTo(urlpath + "puzzle")}>Puzzle</li>
					<li onClick={routeTo(urlpath + "colour-transparency")}>Colour Transparency</li>
					<li onClick={routeTo(urlpath +  "currency-convertor")}>Currency Convertor</li>
				</ul>
				<div>
					<Switch>
						<Route exact path={urlpath + "currency-convertor"} component={CurrencyConvertor}/>
						<Route exact path={urlpath + "puzzle"} component={Puzzle}/>
						<Route exact path={urlpath + "colour-transparency"} component={ColourTransparency}/>
					</Switch>
				</div>
			</div>
		);
	}
}