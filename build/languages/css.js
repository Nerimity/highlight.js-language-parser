"use strict";
/*
Language: CSS
Category: common, css, web
Website: https://developer.mozilla.org/en-US/docs/Web/CSS
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
// @ts-ignore
const css = __importStar(require("./lib/css-shared.js"));
/** @type LanguageFn */
function default_1(hljs) {
    const regex = hljs.regex;
    const modes = css.MODES(hljs);
    const VENDOR_PREFIX = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ };
    const AT_MODIFIERS = "and or not only";
    const AT_PROPERTY_RE = /@-?\w[\w]*(-\w+)*/; // @-webkit-keyframes
    const IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
    const STRINGS = [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE
    ];
    return {
        name: 'CSS',
        case_insensitive: true,
        illegal: /[=|'\$]/,
        keywords: { keyframePosition: "from to" },
        classNameAliases: {
            // for visual continuity with `tag {}` and because we
            // don't have a great class for this?
            keyframePosition: "selector-tag"
        },
        contains: [
            modes.BLOCK_COMMENT,
            VENDOR_PREFIX,
            // to recognize keyframe 40% etc which are outside the scope of our
            // attribute value mode
            modes.CSS_NUMBER_MODE,
            {
                className: 'selector-id',
                begin: /#[A-Za-z0-9_-]+/,
                relevance: 0
            },
            {
                className: 'selector-class',
                begin: '\\.' + IDENT_RE,
                relevance: 0
            },
            modes.ATTRIBUTE_SELECTOR_MODE,
            {
                className: 'selector-pseudo',
                variants: [
                    { begin: ':(' + css.PSEUDO_CLASSES.join('|') + ')' },
                    { begin: ':(:)?(' + css.PSEUDO_ELEMENTS.join('|') + ')' }
                ]
            },
            // we may actually need this (12/2020)
            // { // pseudo-selector params
            //   begin: /\(/,
            //   end: /\)/,
            //   contains: [ hljs.CSS_NUMBER_MODE ]
            // },
            modes.CSS_VARIABLE,
            {
                className: 'attribute',
                begin: '\\b(' + css.ATTRIBUTES.join('|') + ')\\b'
            },
            // attribute values
            {
                begin: /:/,
                end: /[;}{]/,
                contains: [
                    modes.BLOCK_COMMENT,
                    modes.HEXCOLOR,
                    modes.IMPORTANT,
                    modes.CSS_NUMBER_MODE,
                    ...STRINGS,
                    // needed to highlight these as strings and to avoid issues with
                    // illegal characters that might be inside urls that would tigger the
                    // languages illegal stack
                    {
                        begin: /(url|data-uri)\(/,
                        end: /\)/,
                        relevance: 0,
                        keywords: { built_in: "url data-uri" },
                        contains: [
                            ...STRINGS,
                            {
                                className: "string",
                                // any character other than `)` as in `url()` will be the start
                                // of a string, which ends with `)` (from the parent mode)
                                begin: /[^)]/,
                                endsWithParent: true,
                                excludeEnd: true
                            }
                        ]
                    },
                    modes.FUNCTION_DISPATCH
                ]
            },
            {
                begin: regex.lookahead(/@/),
                end: '[{;]',
                relevance: 0,
                illegal: /:/,
                contains: [
                    {
                        className: 'keyword',
                        begin: AT_PROPERTY_RE
                    },
                    {
                        begin: /\s/,
                        endsWithParent: true,
                        excludeEnd: true,
                        relevance: 0,
                        keywords: {
                            $pattern: /[a-z-]+/,
                            keyword: AT_MODIFIERS,
                            attribute: css.MEDIA_FEATURES.join(" ")
                        },
                        contains: [
                            {
                                begin: /[a-z-]+(?=:)/,
                                className: "attribute"
                            },
                            ...STRINGS,
                            modes.CSS_NUMBER_MODE
                        ]
                    }
                ]
            },
            {
                className: 'selector-tag',
                begin: '\\b(' + css.TAGS.join('|') + ')\\b'
            }
        ]
    };
}
exports.default = default_1;
