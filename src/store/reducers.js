import { combineReducers } from 'redux';
import auth from './reducers/auth';
import messages from './reducers/messages';

const reducers = combineReducers({ auth, messages });

export default reducers;
