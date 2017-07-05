import React from 'react';

const invoiceDate = (props) =>  {
    return (
        <section className="u-text-left invoice-thumb-date">
            <span className="u-text-left invoice-thumb-date-date">{props.text}</span>
        </section>
    )
};

export default invoiceDate;