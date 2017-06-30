import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import invoiceReducer from './invoice'
import { reducer as form } from 'redux-form';


const invoiceApp = combineReducers({
    invoice: invoiceReducer,
    auth: authenticationReducer,
    form
})

export default invoiceApp