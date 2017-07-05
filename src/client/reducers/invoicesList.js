import {
    FETCH_INVOICES_LIST,
    SAVE_INVOICE,
    DELETE_INVOICE
} from '../actions/types';


export default function(state = [], action) {
    switch (action.type) {
        case FETCH_INVOICES_LIST:
            return [
                ...action.payload,
            ]
        case SAVE_INVOICE:
            let savedInvoice = Object.assign({}, action.payload.activeInvoice);
            // New Invoice
            if (!action.payload.mode.param) {
                savedInvoice.id = parseInt(state.length + 1);
                savedInvoice.creationDate = new Date();
                return [
                    ...state, ...[savedInvoice]
                ]
            } else {
                // Update current invoice
                let udpatedState = state.slice();
                udpatedState[parseInt(action.payload.mode.param)-1] = savedInvoice;
                return udpatedState;
            }
        case DELETE_INVOICE:
            let updatedState = state.filter((item) => {
                return item.id !== action.payload;
            });
            return updatedState;
        default:
            return state
    }
}