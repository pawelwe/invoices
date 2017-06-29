import React from 'react';

const newInvoiceFrom = (props) => {
    if(props.executive) {
        return (
            <div>
                <textarea defaultValue={props.executive} className="invoice-from u-text-right " rows="1"></textarea>
            </div>
        )
    } else {
        return <div></div>
    }
};

export default newInvoiceFrom;