export const validate = values => {

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