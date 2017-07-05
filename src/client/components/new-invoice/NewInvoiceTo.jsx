import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class newInvoiceTo extends React.Component {

    updateText(e) {
        this.props.updateInvoiceTo(e.target.value);
    }

    render() {
        return (
            <textarea onChange={this.updateText.bind(this)} defaultValue={this.props.text} className="invoice-to u-text-left" rows="7"></textarea>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        text: state.invoice.activeInvoice.recipient
    }
}

export default connect(mapStateToProps, actions)(newInvoiceTo);