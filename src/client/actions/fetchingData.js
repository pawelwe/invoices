import axios from 'axios';
import { API_URL, PRELOADER_DELAY } from '../config';
import { toastr } from 'react-redux-toastr';
import { toastrOptions } from '../config';
import staticInvoiceTemplate from '../data/invoiceTemplate';
import { isEmpty } from '../helpers/isEmpty';

import {
    FETCH_INVOICE_TEMPLATE,
    FETCH_INVOICES_LIST,
    LOADING_DATA
} from './types';

// Ajax Actions
export function fetchTemplate() {
    return function(dispatch) {
        dispatch(preload(true));
        axios.get(`${API_URL}/invoice-template`, {headers: {'authorization': localStorage.getItem('token')}})
            .then(response => {
                if (response.data && !isEmpty(response.data.invoiceTemplate)) {
                    toastr.info('Server Template loaded :)', toastrOptions);
                    dispatch({
                        type: FETCH_INVOICE_TEMPLATE,
                        payload: response.data.invoiceTemplate
                    });
                    localStorage.setItem('invoiceTemplate', JSON.stringify(response.data.invoiceTemplate));
                    dispatch(preload(false, PRELOADER_DELAY));
                } else {
                    toastr.info('No server template, static template loaded!', toastrOptions);
                    dispatch({
                        type: FETCH_INVOICE_TEMPLATE,
                        payload: staticInvoiceTemplate
                    });
                    localStorage.setItem('invoiceTemplate', JSON.stringify(staticInvoiceTemplate));
                    dispatch(preload(false, PRELOADER_DELAY));
                }
            })
    }
}

export function sendTemplate(data) {
    return axios({
        method: 'put',
        url: `${API_URL}/invoice-template`,
        headers: {'authorization': localStorage.getItem('token')},
        data: data
    });
}

export function fetchInvoices() {
    return function(dispatch) {
        dispatch(preload(true));
        axios.get(`${API_URL}/invoices-list`, {headers: {'authorization': localStorage.getItem('token')}})
            .then(response => {
                if(response.data && response.data.invoicesList.length) {
                    toastr.info('Invoices list loaded :)', toastrOptions);
                    dispatch({
                        type: FETCH_INVOICES_LIST,
                        payload: response.data.invoicesList
                    });
                }
                localStorage.setItem('invoicesList', JSON.stringify(response.data.invoicesList));
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

export function sendInvoices(data) {
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

export function preload(check, delay) {
    return function(dispatch) {
        delay ? window.setTimeout(() => dispatch(loadingData(check)), delay) : dispatch(loadingData(check));
    }
}