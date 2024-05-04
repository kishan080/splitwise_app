import {DB} from '../constants/DB'
import axios from 'axios'
import {SET_CURRENT_USER} from '../constants/constant'
import setAuthorizationToken from '../utils/validations/setAuthorizationToken'
import jwtDecode from 'jwt-decode'

export const setCurrentUser = (user) => {
    return{
        type: SET_CURRENT_USER,
        user
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('jwtToken')
        setAuthorizationToken(false)
        dispatch(setCurrentUser({}))
    }
}

export const login = (userData) =>{
    return dispatch => {
        return axios.post(`${DB}/signin`, userData).then(
            res=>{
                const token = res.data.token;
                localStorage.setItem('jwtToken', token)
                setAuthorizationToken(token)
                // console.log(jwtDecode(token));
                const userInfo = jwtDecode(token)
                localStorage.setItem('authUser', userInfo.username);
                localStorage.setItem('authEmail', userInfo.email);
                localStorage.setItem('authID', userInfo.ID);
                dispatch(setCurrentUser(jwtDecode(token)))
        });
    }
}