import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import InvoiceFrom from './new-invoice/NewInvoiceFrom';
import InvoiceTo from './new-invoice/NewInvoiceTo';
import InvoiceHeader from './new-invoice/NewInvoiceHeader';
import InvoiceDate from './new-invoice/NewInvoiceDate';
import InvoiceHeaderRow from './new-invoice/NewInvoiceHeaderRow';
import InvoiceRow from './new-invoice/NewInvoiceRow';
// import calcSummary from './new-invoice/NewInvoiceCalcSummary';
// import mainSummary from './new-invoice/NewInvoiceMainSummary';


class NewInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceRows: 1,
            rowId: 1
        };
    }

    componentWillMount() {
        this.props.fetchInvoiceTemplate()
        this.props.resetInvoiceRows();
        this.props.addInvoiceRow({
            ammount: 1,
            id: this.state.invoiceRows,
            priceNetto: 0,
            vat: 0,
            name: ''
        });
    }

    renderRows() {

        if(this.props.invoiceRows.length > 0) {
            const rows = this.props.invoiceRows.map((row, index) => {
                return <InvoiceRow service={row} key={row.id} id={row.id} index={index + 1}/>
            });
            return rows;
        } else {
            return <span></span>
        }
    }

    addInvoiceRow(e) {
        e.preventDefault();
        // debugger
        const currentRowId = this.state.rowId;
        this.setState({
            rowId: currentRowId + 1
        },
            () => {
                this.props.addInvoiceRow({
                    ammount: 1,
                    id: this.state.rowId,
                    priceNetto: 0,
                    vat: 0,
                    name: ''
                })
            }
        );

    }

    render() {
        return (
            <form className="invoice">
                <header>
                    <InvoiceFrom executive={ this.props.invoiceTemplate.executive } />
                    <InvoiceTo recipient={ this.props.invoiceTemplate.recipient } />
                </header>
                <section className="invoice-data">
                    <InvoiceHeader invoiceTitle={ this.props.invoiceTemplate.invoiceTitle } />
                    <InvoiceDate invoiceDate={ this.props.invoiceTemplate.invoiceDate } />
                    <section className="invoice-calc">
                        <InvoiceHeaderRow headerRowLabels={ this.props.invoiceTemplate.labels }  />
                        { this.renderRows() }
                        <a href="#" className="invoice-calc-add-row-btn" onClick={this.addInvoiceRow.bind(this)}>+</a>
                    </section>
                </section>
                <footer className="placeholder"></footer>
            </form>
        )


    }
}

const mapStateToProps = (state) => {
    return {
        invoiceTemplate: state.invoiceTemplate,
        invoiceRows: state.invoiceRows
    }
}

export default connect(mapStateToProps, actions)(NewInvoice);