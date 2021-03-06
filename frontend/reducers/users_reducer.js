import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";
import {RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER} from '../actions/session_actions';

const UsersReducer = (state={}, action) => {
    Object.freeze(state);
    const nextState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_CURRENT_USER:
            nextState[action.currentUser.id] = action.currentUser;
            return nextState;
        case RECEIVE_USER:
            nextState[action.user.id] = action.user;
            return nextState;
        case RECEIVE_USERS:
            action.users.forEach(user => nextState[user.id] = user)
            return nextState;
        case LOGOUT_CURRENT_USER:
            delete nextState.currentUserId;
            return nextState;
        default:
            return state;
    }
}


export default UsersReducer;