import {
    FETCH_INVOICE_TEMPLATE,
    SET_ACTIVE_INVOICE
} from '../actions/types';


export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_INVOICE_TEMPLATE:
            // console.log(action.payload)
            return Object.assign({}, state, action.payload);
        case SET_ACTIVE_INVOICE:
            return Object.assign({}, state, action.payload);
        default:
            return state
    }
}