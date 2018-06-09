import React from "react";
import styles from '../scss/style.scss';
import action_types from "./action-type";
import ColourLayer from "./color-layer";
import { connect } from "react-redux";

class ColourContainer extends React.Component {
	constructor(props) {
		super(props);

		this.updateColourLayer = layers => {
			return layers.map((layer, i) => 
				<li key={layer.layer_index} style={{zIndex: layer.z_index}}>
					<ColourLayer layer_props={layer} 
						changeBgColour={this.props.changeBgColour(layer.layer_index)}
						changeOpacity={this.props.changeOpacity(layer.layer_index)}
						removeLayer={this.props.removeLayer(layer.layer_index)}
						decreaseZIndex={this.props.decreaseZIndex(layer.layer_index)}
						increaseZIndex={this.props.increaseZIndex(layer.layer_index)}
						toBottomZIndex={this.props.toBottomZIndex(layer.layer_index)}
						toTopZIndex={this.props.toTopZIndex(layer.layer_index)}
					/>
				</li>
			)
		}
	}

	render() {
		return(
			<div>
				<span onClick={this.props.addLayer}>Add</span>
				<span style={{color:this.props.layer_states.target_colour}}>{this.props.layer_states.target_colour}</span>

				<p onClick={this.props.toggleFixTargetColour}>Fix: {this.props.layer_states.fix_target_colour}</p>
				<ul className='layers-wrapper'>
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
		changeBgColour: layer_index => {
			return e => {
				dispatch({
					type: action_types.CHANGE_BG_COLOUR,
					bg_colour: e.currentTarget.value,
					layer_index
				})
			}
		},

		changeOpacity: layer_index => {
			return e => {
				dispatch({
					type: action_types.CHANGE_OPACITY,
					opacity: e.currentTarget.value,
					layer_index
				})
			}
		},

		decreaseZIndex: layer_index => {
			return e => {
				dispatch({
					type: action_types.DECREASE_Z_INDEX,
					layer_index
				})
			}
		},

		increaseZIndex: layer_index => {
			return e => {
				dispatch({
					type: action_types.INCREASE_Z_INDEX,
					layer_index
				})
			}
		},

		toBottomZIndex: layer_index => {
			return e => {
				dispatch({
					type: action_types.TO_BOTTOM_Z_INDEX,
					layer_index
				})
			}
		},

		toTopZIndex: layer_index => {
			return e => {
				dispatch({
					type: action_types.TO_TOP_Z_INDEX,
					layer_index
				})
			}
		},		

		addLayer: e => {
			dispatch({
				type: action_types.ADD_LAYER,
			})
		},

		removeLayer: layer_index => {
			return e => {
				dispatch({
					type: action_types.REMOVE_LAYER,
					layer_index
				})
			}
		},

		toggleFixTargetColour: e => {
			dispatch({
				type: action_types.TOGGLE_FIX_TARGET_COLOUR
			})
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(ColourContainer);