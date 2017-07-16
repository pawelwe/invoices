import { PRELOADER_DELAY } from '../config';

import {
    FETCH_INVOICES_LIST,
    SORT_INVOICES,
    FILTER_INVOICES,
    RESET_FILTER
} from './types';

import { getInvoices, preload, sendInvoices } from './fetchingData';

import {toastr} from 'react-redux-toastr';
import {toastrOptions} from '../config';

// INVOICES LIST
export function fetchInvoicesList() {
    return function(dispatch) {
        dispatch(preload(true));
        getInvoices()
            .then(response => {
                if(response.data && response.data.invoicesList.length) {
                    toastr.info('Invoice loaded :)', toastrOptions);
                    dispatch({
                        type: FETCH_INVOICES_LIST,
                        payload: response.data.invoicesList
                    });
                } else {
                    dispatch({
                        type: FETCH_INVOICES_LIST,
                        payload: []
                    });
                }
                dispatch(preload(false, PRELOADER_DELAY));
            })
            .catch(error => {
                console.log(error);
                toastr.info('Problem with fetching the list :(', toastrOptions);
                dispatch({
                    type: FETCH_INVOICES_LIST,
                    payload: []
                });
            });
    }
}

export function sendInvoicesList(data) {
    return function(dispatch) {
        toastr.info('Invoices list saved :)', toastrOptions);
        sendInvoices(data)
            .then(response => {
                console.log(response);
                dispatch(preload(false, PRELOADER_DELAY));
            })
    }
}

export function sortInvoices(sortBy) {
    return function(dispatch, getState) {
        dispatch({
            type: SORT_INVOICES,
            payload: sortBy
        });
    }
}

export function filterInvoices(textInput) {
    return function(dispatch, getState) {
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