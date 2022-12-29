"use strict";
/*
Language: Backus–Naur Form
Website: https://en.wikipedia.org/wiki/Backus–Naur_form
Author: Oleg Efimov <efimovov@gmail.com>
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** @type LanguageFn */
function default_1(hljs) {
    return {
        name: 'Backus–Naur Form',
        contains: [
            // Attribute
            {
                className: 'attribute',
                begin: /</,
                end: />/
            },
            // Specific
            {
                begin: /::=/,
                end: /$/,
                contains: [
                    {
                        begin: /</,
                        end: />/
                    },
                    // Common
                    hljs.C_LINE_COMMENT_MODE,
                    hljs.C_BLOCK_COMMENT_MODE,
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE
                ]
            }
        ]
    };
}
exports.default = default_1;
