import {authActions} from '../actions';

function auth ( state = {}, action ) {
	switch ( action.type ) {
	case authActions.SET_USER:
		return Object.assign({}, state, {user: action.user});
	default:
		return state;
	}
}

export function setUser ( user ) {
	return {type: authActions.SET_USER, user};
}

export default auth;
