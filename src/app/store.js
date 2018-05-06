import { createStore, compose, applyMiddleware } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux"
import createHistory from "history/createBrowserHistory"

export const history = createHistory();
const enhancers = [];
const router_reducer = routerReducer;
const router_middleware = [routerMiddleware(history)];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...router_middleware), ...enhancers);
export const router_store = createStore(router_reducer, {}, composedEnhancers)

