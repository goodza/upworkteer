/// <reference types="react" />
/**
 * Wrapper around react-final-form's Form to handle redirection on submit,
 * legacy defaultValue prop, and array inputs.
 *
 * Requires a render function, just like react-final-form
 *
 * @example
 *
 * const SimpleForm = props => (
 *    <FormWithRedirect
 *        {...props}
 *        render={formProps => <SimpleFormView {...formProps} />}
 *    />
 * );
 *
 * @typedef {Object} Props the props you can use (other props are injected by Create or Edit)
 * @prop {Object} initialValues
 * @prop {Function} validate
 * @prop {Function} save
 * @prop {boolean} submitOnEnter
 * @prop {string} redirect
 *
 * @param {Prop} props
 */
declare const FormWithRedirect: ({ initialValues, debug, decorators, defaultValue, form, initialValuesEqual, keepDirtyOnReinitialize, mutators, record, render, save, saving, subscription, validate, validateOnBlur, version, ...props }: {
    [x: string]: any;
    initialValues: any;
    debug: any;
    decorators: any;
    defaultValue: any;
    form: any;
    initialValuesEqual: any;
    keepDirtyOnReinitialize?: boolean;
    mutators?: any;
    record: any;
    render: any;
    save: any;
    saving: any;
    subscription?: {
        submitting: boolean;
        pristine: boolean;
        valid: boolean;
        invalid: boolean;
    };
    validate: any;
    validateOnBlur: any;
    version: any;
}) => JSX.Element;
export default FormWithRedirect;
