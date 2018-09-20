import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import action_types from "./action-types";

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
	from_currency: "NT$",
	to_currency: "MYR",
	from_value: 0,
	to_value: 0,
	currency_rate: 0.13,
};

var clearActiveClasses = elems => {
	let value = 0;
	Array.from(elems).map(elem => {
		if (elem.classList.contains("active")) {
			value = -parseFloat(elem.textContent);
			return elem.classList.remove("active");
		}
	});
	return value;
}

var getNumberPadValue = elem => {
	let from_value = 0;
	if (elem.tagName == "LI") {
		if (elem.classList.contains("active")) {
			elem.classList.remove("active");
			from_value += -parseFloat(elem.textContent);
		} else {
			from_value += clearActiveClasses(elem.parentElement.children)
			elem.classList.add("active");
			from_value += parseFloat(elem.textContent);
		}
	}
	return from_value;
}

var getToValue = (from_value, currency_rate) => {
	return Math.round(from_value * currency_rate * 100) / 100;
}

const CCReducer = (state, action) => {
	let from_value = 0;
	switch (action.type) {
		case action_types.CHANGE_FROM_CURRENCY:
			state = {
				...state,
				from_currency: action.from_currency
			}
			return state;
		case action_types.SWAP_CURRENCY:
			state = {
				...state,
			}
			return state;
		case action_types.CHANGE_TO_CURRENCY:
			state = {
				...state,
				to_currency: action.to_currency,
			}
			return state;
		case action_types.CHANGE_CURRENCY_RATE:
			state = {
				...state,
				to_value: getToValue(state.from_value, action.currency_rate),
				currency_rate: action.currency_rate,
			}
			return state;
		case action_types.CLICK_NUMBER_PAD:
			from_value = state.from_value += getNumberPadValue(action.event);
			state = {
				...state,
				from_value: from_value,
				to_value: getToValue(from_value, state.currency_rate)
			}
			return state;
		default:
			return state;
	}
	return state
};

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(
	CCReducer,
	initState,
	composedEnhancers
);


