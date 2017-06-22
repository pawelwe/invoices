import { combineReducers } from 'redux'
import invoiceTemplateReducer from './invoiceTemplate'


const invoiceApp = combineReducers({
    invoiceTemplate: invoiceTemplateReducer
})

export default invoiceApp