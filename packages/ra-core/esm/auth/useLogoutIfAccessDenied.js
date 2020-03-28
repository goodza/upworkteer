import { useCallback } from 'react';
import useAuthProvider from './useAuthProvider';
import useLogout from './useLogout';
import { useNotify } from '../sideEffect';
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
    var authProvider = useAuthProvider();
    var logout = useLogout();
    var notify = useNotify();
    var logoutIfAccessDenied = useCallback(function (error) {
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
export default useLogoutIfAccessDenied;
