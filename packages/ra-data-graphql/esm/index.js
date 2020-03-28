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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
import merge from 'lodash/merge';
import get from 'lodash/get';
import pluralize from 'pluralize';
import { GET_LIST, GET_ONE, GET_MANY, GET_MANY_REFERENCE, CREATE, UPDATE, DELETE, } from 'ra-core';
import buildApolloClient from './buildApolloClient';
import { QUERY_TYPES as INNER_QUERY_TYPES, MUTATION_TYPES as INNER_MUTATION_TYPES, ALL_TYPES as INNER_ALL_TYPES, } from './constants';
import defaultResolveIntrospection from './introspection';
export var QUERY_TYPES = INNER_QUERY_TYPES;
export var MUTATION_TYPES = INNER_MUTATION_TYPES;
export var ALL_TYPES = INNER_ALL_TYPES;
var defaultOptions = {
    resolveIntrospection: defaultResolveIntrospection,
    introspection: {
        operationNames: (_a = {},
            _a[GET_LIST] = function (resource) { return "all" + pluralize(resource.name); },
            _a[GET_ONE] = function (resource) { return "" + resource.name; },
            _a[GET_MANY] = function (resource) { return "all" + pluralize(resource.name); },
            _a[GET_MANY_REFERENCE] = function (resource) { return "all" + pluralize(resource.name); },
            _a[CREATE] = function (resource) { return "create" + resource.name; },
            _a[UPDATE] = function (resource) { return "update" + resource.name; },
            _a[DELETE] = function (resource) { return "delete" + resource.name; },
            _a),
        exclude: undefined,
        include: undefined,
    },
};
var getOptions = function (options, aorFetchType, resource) {
    if (typeof options === 'function') {
        return options(resource, aorFetchType);
    }
    return options;
};
export default (function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, clientObject, clientOptions, introspection, resolveIntrospection, buildQueryFactory, _b, override, otherOptions, client, introspectionResults, buildQuery, raDataProvider;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = merge({}, defaultOptions, options), clientObject = _a.client, clientOptions = _a.clientOptions, introspection = _a.introspection, resolveIntrospection = _a.resolveIntrospection, buildQueryFactory = _a.buildQuery, _b = _a.override, override = _b === void 0 ? {} : _b, otherOptions = __rest(_a, ["client", "clientOptions", "introspection", "resolveIntrospection", "buildQuery", "override"]);
                if (override && process.env.NODE_ENV === 'production') {
                    console.warn(
                    // eslint-disable-line
                    'The override option is deprecated. You should instead wrap the buildQuery function provided by the dataProvider you use.');
                }
                client = clientObject || buildApolloClient(clientOptions);
                if (!introspection) return [3 /*break*/, 2];
                return [4 /*yield*/, resolveIntrospection(client, introspection)];
            case 1:
                introspectionResults = _c.sent();
                _c.label = 2;
            case 2:
                buildQuery = buildQueryFactory(introspectionResults, otherOptions);
                raDataProvider = function (aorFetchType, resource, params) {
                    var overriddenBuildQuery = get(override, resource + "." + aorFetchType);
                    var _a = overriddenBuildQuery
                        ? __assign(__assign({}, buildQuery(aorFetchType, resource, params)), overriddenBuildQuery(params)) : buildQuery(aorFetchType, resource, params), parseResponse = _a.parseResponse, query = __rest(_a, ["parseResponse"]);
                    var operation = getQueryOperation(query.query);
                    if (operation === 'query') {
                        var apolloQuery_1 = __assign(__assign(__assign({}, query), { fetchPolicy: 'network-only' }), getOptions(otherOptions.query, aorFetchType, resource));
                        return client
                            .query(apolloQuery_1)
                            .then(function (response) { return parseResponse(response); });
                    }
                    var apolloQuery = __assign({ mutation: query.query, variables: query.variables }, getOptions(otherOptions.mutation, aorFetchType, resource));
                    return client.mutate(apolloQuery).then(parseResponse);
                };
                raDataProvider.observeRequest = function (aorFetchType, resource, params) {
                    var _a = buildQuery(aorFetchType, resource, params), parseResponse = _a.parseResponse, query = __rest(_a, ["parseResponse"]);
                    var apolloQuery = __assign(__assign({}, query), getOptions(otherOptions.watchQuery, aorFetchType, resource));
                    return client.watchQuery(apolloQuery).then(parseResponse);
                };
                raDataProvider.saga = function () { };
                return [2 /*return*/, raDataProvider];
        }
    });
}); });
var getQueryOperation = function (query) {
    if (query && query.definitions && query.definitions.length > 0) {
        return query.definitions[0].operation;
    }
    throw new Error('Unable to determine the query operation');
};
