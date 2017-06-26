import React from 'react';

const newInvoiceTo = (props) => {
    if(props.headerRowLabels) {
        return (
            <header className="invoice-calc-row invoice-calc-row__header">
                <textarea rows="1" className="invoice-calc-input invoice-calc-number" defaultValue={props.headerRowLabels.nrLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-name" defaultValue={props.headerRowLabels.serviceNameLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-count" defaultValue={props.headerRowLabels.amountLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-price-netto" defaultValue={props.headerRowLabels.priceNettoLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-value-netto" defaultValue={props.headerRowLabels.valueNettoLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-vat" defaultValue={props.headerRowLabels.valRateLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-vat-value" defaultValue={props.headerRowLabels.valValueLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-full-value" defaultValue={props.headerRowLabels.fullValueLabel}></textarea>
            </header>
        )
    }
    else {
        return <div></div>
    }
};

export default newInvoiceTo;