import React from 'react';
import { NavLink } from 'react-router-dom';
import owl from '../assets/images/logo-owl.svg';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Navigation extends React.Component {
    authButton() {
        if (!this.props.authenticated) {
            return (
                <li className="main-nav-menu-list-item" key="7">
                    <NavLink href="#" to="signin" className={this.props.route === 'signin' ? 'main-nav-menu-list-item-link is-current' : 'main-nav-menu-list-item-link'}>Sign in</NavLink>
                </li>
            )
        } else {
            return (
                <li className="main-nav-menu-list-item" key="7">
                    <a href="#" onClick={(e) => { e.preventDefault(); this.props.signOutUser(); }} className="main-nav-menu-list-item-link">Sign out</a>
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
        if(this.props.authenticated) {
            return [
            <li className="main-nav-menu-list-item" key="1">
                <NavLink className={this.props.route === 'new-invoice' ? "main-nav-menu-list-item-link is-current" : "main-nav-menu-list-item-link"} to="new-invoice">New Invoice</NavLink>
            </li>,
            this.renderInvoiceMenu(),
            <li className="main-nav-menu-list-item" key="4">
                <NavLink className={this.props.route === 'invoices-list' ? 'main-nav-menu-list-item-link is-current' : 'main-nav-menu-list-item-link'} to="invoices-list">Invoices list</NavLink>
            </li>
            ]
        }
    }

    handleSaveInvoices(e) {
        e.preventDefault();
        console.log('Saving invoice...');
        this.props.saveInvoice({
            activeInvoice: this.props.activeInvoice,
            mode: this.props.routing
        });
    }

    handleUpdateTemplate(e) {
        e.preventDefault();
        console.log('Updating template...');
        this.props.updateTemplate(this.props.activeInvoice);
    }

    render() {
        return (
            <aside className="main-nav">
                <NavLink className="main-nav-menu-list-item-link" to="/">
                    <img src={owl} className="main-nav-logo" />
                </NavLink>
                <h1 className="main-nav-header">Invoices</h1>
                <nav className="main-nav-menu">
                    <ul className="main-nav-menu-list">
                        { this.renderMenu() }
                        { !this.props.authenticated &&
                            <li className="main-nav-menu-list-item" key="5">
                                <NavLink className={this.props.route === 'signup' ? 'main-nav-menu-list-item-link is-current' : 'main-nav-menu-list-item-link'} to="signup">Sign up</NavLink>
                            </li>
                        }
                        { this.authButton() }
                    </ul>
                </nav>
                <footer className="main-nav-footer">
                    <span>Copyright Sopi</span>
                    <span className="u-violet">&</span>Pablo
                </footer>
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