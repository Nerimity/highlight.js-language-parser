"use strict";
/*
Language: Extended Backus-Naur Form
Author: Alex McKibben <alex@nullscope.net>
Website: https://en.wikipedia.org/wiki/Extended_Backus–Naur_form
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** @type LanguageFn */
function default_1(hljs) {
    const commentMode = hljs.COMMENT(/\(\*/, /\*\)/);
    const nonTerminalMode = {
        className: "attribute",
        begin: /^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/
    };
    const specialSequenceMode = {
        className: "meta",
        begin: /\?.*\?/
    };
    const ruleBodyMode = {
        begin: /=/,
        end: /[.;]/,
        contains: [
            commentMode,
            specialSequenceMode,
            {
                // terminals
                className: 'string',
                variants: [
                    hljs.APOS_STRING_MODE,
                    hljs.QUOTE_STRING_MODE,
                    {
                        begin: '`',
                        end: '`'
                    }
                ]
            }
        ]
    };
    return {
        name: 'Extended Backus-Naur Form',
        illegal: /\S/,
        contains: [
            commentMode,
            nonTerminalMode,
            ruleBodyMode
        ]
    };
}
exports.default = default_1;
