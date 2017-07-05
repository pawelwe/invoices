import React from 'react';
import {fullBruttoValue}  from '../../store-getters';

const invoiceThumbMainSummary = (props) =>  {

    return (
        <section className="invoice-thumb-summary">
            <span className="invoice-thumb-summary-row u-bold invoice-thumb-calc-label">Do zapłaty: {fullBruttoValue(props)} zł</span>
            <span className="invoice-thumb-summary-row u-text-xs">{props.labels.valueInWords}</span>
            <span className="invoice-thumb-summary-row u-bold u-mt-15">{props.labels.paymentType}</span>
            <span className="invoice-thumb-summary-row u-text-xs">{props.labels.accountNumber}</span>
        </section>
    )
};

export default invoiceThumbMainSummary;