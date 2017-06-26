import axios from 'axios';

import {
    FETCH_INVOICE_TEMPLATE,
    ADD_INVOICE_ROW,
    REMOVE_INVOICE_ROW,
    SET_ACTIVE_INVOICE,
    ROW_VALUE_UPDATE,
    AUTHENTICATE,
    RESET_INVOICE_ROWS
} from './types';

export function fetchInvoiceTemplate() {
    const webRequest = axios.get('https://fakturki-1cbae.firebaseio.com/invoice-template.json');
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
    return{
        type: ROW_VALUE_UPDATE,
        payload: row
    }
}

export function authenticate(isLoggedIn) {
    return{
        type: AUTHENTICATE,
        payload: isLoggedIn
    }
}

export function resetInvoiceRows() {
    return{
        type: RESET_INVOICE_ROWS,
        payload: []
    }
}

