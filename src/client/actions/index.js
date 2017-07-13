import axios from 'axios';
import {API_URL} from '../config';
import { push } from 'react-router-redux';
import staticInvoiceTemplate from '../data/invoiceTemplate';

import {
    INIT_INVOICE_TEMPLATE,
    LOAD_INVOICE,
    RESET_INVOICE,
    SAVE_INVOICE,
    DELETE_INVOICE,
    UPDATE_TEMPLATE,
    FETCH_INVOICES_LIST,
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
    AUTH_ERROR,
    CHECK_ROUTE,
    LOADING_DATA
} from './types';

// export function authorizedRequest() {
//     return function(dispatch) {
//         axios.get(API_URL, {
//             headers: {
//                 authorization: localStorage.getItem('token')
//             }
//         })
//             .then(response => {
//                 console.log(response.data.message);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
// }

// AJAX ACTIONS
function getTemplate() {
    return axios.get(`${API_URL}/invoice-template`, { headers: {'authorization': localStorage.getItem('token')}});
}

function sendTemplate(data) {
    return axios({
        method: 'put',
        url: `${API_URL}/invoice-template`,
        headers: {'authorization': localStorage.getItem('token')},
        data: data
    });
}

function getInvoices() {
    return axios.get(`${API_URL}/invoices-list`, { headers: {'authorization': localStorage.getItem('token')}});
}

function sendInvoices(data) {
    return axios({
        method: 'put',
        url: `${API_URL}/invoices-list`,
        headers: {'authorization': localStorage.getItem('token')},
        data: data
    });
}

// Preloader
export function loadingData(check) {
    return {
        type: LOADING_DATA,
        payload: check
    };
}

export function updateTemplate(newTemplate) {
    return function(dispatch) {
        dispatch(loadingData(true));
        sendTemplate(newTemplate)
            .then(response => {
                dispatch({
                    type: UPDATE_TEMPLATE,
                    payload: response.data.invoiceTemplate
                });
                dispatch(loadingData(false));
            })
    }
}

export function saveInvoice(data) {
    return function(dispatch, getState) {
        dispatch(loadingData(true));
        dispatch({
            type: SAVE_INVOICE,
            payload: data
        });
        const currentState = getState();
        dispatch(sendInvoicesList(currentState.invoicesList));
    }
}

export function sendInvoicesList(data) {
    return function(dispatch) {
        sendInvoices(data)
            .then(response => {
                console.log(response);
                dispatch(loadingData(false));
            })
    }
}

export function deleteInvoice(invoiceId) {
    return function(dispatch, getState) {
        dispatch(loadingData(true));
        dispatch({
            type: DELETE_INVOICE,
            payload: invoiceId
        });
        const currentState = getState();
        dispatch(sendInvoicesList(currentState.invoicesList));
    }
}

// Initialize invoice template (fetch invoice template & set it to active)
export function initInvoiceTemplate() {
    return function(dispatch) {
        dispatch(loadingData(true));
        getTemplate()
            .then(response => {
                dispatch(resetInvoice());
                console.log('1 -> reset');
                if(response.data && response.data !== {}) {
                    console.log('2 -> fetch invoice template');
                    dispatch({
                        type: INIT_INVOICE_TEMPLATE,
                        payload: response.data.invoiceTemplate
                    });
                    dispatch(loadingData(false));
                } else {
                    dispatch({
                        type: INIT_INVOICE_TEMPLATE,
                        payload: staticInvoiceTemplate
                    });
                    dispatch(loadingData(false));
                }
            })
            .catch(error => {
                dispatch({
                    type: INIT_INVOICE_TEMPLATE,
                    payload: staticInvoiceTemplate
                });
                dispatch(loadingData(false));
            })
    }
}

// Handle loading of invoice
export function loadInvoice(invoiceId) {
    return function(dispatch) {
        dispatch(loadingData(true));
        getInvoices()
            .then(response => {
                dispatch(resetInvoice());
                console.log('1 -> reset');
                if(response.data && response.data !== {}) {
                    console.log('2 -> fetch invoices list');
                    const invoice = response.data.invoicesList[invoiceId];
                    dispatch({
                        type: LOAD_INVOICE,
                        payload: invoice
                    });
                    dispatch(loadingData(false));
                }
            })
            .then(() => {
                console.log('3 -> go to route');
                dispatch(push(`/invoice-${invoiceId + 1}`));
            })
            .catch(error => {
            });
    }
}

export function resetInvoice() {
    return {
        type: RESET_INVOICE
    }
}

// INVOICES LIST
export function fetchInvoicesList() {
    return function(dispatch) {
        dispatch(loadingData(true));
        getInvoices()
            .then(response => {
                if(response.data && response.data !== {}) {
                    dispatch({
                        type: FETCH_INVOICES_LIST,
                        payload: response.data.invoicesList
                    });
                }
                dispatch(loadingData(false));
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: FETCH_INVOICES_LIST,
                    payload: []
                });
            });
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
        dispatch(loadingData(true));
        axios.post(`${API_URL}/signin`, { email, password })
            .then(response => {
                dispatch({
                    type: AUTH_USER
                });
                localStorage.setItem('token', response.data.token);
                dispatch(loadingData(false));
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
        localStorage.removeItem('token');
    }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        dispatch(loadingData(true));
        axios.post(`${API_URL}/signup`, { email, password })
            .then(response => {
                dispatch({
                    type: AUTH_USER
                });
                localStorage.setItem('token', response.data.token);
                dispatch(loadingData(false));
                dispatch(push('/new-invoice'));
            })
            .catch(response => {
                // console.info(response.response.data.error);
                dispatch(authError(response.response.data.error));
            });
    }
}

export function goTo(route) {
    return function(dispatch) {
        dispatch(push(route));
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

export function setRoute(route) {
    return {
        type: CHECK_ROUTE,
        payload: route
    }
}