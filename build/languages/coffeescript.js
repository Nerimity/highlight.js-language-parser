"use strict";
/*
Language: CoffeeScript
Author: Dmytrii Nagirniak <dnagir@gmail.com>
Contributors: Oleg Efimov <efimovov@gmail.com>, Cédric Néhémie <cedric.nehemie@gmail.com>
Description: CoffeeScript is a programming language that transcompiles to JavaScript. For info about language see http://coffeescript.org/
Category: scripting
Website: https://coffeescript.org
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
/** @type LanguageFn */
function default_1(hljs) {
    const COFFEE_BUILT_INS = [
        'npm',
        'print'
    ];
    const COFFEE_LITERALS = [
        'yes',
        'no',
        'on',
        'off'
    ];
    const COFFEE_KEYWORDS = [
        'then',
        'unless',
        'until',
        'loop',
        'by',
        'when',
        'and',
        'or',
        'is',
        'isnt',
        'not'
    ];
    const NOT_VALID_KEYWORDS = [
        "var",
        "const",
        "let",
        "function",
        "static"
    ];
    const excluding = (list) => (kw) => !list.includes(kw);
    const KEYWORDS = {
        keyword: ECMAScript.KEYWORDS.concat(COFFEE_KEYWORDS).filter(excluding(NOT_VALID_KEYWORDS)),
        literal: ECMAScript.LITERALS.concat(COFFEE_LITERALS),
        built_in: ECMAScript.BUILT_INS.concat(COFFEE_BUILT_INS)
    };
    const JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
    const SUBST = {
        className: 'subst',
        begin: /#\{/,
        end: /\}/,
        keywords: KEYWORDS
    };
    const EXPRESSIONS = [
        hljs.BINARY_NUMBER_MODE,
        hljs.inherit(hljs.C_NUMBER_MODE, { starts: {
                end: '(\\s*/)?',
                relevance: 0
            } }),
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
                        SUBST
                    ]
                },
                {
                    begin: /"/,
                    end: /"/,
                    contains: [
                        hljs.BACKSLASH_ESCAPE,
                        SUBST
                    ]
                }
            ]
        },
        {
            className: 'regexp',
            variants: [
                {
                    begin: '///',
                    end: '///',
                    contains: [
                        SUBST,
                        hljs.HASH_COMMENT_MODE
                    ]
                },
                {
                    begin: '//[gim]{0,3}(?=\\W)',
                    relevance: 0
                },
                {
                    // regex can't start with space to parse x / 2 / 3 as two divisions
                    // regex can't start with *, and it supports an "illegal" in the main mode
                    begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
                }
            ]
        },
        { begin: '@' + JS_IDENT_RE // relevance booster
        },
        {
            subLanguage: 'javascript',
            excludeBegin: true,
            excludeEnd: true,
            variants: [
                {
                    begin: '```',
                    end: '```'
                },
                {
                    begin: '`',
                    end: '`'
                }
            ]
        }
    ];
    SUBST.contains = EXPRESSIONS;
    const TITLE = hljs.inherit(hljs.TITLE_MODE, { begin: JS_IDENT_RE });
    const POSSIBLE_PARAMS_RE = '(\\(.*\\)\\s*)?\\B[-=]>';
    const PARAMS = {
        className: 'params',
        begin: '\\([^\\(]',
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
        name: 'CoffeeScript',
        aliases: [
            'coffee',
            'cson',
            'iced'
        ],
        keywords: KEYWORDS,
        illegal: /\/\*/,
        contains: [
            ...EXPRESSIONS,
            hljs.COMMENT('###', '###'),
            hljs.HASH_COMMENT_MODE,
            {
                className: 'function',
                begin: '^\\s*' + JS_IDENT_RE + '\\s*=\\s*' + POSSIBLE_PARAMS_RE,
                end: '[-=]>',
                returnBegin: true,
                contains: [
                    TITLE,
                    PARAMS
                ]
            },
            {
                // anonymous function start
                begin: /[:\(,=]\s*/,
                relevance: 0,
                contains: [
                    {
                        className: 'function',
                        begin: POSSIBLE_PARAMS_RE,
                        end: '[-=]>',
                        returnBegin: true,
                        contains: [PARAMS]
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
        ]
    };
}
exports.default = default_1;
