"use strict";
/*
Language: Stylus
Author: Bryant Williams <b.n.williams@gmail.com>
Description: Stylus is an expressive, robust, feature-rich CSS language built for nodejs.
Website: https://github.com/stylus/stylus
Category: css, web
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
const css = __importStar(require("./lib/css-shared.js"));
/** @type LanguageFn */
function default_1(hljs) {
    const modes = css.MODES(hljs);
    const AT_MODIFIERS = "and or not only";
    const VARIABLE = {
        className: 'variable',
        begin: '\\$' + hljs.IDENT_RE
    };
    const AT_KEYWORDS = [
        'charset',
        'css',
        'debug',
        'extend',
        'font-face',
        'for',
        'import',
        'include',
        'keyframes',
        'media',
        'mixin',
        'page',
        'warn',
        'while'
    ];
    const LOOKAHEAD_TAG_END = '(?=[.\\s\\n[:,(])';
    // illegals
    const ILLEGAL = [
        '\\?',
        '(\\bReturn\\b)',
        '(\\bEnd\\b)',
        '(\\bend\\b)',
        '(\\bdef\\b)',
        ';',
        '#\\s',
        '\\*\\s',
        '===\\s',
        '\\|',
        '%' // prolog
    ];
    return {
        name: 'Stylus',
        aliases: ['styl'],
        case_insensitive: false,
        keywords: 'if else for in',
        illegal: '(' + ILLEGAL.join('|') + ')',
        contains: [
            // strings
            hljs.QUOTE_STRING_MODE,
            hljs.APOS_STRING_MODE,
            // comments
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            // hex colors
            modes.HEXCOLOR,
            // class tag
            {
                begin: '\\.[a-zA-Z][a-zA-Z0-9_-]*' + LOOKAHEAD_TAG_END,
                className: 'selector-class'
            },
            // id tag
            {
                begin: '#[a-zA-Z][a-zA-Z0-9_-]*' + LOOKAHEAD_TAG_END,
                className: 'selector-id'
            },
            // tags
            {
                begin: '\\b(' + css.TAGS.join('|') + ')' + LOOKAHEAD_TAG_END,
                className: 'selector-tag'
            },
            // psuedo selectors
            {
                className: 'selector-pseudo',
                begin: '&?:(' + css.PSEUDO_CLASSES.join('|') + ')' + LOOKAHEAD_TAG_END
            },
            {
                className: 'selector-pseudo',
                begin: '&?:(:)?(' + css.PSEUDO_ELEMENTS.join('|') + ')' + LOOKAHEAD_TAG_END
            },
            modes.ATTRIBUTE_SELECTOR_MODE,
            {
                className: "keyword",
                begin: /@media/,
                starts: {
                    end: /[{;}]/,
                    keywords: {
                        $pattern: /[a-z-]+/,
                        keyword: AT_MODIFIERS,
                        attribute: css.MEDIA_FEATURES.join(" ")
                    },
                    contains: [modes.CSS_NUMBER_MODE]
                }
            },
            // @ keywords
            {
                className: 'keyword',
                begin: '\@((-(o|moz|ms|webkit)-)?(' + AT_KEYWORDS.join('|') + '))\\b'
            },
            // variables
            VARIABLE,
            // dimension
            modes.CSS_NUMBER_MODE,
            // functions
            //  - only from beginning of line + whitespace
            {
                className: 'function',
                begin: '^[a-zA-Z][a-zA-Z0-9_\-]*\\(.*\\)',
                illegal: '[\\n]',
                returnBegin: true,
                contains: [
                    {
                        className: 'title',
                        begin: '\\b[a-zA-Z][a-zA-Z0-9_\-]*'
                    },
                    {
                        className: 'params',
                        begin: /\(/,
                        end: /\)/,
                        contains: [
                            modes.HEXCOLOR,
                            VARIABLE,
                            hljs.APOS_STRING_MODE,
                            modes.CSS_NUMBER_MODE,
                            hljs.QUOTE_STRING_MODE
                        ]
                    }
                ]
            },
            // css variables
            modes.CSS_VARIABLE,
            // attributes
            //  - only from beginning of line + whitespace
            //  - must have whitespace after it
            {
                className: 'attribute',
                begin: '\\b(' + css.ATTRIBUTES.join('|') + ')\\b',
                starts: {
                    // value container
                    end: /;|$/,
                    contains: [
                        modes.HEXCOLOR,
                        VARIABLE,
                        hljs.APOS_STRING_MODE,
                        hljs.QUOTE_STRING_MODE,
                        modes.CSS_NUMBER_MODE,
                        hljs.C_BLOCK_COMMENT_MODE,
                        modes.IMPORTANT,
                        modes.FUNCTION_DISPATCH
                    ],
                    illegal: /\./,
                    relevance: 0
                }
            },
            modes.FUNCTION_DISPATCH
        ]
    };
}
exports.default = default_1;
