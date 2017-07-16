import axios from 'axios';
import { API_URL } from '../config';

import {
    LOADING_DATA,
} from './types';


// Ajax Actions
export function getTemplate() {
    return axios.get(`${API_URL}/invoice-template`, { headers: {'authorization': localStorage.getItem('token')}});
}

export function sendTemplate(data) {
    return axios({
        method: 'put',
        url: `${API_URL}/invoice-template`,
        headers: {'authorization': localStorage.getItem('token')},
        data: data
    });
}

export function getInvoices() {
    return axios.get(`${API_URL}/invoices-list`, { headers: {'authorization': localStorage.getItem('token')}});
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