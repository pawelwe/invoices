import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class newInvoiceRowHeader extends React.Component {

    handleRowUpdate(field, e) {
        this.props.updateInvoiceRowLabels({
            key: field,
            value: e.target.value
        });
    }

    render() {
        return (
            <header className="invoice-calc-row invoice-calc-row__header">
                <textarea rows="1" className="invoice-calc-input invoice-calc-number" onChange={this.handleRowUpdate.bind(this, 'nrLabel')} defaultValue={this.props.nrLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-name" onChange={this.handleRowUpdate.bind(this, 'serviceNameLabel')} defaultValue={this.props.serviceNameLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-count" onChange={this.handleRowUpdate.bind(this, 'amountLabel')} defaultValue={this.props.amountLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-price-netto" onChange={this.handleRowUpdate.bind(this, 'priceNettoLabel')} defaultValue={this.props.priceNettoLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-value-netto" onChange={this.handleRowUpdate.bind(this, 'valueNettoLabel')} defaultValue={this.props.valueNettoLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-vat" onChange={this.handleRowUpdate.bind(this, 'valRateLabel')} defaultValue={this.props.valRateLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-vat-value" onChange={this.handleRowUpdate.bind(this, 'valValueLabel')} defaultValue={this.props.valValueLabel}></textarea>
                <textarea rows="1" className="invoice-calc-input invoice-calc-full-value" onChange={this.handleRowUpdate.bind(this, 'fullValueLabel')} defaultValue={this.props.fullValueLabel}></textarea>
            </header>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nrLabel: state.invoice.activeInvoice.labels.nrLabel,
        serviceNameLabel: state.invoice.activeInvoice.labels.serviceNameLabel,
        amountLabel: state.invoice.activeInvoice.labels.amountLabel,
        priceNettoLabel: state.invoice.activeInvoice.labels.priceNettoLabel,
        valueNettoLabel: state.invoice.activeInvoice.labels.valueNettoLabel,
        valRateLabel: state.invoice.activeInvoice.labels.valRateLabel,
        valValueLabel: state.invoice.activeInvoice.labels.valValueLabel,
        fullValueLabel: state.invoice.activeInvoice.labels.fullValueLabel
    }
}

export default connect(mapStateToProps, actions)(newInvoiceRowHeader);