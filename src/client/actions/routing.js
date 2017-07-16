import { push } from 'react-router-redux';

import {
    CHECK_ROUTE,
} from './types';

// Routing
export function setRoute(route) {
    return {
        type: CHECK_ROUTE,
        payload: route
    }
}

export function goTo(route) {
    return function(dispatch) {
        dispatch(push(route));
    }
}