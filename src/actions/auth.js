import * as api from '../api';
import { AUTH } from '../constants/actionTypes';


const signin = (formData, history) => async (dispatch) => {
    try {
        // api login
        const {data} = await api.signIn(formData);
        dispatch({ type: AUTH, data })
        history('/')
    } catch (error) {
        console.log(error);
    }
};
const signup = (formData, history) => async (dispatch) => {
    try {
        const {data} = await api.signUp(formData);
        dispatch({ type: AUTH, data })
        history('/')
    } catch (error) {
        console.log(error);
    }
};

export {signin, signup}