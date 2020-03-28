"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var get_1 = __importDefault(require("lodash/get"));
var TranslationContext_1 = require("./TranslationContext");
exports.default = (function (_a) {
    var translate = _a.translate, messages = _a.messages, children = _a.children;
    return (react_1.default.createElement(TranslationContext_1.TranslationContext.Provider, { value: {
            locale: 'en',
            setLocale: function () { return Promise.resolve(); },
            i18nProvider: {
                translate: messages
                    ? function (key, options) {
                        return get_1.default(messages, key)
                            ? get_1.default(messages, key)
                            : options._;
                    }
                    : translate,
                changeLocale: function () { return Promise.resolve(); },
                getLocale: function () { return 'en'; },
            },
        } }, children));
});
