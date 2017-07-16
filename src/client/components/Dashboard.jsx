import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Home extends React.Component {
    componentWillMount() {
        this.props.fetchTemplate();
        this.props.fetchInvoices();
        this.props.initInvoicesList();
        this.props.setRoute({route: 'home', param: null});
    }
    renderInfoTable() {
        return (
            <div className="u-mt-20">
                <p>Logged as: <span className="u-violet">{this.props.currentUser}</span></p>
                {this.props.invoicesList && this.props.invoicesList.length ?
                <p>Invoices: <span className="u-violet">{this.props.invoicesList.length}</span></p> : <p>No Invoices yet</p>
                }
            </div>
        )
    }
    render() {
        return (
            <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionEnter={false} transitionLeave={false} transitionAppearTimeout={2500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                <main className="start-page">
                    <h1 className="u-text-center">
                        <span>Welcome to</span>
                        <span className="u-violet u-bold"> INVOICES!</span>
                        <span className="u-text-xs u-top"> ©</span>
                    </h1>
                    {this.renderInfoTable()}
                </main>
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        invoiceTemplate: state.invoice.activeInvoice,
        invoicesList: state.invoicesList.serverCollection,
        dataIsLoading: state.loadingData,
        currentUser: localStorage.getItem('user')
    }
}

export default connect(mapStateToProps, actions)(Home);