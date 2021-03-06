import {RECEIVE_CURRENT_USER, RECEIVE_LOGIN_ERRORS} from '../../actions/session_actions';

const LoginErrorsReducer = (state=[], action) => {
    Object.freeze(state);

    switch(action.type){
        case RECEIVE_LOGIN_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_USER:
            return [];
        default:
            return state;
    }

}

export default LoginErrorsReducer;