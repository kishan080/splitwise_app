import {DB} from '../constants/DB'
import axios from 'axios'
import {SIGNUP_USER_FAIL, SIGNUP_USER} from '../constants/constant'


export const signUpUserFail = (msg) => {
    return{
        type: SIGNUP_USER_FAIL,
        msg
    }
}

export const signUpUser = (msg) => {
    return{
        type: SIGNUP_USER,
        msg
    }
}

export const userSignupRequest = (userData) =>{
    return dispatch => {
        return axios.post(`${DB}/signup`, userData).then(
            ({res})=> dispatch(signUpUser({success: "Signup successfully!"})),
            ({response}) => {
                dispatch(signUpUserFail(response.data))
            }
        )
    }
}