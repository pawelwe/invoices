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
                    <NavLink href="#" to="signin" className="main-nav-menu-list-item-link">Sign in</NavLink>
                </li>
            )
        } else {
            return (
                <li className="main-nav-menu-list-item" key="7">
                    <a href="#" onClick={(e) => { e.preventDefault(); this.props.signOutUser(); console.log('sign out'); }} className="main-nav-menu-list-item-link">Sign out</a>
                </li>
            )
        }
    }

    renderMenu() {
        if(this.props.authenticated) {
            return [
            <li className="main-nav-menu-list-item" key="1">
                <NavLink className="main-nav-menu-list-item-link" to="new-invoice">New Invoice</NavLink>
            </li>,
            <li className="main-nav-menu-list-item" key="2">
                <NavLink href="#" className="main-nav-menu-list-item-link" to="3">Save as a Template</NavLink>
            </li>,
            <li className="main-nav-menu-list-item" key="3">
                <NavLink href="#" className="main-nav-menu-list-item-link" to="4">Save Invoice</NavLink>
            </li>,
            <li className="main-nav-menu-list-item" key="4">
                <NavLink className="main-nav-menu-list-item-link" to="5">Invoices list</NavLink>
            </li>
            ]
        }
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
                                <NavLink className="main-nav-menu-list-item-link" to="signup">Sign up</NavLink>
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
        authenticated: state.auth.authenticated
    }

}

export default connect(mapStateToProps, actions)(Navigation);