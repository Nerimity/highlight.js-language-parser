"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
Language: YAML
Description: Yet Another Markdown Language
Author: Stefan Wienert <stwienert@gmail.com>
Contributors: Carl Baxter <carl@cbax.tech>
Requires: ruby.js
Website: https://yaml.org
Category: common, config
*/
function default_1(hljs) {
    const LITERALS = 'true false yes no null';
    // YAML spec allows non-reserved URI characters in tags.
    const URI_CHARACTERS = '[\\w#;/?:@&=+$,.~*\'()[\\]]+';
    // Define keys as starting with a word character
    // ...containing word chars, spaces, colons, forward-slashes, hyphens and periods
    // ...and ending with a colon followed immediately by a space, tab or newline.
    // The YAML spec allows for much more than this, but this covers most use-cases.
    const KEY = {
        className: 'attr',
        variants: [
            { begin: '\\w[\\w :\\/.-]*:(?=[ \t]|$)' },
            {
                begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)'
            },
            {
                begin: '\'\\w[\\w :\\/.-]*\':(?=[ \t]|$)'
            }
        ]
    };
    const TEMPLATE_VARIABLES = {
        className: 'template-variable',
        variants: [
            {
                begin: /\{\{/,
                end: /\}\}/
            },
            {
                begin: /%\{/,
                end: /\}/
            }
        ]
    };
    const STRING = {
        className: 'string',
        relevance: 0,
        variants: [
            {
                begin: /'/,
                end: /'/
            },
            {
                begin: /"/,
                end: /"/
            },
            { begin: /\S+/ }
        ],
        contains: [
            hljs.BACKSLASH_ESCAPE,
            TEMPLATE_VARIABLES
        ]
    };
    // Strings inside of value containers (objects) can't contain braces,
    // brackets, or commas
    const CONTAINER_STRING = hljs.inherit(STRING, { variants: [
            {
                begin: /'/,
                end: /'/
            },
            {
                begin: /"/,
                end: /"/
            },
            { begin: /[^\s,{}[\]]+/ }
        ] });
    const DATE_RE = '[0-9]{4}(-[0-9][0-9]){0,2}';
    const TIME_RE = '([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?';
    const FRACTION_RE = '(\\.[0-9]*)?';
    const ZONE_RE = '([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?';
    const TIMESTAMP = {
        className: 'number',
        begin: '\\b' + DATE_RE + TIME_RE + FRACTION_RE + ZONE_RE + '\\b'
    };
    const VALUE_CONTAINER = {
        end: ',',
        endsWithParent: true,
        excludeEnd: true,
        keywords: LITERALS,
        relevance: 0
    };
    const OBJECT = {
        begin: /\{/,
        end: /\}/,
        contains: [VALUE_CONTAINER],
        illegal: '\\n',
        relevance: 0
    };
    const ARRAY = {
        begin: '\\[',
        end: '\\]',
        contains: [VALUE_CONTAINER],
        illegal: '\\n',
        relevance: 0
    };
    const MODES = [
        KEY,
        {
            className: 'meta',
            begin: '^---\\s*$',
            relevance: 10
        },
        {
            // Blocks start with a | or > followed by a newline
            //
            // Indentation of subsequent lines must be the same to
            // be considered part of the block
            className: 'string',
            begin: '[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*'
        },
        {
            begin: '<%[%=-]?',
            end: '[%-]?%>',
            subLanguage: 'ruby',
            excludeBegin: true,
            excludeEnd: true,
            relevance: 0
        },
        {
            className: 'type',
            begin: '!\\w+!' + URI_CHARACTERS
        },
        // https://yaml.org/spec/1.2/spec.html#id2784064
        {
            className: 'type',
            begin: '!<' + URI_CHARACTERS + ">"
        },
        {
            className: 'type',
            begin: '!' + URI_CHARACTERS
        },
        {
            className: 'type',
            begin: '!!' + URI_CHARACTERS
        },
        {
            className: 'meta',
            begin: '&' + hljs.UNDERSCORE_IDENT_RE + '$'
        },
        {
            className: 'meta',
            begin: '\\*' + hljs.UNDERSCORE_IDENT_RE + '$'
        },
        {
            className: 'bullet',
            // TODO: remove |$ hack when we have proper look-ahead support
            begin: '-(?=[ ]|$)',
            relevance: 0
        },
        hljs.HASH_COMMENT_MODE,
        {
            beginKeywords: LITERALS,
            keywords: { literal: LITERALS }
        },
        TIMESTAMP,
        // numbers are any valid C-style number that
        // sit isolated from other words
        {
            className: 'number',
            begin: hljs.C_NUMBER_RE + '\\b',
            relevance: 0
        },
        OBJECT,
        ARRAY,
        STRING
    ];
    const VALUE_MODES = [...MODES];
    VALUE_MODES.pop();
    VALUE_MODES.push(CONTAINER_STRING);
    VALUE_CONTAINER.contains = VALUE_MODES;
    return {
        name: 'YAML',
        case_insensitive: true,
        aliases: ['yml'],
        contains: MODES
    };
}
exports.default = default_1;
