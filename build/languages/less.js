"use strict";
/*
Language: Less
Description: It's CSS, with just a little more.
Author:   Max Mikhailov <seven.phases.max@gmail.com>
Website: http://lesscss.org
Category: common, css, web
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
    const PSEUDO_SELECTORS = css.PSEUDO_SELECTORS;
    const AT_MODIFIERS = "and or not only";
    const IDENT_RE = '[\\w-]+'; // yes, Less identifiers may begin with a digit
    const INTERP_IDENT_RE = '(' + IDENT_RE + '|@\\{' + IDENT_RE + '\\})';
    /* Generic Modes */
    const RULES = [];
    const VALUE_MODES = []; // forward def. for recursive modes
    const STRING_MODE = function (c) {
        return {
            // Less strings are not multiline (also include '~' for more consistent coloring of "escaped" strings)
            className: 'string',
            begin: '~?' + c + '.*?' + c
        };
    };
    const IDENT_MODE = function (name, begin, relevance) {
        return {
            className: name,
            begin: begin,
            relevance: relevance
        };
    };
    const AT_KEYWORDS = {
        $pattern: /[a-z-]+/,
        keyword: AT_MODIFIERS,
        attribute: css.MEDIA_FEATURES.join(" ")
    };
    const PARENS_MODE = {
        // used only to properly balance nested parens inside mixin call, def. arg list
        begin: '\\(',
        end: '\\)',
        contains: VALUE_MODES,
        keywords: AT_KEYWORDS,
        relevance: 0
    };
    // generic Less highlighter (used almost everywhere except selectors):
    VALUE_MODES.push(hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, STRING_MODE("'"), STRING_MODE('"'), modes.CSS_NUMBER_MODE, // fixme: it does not include dot for numbers like .5em :(
    {
        begin: '(url|data-uri)\\(',
        starts: {
            className: 'string',
            end: '[\\)\\n]',
            excludeEnd: true
        }
    }, modes.HEXCOLOR, PARENS_MODE, IDENT_MODE('variable', '@@?' + IDENT_RE, 10), IDENT_MODE('variable', '@\\{' + IDENT_RE + '\\}'), IDENT_MODE('built_in', '~?`[^`]*?`'), // inline javascript (or whatever host language) *multiline* string
    {
        className: 'attribute',
        begin: IDENT_RE + '\\s*:',
        end: ':',
        returnBegin: true,
        excludeEnd: true
    }, modes.IMPORTANT, { beginKeywords: 'and not' }, modes.FUNCTION_DISPATCH);
    const VALUE_WITH_RULESETS = VALUE_MODES.concat({
        begin: /\{/,
        end: /\}/,
        contains: RULES
    });
    const MIXIN_GUARD_MODE = {
        beginKeywords: 'when',
        endsWithParent: true,
        contains: [{ beginKeywords: 'and not' }].concat(VALUE_MODES) // using this form to override VALUE’s 'function' match
    };
    /* Rule-Level Modes */
    const RULE_MODE = {
        begin: INTERP_IDENT_RE + '\\s*:',
        returnBegin: true,
        end: /[;}]/,
        relevance: 0,
        contains: [
            { begin: /-(webkit|moz|ms|o)-/ },
            modes.CSS_VARIABLE,
            {
                className: 'attribute',
                begin: '\\b(' + css.ATTRIBUTES.join('|') + ')\\b',
                end: /(?=:)/,
                starts: {
                    endsWithParent: true,
                    illegal: '[<=$]',
                    relevance: 0,
                    contains: VALUE_MODES
                }
            }
        ]
    };
    const AT_RULE_MODE = {
        className: 'keyword',
        begin: '@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b',
        starts: {
            end: '[;{}]',
            keywords: AT_KEYWORDS,
            returnEnd: true,
            contains: VALUE_MODES,
            relevance: 0
        }
    };
    // variable definitions and calls
    const VAR_RULE_MODE = {
        className: 'variable',
        variants: [
            // using more strict pattern for higher relevance to increase chances of Less detection.
            // this is *the only* Less specific statement used in most of the sources, so...
            // (we’ll still often loose to the css-parser unless there's '//' comment,
            // simply because 1 variable just can't beat 99 properties :)
            {
                begin: '@' + IDENT_RE + '\\s*:',
                relevance: 15
            },
            { begin: '@' + IDENT_RE }
        ],
        starts: {
            end: '[;}]',
            returnEnd: true,
            contains: VALUE_WITH_RULESETS
        }
    };
    const SELECTOR_MODE = {
        // first parse unambiguous selectors (i.e. those not starting with tag)
        // then fall into the scary lookahead-discriminator variant.
        // this mode also handles mixin definitions and calls
        variants: [
            {
                begin: '[\\.#:&\\[>]',
                end: '[;{}]' // mixin calls end with ';'
            },
            {
                begin: INTERP_IDENT_RE,
                end: /\{/
            }
        ],
        returnBegin: true,
        returnEnd: true,
        illegal: '[<=\'$"]',
        relevance: 0,
        contains: [
            hljs.C_LINE_COMMENT_MODE,
            hljs.C_BLOCK_COMMENT_MODE,
            MIXIN_GUARD_MODE,
            IDENT_MODE('keyword', 'all\\b'),
            IDENT_MODE('variable', '@\\{' + IDENT_RE + '\\}'),
            {
                begin: '\\b(' + css.TAGS.join('|') + ')\\b',
                className: 'selector-tag'
            },
            modes.CSS_NUMBER_MODE,
            IDENT_MODE('selector-tag', INTERP_IDENT_RE, 0),
            IDENT_MODE('selector-id', '#' + INTERP_IDENT_RE),
            IDENT_MODE('selector-class', '\\.' + INTERP_IDENT_RE, 0),
            IDENT_MODE('selector-tag', '&', 0),
            modes.ATTRIBUTE_SELECTOR_MODE,
            {
                className: 'selector-pseudo',
                begin: ':(' + css.PSEUDO_CLASSES.join('|') + ')'
            },
            {
                className: 'selector-pseudo',
                begin: ':(:)?(' + css.PSEUDO_ELEMENTS.join('|') + ')'
            },
            {
                begin: /\(/,
                end: /\)/,
                relevance: 0,
                contains: VALUE_WITH_RULESETS
            },
            { begin: '!important' },
            modes.FUNCTION_DISPATCH
        ]
    };
    const PSEUDO_SELECTOR_MODE = {
        begin: IDENT_RE + ':(:)?' + `(${PSEUDO_SELECTORS.join('|')})`,
        returnBegin: true,
        contains: [SELECTOR_MODE]
    };
    RULES.push(hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, AT_RULE_MODE, VAR_RULE_MODE, PSEUDO_SELECTOR_MODE, RULE_MODE, SELECTOR_MODE, MIXIN_GUARD_MODE, modes.FUNCTION_DISPATCH);
    return {
        name: 'Less',
        case_insensitive: true,
        illegal: '[=>\'/<($"]',
        contains: RULES
    };
}
exports.default = default_1;
