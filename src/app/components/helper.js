import { push } from 'react-router-redux';
import { router_store, history } from "../store";

export const routeTo = path => {
	return e => {
		router_store.dispatch(push(path));
	}
}

export const setCssProperty = property => {
	return (suffix = '') => {
		return (ele = document.documentElement) => {
			return value => {
				ele.style.setProperty(property, value + suffix);
			}
		}
	}
}
