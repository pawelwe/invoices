import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { store } from '../index';
import { push } from 'react-router-redux';
import Moment from 'react-moment';

import InvoiceFrom from './invoices-list/InvoiceThumbFrom';
import InvoiceTo from './invoices-list/InvoiceThumbTo';
import InvoiceHeader from './invoices-list/InvoiceThumbHeader';
import InvoiceDate from './invoices-list/InvoiceThumbDate';
import InvoiceHeaderRow from './invoices-list/InvoiceThumbHeaderRow';
import InvoiceRow from './invoices-list/InvoiceThumbRow';
import CalcSummary from './invoices-list/InvoiceThumbCalcSummary';
import MainSummary from './invoices-list/InvoiceThumbMainSummary';
import Preloader from './preloaders/preloader-1';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {toastr} from 'react-redux-toastr';


class InvoicesList extends React.Component {
    componentWillMount() {
        this.props.fetchInvoicesList();
        this.props.setRoute({route: 'invoices-list', param: null});
        this.props.resetInvoice();
    }

    renderHeader() {
        if(this.props.invoicesList.length) {
            return (
                <h1>Invoices list:</h1>
            )
        } else {
            return (
                <h1>You have no invoices yet...</h1>
            )
        }
    }

    renderRows(invoice) {
        if(invoice) {
            const rows = invoice.services.map((row, index) => {
                return <InvoiceRow {...row} key={index} index={index} />
            });
            return rows;
        } else {
            return <span></span>
        }
    }

    loadInvoice(index) {
        store.dispatch(push(`/invoice-${index}`));
    }

    deleteInvoice(invoiceId) {
        console.log('Deleting invoice:', invoiceId);

        const toastrConfirmOptions = {
            onOk: () => {
                this.props.deleteInvoice(invoiceId);
            },
            okText: 'Yes!',
            cancelText: 'No!'
        };
        toastr.confirm(`Really delete invoice number ${invoiceId}?`, toastrConfirmOptions);
    }

    renderInvoicesList() {
        const invoicesList = this.props.invoicesList.map((invoice, index) => {
            return (
                <li className="invoice-thumb" key={invoice.id}>
                    <span onClick={this.deleteInvoice.bind(this, invoice.id)} className="invoice-thumb-remove">X</span>
                    <form className="invoice-thumb-content" onClick={this.loadInvoice.bind(this, invoice.id)}>
                        <h6 className="invoice-thumb-id">
                            <span className="u-violet">{index + 1}</span>
                            <span>. </span>
                            <span>
                                <Moment format='YYYY/MM/DD HH:mm'>{invoice.creationDate}</Moment>
                            </span>
                        </h6>
                        <header className="u-text-left">
                            <InvoiceFrom text={invoice.executive} />
                            <InvoiceTo text={invoice.recipient} />
                        </header>
                        <section className="invoice-thumb-data">
                            <InvoiceHeader text={invoice.invoiceTitle} />
                            <InvoiceDate text={invoice.invoiceDate} />
                            <div className="invoice-calc">
                                <InvoiceHeaderRow {...invoice.labels} />
                                <ul>
                                    {this.renderRows(invoice)}
                                </ul>
                            </div>
                            <CalcSummary services={invoice.services} />
                            <MainSummary services={invoice.services} labels={invoice} />
                        </section>
                        <footer className="placeholder"></footer>
                    </form>
                </li>
            )
        });
        return invoicesList;
    }

    render() {
        if (this.props.dataIsLoading) {
            return (
                <div className="invoices-thumbs">
                    <Preloader />
                </div>
            );
        }

        return (
            <main className="invoices-thumbs">
                <header>
                    {this.renderHeader()}
                </header>
                <ul className="invoices-thumbs-list">
                    <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionEnter={false} transitionLeave={false} transitionAppearTimeout={2500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                        {this.renderInvoicesList()}
                    </ReactCSSTransitionGroup>
                </ul>
                <footer className="placeholder"></footer>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        invoicesList: state.invoicesList,
        dataIsLoading: state.loadingData
    }
}

export default connect(mapStateToProps, actions)(InvoicesList);