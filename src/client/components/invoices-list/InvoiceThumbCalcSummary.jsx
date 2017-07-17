import React from 'react';
import {fullNettoValue, fullVatValue, fullBruttoValue}  from '../../store-getters';

const invoiceThumbCalcSummary = (props) =>  {
    return (
        <ul className="invoice-calc-thumb-summary invoice-thumb-calc-row invoice-thumb-calc-row__summary">
            <li className="u-hidden invoice-thumb-calc-number"></li>
            <li className="u-hidden invoice-thumb-calc-name"></li>
            <li className="u-hidden invoice-thumb-calc-count"></li>
            <li className="invoice-thumb-calc-summary-output invoice-thumb-calc-price-netto u-bold u-left-border-light-gray">RAZEM</li>
            <li className="invoice-thumb-calc-summary-output invoice-thumb-calc-value-netto">{fullNettoValue(props)}</li>
            <li className="invoice-thumb-calc-summary-output invoice-thumb-calc-vat">-</li>
            <li className="invoice-thumb-calc-summary-output invoice-thumb-calc-vat-value">{fullVatValue(props)}</li>
            <li className="invoice-thumb-calc-summary-output invoice-thumb-calc-full-value">{fullBruttoValue(props)}</li>
        </ul>
    )
}

export default invoiceThumbCalcSummary;