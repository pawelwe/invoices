import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { renderInput } from './RenderInput';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Signup extends React.Component {

    componentWillMount() {
        this.props.authError(null);
        this.props.setRoute({route: 'signup', param: null});
    }

    handleFormSubmit(formProps) {
        this.props.signupUser(formProps);
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
        const { handleSubmit, submitting } = this.props;
        return (
            <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionEnter={false} transitionLeave={false} transitionAppearTimeout={2500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                <main className="start-page">
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <legend>- SIGNUP -</legend>
                        <Field name="email" type="text" component={renderInput} label="Email"/>
                        <Field name="password" type="password" component={renderInput} label="Password"/>
                        <Field name="passwordConfirm" type="password" component={renderInput} label="Confirm Password"/>
                        {this.renderAlert()}
                        <button type="submit" className="button__key u-mt-20" disabled={submitting}>Sign up</button>
                    </form>
                </main>
            </ReactCSSTransitionGroup>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

const validate = values => {

    const errors = {};

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password && values.password.length < 3) {
        errors.password = 'At least 3 characters';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Required';
    } else if (values.passwordConfirm && values.passwordConfirm.length < 3) {
        errors.passwordConfirm = 'At least 3 characters';
    }

    if (values.password !== values.passwordConfirm) {
        errors.passwordConfirm = 'Passwords do not match';
    }

    return errors;

}

Signup = connect(
    mapStateToProps,
    actions
)(Signup);

export default reduxForm({
    form: 'signup',
    validate
})(Signup);