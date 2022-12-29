"use strict";
/*
Language: LiveScript
Author: Taneli Vatanen <taneli.vatanen@gmail.com>
Contributors: Jen Evers-Corvina <jen@sevvie.net>
Origin: coffeescript.js
Description: LiveScript is a programming language that transcompiles to JavaScript. For info about language see http://livescript.net/
Website: https://livescript.net
Category: scripting
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ECMAScript = __importStar(require("./lib/ecmascript.js"));
function default_1(hljs) {
    const LIVESCRIPT_BUILT_INS = [
        'npm',
        'print'
    ];
    const LIVESCRIPT_LITERALS = [
        'yes',
        'no',
        'on',
        'off',
        'it',
        'that',
        'void'
    ];
    const LIVESCRIPT_KEYWORDS = [
        'then',
        'unless',
        'until',
        'loop',
        'of',
        'by',
        'when',
        'and',
        'or',
        'is',
        'isnt',
        'not',
        'it',
        'that',
        'otherwise',
        'from',
        'to',
        'til',
        'fallthrough',
        'case',
        'enum',
        'native',
        'list',
        'map',
        '__hasProp',
        '__extends',
        '__slice',
        '__bind',
        '__indexOf'
    ];
    const KEYWORDS = {
        keyword: ECMAScript.KEYWORDS.concat(LIVESCRIPT_KEYWORDS),
        literal: ECMAScript.LITERALS.concat(LIVESCRIPT_LITERALS),
        built_in: ECMAScript.BUILT_INS.concat(LIVESCRIPT_BUILT_INS)
    };
    const JS_IDENT_RE = '[A-Za-z$_](?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*';
    const TITLE = hljs.inherit(hljs.TITLE_MODE, { begin: JS_IDENT_RE });
    const SUBST = {
        className: 'subst',
        begin: /#\{/,
        end: /\}/,
        keywords: KEYWORDS
    };
    const SUBST_SIMPLE = {
        className: 'subst',
        begin: /#[A-Za-z$_]/,
        end: /(?:-[0-9A-Za-z$_]|[0-9A-Za-z$_])*/,
        keywords: KEYWORDS
    };
    const EXPRESSIONS = [
        hljs.BINARY_NUMBER_MODE,
        {
            className: 'number',
            begin: '(\\b0[xX][a-fA-F0-9_]+)|(\\b\\d(\\d|_\\d)*(\\.(\\d(\\d|_\\d)*)?)?(_*[eE]([-+]\\d(_\\d|\\d)*)?)?[_a-z]*)',
            relevance: 0,
            starts: {
                end: '(\\s*/)?',
                relevance: 0
            } // a number tries to eat the following slash to prevent treating it as a regexp
        },
        {
            className: 'string',
            variants: [
                {
                    begin: /'''/,
                    end: /'''/,
                    contains: [hljs.BACKSLASH_ESCAPE]
                },
                {
                    begin: /'/,
                    end: /'/,
                    contains: [hljs.BACKSLASH_ESCAPE]
                },
                {
                    begin: /"""/,
                    end: /"""/,
                    contains: [
                        hljs.BACKSLASH_ESCAPE,
                        SUBST,
                        SUBST_SIMPLE
                    ]
                },
                {
                    begin: /"/,
                    end: /"/,
                    contains: [
                        hljs.BACKSLASH_ESCAPE,
                        SUBST,
                        SUBST_SIMPLE
                    ]
                },
                {
                    begin: /\\/,
                    end: /(\s|$)/,
                    excludeEnd: true
                }
            ]
        },
        {
            className: 'regexp',
            variants: [
                {
                    begin: '//',
                    end: '//[gim]*',
                    contains: [
                        SUBST,
                        hljs.HASH_COMMENT_MODE
                    ]
                },
                {
                    // regex can't start with space to parse x / 2 / 3 as two divisions
                    // regex can't start with *, and it supports an "illegal" in the main mode
                    begin: /\/(?![ *])(\\.|[^\\\n])*?\/[gim]*(?=\W)/
                }
            ]
        },
        { begin: '@' + JS_IDENT_RE },
        {
            begin: '``',
            end: '``',
            excludeBegin: true,
            excludeEnd: true,
            subLanguage: 'javascript'
        }
    ];
    SUBST.contains = EXPRESSIONS;
    const PARAMS = {
        className: 'params',
        begin: '\\(',
        returnBegin: true,
        /* We need another contained nameless mode to not have every nested
        pair of parens to be called "params" */
        contains: [
            {
                begin: /\(/,
                end: /\)/,
                keywords: KEYWORDS,
                contains: ['self'].concat(EXPRESSIONS)
            }
        ]
    };
    const SYMBOLS = { begin: '(#=>|=>|\\|>>|-?->|!->)' };
    const CLASS_DEFINITION = {
        variants: [
            { match: [
                    /class\s+/,
                    JS_IDENT_RE,
                    /\s+extends\s+/,
                    JS_IDENT_RE
                ] },
            { match: [
                    /class\s+/,
                    JS_IDENT_RE
                ] }
        ],
        scope: {
            2: "title.class",
            4: "title.class.inherited"
        },
        keywords: KEYWORDS
    };
    return {
        name: 'LiveScript',
        aliases: ['ls'],
        keywords: KEYWORDS,
        illegal: /\/\*/,
        contains: EXPRESSIONS.concat([
            hljs.COMMENT('\\/\\*', '\\*\\/'),
            hljs.HASH_COMMENT_MODE,
            SYMBOLS,
            {
                className: 'function',
                contains: [
                    TITLE,
                    PARAMS
                ],
                returnBegin: true,
                variants: [
                    {
                        begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B->\\*?',
                        end: '->\\*?'
                    },
                    {
                        begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?!?(\\(.*\\)\\s*)?\\B[-~]{1,2}>\\*?',
                        end: '[-~]{1,2}>\\*?'
                    },
                    {
                        begin: '(' + JS_IDENT_RE + '\\s*(?:=|:=)\\s*)?(\\(.*\\)\\s*)?\\B!?[-~]{1,2}>\\*?',
                        end: '!?[-~]{1,2}>\\*?'
                    }
                ]
            },
            CLASS_DEFINITION,
            {
                begin: JS_IDENT_RE + ':',
                end: ':',
                returnBegin: true,
                returnEnd: true,
                relevance: 0
            }
        ])
    };
}
exports.default = default_1;
