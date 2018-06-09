import React from "react";
import styles from '../scss/style.scss';
import action_types from "./action-type";

export default class ColourLayer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<div className="config-wrapper">
					<div className="close-btns">
						<span>-</span>
						<span onClick={this.props.removeLayer}>&times;</span>
					</div>
					<ul className="inputs">
						<li>
							<span>block</span>
							<span>Opacity<input type="range" min="0" max="1" step="0.01" value={this.props.layer_props.opacity} onChange={this.props.changeOpacity}/></span>
							<span>{this.props.layer_props.opacity}</span>
						</li>
						<li>
							<span>block</span>
							<span>Colour<input type="color" value={this.props.layer_props.bg_colour} onChange={this.props.changeBgColour}/></span>
							<span>{this.props.layer_props.bg_colour}</span>
						</li>
						<li>
							<span>Layer</span>
							<button onClick={this.props.toBottomZIndex}>--</button>
							<button onClick={this.props.decreaseZIndex}>-</button>
							<span>{this.props.layer_props.z_index}</span>
							<button onClick={this.props.increaseZIndex}>+</button>
							<button onClick={this.props.toTopZIndex}>++</button>
						</li>
					</ul>
				</div>
				<div className="colour-layer-wrapper">
					<div className="colour-layer" style={{
						backgroundColor: this.props.layer_props.bg_colour,
						opacity: this.props.layer_props.opacity,
					}}>
					</div>
				</div>
			</div>
		);
	}
}