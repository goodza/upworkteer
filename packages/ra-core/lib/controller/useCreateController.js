"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// @ts-ignore
var inflection_1 = __importDefault(require("inflection"));
var query_string_1 = require("query-string");
var react_router_dom_1 = require("react-router-dom");
var checkMinimumRequiredProps_1 = require("./checkMinimumRequiredProps");
var dataProvider_1 = require("../dataProvider");
var sideEffect_1 = require("../sideEffect");
var i18n_1 = require("../i18n");
var _1 = require(".");
var actions_1 = require("../actions");
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
    checkMinimumRequiredProps_1.useCheckMinimumRequiredProps('Create', ['basePath', 'resource'], props);
    var basePath = props.basePath, resource = props.resource, _a = props.record, record = _a === void 0 ? {} : _a, hasShow = props.hasShow, hasEdit = props.hasEdit, successMessage = props.successMessage;
    var location = react_router_dom_1.useLocation();
    var translate = i18n_1.useTranslate();
    var notify = sideEffect_1.useNotify();
    var redirect = sideEffect_1.useRedirect();
    var recordToUse = exports.getRecord(location, record);
    var version = _1.useVersion();
    var _b = dataProvider_1.useCreate(resource), create = _b[0], saving = _b[1].loading;
    var save = react_1.useCallback(function (data, redirectTo, _a) {
        if (redirectTo === void 0) { redirectTo = 'list'; }
        var _b = _a === void 0 ? {} : _a, onSuccess = _b.onSuccess, onFailure = _b.onFailure;
        return create({ payload: { data: data } }, {
            action: actions_1.CRUD_CREATE,
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
        _: inflection_1.default.humanize(inflection_1.default.singularize(resource)),
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
exports.default = useCreateController;
exports.getRecord = function (_a, record) {
    var state = _a.state, search = _a.search;
    if (record === void 0) { record = {}; }
    if (state && state.record) {
        return state.record;
    }
    if (search) {
        try {
            var searchParams = query_string_1.parse(search);
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
