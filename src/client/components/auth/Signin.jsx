import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { renderInput } from './RenderInput';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { toastr } from 'react-redux-toastr';
import { toastrOptions } from '../../config';

class Signin extends React.Component {
    componentWillMount() {
        this.props.authError(null);
        this.props.setRoute({route: 'signin', param: null});
    }

    componentWillUnmount() {
        if(this.props.currentUser) {
            toastr.info('Welcome back!', this.props.currentUser, toastrOptions);
        }
    }

    handleFormSubmit(formProps) {
        this.props.signinUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="error-text error-text__big">
                    <p>Ooops!</p>
                    {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionEnter={false} transitionLeave={false} transitionAppearTimeout={2500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                <main className="start-page">
                    <form autoComplete='off' onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <legend>- SIGNIN -</legend>
                        <fieldset>
                            <label htmlFor="email">Email</label>
                            <Field name="email" component={renderInput} type="text"/>
                        </fieldset>
                        <fieldset>
                            <label htmlFor="password">Password</label>
                            <Field name="password" component={renderInput} type="password"/>
                        </fieldset>
                        {this.renderAlert()}
                        <button className="button__key u-mt-20" action="submit">Sign in</button>
                    </form>
                </main>
            </ReactCSSTransitionGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        currentUser: state.auth.currentUser
    }
}

Signin = connect(
    mapStateToProps,
    actions
)(Signin);

export default reduxForm({
    form: 'signin'
})(Signin);