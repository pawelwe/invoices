import { combineReducers } from 'redux';
import invoiceTemplateReducer from './invoiceTemplate';
import invoiceRowsReducer from './invoiceRows';
import authenticationReducer from './authentication'


const invoiceApp = combineReducers({
    invoiceTemplate: invoiceTemplateReducer,
    invoiceRows: invoiceRowsReducer,
    authenticated: authenticationReducer
})

export default invoiceApp