"use strict";
/*
Language: Python REPL
Requires: python.js
Author: Josh Goebel <hello@joshgoebel.com>
Category: common
*/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(hljs) {
    return {
        aliases: ['pycon'],
        contains: [
            {
                className: 'meta.prompt',
                starts: {
                    // a space separates the REPL prefix from the actual code
                    // this is purely for cleaner HTML output
                    end: / |$/,
                    starts: {
                        end: '$',
                        subLanguage: 'python'
                    }
                },
                variants: [
                    { begin: /^>>>(?=[ ]|$)/ },
                    { begin: /^\.\.\.(?=[ ]|$)/ }
                ]
            }
        ]
    };
}
exports.default = default_1;
