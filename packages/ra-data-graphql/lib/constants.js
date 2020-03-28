"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ra_core_1 = require("ra-core");
exports.QUERY_TYPES = [ra_core_1.GET_LIST, ra_core_1.GET_MANY, ra_core_1.GET_MANY_REFERENCE, ra_core_1.GET_ONE];
exports.MUTATION_TYPES = [
    ra_core_1.CREATE,
    ra_core_1.UPDATE,
    ra_core_1.DELETE,
    ra_core_1.UPDATE_MANY,
    ra_core_1.DELETE_MANY,
];
exports.ALL_TYPES = exports.QUERY_TYPES.concat(exports.MUTATION_TYPES);
