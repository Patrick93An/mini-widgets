import React from "react";
import styles from '../scss/style.scss';
import action_types from "./action-type";
import { connect } from "react-redux";

class ColourLayer extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return(
			<div>
				<div className="config-wrapper">
					<div className="close-btns">
						<span>-</span>
						<span>&times;</span>
					</div>
					<ul className="inputs">
						<li>
							<span>block</span>
							<span>Opacity<input type="range" min="0" max="1" step="0.01" value={this.props.layer.opacity} onChange={this.props.changeOpacity}/></span>
						</li>
						<li>
							<span>block</span>
							<span>Colour<input type="color" value={this.props.layer.bg_colour} onChange={this.props.changeBgColour}/></span>
						</li>
					</ul>
				</div>
				<div className="colour-layer-wrapper">
					<div className="colour-layer" style={{
						backgroundColor: this.props.layer.bg_colour,
						opacity: this.props.layer.opacity,
					}}>
					</div>
				</div>
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
		changeBgColour: e => {
			dispatch({
				type: action_types.CHANGE_BG_COLOUR,
				bg_colour: e.currentTarget.value
			})
		},

		changeOpacity: e => {
			dispatch({
				type: action_types.CHANGE_OPACITY,
				opacity: e.currentTarget.value
			})
		},
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ColourLayer);