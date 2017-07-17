import React from 'react';
import { NavLink } from 'react-router-dom';
import owl from '../assets/images/logo-owl.svg';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { toastr } from 'react-redux-toastr';
import { toastrOptions } from '../config';

class Navigation extends React.Component {
    authButton() {
        if (!this.props.authenticated) {
            return (
                <li className="main-nav-menu-list-item" key="7">
                    <NavLink href="#" to="signin" className={this.props.routing.route === 'signin' ? 'main-nav-menu-list-item-link is-current' : 'main-nav-menu-list-item-link'}>Sign in</NavLink>
                </li>
            )
        } else {
            return (
                <li className="main-nav-menu-list-item" key="7">
                    <a href="#" onClick={this.handleSignOut.bind(this)} className="main-nav-menu-list-item-link">Sign out</a>
                </li>
            )
        }
    }

    renderInvoiceMenu() {
        if(this.props.routing.route === 'new-invoice' || this.props.routing.route === 'edit-invoice') {
            return [
                <li className="main-nav-menu-list-item" key="2">
                    <a onClick={this.handleUpdateTemplate.bind(this)} href="#" className="main-nav-menu-list-item-link">Save as a Template</a>
                </li>,
                <li className="main-nav-menu-list-item" key="3">
                    <a onClick={this.handleSaveInvoices.bind(this)} href="#" className="main-nav-menu-list-item-link">Save Invoice</a>
                </li>,
            ]
        }
    }

    renderMenu() {
        if(this.props.authenticated && this.props.routing.route !== 'edit-invoice') {
            return [
            <li className="main-nav-menu-list-item" key="1">
                <NavLink className={this.props.routing.route === 'new-invoice' ? "main-nav-menu-list-item-link is-current" : "main-nav-menu-list-item-link"} to="new-invoice">New Invoice</NavLink>
            </li>,
            this.renderInvoiceMenu(),
            <li className="main-nav-menu-list-item" key="4">
                <NavLink className={this.props.routing.route === 'invoices-list' ? 'main-nav-menu-list-item-link is-current' : 'main-nav-menu-list-item-link'} to="invoices-list">Invoices list</NavLink>
            </li>
            ]
        }
        if(this.props.authenticated && this.props.routing.route === 'edit-invoice') {
            // New Invoice with confirm for edit mode
            return [
                <li className="main-nav-menu-list-item" key="1">
                    <a className="main-nav-menu-list-item-link" onClick={this.startNewInvoice.bind(this)}>New Invoice</a>
                </li>,
                this.renderInvoiceMenu(),
                <li className="main-nav-menu-list-item" key="4">
                    <NavLink className={this.props.routing.route === 'invoices-list' ? 'main-nav-menu-list-item-link is-current' : 'main-nav-menu-list-item-link'} to="invoices-list">Invoices list</NavLink>
                </li>
            ]
        }
    }

    startNewInvoice(e) {
        e.preventDefault();
        console.log('Start new invoice');
        const toastrConfirmOptions = {
            onOk: () => {
                this.props.goTo('/new-invoice');
            },
            okText: 'Yes!',
            cancelText: 'Nope'
        };
        toastr.confirm('Start a new Invoice?', toastrConfirmOptions);
    }

    handleSaveInvoices(e) {
        e.preventDefault();
        console.log('Saving invoice...');
        const toastrConfirmOptions = {
            onOk: () => {
                this.props.saveInvoice({
                    activeInvoice: this.props.activeInvoice,
                    mode: this.props.routing
                });
            },
            okText: 'Yes!',
            cancelText: 'Not yet...'
        };
        toastr.confirm('Save current invoice?', toastrConfirmOptions);
    }

    handleUpdateTemplate(e) {
        e.preventDefault();
        console.log('Updating template...');
        const toastrConfirmOptions = {
            onOk: () => {
                this.props.updateTemplate(this.props.activeInvoice);
            },
            okText: 'Yes!',
            cancelText: 'Not yet...'
        };
        toastr.confirm('Update the template?', toastrConfirmOptions);
    }

    handleSignOut(e) {
        e.preventDefault();
        const toastrConfirmOptions = {
            onOk: () => {
                toastr.info('Good bye!', toastrOptions);

                this.props.signOutUser();
            },
            okText: 'Yes!',
            cancelText: 'Not yet...'
        };
        toastr.confirm('Do you want to sign out?', toastrConfirmOptions);
    }

    render() {
        return (
            <aside className="main-nav">
                <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionEnter={false} transitionLeave={false} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    <NavLink className="main-nav-menu-list-item-link" to="/dashboard">
                        <img src={owl} className="main-nav-logo" />
                    </NavLink>
                    <h1 className="main-nav-header">Invoices</h1>
                    <nav className="main-nav-menu">
                        <ul className="main-nav-menu-list">
                            { this.renderMenu() }
                            { !this.props.authenticated &&
                                <li className="main-nav-menu-list-item" key="5">
                                    <NavLink className={this.props.routing.route === 'signup' ? 'main-nav-menu-list-item-link is-current' : 'main-nav-menu-list-item-link'} to="signup">Sign up</NavLink>
                                </li>
                            }
                            { this.authButton() }
                        </ul>
                    </nav>
                    <footer className="main-nav-footer">
                        <span>Copyright Sopi</span>
                        <span className="u-violet">&</span>Pablo
                    </footer>
                </ReactCSSTransitionGroup>
            </aside>
        );
    }
}
function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        routing: state.routing,
        activeInvoice: state.invoice.activeInvoice,
        invoicesList: state.invoicesList
    }
}
export default connect(mapStateToProps, actions)(Navigation);