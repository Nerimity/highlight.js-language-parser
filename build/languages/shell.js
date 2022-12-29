"use strict";
/*
Language: Shell Session
Requires: bash.js
Author: TSUYUSATO Kitsune <make.just.on@gmail.com>
Category: common
Audit: 2020
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** @type LanguageFn */
function default_1(hljs) {
    return {
        name: 'Shell Session',
        aliases: [
            'console',
            'shellsession'
        ],
        contains: [
            {
                className: 'meta.prompt',
                // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
                // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
                // echo /path/to/home > t.exe
                begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
                starts: {
                    end: /[^\\](?=\s*$)/,
                    subLanguage: 'bash'
                }
            }
        ]
    };
}
exports.default = default_1;
