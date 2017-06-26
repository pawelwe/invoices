import React from 'react';

const newInvoiceTo = (props) => {
    return (
        <section className="u-text-left invoice-date">
            <textarea className="u-text-left invoice-date-date" rows="1" defaultValue={props.invoiceDate}></textarea>
        </section>
    )
};

export default newInvoiceTo;