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
			bg_colour: '#ff0000',
			opacity: 0.5,
			z_index: 0,
		}, {
			layer_index: 1,
			bg_colour: '#ff0000',
			opacity: 0.5,
			z_index: 1,
		}, {
			layer_index: 2,
			bg_colour: '#ff0000',
			opacity: 0.5,
			z_index: 2,
		},

	]

};

const layerReducer = (state, action) => {
	switch (action.type) {
		case action_types.CHANGE_BG_COLOUR:
			state = {
				...state,
				bg_colour: action.bg_colour,
			};
			break;
		case action_types.CHANGE_OPACITY:
			state = {
				...state,
				opacity: action.opacity,
			};
			break;
		default:
			return state;
	}
	return state
};

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(
	layerReducer,
	initState,
	composedEnhancers
);


