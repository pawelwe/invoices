import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class invoiceDate extends React.Component {

    updateText(e) {
        this.props.updateInvoiceDate(e.target.value);
    }

    render() {
        return (
            <section className="u-text-left invoice-date">
                <textarea onChange={this.updateText.bind(this)} className="u-text-left invoice-date-date" rows="1" defaultValue={this.props.text}></textarea>
            </section>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        text: state.invoice.activeInvoice.invoiceDate
    }
}

export default connect(mapStateToProps, actions)(invoiceDate);