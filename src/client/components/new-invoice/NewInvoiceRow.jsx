import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {nettoValue, vatValue, bruttoValue}  from '../../store-getters';

class newInvoiceRow extends React.Component {

    removeInvoiceRow(id) {
        if(this.props.rowsCount > 1) {
            this.props.removeInvoiceRow(id);
        }
    }

    updateRow(field, e) {
        this.props.updateRowValue({
            id: this.props.id,
            key: field,
            value: e.target.value
        });
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
                    <span className={"invoice-calc-input-wrap invoice-calc-count " + (isNaN(this.props.service.amount) || this.props.service.amount === '' ? 'input-error' : '')}>
                        <span className="invoice-calc-input-wrap-label">Ilość: </span>
                        <textarea className="invoice-calc-input" rows="1" cols="1" onChange={this.updateRow.bind(this, 'amount')} value={this.props.amount}></textarea>
                    </span>
                    <span className={"invoice-calc-input-wrap invoice-calc-price-netto " + (isNaN(this.props.service.priceNetto) || this.props.service.priceNetto === '' ? 'input-error' : '')}>
                        <span className="invoice-calc-input-wrap-label">Cena Netto: </span>
                        <textarea className="invoice-calc-input" rows="1" cols="1" onChange={this.updateRow.bind(this, 'priceNetto')} value={this.props.priceNetto}></textarea>
                    </span>
                    <span className="invoice-calc-input-wrap invoice-calc-value-netto">
                        <span className="invoice-calc-output invoice-calc-value-netto">{nettoValue(this.props.service)}</span>
                    </span>
                    <span className={"invoice-calc-input-wrap invoice-calc-vat " + (isNaN(this.props.service.vat) || this.props.service.vat === ''  ? 'input-error' : '')}>
                        <span className="invoice-calc-input-wrap-label">VAT: </span>
                        <textarea className="invoice-calc-input" rows="1" cols="1" onChange={this.updateRow.bind(this, 'vat')} value={this.props.vat}></textarea>
                    </span>
                    <span className="invoice-calc-output invoice-calc-vat-value">{vatValue(this.props.service)}</span>
                    <span className="invoice-calc-output invoice-calc-full-value">{bruttoValue(this.props.service)}</span>
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