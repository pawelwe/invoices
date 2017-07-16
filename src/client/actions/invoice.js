import { PRELOADER_DELAY } from '../config';
import { push } from 'react-router-redux';
import { sendTemplate, preload } from './fetchingData';
import { sendInvoicesList } from './invoicesList';

import {toastr} from 'react-redux-toastr';
import {toastrOptions} from '../config';

import {
    INIT_INVOICE_TEMPLATE,
    LOAD_INVOICE,
    RESET_INVOICE,
    SAVE_INVOICE,
    DELETE_INVOICE,
    UPDATE_TEMPLATE,
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
} from './types';



// Invoice
export function initInvoiceTemplate() {
    return function(dispatch) {
        dispatch(preload(true));
        dispatch(resetInvoice());
        dispatch({
            type: INIT_INVOICE_TEMPLATE,
            payload: JSON.parse(localStorage.getItem('invoiceTemplate'))
        });
        dispatch(preload(false, PRELOADER_DELAY));
    }
}

export function updateTemplate(newTemplate) {
    return function(dispatch) {
        dispatch(preload(true));
        sendTemplate(newTemplate)
            .then(response => {
                toastr.info('Template saved!', toastrOptions);
                dispatch({
                    type: UPDATE_TEMPLATE,
                    payload: response.data.invoiceTemplate
                });
                localStorage.setItem('invoiceTemplate', JSON.stringify(response.data.invoiceTemplate));
                dispatch(preload(false, PRELOADER_DELAY))
            })
    }
}

export function deleteInvoice(invoiceId) {
    return function(dispatch, getState) {
        dispatch(preload(true));
        dispatch({
            type: DELETE_INVOICE,
            payload: invoiceId
        });
        const currentState = getState();
        dispatch(sendInvoicesList(currentState.invoicesList.activeCollection));
    }
}

export function loadInvoice(invoiceId) {
    return function(dispatch) {
        dispatch(preload(true));
        const invoice = JSON.parse(localStorage.getItem('invoicesList')).filter(invoice => invoice.id === invoiceId);
        dispatch({
            type: LOAD_INVOICE,
            payload: invoice[0]
        });
        dispatch(push(`/invoice-${invoiceId}`));
        dispatch(preload(false, PRELOADER_DELAY))
    }
}

export function resetInvoice() {
    return {
        type: RESET_INVOICE
    }
}

export function saveInvoice(data) {
    return function(dispatch, getState) {
        dispatch(preload(true));
        dispatch({
            type: SAVE_INVOICE,
            payload: data
        });
        const currentState = getState();
        dispatch(sendInvoicesList(currentState.invoicesList.activeCollection));
    }
}

// BINDING USER INPUT
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