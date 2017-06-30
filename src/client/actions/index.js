import axios from 'axios';
const ROOT_URL = 'http://localhost:3090';
const FIREBASE_URL = 'https://fakturki-1cbae.firebaseio.com/invoice-template.json';
import { store } from '../index';
import { push } from 'react-router-redux';

import {
    FETCH_INVOICE_TEMPLATE,
    SET_ACTIVE_INVOICE,
    UPDATE_INVOICE_FROM,
    UPDATE_INVOICE_TO,
    UPDATE_INVOICE_HEADER,
    UPDATE_INVOICE_DATE,
    UPDATE_INVOICE_ROW_LABELS,
    UPDATE_INVOICE_PAYMENT_TYPE,
    UPDATE_INVOICE_VALUE_IN_WORDS,
    UPDATE_INVOICE_ACCOUNT_NUMBER,
    ADD_INVOICE_ROW,
    REMOVE_INVOICE_ROW,
    UPDATE_INVOICE_ROW,
    RESET_INVOICE_ROWS,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

// INITIALIZING INVOICE
export function fetchInvoiceTemplate() {
    return function(dispatch) {
        axios.get(FIREBASE_URL)
            .then(response => {
                dispatch({
                    type: FETCH_INVOICE_TEMPLATE,
                    payload: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function setActiveInvoice(template) {
    return {
        type: SET_ACTIVE_INVOICE,
        payload: template
    }
}

// UPDATING INVOICE STATE ACTIONS
export function updateInvoiceFrom(text) {
    return {
        type: UPDATE_INVOICE_FROM,
        payload: text
    }
}

export function updateInvoiceTo(text) {
    return {
        type: UPDATE_INVOICE_TO,
        payload: text
    }
}

export function updateInvoiceHeader(text) {
    return {
        type: UPDATE_INVOICE_HEADER,
        payload: text
    }
}

export function updateInvoiceDate(text) {
    return {
        type: UPDATE_INVOICE_DATE,
        payload: text
    }
}

export function updateInvoiceValueInWords(text) {
    return {
        type: UPDATE_INVOICE_VALUE_IN_WORDS,
        payload: text
    }
}

export function updatePaymentType(text) {
    return {
        type: UPDATE_INVOICE_PAYMENT_TYPE,
        payload: text
    }
}

export function updateInvoiceAccountNumber(text) {
    return {
        type: UPDATE_INVOICE_ACCOUNT_NUMBER,
        payload: text
    }
}

// INVOICE ROWS ACTIONS
export function updateInvoiceRowLabels(row) {
    return {
        type: UPDATE_INVOICE_ROW_LABELS,
        payload: row
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

export function updateRowValue(row) {
    return {
        type: UPDATE_INVOICE_ROW,
        payload: row
    }
}

export function resetInvoiceRows() {
    return {
        type: RESET_INVOICE_ROWS,
        payload: []
    }
}

// AUTHENTICATION ACTIONS
export function signinUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({
                    type: AUTH_USER
                });

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