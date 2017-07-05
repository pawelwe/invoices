import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Home extends React.Component {
    componentWillMount() {
        this.props.setRoute({route: 'home', param: null});
    }

    render() {
        return (
            <main className="start-page">
                <h1 className="u-text-center">
                    <span>Welcome to</span>
                    <span className="u-violet u-bold"> INVOICES!</span>
                    <span className="u-text-xs u-top"> ©</span>
                </h1>
            </main>
        );
    }

}

export default connect(null, actions)(Home);