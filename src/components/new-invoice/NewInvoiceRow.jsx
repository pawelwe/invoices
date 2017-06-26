import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class newInvoiceRow extends React.Component {

    removeInvoiceRow(id) {
        this.props.removeInvoiceRow(id);
    }

    updateRow(field, e) {
        this.props.rowValueUpdate({
            id: this.props.id,
            key: field,
            value: e.target.value
        });
    }

    calcValue() {
        let sum = (this.props.service.priceNetto * this.props.service.ammount).toFixed(2);
        return (
            <span className="invoice-calc-output invoice-calc-vat-value">{sum}</span>
        )
    }

    calcVat() {
        let sum = (((this.props.service.priceNetto * this.props.service.ammount) / 100) * this.props.service.vat).toFixed(2);
        return (
            <span className="invoice-calc-output invoice-calc-vat-value">{sum}</span>
        )
    }

    calcFullValue() {
        let sum = (this.props.service.priceNetto * this.props.service.ammount + ((this.props.service.priceNetto * this.props.service.ammount) / 100) * this.props.service.vat).toFixed(2);
        return (
            <span className="invoice-calc-output invoice-calc-full-value">{sum}</span>
        )
    }

    render() {
        if(this.props.service) {
            return (
                <li className="invoice-calc-row">
                    <span className="invoice-calc-output invoice-calc-number">{this.props.index}</span>
                    <span className="invoice-calc-input-wrap invoice-calc-name">
                        <span className="invoice-calc-input-wrap-label">Nazwa:</span>
                        <textarea rows="1" cols="1" className="invoice-calc-input" onChange={this.updateRow.bind(this, 'name')} value={this.props.name}></textarea>
                    </span>
                    <span className="invoice-calc-input-wrap invoice-calc-count">
                        <span className="invoice-calc-input-wrap-label">Ilość: </span>
                        <textarea rows="1" cols="1" className="invoice-calc-input" onChange={this.updateRow.bind(this, 'ammount')} value={this.props.ammount}></textarea>
                    </span>
                        <span className="invoice-calc-input-wrap invoice-calc-price-netto">
                        <span className="invoice-calc-input-wrap-label">Cena Netto: </span>
                        <textarea rows="1" cols="1" className="invoice-calc-input" onChange={this.updateRow.bind(this, 'priceNetto')} value={this.props.priceNetto}></textarea>
                    </span>
                        <span className="invoice-calc-output invoice-calc-value-netto">{this.calcValue()}</span>
                        <span className="invoice-calc-input-wrap invoice-calc-vat">
                        <span className="invoice-calc-input-wrap-label">VAT: </span>
                        <textarea rows="1" cols="1" className="invoice-calc-input" onChange={this.updateRow.bind(this, 'vat')} value={this.props.vat}></textarea>
                    </span>
                    {this.calcVat()}
                    {this.calcFullValue()}
                    <span onClick={this.removeInvoiceRow.bind(this, this.props.id)} className="invoice-calc-remove-row-btn">x</span>
                </li>
            )
        }
        else {
            return <span></span>
        }
    }
}

export default connect(null, actions)(newInvoiceRow);