import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import invoiceReducer from './invoice';
import invoicesListReducer from './invoicesList'
import routingReducer from './routing';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';


const invoiceApp = combineReducers({
    auth: authenticationReducer,
    invoice: invoiceReducer,
    invoicesList: invoicesListReducer,
    routing: routingReducer,
    routerRouting: routerReducer,
    form
})

export default invoiceApp