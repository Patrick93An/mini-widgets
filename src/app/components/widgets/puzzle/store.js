import { createStore, combineReducers } from "redux";

const gridReducer = (state = {
	empty_index: 15,
	grid_size: 4,
	grid_arr_numbers: [...Array(16)].map((x, i) => (i + 1) % 16 )
}, action) => {
		let size;
		let empty_index;
		let size_n;
		let next_empty_index;
		let arr;
	switch (action.type) {
		case "CHANGE_GRID_NUMBER":
			size = action.grid_size ** 2;
			state = {
				...state,
				empty_index: size - 1,
				grid_size: action.grid_size,
				grid_arr_numbers: [...Array(size)].map((x, i) => (i + 1) % size)
			};
			break;
		case "LEFT":
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
		// case "RIGHT":
		// 	size_n = state.grid_size;
		// 	empty_index = state.empty_index;
		// 	if (empty_index % size_n == size_n - 1) {
		// 		break;
		// 	} else {
		// 		next_empty_index = empty_index + 1;
		// 		arr = state.grid_arr_numbers;
		// 		[arr[next_empty_index], arr[empty_index]] = [arr[empty_index], arr[next_empty_index]];
		// 		state = {
		// 			...state,
		// 			empty_index: next_empty_index,
		// 			grid_arr_numbers: arr
		// 		}
		// 		break;
		// 	}
	}
	return state
};


export const store = createStore(
	gridReducer
);

store.subscribe(() => {
	console.log('Store updated', store.getState());
})
