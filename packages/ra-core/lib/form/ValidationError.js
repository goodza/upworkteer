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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var i18n_1 = require("../i18n");
var ValidationError = function (_a) {
    var error = _a.error;
    var translate = i18n_1.useTranslate();
    if (error.message) {
        var _b = error, message = _b.message, args = _b.args;
        return react_1.default.createElement(react_1.default.Fragment, null, translate(message, __assign({ _: message }, args)));
    }
    return react_1.default.createElement(react_1.default.Fragment, null, translate(error, { _: error }));
};
exports.default = ValidationError;
