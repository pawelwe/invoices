import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class newInvoiceHeader extends React.Component {

    updateText(e) {
        this.props.updateInvoiceHeader(e.target.value);
    }

    render() {
        if(this.props.text) {
            return (
                <div>
                    <textarea onChange={this.updateText.bind(this)} className="u-text-center invoice-header" rows="1" defaultValue={ this.props.text }></textarea>
                </div>
            )
        } else {
            return <div></div>
        }
    }

}

const mapStateToProps = (state) => {
    return {
        text: state.invoice.activeInvoice.invoiceTitle
    }
}

export default connect(mapStateToProps, actions)(newInvoiceHeader);;