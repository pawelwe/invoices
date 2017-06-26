import React from 'react';

const newInvoiceHeader = (props) => {

        if(props.invoiceTitle) {
            return (
            <div>
                <textarea className="u-text-center invoice-header" rows="1" defaultValue={props.invoiceTitle}></textarea>
            </div>
            )
        } else {
            return <div></div>
        }


};

export default newInvoiceHeader;