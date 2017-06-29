import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { renderInput } from './RenderInput';

class Signin extends React.Component {

    componentWillMount() {
        this.props.authError(null);
    }

    handleFormSubmit({email, password}) {
        console.log(email, password);
        this.props.signinUser({email, password});
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
            <main className="start-page">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
                    <button className="u-mt-20" action="submit">Sign in</button>
                </form>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    }
}

Signin = connect(
    mapStateToProps,
    actions
)(Signin);

export default reduxForm({
    form: 'signin'
})(Signin);