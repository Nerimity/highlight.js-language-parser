"use strict";
/*
Language: Node REPL
Requires: javascript.js
Author: Marat Nagayev <nagaevmt@yandex.ru>
Category: scripting
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** @type LanguageFn */
function default_1(hljs) {
    return {
        name: 'Node REPL',
        contains: [
            {
                className: 'meta.prompt',
                starts: {
                    // a space separates the REPL prefix from the actual code
                    // this is purely for cleaner HTML output
                    end: / |$/,
                    starts: {
                        end: '$',
                        subLanguage: 'javascript'
                    }
                },
                variants: [
                    { begin: /^>(?=[ ]|$)/ },
                    { begin: /^\.\.\.(?=[ ]|$)/ }
                ]
            }
        ]
    };
}
exports.default = default_1;
