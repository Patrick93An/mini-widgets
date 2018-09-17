import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import action_types from "./action-type";
import { debounceTime } from 'rxjs'
import { Observable } from 'rxjs/Observable';		

// const changeGridEpic = action$ =>
// 	action$.ofType(action_types.CHANGE_GRID_INPUT_NUMBER)
// 	    .debounceTime(1000) // Asynchronously wait 1000ms then continue
// 	    .map(action => ({
// 	    	...action,
// 	    	type: action_types.CHANGE_GRID_NUMBER
// 	    }));
		

// const changeGridEpicMiddleware = createEpicMiddleware(changeGridEpic);

const enhancers = [];
const middleware = [];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const initState = {
	layers: [
		{
			layer_index: 0,
			bg_colour: '#000000',
			opacity: 1,
			z_index: 0,
			display_colour: '#000000',
		}, {
			layer_index: 1,
			bg_colour: '#ffffff',
			opacity: 0.5,
			z_index: 1,
			display_colour: '#ffffff',
		},
	],
	latest_layer_index: 1,
	target_colour: '#808080',
	display_target_colour: '#808080',
	is_fix_target_colour: false,
	is_hex_mode: true
};

const colorConvertor = (type) => {
	let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	let rgb_regex = /\d{1,3}/g;
	let hex_regex = /[0-9A-F]{1}/g;
	let rgb_codes;
	let codes;
	let red;
	let green;
	let blue;
	switch (type) {
		case 'rgbToArr':
			return rgb => {
				rgb_codes = rgb.match(rgb_regex).slice(0,3);
				if (rgb_codes.length == 3) {
					return rgb_codes.map(c => parseInt(c));
				} else {
					return rgb;
				}
			}
		case 'hexToArr':
			return hex_code => {
				codes = hex_code.toUpperCase().match(hex_regex);
				if (codes.length == 6) {
					red = hex.indexOf(codes[0]) * 16;
					red += hex.indexOf(codes[1]);
					green = hex.indexOf(codes[2]) * 16;
					green += hex.indexOf(codes[3]);
					blue = hex.indexOf(codes[4]) * 16;
					blue += hex.indexOf(codes[5]);
					return [red, green, blue];
				} else if (codes.length == 3) {
					red = hex.indexOf(codes[0]) * 17;
					green = hex.indexOf(codes[1]) * 17;
					blue = hex.indexOf(codes[2]) * 17;
					return [red, green, blue];
				} else {
					return hex_code;
				}
			}
		case 'arrToRgb':
			return arr => {
				if (arr.length == 3) {
					return 'rgb(' + arr[0] + ', ' + arr[1] + ', ' + arr[2] + ')'
				} else {
					return arr;
				}
			}
		case 'arrToHex':
			return arr => {
				if (arr.length == 3) {
					return arr.reduce((hex_code, c) => {
						return hex_code + hex[Math.floor(c / 16)] + hex[c % 16];
					}, "#");
				} else {
					return arr;
				}
			}
	}
}

const rgbToArr = colorConvertor('rgbToArr');
const hexToArr = colorConvertor('hexToArr');
const arrToRgb = colorConvertor('arrToRgb');
const arrToHex = colorConvertor('arrToHex');

const changePropsByLayerIndex = (layers, layer_index, property, value) => {
	return layers.map(layer => {
		if (layer_index == layer.layer_index) {
			layer[property] = value;
		}
		return layer;
	})
}

const addLayer = (layers, latest_layer_index) => {
	if (layers.length == 4) {
		return layers;
	}
	let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
	let ran_color = '';
	for (var i = 0; i < 6; i++) {
		ran_color += hex[Math.floor(Math.random() * 16)];
	}
	let new_layer = {
		layer_index: latest_layer_index,
		bg_colour: '#' + ran_color,
		opacity: Math.round(Math.random() * 100) / 100,
		z_index: layers.length,
	};
	layers.push(new_layer);
	return layers;
}

