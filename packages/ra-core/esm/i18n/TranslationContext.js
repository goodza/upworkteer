import { createContext } from 'react';
var TranslationContext = createContext({
    locale: 'en',
    setLocale: function () { return Promise.resolve(); },
    i18nProvider: {
        translate: function (x) { return x; },
        changeLocale: function () { return Promise.resolve(); },
        getLocale: function () { return 'en'; },
    },
});
TranslationContext.displayName = 'TranslationContext';
export { TranslationContext };
