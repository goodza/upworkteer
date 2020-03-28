import { useEffect } from 'react';
import { useForm } from 'react-final-form';
/**
 * Restore the record values which should override any default values specified on the form.
 */
var useInitializeFormWithRecord = function (record) {
    var form = useForm();
    useEffect(function () {
        if (!record) {
            return;
        }
        var registeredFields = form.getRegisteredFields();
        // react-final-form does not provide a way to set multiple values in one call.
        // Using batch ensure we don't get rerenders until all our values are set
        form.batch(function () {
            Object.keys(record).forEach(function (key) {
                // We have to check the record key is actually registered as a field
                // as some record keys may not have a matching input
                if (registeredFields.some(function (field) { return field === key; })) {
                    form.change(key, record[key]);
                    form.resetFieldState(key);
                }
            });
        });
    }, [form, JSON.stringify(record)]); // eslint-disable-line react-hooks/exhaustive-deps
};
export default useInitializeFormWithRecord;
