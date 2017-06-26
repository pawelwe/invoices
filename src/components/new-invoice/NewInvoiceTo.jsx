import React from 'react';

const newInvoiceTo = (props) => {
    if(props.recipient) {
        return (
            <textarea defaultValue={props.recipient} className="invoice-to u-text-left" rows="7"></textarea>
        )
    } else {
        return <span></span>
    }
};

export default newInvoiceTo;