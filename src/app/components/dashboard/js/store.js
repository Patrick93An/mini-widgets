import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import action_types from "./action-type";
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { mergeMap, map } from 'rxjs/operators'
import { Observable } from 'rxjs/Observable';		

const enhancers = [];
const middleware = [];

const fetchUserEpic = action$ =>
	action$.ofType(action_types.FETCH_USER_DATA)
	    .mergeMap(action => fetchUserWithToken()
	    	.map(data => {
	    		type: action_types.FETCH_USER_DATA_SUCCESS,
	    		data
		}))

const fetchUserEpicMiddleware = createEpicMiddleware(fetchUserEpic);
middleware.push(fetchUserEpicMiddleware);
		
// .mergeMap(action =>
//       api.fetchUser(action.payload) // This returns our Observable wrapping the Promise
//         .map(payload => ({ type: FETCH_USER_FULFILLED, payload }))
//     );


// const api = {
//   fetchUser: id => {
//     const request = fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
//       .then(response => response.json());
//     return Observable.from(request);
//   }
// };

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const fetchUserWithToken = () => {
	const request = fetch('http:\//localhost:8000/dashboard/current_user/', {
		headers: {
			Authorization: `JWT ${localStorage.getItem('token')}`
		}
	})
	.then(res => res.json());
	return Observable.from(request);
}

const initState = {
	displayed_form: '',
	logged_in: localStorage.getItem('token') ? true : false,
	username: ''
};

const dashboardReducer = (state, action) => {
	switch (action.type) {
		case action_types.FETCH_USER_DATA:
			state = {
				...state
			};
			break;
		case action_types.FETCH_USER_DATA_SUCCESS:
			console.log(action);
			state = {
				...state
			};
			break;
		default:
			state = {
				...state
			};
			break;
	}

	return state;
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

export const store = createStore(
	dashboardReducer,
	initState,
	composedEnhancers
);