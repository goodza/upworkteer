"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useAuthProvider_1 = __importDefault(require("./useAuthProvider"));
var useLogout_1 = __importDefault(require("./useLogout"));
var sideEffect_1 = require("../sideEffect");
/**
 * Returns a callback used to call the authProvider.checkError() method
 * and an error from the dataProvider. If the authProvider rejects the call,
 * the hook logs the user out and shows a logged out notification.
 *
 * Used in the useDataProvider hook to check for access denied responses
 * (e.g. 401 or 403 responses) and trigger a logout.
 *
 * @see useLogout
 * @see useDataProvider
 *
 * @returns {Function} logoutIfAccessDenied callback
 *
 * @example
 *
 * import { useLogoutIfAccessDenied, useNotify, DataProviderContext } from 'react-admin';
 *
 * const FetchRestrictedResource = () => {
 *     const dataProvider = useContext(DataProviderContext);
 *     const logoutIfAccessDenied = useLogoutIfAccessDenied();
 *     const notify = useNotify()
 *     useEffect(() => {
 *         dataProvider.getOne('secret', { id: 123 })
 *             .catch(error => {
 *                  logoutIfaccessDenied(error);
 *                  notify('server error', 'warning');
 *              })
 *     }, []);
 *     // ...
 * }
 */
var useLogoutIfAccessDenied = function () {
    var authProvider = useAuthProvider_1.default();
    var logout = useLogout_1.default();
    var notify = sideEffect_1.useNotify();
    var logoutIfAccessDenied = react_1.useCallback(function (error) {
        return authProvider
            .checkError(error)
            .then(function () { return false; })
            .catch(function (e) {
            var redirectTo = e && e.redirectTo
                ? e.redirectTo
                : error && error.redirectTo
                    ? error.redirectto
                    : undefined;
            logout({}, redirectTo);
            notify('ra.notification.logged_out', 'warning');
            return true;
        });
    }, [authProvider, logout, notify]);
    return authProvider
        ? logoutIfAccessDenied
        : logoutIfAccessDeniedWithoutProvider;
};
var logoutIfAccessDeniedWithoutProvider = function () { return Promise.resolve(false); };
exports.default = useLogoutIfAccessDenied;
