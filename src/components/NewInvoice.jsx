import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions'

import NewInvoiceFrom from './new-invoice/NewInvoiceFrom.jsx'
// import invoiceTo from './new-invoice/NewInvoiceTo'
// import invoiceHeader from './new-invoice/NewInvoiceHeader'
// import invoiceDate from './new-invoice/NewInvoiceDate'
// import invoiceHeaderRow from './new-invoice/NewInvoiceHeaderRow'
// import invoiceRow from './new-invoice/NewInvoiceRow'
// import calcSummary from './new-invoice/NewInvoiceCalcSummary'
// import mainSummary from './new-invoice/NewInvoiceMainSummary'


class NewInvoice extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchInvoiceTemplate();
        console.log('init', this.props);
    }

    render() {
        return (
            <form className="invoice">
                <header>
                    Name:
                    { this.props.invoiceTemplate.name }
                    <NewInvoiceFrom />
                </header>
            </form>
        )


    }
}

const mapStateToProps = (state) => {
    return {
        invoiceTemplate: state.invoiceTemplate
    }
}

export default connect(mapStateToProps, actions)(NewInvoice);