import {
    FETCH_INVOICE_TEMPLATE
} from '../actions/types';


export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_INVOICE_TEMPLATE:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}