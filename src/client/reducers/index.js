import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import invoiceReducer from './invoice';
import invoicesListReducer from './invoicesList'
import routingReducer from './routing';
import loadingDataReducer from './data';
import { reducer as form } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr';


const invoiceApp = combineReducers({
    auth: authenticationReducer,
    invoice: invoiceReducer,
    invoicesList: invoicesListReducer,
    routing: routingReducer,
    routerRouting: routerReducer,
    loadingData: loadingDataReducer,
    form,
    toastr: toastrReducer
})

export default invoiceApp