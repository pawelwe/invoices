import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Home extends React.Component {
    componentWillMount() {
        this.props.setRoute({route: 'home', param: null});
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
                </main>
            </ReactCSSTransitionGroup>
        );
    }
}

export default connect(null, actions)(Home);