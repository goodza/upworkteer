"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var query_string_1 = require("query-string");
var debounce_1 = __importDefault(require("lodash/debounce"));
var set_1 = __importDefault(require("lodash/set"));
var pickBy_1 = __importDefault(require("lodash/pickBy"));
var queryReducer_1 = __importStar(require("../reducer/admin/resource/list/queryReducer"));
var listActions_1 = require("../actions/listActions");
var removeEmpty_1 = __importDefault(require("../util/removeEmpty"));
var removeKey_1 = __importDefault(require("../util/removeKey"));
var react_router_dom_1 = require("react-router-dom");
var emptyObject = {};
var defaultSort = {
    field: 'id',
    order: queryReducer_1.SORT_ASC,
};
var defaultParams = {};
/**
 * Get the list parameters (page, sort, filters) and modifiers.
 *
 * These parameters are merged from 3 sources:
 *   - the query string from the URL
 *   - the params stored in the state (from previous navigation)
 *   - the options passed to the hook (including the filter defaultValues)
 *
 * @returns {Array} A tuple [parameters, modifiers].
 * Destructure as [
 *    { page, perPage, sort, order, filter, filterValues, displayedFilters, requestSignature },
 *    { setFilters, hideFilter, showFilter, setPage, setPerPage, setSort }
 * ]
 *
 * @example
 *
 * const [listParams, listParamsActions] = useListParams({
 *      resource: 'posts',
 *      location: location // From react-router. Injected to your component by react-admin inside a List
 *      filterDefaultValues: {
 *          published: true
 *      },
 *      sort: {
 *          field: 'published_at',
 *          order: 'DESC'
 *      },
 *      perPage: 25
 * });
 *
 * const {
 *      page,
 *      perPage,
 *      sort,
 *      order,
 *      filter,
 *      filterValues,
 *      displayedFilters,
 *      requestSignature
 * } = listParams;
 *
 * const {
 *      setFilters,
 *      hideFilter,
 *      showFilter,
 *      setPage,
 *      setPerPage,
 *      setSort,
 * } = listParamsActions;
 */