const decreaseZIndex = (layers, layer_index) => {
	let curr_z_index;
	for (let i = 0; i < layers.length; i++) {
		if (layers[i].layer_index == layer_index) {
			if (layers[i].z_index > 0) {
				curr_z_index = layers[i].z_index - 1;
				for (let j = 0; j < layers.length; j++) {
					if (layers[j].z_index == curr_z_index) {
						layers[j].z_index++;
						break;
					}
				}
				layers[i].z_index--;
			}
			break;
		}
	}
	return layers;
}

const increaseZIndex = (layers, layer_index) => {
	let curr_z_index;
	for (let i = 0; i < layers.length; i++) {
		if (layers[i].layer_index == layer_index) {
			if (layers[i].z_index < layers.length - 1) {
				curr_z_index = layers[i].z_index + 1;
				for (let j = 0; j < layers.length; j++) {
					if (layers[j].z_index == curr_z_index) {
						layers[j].z_index--;
						break;
					}
				}
				layers[i].z_index++;
			}
			break;
		}
	}
	return layers;
}

const toBottomZIndex = (layers, layer_index) => {
	let curr_z_index;
	for (let i = 0; i < layers.length; i++) {
		if (layers[i].layer_index == layer_index) {
			if (layers[i].z_index > 0) {
				curr_z_index = layers[i].z_index;
				for (let j = 0; j < layers.length; j++) {
					if (layers[j].z_index < curr_z_index) {
						layers[j].z_index++;
					}
				}
				layers[i].z_index = 0;
			}
			break;
		}
	}
	return layers;
}

const toTopZIndex = (layers, layer_index) => {
	let curr_z_index;
	for (let i = 0; i < layers.length; i++) {
		if (layers[i].layer_index == layer_index) {
			if (layers[i].z_index < layers.length - 1) {
				curr_z_index = layers[i].z_index;
				for (let j = 0; j < layers.length; j++) {
					if (layers[j].z_index > curr_z_index) {
						layers[j].z_index--;
					}
				}
				layers[i].z_index = layers.length - 1;
			}
			break;
		}
	}
	return layers;
}

const adjustZIndexByRemoveLayer = (layers, z_index) => {
	return layers.map(layer => {
		if (layer.z_index > z_index) {
			layer.z_index--;
		}
		return layer;
	})
}

const removeLayerByLayerIndex = (layers, layer_index) => {
	if (layers.length == 2) {
		return layers;
	}
	let del_index = 0;
	let del_z_index = 0;
	for (let i = 0; i < layers.length; i++) {
		if (layers[i].layer_index == layer_index) {
			del_index = i;
			break;
		}
	}
	del_z_index = layers[del_index].z_index;
	layers.splice(del_index, 1);
	layers = adjustZIndexByRemoveLayer(layers, del_z_index)
	return layers;
}

const calculateTargetColour = layers => {
	layers = layers.sort((layer_1, layer_2) => layer_1.z_index - layer_2.z_index);
	return calculateColourByLayers(layers);
}

const calculateColourByLayers = layers => {
	return layers.reduce((code, layer) => {
		let layer_code = hexToArr(layer.bg_colour);
		return calculateColourByOpacity(code, layer_code, layer.opacity);
	}, [255, 255, 255])
}

// .9999 make it to 256
const calculateColourByOpacity = (curr_arr, next_arr, opacity) => {
	return curr_arr.map((curr, i) => Math.floor((curr + .9999) * (1 - parseFloat(opacity)) + (next_arr[i] + .9999) * parseFloat(opacity)))
}

const calculateColourByTarget = state => {
	let layers = state.layers.sort((layer_1, layer_2) => layer_1.z_index - layer_2.z_index);
	let last_layer = layers.pop();
	let curr_arr = calculateColourByLayers(layers);
	let next_arr_props = getColourByTargetAndOpacity(curr_arr, hexToArr(state.target_colour), last_layer.opacity);
	last_layer.bg_colour = arrToHex(next_arr_props[0]);
	last_layer.opacity = next_arr_props[1];
	layers.push(last_layer);
	return layers;
}

