import {
    LOADING_DATA
} from '../actions/types';


export default function(state = false, action) {
    switch (action.type) {
        case LOADING_DATA:
            return action.payload
        default:
            return state
    }
}