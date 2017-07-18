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
import Pagination from './pagination/Pagination';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { toastr } from 'react-redux-toastr';

class InvoicesList extends React.Component {
    constructor() {
        super();
        this.state = {
            pageOfItems: []
        };
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        this.props.setRoute({route: 'invoices-list', param: null});
        this.props.initInvoicesList();
        this.props.resetInvoice();
    }

    componentWillUnmount() {
        this.props.resetFilter();
    }

    renderHeader() {
        if(this.props.invoicesList && this.props.invoicesList.length && !this.props.filtered) {
            return <h1 className="u-flex-1">Invoices list:</h1>
        } else if(this.props.filtered && this.props.invoicesList.length) {
            return <h1 className="u-flex-1">Matches: <span className="u-violet">{this.props.invoicesList.length}</span></h1>
        } else if(this.props.filtered && !this.props.invoicesList.length) {
            return <h1 className="u-flex-1">No Matches!</h1>
        } else {
            return <h1 className="u-flex-1">You have no invoices yes...</h1>
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
        const toastrConfirmOptions = {
            onOk: () => {
                this.props.deleteInvoice(invoiceId);
            },
            okText: 'Yes!',
            cancelText: 'No!'
        };
        toastr.confirm(`Really delete invoice number ${invoiceId}?`, toastrConfirmOptions);
    }

    sortInvoices(sortBy) {
        this.props.sortInvoices(sortBy);
    }

    filterInvoices() {
        this.props.resetFilter();
        if (this.filterInputText.value !== '') {
            this.props.filterInvoices(this.filterInputText.value);
        }
    }

    handleFilterInputChange(e) {
        e.key === 'Enter' ? this.filterInvoices() : null;
        e.target.value === '' ? this.resetFilter() : null;
    }

    resetFilter() {
        this.props.resetFilter();
        this.filterInputText.value = '';
    }

    onChangePage(pageOfItems) {
        this.setState({ pageOfItems: pageOfItems });
    }

    renderInvoicesList() {
        if(this.props.invoicesList) {
            return (
                <div>
                    <ul className="invoices-thumbs-list">
                        {this.state.pageOfItems.map(invoice =>
                            <li className="invoice-thumb" key={invoice.id}>
                                <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionEnter={false} transitionLeave={false} transitionAppearTimeout={2500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                                    <span onClick={this.deleteInvoice.bind(this, invoice.id)} className="invoice-thumb-remove">X</span>
                                    <form className="invoice-thumb-content" onClick={this.loadInvoice.bind(this, invoice.id)}>
                                        <h6 className="invoice-thumb-id">
                                            <span className="u-violet">{invoice.id}</span>
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
                                </ReactCSSTransitionGroup>
                            </li>
                        )}
                    </ul>
                    <Pagination items={this.props.invoicesList} onChangePage={this.onChangePage} />
                </div>
            )
        } else {
            return <div></div>
        }
    }

    renderSortSelect() {
        let sortDirArrow = ' ↓';
        if (this.props.sortDir !== null) { sortDirArrow = this.props.sortDir === 'DESC' ? ' ↓' : ' ↑'; }
        if (this.props.invoicesList && this.props.invoicesList.length > 1 || this.props.filtered) {
            return (
                <div className="u-flex-1">
                    <div className="u-text-center">
                        <h5 className="u-mb-5">Sort by:</h5>
                        <span>
                            <button className={'sortButton ' + (this.props.sortBy === 'id' ? 'is-active' : '')} onClick={this.sortInvoices.bind(this, 'id')}>ID</button>
                        </span>
                        <span>
                            <button className={'sortButton ' + (this.props.sortBy === 'creationDate' ? 'is-active' : '')} onClick={this.sortInvoices.bind(this, 'creationDate')}>Creation date</button>
                        </span>
                        <span>
                            <button className={'sortButton ' + (this.props.sortBy === 'invoiceTitle' ? 'is-active' : '')} onClick={this.sortInvoices.bind(this, 'invoiceTitle')}>Title</button>
                        </span>
                        <span className="sort-dir-arrow">
                        {sortDirArrow}
                    </span>
                    </div>
                </div>
            )
        }
    }

    renderFilter() {
        if (this.props.invoicesList && this.props.invoicesList.length > 1 || this.props.filtered) {
            return (
                <div className="u-flex-1 u-text-right">
                    <h5 className="u-text-center">Search:</h5>
                    <input ref={(input) => {this.filterInputText = input;}} onKeyUp={this.handleFilterInputChange.bind(this)} placeholder="Invoice title..." className="filter-input u-mt-5" type="text"/>
                    <button onClick={this.filterInvoices.bind(this)}>Apply</button>
                    <button onClick={this.resetFilter.bind(this)}>Clear</button>
                </div>
            )
        }
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
                <div>
                    <header className="invoices-thumbs-header">
                        {this.renderHeader()}
                        {this.renderSortSelect()}
                        {this.renderFilter()}
                    </header>
                    <ul className="invoices-thumbs-list">
                        <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionEnter={false} transitionLeave={false} transitionAppearTimeout={2500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                            {this.renderInvoicesList()}
                        </ReactCSSTransitionGroup>
                    </ul>
                    <footer className="placeholder"></footer>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        invoicesList: state.invoicesList.activeCollection,
        dataIsLoading: state.loadingData,
        sortDir: state.invoicesList.sortDir,
        sortBy: state.invoicesList.sortBy,
        filtered: state.invoicesList.filtered
    }
}

export default connect(mapStateToProps, actions)(InvoicesList);