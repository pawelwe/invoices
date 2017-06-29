import { combineReducers } from 'redux';
import invoiceTemplateReducer from './invoiceTemplate';
import invoiceRowsReducer from './invoiceRows';
import authenticationReducer from './authentication';
import { reducer as form } from 'redux-form';


const invoiceApp = combineReducers({
    invoiceTemplate: invoiceTemplateReducer,
    invoiceRows: invoiceRowsReducer,
    auth: authenticationReducer,
    form
})

export default invoiceApp