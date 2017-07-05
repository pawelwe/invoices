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

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import { isEmpty } from './helpers/isEmpty'

class NewInvoice extends React.Component {
    componentWillMount() {
        if(isEmpty(this.props.match.params)) {
            console.log('Main route -> new-invoice');
            this.props.initInvoiceTemplate();
            this.props.setRoute({route: 'new-invoice', param: null});
        } else {
            console.log('Sub route...')
            const invoiceId = parseInt(this.props.match.params.id - 1);
            this.props.loadInvoice(invoiceId);
            this.props.setRoute({route: 'edit-invoice', param: this.props.match.params.id});
        }
        // this.props.authorizedRequest();
        this.props.fetchInvoicesList();
    }

    renderRows() {
        if(this.props.invoiceTemplate) {
            const rowsCount = this.props.invoiceTemplate.services.length;
            const rows = this.props.invoiceTemplate.services.map((row, index, key) => {
                return <InvoiceRow rowsCount={rowsCount} service={row} key={row.id} id={row.id} index={index + 1}/>
            });
            return rows;
        } else {
            return <span></span>
        }
    }

    addInvoiceRow(e) {
        e.preventDefault();
        this.props.addInvoiceRow({
            amount: '',
            id: Math.max.apply(Math, this.props.invoiceTemplate.services.map((item) => { return item.id })) + 1,
            priceNetto: '',
            vat: '',
            name: ''
        })
    }

    render() {

        if (!this.props.invoiceTemplate || this.props.invoiceTemplate === {}) {
            return <p>Loading...</p>;
        }

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