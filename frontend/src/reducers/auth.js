import { SET_CURRENT_USER, SIGNUP_USER, SIGNUP_USER_FAIL } from '../constants/constant'
import isEmpty from 'lodash/isEmpty'

const initialState = {
    isAuthenticated: false,
    user: {},
    msg: {}
};

const auth = (state= initialState, action={}) => {
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !isEmpty(action.user),
                user: action.user
            };
        case SIGNUP_USER:
            return {
                isAuthenticated: false,
                user: {},
                msg: action.msg
            };
        case SIGNUP_USER_FAIL:
            return {
                isAuthenticated: false,
                user: {},
                msg: action.msg
            };
        default: return state;
    }
}

export default auth;