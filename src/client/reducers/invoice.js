import {
    FETCH_INVOICE_TEMPLATE,
    INIT_INVOICE_TEMPLATE,
    UPDATE_TEMPLATE,
    LOAD_INVOICE,
    RESET_INVOICE,
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
    UPDATE_INVOICE_ROW
} from '../actions/types';


export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_INVOICE_TEMPLATE:
            return {
                ...state,
                invoiceTemplate: { ...action.payload },
            }
        case INIT_INVOICE_TEMPLATE:
            return {
                ...state,
                activeInvoice: { ...action.payload }
            }
        case UPDATE_TEMPLATE:
            return {
                ...state,
                invoiceTemplate: { ...action.payload }
            }
        case LOAD_INVOICE:
            return {
                ...state,
                activeInvoice: { ...action.payload }
            }
        case RESET_INVOICE:
            return {
                ...state,
                activeInvoice: null
            }
        case UPDATE_INVOICE_FROM:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    executive: action.payload
                }
            }
        case UPDATE_INVOICE_TO:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    recipient: action.payload
                }
            }
        case UPDATE_INVOICE_HEADER:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    invoiceTitle: action.payload
                }
            }
        case UPDATE_INVOICE_DATE:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    invoiceDate: action.payload
                }
            }
        case UPDATE_INVOICE_PAYMENT_TYPE:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    paymentType: action.payload
                }
            }
        case UPDATE_INVOICE_VALUE_IN_WORDS:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    valueInWords: action.payload
                }
            }
        case UPDATE_INVOICE_ACCOUNT_NUMBER:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    accountNumber: action.payload
                }
            }
        case ADD_INVOICE_ROW:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    services: [...state.activeInvoice.services, ...[action.payload]]
                }
            }
        case REMOVE_INVOICE_ROW:
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    services: [...state.activeInvoice.services.filter((invoiceRow) => {
                        return invoiceRow.id !== action.payload;
                    })]
                }
            }
        case UPDATE_INVOICE_ROW:
            let rowIndex = null;
            state.activeInvoice.services.forEach((row, idx) => {
                if(row.id === action.payload.id)    {
                    rowIndex = idx;
                }
            });
            let oldRow = state.activeInvoice.services[rowIndex];
            let newRow = Object.keys(oldRow).reduce((row, key) => {
                    if(key !== action.payload.key) {
                        row[key] = oldRow[key]
                    }
                    return row;
                },
                {
                    [action.payload.key]: action.payload.value,
                    id: action.payload.id
                });
            return {
                ...state,
                activeInvoice: {
                    ...state.activeInvoice,
                    services: [
                        ...state.activeInvoice.services.slice(0, rowIndex),
                        newRow,
                        ...state.activeInvoice.services.slice(rowIndex + 1)
                    ]
                }
            }
        case UPDATE_INVOICE_ROW_LABELS:
            return Object.assign({}, state, {
                activeInvoice: {
                    ...state.activeInvoice,
                    labels: {
                        ...state.activeInvoice.labels,
                        [action.payload.key]: action.payload.value
                    }
                }
            })
        default:
            return state
    }
}