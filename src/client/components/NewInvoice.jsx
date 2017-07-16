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
import Preloader from './preloaders/preloader-1';
import { isEmpty } from '../helpers/isEmpty'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class NewInvoice extends React.Component {
    componentWillMount() {
        if(isEmpty(this.props.match.params)) {
            this.props.initInvoiceTemplate();
            this.props.setRoute({route: 'new-invoice', param: null});
        } else {
            const invoiceId = parseInt(this.props.match.params.id);
            this.props.loadInvoice(invoiceId);
            this.props.setRoute({route: 'edit-invoice', param: this.props.match.params.id});
        }
    }

    componentWillUnmount(){
        this.props.resetInvoice();
    }

    renderRows() {
        if(this.props.invoiceTemplate) {
            const rowsCount = this.props.invoiceTemplate.services.length;
            const rows = this.props.invoiceTemplate.services.map((row, index) => {
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
        if (this.props.dataIsLoading) {
            return (
                <div className="invoice">
                    <div className="invoice-form">
                        <Preloader />
                    </div>
                </div>
            );
        }

        return (
            <div className="invoice">
                <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnter={false} transitionLeave={false}>
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
                                <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                    { this.renderRows() }
                                </ReactCSSTransitionGroup>
                                <a href="#" className="invoice-calc-add-row-btn" onClick={(e) => this.addInvoiceRow(e)}>+</a>
                            </section>
                            <CalcSummary />
                            <MainSummary />
                        </section>
                        <footer className="placeholder"></footer>
                    </form>
                }
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        invoiceTemplate: state.invoice.activeInvoice,
        dataIsLoading: state.loadingData
    }
}

export default connect(mapStateToProps, actions)(NewInvoice);