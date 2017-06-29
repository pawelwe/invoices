import {
    ADD_INVOICE_ROW,
    REMOVE_INVOICE_ROW,
    ROW_VALUE_UPDATE,
    RESET_INVOICE_ROWS
} from '../actions/types';


export default function(state = [], action) {
    switch (action.type) {
        case ADD_INVOICE_ROW:
            return [...state, ...[action.payload]]
        case REMOVE_INVOICE_ROW:
            return [
                ...state.filter((invoiceRow) => {
                    return invoiceRow.id !== action.payload;
                })
            ]
        case ROW_VALUE_UPDATE:
            let rowIndex = null;
            state.forEach((row, idx) => {
                if(row.id === action.payload.id)    {
                    rowIndex = idx;
                }
            });
            let oldRow = state[rowIndex];
            let newRow = Object.keys(oldRow).reduce((row, key) => {
                    if(key !== action.payload.key) {
                        row[key] = oldRow[key]
                    }
                    return row;
                },
                {
                    [action.payload.key]: action.payload.value,
                    id: action.payload.id
                });
            return [
                ...state.slice(0, rowIndex),
                newRow,
                ...state.slice(rowIndex + 1)
            ]
        case RESET_INVOICE_ROWS:
            return action.payload
        default:
            return state
    }
}