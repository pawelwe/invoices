import React from 'react';

const invoiceThumbHeaderRow = (props) =>  {
    return (
        <header className="invoice-thumb-calc-row invoice-thumb-calc-row__header">
            <span className="invoice-thumb-calc-input invoice-thumb-calc-number">{props.nrLabel}</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-name">{props.serviceNameLabel}</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-count">{props.amountLabel}</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-price-netto">{props.priceNettoLabel}</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-value-netto">{props.valueNettoLabel}</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-vat">{props.valRateLabel}</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-vat-value">{props.valValueLabel}</span>
            <span className="invoice-thumb-calc-input invoice-thumb-calc-full-value">{props.fullValueLabel}</span>
        </header>
    )
}

export default invoiceThumbHeaderRow;