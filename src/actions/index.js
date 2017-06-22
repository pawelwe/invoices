import {
    FETCH_INVOICE_TEMPLATE
} from './types';

export function fetchInvoiceTemplate() {
    return {
        type: FETCH_INVOICE_TEMPLATE,
        payload: {
            id: 1,
            name: 'Pawel'
        }
    }
}