var useListParams = function (_a) {
    var resource = _a.resource, location = _a.location, filterDefaultValues = _a.filterDefaultValues, _b = _a.sort, sort = _b === void 0 ? defaultSort : _b, _c = _a.perPage, perPage = _c === void 0 ? 10 : _c, _d = _a.debounce, debounce = _d === void 0 ? 500 : _d;
    var dispatch = react_redux_1.useDispatch();
    var history = react_router_dom_1.useHistory();
    var params = react_redux_1.useSelector(function (reduxState) {
        return reduxState.admin.resources[resource]
            ? reduxState.admin.resources[resource].list.params
            : defaultParams;
    }, react_redux_1.shallowEqual);
    var requestSignature = [
        location.search,
        resource,
        params,
        filterDefaultValues,
        JSON.stringify(sort),
        perPage,
    ];
    var query = react_1.useMemo(function () {
        return exports.getQuery({
            location: location,
            params: params,
            filterDefaultValues: filterDefaultValues,
            sort: sort,
            perPage: perPage,
        });
    }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var changeParams = react_1.useCallback(function (action) {
        var newParams = queryReducer_1.default(query, action);
        history.push({
            search: "?" + query_string_1.stringify(__assign(__assign({}, newParams), { filter: JSON.stringify(newParams.filter), displayedFilters: JSON.stringify(newParams.displayedFilters) })),
        });
        dispatch(listActions_1.changeListParams(resource, newParams));
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps
    var setSort = react_1.useCallback(function (newSort) {
        return changeParams({ type: queryReducer_1.SET_SORT, payload: { sort: newSort } });
    }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var setPage = react_1.useCallback(function (newPage) { return changeParams({ type: queryReducer_1.SET_PAGE, payload: newPage }); }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var setPerPage = react_1.useCallback(function (newPerPage) {
        return changeParams({ type: queryReducer_1.SET_PER_PAGE, payload: newPerPage });
    }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var filterValues = query.filter || emptyObject;
    var displayedFilterValues = query.displayedFilters || emptyObject;
    var debouncedSetFilters = debounce_1.default(function (newFilters, newDisplayedFilters) {
        var payload = {
            filter: removeEmpty_1.default(newFilters),
            displayedFilters: undefined,
        };
        if (newDisplayedFilters) {
            payload.displayedFilters = Object.keys(newDisplayedFilters).reduce(function (filters, filter) {
                var _a;
                return newDisplayedFilters[filter]
                    ? __assign(__assign({}, filters), (_a = {}, _a[filter] = true, _a)) : filters;
            }, {});
        }
        changeParams({
            type: queryReducer_1.SET_FILTER,
            payload: payload,
        });
    }, debounce);
    var setFilters = react_1.useCallback(function (filters, displayedFilters) {
        return debouncedSetFilters(filters, displayedFilters);
    }, requestSignature // eslint-disable-line react-hooks/exhaustive-deps
    );
    var hideFilter = react_1.useCallback(function (filterName) {
        var _a;
        var newFilters = removeKey_1.default(filterValues, filterName);
        var newDisplayedFilters = __assign(__assign({}, displayedFilterValues), (_a = {}, _a[filterName] = undefined, _a));
        setFilters(newFilters, newDisplayedFilters);
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps
    var showFilter = react_1.useCallback(function (filterName, defaultValue) {
        var _a;
        var newFilters = set_1.default(filterValues, filterName, defaultValue);
        var newDisplayedFilters = __assign(__assign({}, displayedFilterValues), (_a = {}, _a[filterName] = true, _a));
        setFilters(newFilters, newDisplayedFilters);
    }, requestSignature); // eslint-disable-line react-hooks/exhaustive-deps
    return [
        __assign({ displayedFilters: displayedFilterValues, filterValues: filterValues,
            requestSignature: requestSignature }, query),
        {
            changeParams: changeParams,
            setPage: setPage,
            setPerPage: setPerPage,
            setSort: setSort,
            setFilters: setFilters,
            hideFilter: hideFilter,
            showFilter: showFilter,
        },
    ];
};
exports.validQueryParams = [
    'page',
    'perPage',
    'sort',
    'order',
    'filter',
    'displayedFilters',
];
var parseObject = function (query, field) {
    if (query[field] && typeof query[field] === 'string') {
        try {
            query[field] = JSON.parse(query[field]);
        }
        catch (err) {
            delete query[field];
        }
    }
};
exports.parseQueryFromLocation = function (_a) {
    var search = _a.search;
    var query = pickBy_1.default(query_string_1.parse(search), function (v, k) { return exports.validQueryParams.indexOf(k) !== -1; });
    parseObject(query, 'filter');
    parseObject(query, 'displayedFilters');
    return query;
};
/**
 * Check if user has already set custom sort, page, or filters for this list
 *
 * User params come from the Redux store as the params props. By default,
 * this object is:
 *
 * { filter: {}, order: null, page: 1, perPage: null, sort: null }
 *
 * To check if the user has custom params, we must compare the params
 * to these initial values.
 *
 * @param {Object} params
 */
exports.hasCustomParams = function (params) {
    return (params &&
        params.filter &&
        (Object.keys(params.filter).length > 0 ||
            params.order != null ||
            params.page !== 1 ||
            params.perPage != null ||
            params.sort != null));
};
/**
 * Merge list params from 3 different sources:
 *   - the query string
 *   - the params stored in the state (from previous navigation)
 *   - the props passed to the List component (including the filter defaultValues)
 */
exports.getQuery = function (_a) {
    var location = _a.location, params = _a.params, filterDefaultValues = _a.filterDefaultValues, sort = _a.sort, perPage = _a.perPage;
    var queryFromLocation = exports.parseQueryFromLocation(location);
    var query = Object.keys(queryFromLocation).length > 0
        ? queryFromLocation
        : exports.hasCustomParams(params)
            ? __assign({}, params) : { filter: filterDefaultValues || {} };
    if (!query.sort) {
        query.sort = sort.field;
        query.order = sort.order;
    }
    if (!query.perPage) {
        query.perPage = perPage;
    }
    if (!query.page) {
        query.page = 1;
    }
    return __assign(__assign({}, query), { page: exports.getNumberOrDefault(query.page, 1), perPage: exports.getNumberOrDefault(query.perPage, 10) });
};
exports.getNumberOrDefault = function (possibleNumber, defaultValue) {
    return (typeof possibleNumber === 'string'
        ? parseInt(possibleNumber, 10)
        : possibleNumber) || defaultValue;
};
exports.default = useListParams;
