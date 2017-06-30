import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class newInvoiceCalcSummary extends React.Component {

    renderNettoValue() {
        let fullNettoValue = this.props.services.reduce((a, b) => {
            return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.ammount))).toFixed(2);
        }, 0);

        if (!isNaN(fullNettoValue)) {
            return (
                <span>{fullNettoValue}</span>
            )
        } else {
            return (
                <span>0.00</span>
            )
        }
    }

    renderVatValue() {
        let fullVatValue = this.props.services.reduce((a, b) => {
            return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.ammount) / 100) * b.vat).toFixed(2);
        }, 0);

        if (!isNaN(fullVatValue)) {
            return (
                <span>{fullVatValue}</span>
            )
        } else {
            return (
                <span>0.00</span>
            )
        }
    }

    renderBruttoValue() {
        let fullBruttoValue = this.props.services.reduce((a, b) => {
            return (parseInt(a) + (parseInt(b.priceNetto) * parseInt(b.ammount)) + ((b.priceNetto * b.ammount) / 100) * b.vat).toFixed(2);
        }, 0);

        if (!isNaN(fullBruttoValue)) {
            return (
                <span>{fullBruttoValue}</span>
            )
        } else {
            return (
                <span>0.00</span>
            )
        }
    }

    render() {
        return (
            <ul className="invoice-calc-summary invoice-calc-row invoice-calc-row__summary">
                <li className="u-hidden invoice-calc-number"></li>
                <li className="u-hidden invoice-calc-name"></li>
                <li className="u-hidden invoice-calc-count"></li>
                <li className="invoice-calc-summary-output invoice-calc-price-netto u-bold u-left-border-light-gray u-no-left-border-mobile">RAZEM</li>
                <li className="invoice-calc-summary-output invoice-calc-value-netto">{this.renderNettoValue()}</li>
                <li className="invoice-calc-summary-output invoice-calc-vat">-</li>
                <li className="invoice-calc-summary-output invoice-calc-vat-value">{this.renderVatValue()}</li>
                <li className="invoice-calc-summary-output invoice-calc-full-value">{this.renderBruttoValue()}</li>
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