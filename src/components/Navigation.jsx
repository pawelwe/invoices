import React from 'react';
import { NavLink } from 'react-router-dom';
import owl from '../assets/images/logo-owl.svg';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Navigation extends React.Component {
    authButton() {
        if (this.props.authenticated) {
            return (
                <li className="main-nav-menu-list-item" key="0">
                    <a href="#" onClick={(e) => { e.preventDefault(); this.props.authenticate(false) }} className="main-nav-menu-list-item-link">Wyloguj się</a>
                </li>
            )
        } else {
            return (
                <li className="main-nav-menu-list-item" key="0">
                    <a href="#" onClick={(e) => { e.preventDefault(); this.props.authenticate(true) }} className="main-nav-menu-list-item-link">Zaloguj się</a>
                </li>
            )
        }
    }

    render() {

        return (
            <aside className="main-nav">
                <NavLink className="main-nav-menu-list-item-link" to="/">
                    <img src={owl} className="main-nav-logo" />
                </NavLink>
                <h1 className="main-nav-header">Fakturki</h1>
                <nav className="main-nav-menu">
                    <ul className="main-nav-menu-list">
                        <li className="main-nav-menu-list-item" key="1">
                            <NavLink className="main-nav-menu-list-item-link" to="new-invoice">Nowa fakturka</NavLink>
                        </li>
                        <li className="main-nav-menu-list-item" key="2">
                            <NavLink href="#" className="main-nav-menu-list-item-link" to="3">Zapisz jako wzór</NavLink>
                        </li>
                        <li className="main-nav-menu-list-item" key="3">
                            <NavLink href="#" className="main-nav-menu-list-item-link" to="4">Zapisz</NavLink>
                        </li>
                        <li className="main-nav-menu-list-item" key="4">
                            <NavLink className="main-nav-menu-list-item-link" to="5">Lista</NavLink>
                        </li>
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
        authenticated: state.authenticated
    }

}

export default connect(mapStateToProps, actions)(Navigation);