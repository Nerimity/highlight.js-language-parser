"use strict";
/*
Language: FIX
Author: Brent Bradbury <brent@brentium.com>
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** @type LanguageFn */
function default_1(hljs) {
    return {
        name: 'FIX',
        contains: [
            {
                begin: /[^\u2401\u0001]+/,
                end: /[\u2401\u0001]/,
                excludeEnd: true,
                returnBegin: true,
                returnEnd: false,
                contains: [
                    {
                        begin: /([^\u2401\u0001=]+)/,
                        end: /=([^\u2401\u0001=]+)/,
                        returnEnd: true,
                        returnBegin: false,
                        className: 'attr'
                    },
                    {
                        begin: /=/,
                        end: /([\u2401\u0001])/,
                        excludeEnd: true,
                        excludeBegin: true,
                        className: 'string'
                    }
                ]
            }
        ],
        case_insensitive: true
    };
}
exports.default = default_1;
