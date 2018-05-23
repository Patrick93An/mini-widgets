import React from "react";
import styles from '../scss/style.scss';
import action_types from "./action-type";
import ColourLayer from "./color-layer";
import { connect } from "react-redux";

class ColourContainer extends React.Component {
	constructor() {
		super();

		this.updateColourLayer = layers => {
			return layers.map((layer, i) => 
				<li key={i}>
					<ColourLayer layer_state={layer} />
				</li>
			)
		}
	}

	render() {
		return(
			<div>
				<ul>
					{this.updateColourLayer(this.props.layer_states.layers)}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		layer_states: state,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ColourLayer);