import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class newInvoiceFrom extends React.Component {
    updateText(e) {
        this.props.updateInvoiceFrom(e.target.value);
    }

    render() {
        return (
            <div>
                <textarea onChange={this.updateText.bind(this)} defaultValue={ this.props.text } className="invoice-from u-text-right " rows="1"></textarea>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        text: state.invoice.activeInvoice.executive
    }
}

export default connect(mapStateToProps, actions)(newInvoiceFrom);