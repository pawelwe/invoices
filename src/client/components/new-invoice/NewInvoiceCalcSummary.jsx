import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {fullNettoValue, fullVatValue, fullBruttoValue}  from '../../store-getters';

class newInvoiceCalcSummary extends React.Component {
    render() {
        return (
            <ul className="invoice-calc-summary invoice-calc-row invoice-calc-row__summary">
                <li className="u-hidden invoice-calc-number"></li>
                <li className="u-hidden invoice-calc-name"></li>
                <li className="u-hidden invoice-calc-count"></li>
                <li className="invoice-calc-summary-output invoice-calc-price-netto u-bold u-left-border-light-gray u-no-left-border-mobile">RAZEM</li>
                <li className="invoice-calc-summary-output invoice-calc-value-netto">{fullNettoValue(this.props)}</li>
                <li className="invoice-calc-summary-output invoice-calc-vat">-</li>
                <li className="invoice-calc-summary-output invoice-calc-vat-value">{fullBruttoValue(this.props)}</li>
                <li className="invoice-calc-summary-output invoice-calc-full-value">{fullVatValue(this.props)}</li>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        services: state.invoice.activeInvoice.services
    }
}

export default connect(mapStateToProps, actions)(newInvoiceCalcSummary);