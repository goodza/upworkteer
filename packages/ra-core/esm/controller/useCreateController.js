import { useCallback } from 'react';
// @ts-ignore
import inflection from 'inflection';
import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';
import { useCheckMinimumRequiredProps } from './checkMinimumRequiredProps';
import { useCreate } from '../dataProvider';
import { useNotify, useRedirect } from '../sideEffect';
import { useTranslate } from '../i18n';
import { useVersion } from '.';
import { CRUD_CREATE } from '../actions';
/**
 * Prepare data for the Create view
 *
 * @param {Object} props The props passed to the Create component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Create view
 *
 * @example
 *
 * import { useCreateController } from 'react-admin';
 * import CreateView from './CreateView';
 *
 * const MyCreate = props => {
 *     const controllerProps = useCreateController(props);
 *     return <CreateView {...controllerProps} {...props} />;
 * }
 */
var useCreateController = function (props) {
    useCheckMinimumRequiredProps('Create', ['basePath', 'resource'], props);
    var basePath = props.basePath, resource = props.resource, _a = props.record, record = _a === void 0 ? {} : _a, hasShow = props.hasShow, hasEdit = props.hasEdit, successMessage = props.successMessage;
    var location = useLocation();
    var translate = useTranslate();
    var notify = useNotify();
    var redirect = useRedirect();
    var recordToUse = getRecord(location, record);
    var version = useVersion();
    var _b = useCreate(resource), create = _b[0], saving = _b[1].loading;
    var save = useCallback(function (data, redirectTo, _a) {
        if (redirectTo === void 0) { redirectTo = 'list'; }
        var _b = _a === void 0 ? {} : _a, onSuccess = _b.onSuccess, onFailure = _b.onFailure;
        return create({ payload: { data: data } }, {
            action: CRUD_CREATE,
            onSuccess: onSuccess
                ? onSuccess
                : function (_a) {
                    var newRecord = _a.data;
                    notify(successMessage || 'ra.notification.created', 'info', {
                        smart_count: 1,
                    });
                    redirect(redirectTo, basePath, newRecord.id, newRecord);
                },
            onFailure: onFailure
                ? onFailure
                : function (error) {
                    notify(typeof error === 'string'
                        ? error
                        : error.message ||
                            'ra.notification.http_error', 'warning');
                },
        });
    }, [create, notify, successMessage, redirect, basePath]);
    var resourceName = translate("resources." + resource + ".name", {
        smart_count: 1,
        _: inflection.humanize(inflection.singularize(resource)),
    });
    var defaultTitle = translate('ra.page.create', {
        name: "" + resourceName,
    });
    return {
        loading: false,
        loaded: true,
        saving: saving,
        defaultTitle: defaultTitle,
        save: save,
        resource: resource,
        basePath: basePath,
        record: recordToUse,
        redirect: getDefaultRedirectRoute(hasShow, hasEdit),
        version: version,
    };
};
export default useCreateController;
export var getRecord = function (_a, record) {
    var state = _a.state, search = _a.search;
    if (record === void 0) { record = {}; }
    if (state && state.record) {
        return state.record;
    }
    if (search) {
        try {
            var searchParams = parse(search);
            if (searchParams.source) {
                if (Array.isArray(searchParams.source)) {
                    console.error("Failed to parse location search parameter '" + search + "'. To pre-fill some fields in the Create form, pass a stringified source parameter (e.g. '?source={\"title\":\"foo\"}')");
                    return;
                }
                return JSON.parse(searchParams.source);
            }
        }
        catch (e) {
            console.error("Failed to parse location search parameter '" + search + "'. To pre-fill some fields in the Create form, pass a stringified source parameter (e.g. '?source={\"title\":\"foo\"}')");
        }
    }
    return record;
};
var getDefaultRedirectRoute = function (hasShow, hasEdit) {
    if (hasEdit) {
        return 'edit';
    }
    if (hasShow) {
        return 'show';
    }
    return 'list';
};
