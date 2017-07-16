import React from 'react';

export const renderInput = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset>
        <label>{label}</label>
        <input {...input} type={type} className={touched && error ? 'error' : ''} autoCorrect='off' spellCheck='off' autoComplete='new-password' />
        {touched && error && <div className="error-text">{error}</div>}
    </fieldset>
)