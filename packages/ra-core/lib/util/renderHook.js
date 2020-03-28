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
var react_2 = require("@testing-library/react");
var renderWithRedux_1 = __importDefault(require("./renderWithRedux"));
var TestHook = function (_a) {
    var children = _a.children, hook = _a.hook;
    return children(hook());
};
function renderHook(hook, withRedux, reduxState) {
    if (withRedux === void 0) { withRedux = true; }
    var hookValue = null;
    var children = function (props) {
        hookValue = props;
        return react_1.default.createElement("p", null, "child");
    };
    var childrenMock = jest.fn().mockImplementation(children);
    var result = withRedux
        ? renderWithRedux_1.default(react_1.default.createElement(TestHook, { children: childrenMock, hook: hook }), reduxState)
        : react_2.render(react_1.default.createElement(TestHook, { children: childrenMock, hook: hook }));
    return __assign(__assign({}, result), { hookValue: hookValue,
        childrenMock: childrenMock, rerender: function (newHook) {
            result.rerender(react_1.default.createElement(TestHook, { children: childrenMock, hook: newHook }));
        } });
}
exports.default = renderHook;
