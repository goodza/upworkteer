import { useCallback } from 'react';
import inflection from 'inflection';
import useVersion from './useVersion';
import { useCheckMinimumRequiredProps } from './checkMinimumRequiredProps';
import { useNotify, useRedirect, useRefresh, } from '../sideEffect';
import { useGetOne, useUpdate } from '../dataProvider';
import { useTranslate } from '../i18n';
import { CRUD_GET_ONE, CRUD_UPDATE } from '../actions';
/**
 * Prepare data for the Edit view
 *
 * @param {Object} props The props passed to the Edit component.
 *
 * @return {Object} controllerProps Fetched data and callbacks for the Edit view
 *
 * @example
 *
 * import { useEditController } from 'react-admin';
 * import EditView from './EditView';
 *
 * const MyEdit = props => {
 *     const controllerProps = useEditController(props);
 *     return <EditView {...controllerProps} {...props} />;
 * }
 */
var useEditController = function (props) {
    useCheckMinimumRequiredProps('Edit', ['basePath', 'resource'], props);
    var basePath = props.basePath, id = props.id, resource = props.resource, successMessage = props.successMessage, _a = props.undoable, undoable = _a === void 0 ? true : _a;
    var translate = useTranslate();
    var notify = useNotify();
    var redirect = useRedirect();
    var refresh = useRefresh();
    var version = useVersion();
    var _b = useGetOne(resource, id, {
        version: version,
        action: CRUD_GET_ONE,
        onFailure: function () {
            notify('ra.notification.item_doesnt_exist', 'warning');
            redirect('list', basePath);
            refresh();
        },
    }), record = _b.data, loading = _b.loading, loaded = _b.loaded;
    var resourceName = translate("resources." + resource + ".name", {
        smart_count: 1,
        _: inflection.humanize(inflection.singularize(resource)),
    });
    var defaultTitle = translate('ra.page.edit', {
        name: "" + resourceName,
        id: id,
        record: record,
    });
    var _c = useUpdate(resource, id, {}, // set by the caller
    record), update = _c[0], saving = _c[1].loading;
    var save = useCallback(function (data, redirectTo, _a) {
        if (redirectTo === void 0) { redirectTo = DefaultRedirect; }
        var _b = _a === void 0 ? {} : _a, onSuccess = _b.onSuccess, onFailure = _b.onFailure;
        return update({ payload: { data: data } }, {
            action: CRUD_UPDATE,
            onSuccess: onSuccess
                ? onSuccess
                : function () {
                    notify(successMessage || 'ra.notification.updated', 'info', {
                        smart_count: 1,
                    }, undoable);
                    redirect(redirectTo, basePath, data.id, data);
                },
            onFailure: onFailure
                ? onFailure
                : function (error) {
                    notify(typeof error === 'string'
                        ? error
                        : error.message ||
                            'ra.notification.http_error', 'warning');
                    if (undoable) {
                        refresh();
                    }
                },
            undoable: undoable,
        });
    }, [update, undoable, notify, successMessage, redirect, basePath, refresh]);
    return {
        loading: loading,
        loaded: loaded,
        saving: saving,
        defaultTitle: defaultTitle,
        save: save,
        resource: resource,
        basePath: basePath,
        record: record,
        redirect: DefaultRedirect,
        version: version,
    };
};
export default useEditController;
var DefaultRedirect = 'list';
