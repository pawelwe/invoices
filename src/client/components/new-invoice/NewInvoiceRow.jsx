import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class newInvoiceRow extends React.Component {

    removeInvoiceRow(id) {
        this.props.removeInvoiceRow(id);
    }

    updateRow(field, e) {
        this.props.updateRowValue({
            id: this.props.id,
            key: field,
            value: e.target.value
        });
    }

    calcValue() {
        let sum = (this.props.service.priceNetto * this.props.service.ammount).toFixed(2);

        if(!isNaN(sum)) {
            return (
                <span className="invoice-calc-output invoice-calc-value-netto">{sum}</span>
            )
        } else {
            return (
                <span className="invoice-calc-output invoice-calc-value-netto">0.00</span>
            )
        }
    }

    calcVat() {
        let sum = (((this.props.service.priceNetto * this.props.service.ammount) / 100) * this.props.service.vat).toFixed(2);

        if(!isNaN(sum)) {
            return (
                <span className="invoice-calc-output invoice-calc-vat-value">{sum}</span>
            )
        } else {
            return (
                <span className="invoice-calc-output invoice-calc-vat-value">0.00</span>
            )
        }
    }

    calcFullValue() {
        let sum = (this.props.service.priceNetto * this.props.service.ammount + ((this.props.service.priceNetto * this.props.service.ammount) / 100) * this.props.service.vat).toFixed(2);

        if(!isNaN(sum)) {
            return (
                <span className="invoice-calc-output invoice-calc-full-value">{sum}</span>
            )
        } else {
            return (
                <span className="invoice-calc-output invoice-calc-full-value">0.00</span>
            )
        }
    }

    render() {
        if(this.props.service) {
            return (
                <li className="invoice-calc-row">
                    <span className="invoice-calc-output invoice-calc-number">{this.props.index}</span>
                    <span className="invoice-calc-input-wrap invoice-calc-name">
                        <span className="invoice-calc-input-wrap-label">Nazwa:</span>
                        <textarea rows="1" cols="1" className="invoice-calc-input" onChange={this.updateRow.bind(this, 'name')} value={this.props.name} ></textarea>
                    </span>
                    <span className={"invoice-calc-input-wrap invoice-calc-count " + (isNaN(this.props.service.ammount) || this.props.service.ammount === '' ? 'input-error' : '')}>
                        <span className="invoice-calc-input-wrap-label">Ilość: </span>
                        <textarea className="invoice-calc-input" rows="1" cols="1" onChange={this.updateRow.bind(this, 'ammount')} value={this.props.ammount}></textarea>
                    </span>
                    <span className={"invoice-calc-input-wrap invoice-calc-price-netto " + (isNaN(this.props.service.priceNetto) || this.props.service.priceNetto === '' ? 'input-error' : '')}>
                        <span className="invoice-calc-input-wrap-label">Cena Netto: </span>
                        <textarea className="invoice-calc-input" rows="1" cols="1" onChange={this.updateRow.bind(this, 'priceNetto')} value={this.props.priceNetto}></textarea>
                    </span>
                    <span className="invoice-calc-input-wrap invoice-calc-value-netto">{this.calcValue()}</span>
                    <span className={"invoice-calc-input-wrap invoice-calc-vat " + (isNaN(this.props.service.vat) || this.props.service.vat === ''  ? 'input-error' : '')}>
                        <span className="invoice-calc-input-wrap-label">VAT: </span>
                        <textarea className="invoice-calc-input" rows="1" cols="1" onChange={this.updateRow.bind(this, 'vat')} value={this.props.vat}></textarea>
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