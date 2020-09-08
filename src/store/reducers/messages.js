import {messagesActions} from '../actions';

function messages (state = {
  list: []
}, action) {
  switch (action.type) {
    case messagesActions.ADD_MESSAGE:
      const list = [...state.list, action.message];
      return Object.assign({}, state, {list});
    case messagesActions.RESET_MESSAGES:
      return Object.assign({}, state, {list: []});
    default:
      return state;
  }
}

export function resetMessages () {
  return {type: messagesActions.RESET_MESSAGES};
}

export function addMessage (message) {
  return {type: messagesActions.ADD_MESSAGE, message};
}

export default messages;
