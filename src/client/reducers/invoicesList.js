import {
    FETCH_INVOICES_LIST,
    SAVE_INVOICE,
    DELETE_INVOICE,
    SORT_INVOICES,
    FILTER_INVOICES,
    RESET_FILTER
} from '../actions/types';

const defaultState = {
    sortDir: 'DESC',
    sortBy: '',
    filtered: false
}

export default function(state = defaultState, action) {
    switch (action.type) {
        case FETCH_INVOICES_LIST:
            return {
                ...state,
                serverCollection: action.payload,
                activeCollection: action.payload,
            }
        case SORT_INVOICES:
            let sortedCollection = state.activeCollection.slice();
            let sortBy = action.payload;
            let sortDir = state.sortDir === 'ASC' ? 'DESC' : 'ASC';
            sortedCollection.sort((first, second) => {
                const a = first[sortBy], b = second[sortBy];

                if (sortDir === 'DESC') {
                    if(a > b) { return 1 }
                    else if(a < b) { return -1 }
                    else { return 0 }
                } else {
                    if(a < b) { return 1 }
                    else if(a > b) { return -1 }
                    else { return 0; }
                }
            });
            return {
                ...state,
                activeCollection: sortedCollection,
                sortDir,
                sortBy
            }
        case FILTER_INVOICES:
            let phrase = action.payload;
            let searchPhrase = phrase.toLowerCase().split(' ');
            let oldCollection = state.activeCollection.slice();
            let newCollection = [];

            searchPhrase.filter((phrase) => {
                oldCollection.filter((invoice) => {
                    invoice.invoiceTitle.toLowerCase().includes(phrase) ? newCollection.push(invoice) : null;
                })
            });

            let filteredCollection = newCollection.filter((invoice, index, collection) => collection.findIndex((t) => {return t.id === invoice.id }) === index);
            return {
                ...state,
                activeCollection: filteredCollection,
                filtered: true
            }
        case RESET_FILTER:
            let originalCollection = state.serverCollection.slice();
            return {
                ...state,
                activeCollection: originalCollection,
                filtered: false
            }
        case SAVE_INVOICE:
            let savedInvoice = Object.assign({}, action.payload.activeInvoice);
            // New Invoice
            if (!action.payload.mode.param) {
                state.activeCollection.length ? savedInvoice.id = state.activeCollection[state.activeCollection.length - 1].id + 1 : savedInvoice.id = 1;
                savedInvoice.creationDate = new Date();
                return {
                    ...state,
                    activeCollection: [ ...state.activeCollection, ...[savedInvoice]]
                }
            } else {
                let oldCollection = state.activeCollection.slice();
                let newCollection = oldCollection;
                newCollection[parseInt(action.payload.mode.param) - 1] = savedInvoice;
                newCollection.modyficationDate = new Date();
                return {
                    ...state,
                    activeCollection: newCollection
                }
            }
        case DELETE_INVOICE:
            let updatedCollection = state.activeCollection.filter((item) => {
                return item.id !== action.payload;
            });
            return {
                ...state,
                activeCollection: updatedCollection
            }
        default:
            return state
    }
}