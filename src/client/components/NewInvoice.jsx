import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import InvoiceFrom from './new-invoice/NewInvoiceFrom';
import InvoiceTo from './new-invoice/NewInvoiceTo';
import InvoiceHeader from './new-invoice/NewInvoiceHeader';
import InvoiceDate from './new-invoice/NewInvoiceDate';
import InvoiceHeaderRow from './new-invoice/NewInvoiceHeaderRow';
import InvoiceRow from './new-invoice/NewInvoiceRow';
import CalcSummary from './new-invoice/NewInvoiceCalcSummary';
import MainSummary from './new-invoice/NewInvoiceMainSummary';


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
        // this.props.authorizedRequest();
    }

    renderRows() {
        if(this.props.invoiceTemplate) {
            const rows = this.props.invoiceTemplate.services.map((row, index) => {
                return <InvoiceRow service={row} key={row.id} id={row.id} index={index + 1}/>
            });
            return rows;
        } else {
            return <span></span>
        }
    }

    addInvoiceRow(e) {
        e.preventDefault();
        const currentRowId = this.state.rowId;
        this.setState({
            rowId: currentRowId + 1
        },
            () => {
                this.props.addInvoiceRow({
                    ammount: '',
                    id: this.state.rowId,
                    priceNetto: '',
                    vat: '',
                    name: ''
                })
            }
        );
    }

    render() {
        return (
            <div className="invoice">
                {this.props.invoiceTemplate &&
                <form className="invoice-form">
                    <header>
                        <InvoiceFrom />
                        <InvoiceTo />
                    </header>
                    <section className="invoice-data">
                        <InvoiceHeader />
                        <InvoiceDate />
                        <section className="invoice-calc">
                            <InvoiceHeaderRow />
                            { this.renderRows() }
                            <a href="#" className="invoice-calc-add-row-btn" onClick={(e) => this.addInvoiceRow(e)}>+</a>
                        </section>
                        <CalcSummary />
                        <MainSummary />
                    </section>
                    <footer className="placeholder"></footer>
                </form>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        invoiceTemplate: state.invoice.activeInvoice
    }
}

export default connect(mapStateToProps, actions)(NewInvoice);