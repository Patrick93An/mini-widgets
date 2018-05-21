import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import action_types from "./action-type";
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { debounceTime } from 'rxjs'
import { Observable } from 'rxjs/Observable';		

const changeGridEpic = action$ =>
	action$.ofType(action_types.CHANGE_GRID_INPUT_NUMBER)
	    .debounceTime(1000) // Asynchronously wait 1000ms then continue
	    .map(action => ({
	    	...action,
	    	type: action_types.CHANGE_GRID_NUMBER
	    }));
		

const changeGridEpicMiddleware = createEpicMiddleware(changeGridEpic);

const enhancers = [];
const middleware = [changeGridEpicMiddleware];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const initState = {
	empty_index: 15,
	grid_size_input: 4,
	grid_size: 4,
	grid_arr_numbers: [...Array(16)].map((x, i) => (i + 1) % 16 ),
	some_prev_state: {
		grid_size: 4,
	}
};

const gridReducer = (state, action) => {
		let size;
		let empty_index;
		let size_n;
		let next_empty_index;
		let arr;
	switch (action.type) {
		case action_types.CHANGE_GRID_INPUT_NUMBER:
			state = {
				...state,
				grid_size_input: action.grid_size,
			};
			break;
		case action_types.CHANGE_GRID_NUMBER:
			size = action.grid_size ** 2;
			state = {
				...state,
				grid_size: action.grid_size,
				empty_index: size - 1,
				grid_arr_numbers: [...Array(size)].map((x, i) => (i + 1) % size),
				some_prev_state: {
					...state.some_prev_state,
					grid_size: state.grid_size
				}
			};
			break;
		case action_types.dir.RIGHT:
			size_n = state.grid_size;
			empty_index = state.empty_index;
			if (empty_index % size_n == 0) {
				break;
			} else {
				next_empty_index = empty_index - 1;
				arr = state.grid_arr_numbers;
				[arr[next_empty_index], arr[empty_index]] = [arr[empty_index], arr[next_empty_index]];
				state = {
					...state,
					empty_index: next_empty_index,
					grid_arr_numbers: arr
				}
				break;
			}
		case action_types.dir.LEFT:
			size_n = state.grid_size;
			empty_index = state.empty_index;
			if (empty_index % size_n == size_n - 1) {
				break;
			} else {
				next_empty_index = empty_index + 1;
				arr = state.grid_arr_numbers;
				[arr[next_empty_index], arr[empty_index]] = [arr[empty_index], arr[next_empty_index]];
				state = {
					...state,
					empty_index: next_empty_index,
					grid_arr_numbers: arr
				}
				break;
			}
		case action_types.dir.UP:
			size_n = state.grid_size;
			size = state.grid_size ** 2;
			empty_index = state.empty_index;
			if (empty_index > size - size_n - 1 ) {
				break;
			} else {
				next_empty_index = empty_index + size_n;
				arr = state.grid_arr_numbers;
				[arr[next_empty_index], arr[empty_index]] = [arr[empty_index], arr[next_empty_index]];
				state = {
					...state,
					empty_index: next_empty_index,
					grid_arr_numbers: arr
				}
				break;
			}
		case action_types.dir.DOWN:
			size_n = state.grid_size;
			size = state.grid_size ** 2;
			empty_index = state.empty_index;
			if (empty_index < size_n) {
				break;
			} else {
				next_empty_index = empty_index - size_n;
				arr = state.grid_arr_numbers;
				[arr[next_empty_index], arr[empty_index]] = [arr[empty_index], arr[next_empty_index]];
				state = {
					...state,
					empty_index: next_empty_index,
					grid_arr_numbers: arr
				}
				break;
			}
		default:
			return state;
	}
	return state
};

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(
	gridReducer,
	initState,
	composedEnhancers
);