const getColourByTargetAndOpacity = (curr_arr, target_arr, opacity) => {
	let min_opacity = getMinimunOpacity(curr_arr, target_arr);
	opacity = min_opacity < opacity ? opacity : min_opacity;
	return [curr_arr.map((curr, i) => getSingleColourByTargetAndOpacity(curr, target_arr[i], opacity)), opacity];
}

const getSingleColourByTargetAndOpacity = (curr, target, opacity) => {
	return opacity == 0 ? curr : Math.floor((target + .9999) / opacity + (curr + .9999) - (curr + .9999) / opacity);
}

const getOpacityByTargetAndSingleColour = (curr, target, next) => {
	return Math.round((target - curr) / (next - curr) * 100) / 100;
}

// By testing next colour at 0 and 255
const getMinimunOpacity = (curr_arr, target_arr) => {
	let min_opacity = 0;
	let test_opacity = 0;
	for (let i = 0; i < curr_arr.length; i++) {
		test_opacity = (target_arr[i] - curr_arr[i]) / (0 - curr_arr[i]);
		console.log('test_opacity 0:', test_opacity)
		min_opacity = min_opacity < test_opacity ? test_opacity : min_opacity;
		console.log('min_opacity 0:', min_opacity)
		test_opacity = (target_arr[i] - curr_arr[i]) / (255 - curr_arr[i]);
		console.log('test_opacity 255:', test_opacity)
		min_opacity = min_opacity < test_opacity ? test_opacity : min_opacity;
		console.log('min_opacity 255:', min_opacity)
	}
	min_opacity = min_opacity > 1 ? 1 : min_opacity;
	return Math.ceil(min_opacity * 100) / 100;
}

const layerReducer = (state, action) => {
	state = {
		...state
	}
	let layers;
	let layers_clone;
	let is_colour_change = true;
	switch (action.type) {
		case action_types.CHANGE_BG_COLOUR:
			layers = changePropsByLayerIndex(state.layers, action.layer_index,'bg_colour', action.bg_colour);
			break;
		case action_types.CHANGE_OPACITY:
			layers = changePropsByLayerIndex(state.layers, action.layer_index,'opacity', action.opacity)
			break;
		case action_types.DECREASE_Z_INDEX:
			layers = decreaseZIndex(state.layers, action.layer_index);
			break;
		case action_types.INCREASE_Z_INDEX:
			layers = increaseZIndex(state.layers, action.layer_index);
			break;
		case action_types.TO_BOTTOM_Z_INDEX:
			layers = toBottomZIndex(state.layers, action.layer_index);
			break;
		case action_types.TO_TOP_Z_INDEX:
			layers = toTopZIndex(state.layers, action.layer_index);
			break;	
		case action_types.ADD_LAYER:
			layers = addLayer(state.layers, ++state.latest_layer_index );
			break;
		case action_types.REMOVE_LAYER:
			layers = removeLayerByLayerIndex(state.layers, action.layer_index);
			break;
		case action_types.TOGGLE_FIX_TARGET_COLOUR:
			is_colour_change = false;
			state = {
				...state,
				is_fix_target_colour: !state.is_fix_target_colour
			}
		default:
			is_colour_change = false;
			return state;
	}
	if (is_colour_change) {
		if (state.is_fix_target_colour) {
			layers = calculateColourByTarget(state);
			state = {
				...state,
				layers: layers,
			}
		} else {
			layers_clone = layers.slice();
			state = {
				...state,
				layers: layers,
				target_colour: arrToHex(calculateTargetColour(layers_clone)),
			}
		}
	}
	return state;
};

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(
	layerReducer,
	initState,
	composedEnhancers
);


