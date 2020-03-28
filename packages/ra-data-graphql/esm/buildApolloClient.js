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
import { ApolloClient } from 'apollo-client';
import { HttpLink, InMemoryCache, IntrospectionFragmentMatcher, } from 'apollo-client-preset';
export default (function (options) {
    if (!options) {
        return new ApolloClient();
    }
    var cache = options.cache, link = options.link, uri = options.uri, otherOptions = __rest(options, ["cache", "link", "uri"]);
    var finalLink = link;
    var finalCache = cache;
    // Create an empty fragment matcher
    // See: https://github.com/apollographql/apollo-client/issues/3397#issuecomment-421433032
    var fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData: {
            __schema: {
                types: [],
            },
        },
    });
    if (!link && uri) {
        finalLink = new HttpLink({ uri: uri });
    }
    if (!cache) {
        finalCache = new InMemoryCache({ fragmentMatcher: fragmentMatcher }).restore({});
    }
    return new ApolloClient(__assign({ link: finalLink, cache: finalCache }, otherOptions));
});
