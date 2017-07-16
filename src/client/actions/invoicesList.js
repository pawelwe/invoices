import { PRELOADER_DELAY } from '../config';

import {
    INIT_INVOICES_LIST,
    SORT_INVOICES,
    FILTER_INVOICES,
    RESET_FILTER
} from './types';

import { getInvoices, preload, sendInvoices } from './fetchingData';

import {toastr} from 'react-redux-toastr';
import {toastrOptions} from '../config';

// INVOICES LIST
export function initInvoicesList() {
    return function(dispatch) {
        dispatch(preload(true));
        dispatch({
            type: INIT_INVOICES_LIST,
            payload: JSON.parse(localStorage.getItem('invoicesList'))
        });
        dispatch(preload(false, PRELOADER_DELAY));
    }
}

export function sendInvoicesList(data) {
    return function(dispatch) {
        toastr.info('Invoice saved :)', toastrOptions);
        sendInvoices(data)
            .then(response => {
                console.log(response);
                localStorage.setItem('invoicesList', JSON.stringify(response.data.invoicesList));
                dispatch(preload(false, PRELOADER_DELAY));
            })
    }
}

export function sortInvoices(sortBy) {
    return function(dispatch) {
        dispatch({
            type: SORT_INVOICES,
            payload: sortBy
        });
    }
}

export function filterInvoices(textInput) {
    return function(dispatch) {
        dispatch({
            type: FILTER_INVOICES,
            payload: textInput
        });
    }
}

export function resetFilter() {
    return {
        type: RESET_FILTER
    };
}