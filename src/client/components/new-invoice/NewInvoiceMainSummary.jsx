import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class newInvoiceMainSummary extends React.Component {

    updateValueInWords(e) {
        this.props.updateInvoiceValueInWords(e.target.value);
    }

    updatePaymentType(e) {
        this.props.updatePaymentType(e.target.value);
    }

    updateAccountNumber(e) {
        this.props.updateInvoiceAccountNumber(e.target.value);
    }

    render() {
        return (
            <section className="invoice-summary">
                <span rows="1" className="invoice-summary-row u-bold invoice-calc-label">Do zapłaty: zł</span>
                <textarea defaultValue={this.props.valueInWords} onChange={this.updateValueInWords.bind(this)} rows="1" className="invoice-summary-row u-text-xs"></textarea>
                <textarea defaultValue={this.props.paymentType} onChange={this.updatePaymentType.bind(this)} rows="1" className="invoice-summary-row u-bold u-mt-15"></textarea>
                <textarea defaultValue={this.props.accountNumber} onChange={this.updateAccountNumber.bind(this)} rows="1" className="invoice-summary-row u-text-xs"></textarea>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        valueInWords: state.invoice.activeInvoice.valueInWords,
        paymentType: state.invoice.activeInvoice.paymentType,
        accountNumber: state.invoice.activeInvoice.accountNumber
    }
}

export default connect(mapStateToProps, actions)(newInvoiceMainSummary);