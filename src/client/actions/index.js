import axios from 'axios';
const ROOT_URL = 'http://localhost:3090';
const FIREBASE_URL = 'https://fakturki-1cbae.firebaseio.com/invoice-template.json';
import { store } from '../index';
import { push } from 'react-router-redux';

import {
    FETCH_INVOICE_TEMPLATE,
    ADD_INVOICE_ROW,
    REMOVE_INVOICE_ROW,
    SET_ACTIVE_INVOICE,
    ROW_VALUE_UPDATE,
    RESET_INVOICE_ROWS,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

export function fetchInvoiceTemplate() {
    const webRequest = axios.get(FIREBASE_URL);
    return {
        type: FETCH_INVOICE_TEMPLATE,
        payload: webRequest
    }
}

export function setActiveTemplate(template) {
    return {
        type: SET_ACTIVE_INVOICE,
        payload: template
    }
}

export function addInvoiceRow(row) {
    return {
        type: ADD_INVOICE_ROW,
        payload: row
    }
}

export function removeInvoiceRow(id) {
    return {
        type: REMOVE_INVOICE_ROW,
        payload: id
    }
}

export function rowValueUpdate(row) {
    return {
        type: ROW_VALUE_UPDATE,
        payload: row
    }
}

export function resetInvoiceRows() {
    return {
        type: RESET_INVOICE_ROWS,
        payload: []
    }
}

export function signinUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch((() => {
                    return {
                        type: AUTH_USER
                    }
                })());

                localStorage.setItem('token', response.data.token);
                store.dispatch(push('/new-invoice'));
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
        localStorage.removeItem('token');
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch((() => {
                    return {
                        type: AUTH_USER
                    }
                })());

                localStorage.setItem('token', response.data.token);
                store.dispatch(push('/new-invoice'));
            })
            .catch(response => {
                console.info(response.response.data.error);
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

export function authorizedRequest() {
    return function(dispatch) {
        axios.get(ROOT_URL, {
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

