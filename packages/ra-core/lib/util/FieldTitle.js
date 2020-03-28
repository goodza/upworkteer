"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var pure_1 = __importDefault(require("recompose/pure"));
var useTranslate_1 = __importDefault(require("../i18n/useTranslate"));
var getFieldLabelTranslationArgs_1 = __importDefault(require("./getFieldLabelTranslationArgs"));
exports.FieldTitle = function (_a) {
    var resource = _a.resource, source = _a.source, label = _a.label, isRequired = _a.isRequired;
    var translate = useTranslate_1.default();
    return (react_1.default.createElement("span", null,
        translate.apply(void 0, getFieldLabelTranslationArgs_1.default({ label: label, resource: resource, source: source })),
        isRequired && ' *'));
};
// wat? TypeScript looses the displayName if we don't set it explicitly
exports.FieldTitle.displayName = 'FieldTitle';
exports.default = pure_1.default(exports.FieldTitle);
