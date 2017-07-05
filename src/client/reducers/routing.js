import {
    CHECK_ROUTE
} from '../actions/types';


export default function(state = {}, action) {
    switch (action.type) {
        case CHECK_ROUTE:
            return {
                ...action.payload
            };
        default:
            return state
    }
}