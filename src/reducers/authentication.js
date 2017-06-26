import {
    AUTHENTICATE
} from '../actions/types';


export default function(state = false, action) {
    switch (action.type) {
        case AUTHENTICATE:
            return action.payload;
        default:
            return state
    }
}