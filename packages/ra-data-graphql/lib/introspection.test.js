"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var introspection_1 = __importStar(require("./introspection"));
var ra_core_1 = require("ra-core");
describe('introspection', function () {
    describe('filterTypesByIncludeExclude', function () {
        it('return false with an include option containing an array and tested type is not in it', function () {
            expect(introspection_1.filterTypesByIncludeExclude({ include: ['Post', 'Comment'] })({
                name: 'NotMe',
            })).toBe(false);
        });
        it('return true with an include option containing an array and tested type is in it', function () {
            expect(introspection_1.filterTypesByIncludeExclude({ include: ['Post', 'Comment'] })({
                name: 'Post',
            })).toBe(true);
        });
        it('return false with an exclude option containing an array and tested type is in it', function () {
            expect(introspection_1.filterTypesByIncludeExclude({ exclude: ['NotMe'] })({
                name: 'NotMe',
            })).toBe(false);
        });
        it('return true with an include option containing an array and tested type is not in it', function () {
            expect(introspection_1.filterTypesByIncludeExclude({ exclude: ['NotMe'] })({
                name: 'Post',
            })).toBe(true);
        });
        it('return true with an include option being a function returning true', function () {
            var include = jest.fn(function () { return true; });
            var type = { name: 'Post' };
            expect(introspection_1.filterTypesByIncludeExclude({ include: include })(type)).toBe(true);
            expect(include).toHaveBeenCalledWith(type);
        });
        it('return false with an include option being a function returning false', function () {
            var include = jest.fn(function () { return false; });
            var type = { name: 'Post' };
            expect(introspection_1.filterTypesByIncludeExclude({ include: include })(type)).toBe(false);
            expect(include).toHaveBeenCalledWith(type);
        });
        it('return false with an exclude option being a function returning true', function () {
            var exclude = jest.fn(function () { return true; });
            var type = { name: 'Post' };
            expect(introspection_1.filterTypesByIncludeExclude({ exclude: exclude })(type)).toBe(false);
            expect(exclude).toHaveBeenCalledWith(type);
        });
        it('return true with an exclude option being a function returning false', function () {
            var exclude = jest.fn(function () { return false; });
            var type = { name: 'Post' };
            expect(introspection_1.filterTypesByIncludeExclude({ exclude: exclude })(type)).toBe(true);
            expect(exclude).toHaveBeenCalledWith(type);
        });
    });
    describe('introspection parsing returns an object', function () {
        var _a;
        var client = {
            query: jest.fn(function () {
                return Promise.resolve({
                    data: {
                        __schema: {
                            queryType: { name: 'Query' },
                            mutationType: { name: 'Mutation' },
                            types: [
                                {
                                    name: 'Query',
                                    fields: [
                                        { name: 'allPost' },
                                        { name: 'Post' },
                                        { name: 'allComment' },
                                        { name: 'Comment' },
                                    ],
                                },
                                {
                                    name: 'Mutation',
                                    fields: [
                                        { name: 'createPost' },
                                        { name: 'updatePost' },
                                        { name: 'deletePost' },
                                        { name: 'createIHavePartialCrud' },
                                        { name: 'updateIHavePartialCrud' },
                                        { name: 'deleteIHavePartialCrud' },
                                    ],
                                },
                                { name: 'Post' },
                                { name: 'Comment' },
                                { name: 'IHavePartialCrud' },
                                { name: 'ImExcluded' },
                            ],
                        },
                    },
                });
            }),
        };
        var introspectionResultsPromise = introspection_1.default(client, {
            operationNames: (_a = {},
                _a[ra_core_1.GET_LIST] = function (resource) { return "all" + resource.name; },
                _a[ra_core_1.GET_ONE] = function (resource) { return "" + resource.name; },
                _a[ra_core_1.GET_MANY] = function (resource) { return "all" + resource.name; },
                _a[ra_core_1.GET_MANY_REFERENCE] = function (resource) { return "all" + resource.name; },
                _a[ra_core_1.CREATE] = function (resource) { return "create" + resource.name; },
                _a[ra_core_1.UPDATE] = function (resource) { return "update" + resource.name; },
                _a[ra_core_1.DELETE] = function (resource) { return "delete" + resource.name; },
                _a),
            exclude: ['ImExcluded'],
        });
        it('with a "types" array containing all types found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var introspectionResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, introspectionResultsPromise];
                    case 1:
                        introspectionResults = _a.sent();
                        expect(introspectionResults.types).toHaveLength(4);
                        return [2 /*return*/];
                }
            });
        }); });
        it('with a "queries" array containing all queries and mutations found', function () { return __awaiter(void 0, void 0, void 0, function () {
            var introspectionResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, introspectionResultsPromise];
                    case 1:
                        introspectionResults = _a.sent();
                        expect(introspectionResults.queries).toEqual([
                            { name: 'allPost' },
                            { name: 'Post' },
                            { name: 'allComment' },
                            { name: 'Comment' },
                            { name: 'createPost' },
                            { name: 'updatePost' },
                            { name: 'deletePost' },
                            { name: 'createIHavePartialCrud' },
                            { name: 'updateIHavePartialCrud' },
                            { name: 'deleteIHavePartialCrud' },
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('with a "resources" array containing objects describing resources', function () { return __awaiter(void 0, void 0, void 0, function () {
            var introspectionResults;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, introspectionResultsPromise];
                    case 1:
                        introspectionResults = _c.sent();
                        expect(introspectionResults.resources).toEqual([
                            (_a = {
                                    type: { name: 'Post' }
                                },
                                _a[ra_core_1.GET_LIST] = { name: 'allPost' },
                                _a[ra_core_1.GET_ONE] = { name: 'Post' },
                                _a[ra_core_1.GET_MANY] = { name: 'allPost' },
                                _a[ra_core_1.GET_MANY_REFERENCE] = { name: 'allPost' },
                                _a[ra_core_1.CREATE] = { name: 'createPost' },
                                _a[ra_core_1.UPDATE] = { name: 'updatePost' },
                                _a[ra_core_1.DELETE] = { name: 'deletePost' },
                                _a),
                            (_b = {
                                    type: { name: 'Comment' }
                                },
                                _b[ra_core_1.GET_LIST] = { name: 'allComment' },
                                _b[ra_core_1.GET_ONE] = { name: 'Comment' },
                                _b[ra_core_1.GET_MANY] = { name: 'allComment' },
                                _b[ra_core_1.GET_MANY_REFERENCE] = { name: 'allComment' },
                                _b),
                        ]);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
