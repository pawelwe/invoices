import React from 'react';
import { nettoValue, vatValue, bruttoValue }  from '../../store-getters';

const invoiceThumbRow = (props) =>  {
    return (
        <li className="invoice-thumb-calc-row">
            <span className="invoice-thumb-calc-output invoice-thumb-calc-number">{ props.index + 1 }</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-name">{ props.name }</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-count">{ props.amount }</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-price-netto">{ props.priceNetto }</span>
            <span className="invoice-thumb-calc-output invoice-thumb-calc-value-netto">{ nettoValue(props) }</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-vat">{ props.vat }</span>
            <span className="invoice-thumb-calc-output invoice-thumb-calc-vat-value">{ vatValue(props) }</span>
            <span className="invoice-thumb-calc-output invoice-thumb-calc-full-value">{ bruttoValue(props) }</span>
        </li>
    )
}

export default invoiceThumbRow;