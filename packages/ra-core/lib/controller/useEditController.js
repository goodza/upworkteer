"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var inflection_1 = __importDefault(require("inflection"));
var useVersion_1 = __importDefault(require("./useVersion"));
var checkMinimumRequiredProps_1 = require("./checkMinimumRequiredProps");
var sideEffect_1 = require("../sideEffect");
var dataProvider_1 = require("../dataProvider");
var i18n_1 = require("../i18n");
var actions_1 = require("../actions");
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
    checkMinimumRequiredProps_1.useCheckMinimumRequiredProps('Edit', ['basePath', 'resource'], props);
    var basePath = props.basePath, id = props.id, resource = props.resource, successMessage = props.successMessage, _a = props.undoable, undoable = _a === void 0 ? true : _a;
    var translate = i18n_1.useTranslate();
    var notify = sideEffect_1.useNotify();
    var redirect = sideEffect_1.useRedirect();
    var refresh = sideEffect_1.useRefresh();
    var version = useVersion_1.default();
    var _b = dataProvider_1.useGetOne(resource, id, {
        version: version,
        action: actions_1.CRUD_GET_ONE,
        onFailure: function () {
            notify('ra.notification.item_doesnt_exist', 'warning');
            redirect('list', basePath);
            refresh();
        },
    }), record = _b.data, loading = _b.loading, loaded = _b.loaded;
    var resourceName = translate("resources." + resource + ".name", {
        smart_count: 1,
        _: inflection_1.default.humanize(inflection_1.default.singularize(resource)),
    });
    var defaultTitle = translate('ra.page.edit', {
        name: "" + resourceName,
        id: id,
        record: record,
    });
    var _c = dataProvider_1.useUpdate(resource, id, {}, // set by the caller
    record), update = _c[0], saving = _c[1].loading;
    var save = react_1.useCallback(function (data, redirectTo, _a) {
        if (redirectTo === void 0) { redirectTo = DefaultRedirect; }
        var _b = _a === void 0 ? {} : _a, onSuccess = _b.onSuccess, onFailure = _b.onFailure;
        return update({ payload: { data: data } }, {
            action: actions_1.CRUD_UPDATE,
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
exports.default = useEditController;
var DefaultRedirect = 'list';
