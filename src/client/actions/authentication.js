import axios from 'axios';
import { API_URL, PRELOADER_DELAY } from '../config';
import { push } from 'react-router-redux';
import { preload } from './fetchingData';

import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    SET_USER
} from './types';

// Authentication
export function signinUser({ email, password }) {
    return function(dispatch) {
        dispatch(preload(true));
        axios.post(`${API_URL}/signin`, { email, password })
            .then(response => {
                dispatch({
                    type: AUTH_USER
                });
                dispatch(setUser(response.data.user));
                localStorage.setItem('token', response.data.token);
                dispatch(preload(false, PRELOADER_DELAY));
                dispatch(push('/new-invoice'));
            })
            .catch(error => {
                console.log(error);
                dispatch(authError('Bad login info'));
            });
    }
}

export function signOutUser() {
    return function(dispatch) {
        dispatch({
            type: UNAUTH_USER
        });
        dispatch(setUser(null));
        localStorage.removeItem('token');
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        dispatch(preload(true));
        axios.post(`${API_URL}/signup`, { email, password })
            .then(response => {
                dispatch({
                    type: AUTH_USER
                });
                localStorage.setItem('token', response.data.token);
                dispatch(setUser(response.data.user));
                dispatch(preload(false, PRELOADER_DELAY));
                dispatch(push('/new-invoice'));
            })
            .catch(response => {
                dispatch(authError(response.response.data.error));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function setUser(userName) {
    return {
        type: SET_USER,
        payload: userName
    }
}

export function authorizedRequest() {
    return function() {
        axios.get(API_URL, {
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data.message);
            })
            .catch(error => {
                console.log(error);
            })
    }
}