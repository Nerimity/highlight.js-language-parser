"use strict";
/*
Language: Swift
Description: Swift is a general-purpose programming language built using a modern approach to safety, performance, and software design patterns.
Author: Steven Van Impe <steven.vanimpe@icloud.com>
Contributors: Chris Eidhof <chris@eidhof.nl>, Nate Cook <natecook@gmail.com>, Alexander Lichter <manniL@gmx.net>, Richard Gibson <gibson042@github>
Website: https://swift.org
Category: common, system
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
const Swift = __importStar(require("./lib/kws_swift.js"));
const regex_js_1 = require("../lib/regex.js");
/** @type LanguageFn */
function default_1(hljs) {
    const WHITESPACE = {
        match: /\s+/,
        relevance: 0
    };
    // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID411
    const BLOCK_COMMENT = hljs.COMMENT('/\\*', '\\*/', { contains: ['self'] });
    const COMMENTS = [
        hljs.C_LINE_COMMENT_MODE,
        BLOCK_COMMENT
    ];
    // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID413
    // https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html
    const DOT_KEYWORD = {
        match: [
            /\./,
            (0, regex_js_1.either)(...Swift.dotKeywords, ...Swift.optionalDotKeywords)
        ],
        className: { 2: "keyword" }
    };
    const KEYWORD_GUARD = {
        // Consume .keyword to prevent highlighting properties and methods as keywords.
        match: (0, regex_js_1.concat)(/\./, (0, regex_js_1.either)(...Swift.keywords)),
        relevance: 0
    };
    const PLAIN_KEYWORDS = Swift.keywords
        .filter(kw => typeof kw === 'string')
        .concat(["_|0"]); // seems common, so 0 relevance
    const REGEX_KEYWORDS = Swift.keywords
        .filter(kw => typeof kw !== 'string') // find regex
        .concat(Swift.keywordTypes)
        .map(Swift.keywordWrapper);
    const KEYWORD = { variants: [
            {
                className: 'keyword',
                match: (0, regex_js_1.either)(...REGEX_KEYWORDS, ...Swift.optionalDotKeywords)
            }
        ] };
    // find all the regular keywords
    const KEYWORDS = {
        $pattern: (0, regex_js_1.either)(/\b\w+/, // regular keywords
        /#\w+/ // number keywords
        ),
        keyword: PLAIN_KEYWORDS
            .concat(Swift.numberSignKeywords),
        literal: Swift.literals
    };
    const KEYWORD_MODES = [
        DOT_KEYWORD,
        KEYWORD_GUARD,
        KEYWORD
    ];
    // https://github.com/apple/swift/tree/main/stdlib/public/core
    const BUILT_IN_GUARD = {
        // Consume .built_in to prevent highlighting properties and methods.
        match: (0, regex_js_1.concat)(/\./, (0, regex_js_1.either)(...Swift.builtIns)),
        relevance: 0
    };
    const BUILT_IN = {
        className: 'built_in',
        match: (0, regex_js_1.concat)(/\b/, (0, regex_js_1.either)(...Swift.builtIns), /(?=\()/)
    };
    const BUILT_INS = [
        BUILT_IN_GUARD,
        BUILT_IN
    ];
    // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID418
    const OPERATOR_GUARD = {
        // Prevent -> from being highlighting as an operator.
        match: /->/,
        relevance: 0
    };
    const OPERATOR = {
        className: 'operator',
        relevance: 0,
        variants: [
            { match: Swift.operator },
            {
                // dot-operator: only operators that start with a dot are allowed to use dots as
                // characters (..., ...<, .*, etc). So there rule here is: a dot followed by one or more
                // characters that may also include dots.
                match: `\\.(\\.|${Swift.operatorCharacter})+`
            }
        ]
    };
    const OPERATORS = [
        OPERATOR_GUARD,
        OPERATOR
    ];
    // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#grammar_numeric-literal
    // TODO: Update for leading `-` after lookbehind is supported everywhere
    const decimalDigits = '([0-9]_*)+';
    const hexDigits = '([0-9a-fA-F]_*)+';
    const NUMBER = {
        className: 'number',
        relevance: 0,
        variants: [
            // decimal floating-point-literal (subsumes decimal-literal)
            { match: `\\b(${decimalDigits})(\\.(${decimalDigits}))?` + `([eE][+-]?(${decimalDigits}))?\\b` },
            // hexadecimal floating-point-literal (subsumes hexadecimal-literal)
            { match: `\\b0x(${hexDigits})(\\.(${hexDigits}))?` + `([pP][+-]?(${decimalDigits}))?\\b` },
            // octal-literal
            { match: /\b0o([0-7]_*)+\b/ },
            // binary-literal
            { match: /\b0b([01]_*)+\b/ }
        ]
    };
    // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#grammar_string-literal
    const ESCAPED_CHARACTER = (rawDelimiter = "") => ({
        className: 'subst',
        variants: [
            { match: (0, regex_js_1.concat)(/\\/, rawDelimiter, /[0\\tnr"']/) },
            { match: (0, regex_js_1.concat)(/\\/, rawDelimiter, /u\{[0-9a-fA-F]{1,8}\}/) }
        ]
    });
    const ESCAPED_NEWLINE = (rawDelimiter = "") => ({
        className: 'subst',
        match: (0, regex_js_1.concat)(/\\/, rawDelimiter, /[\t ]*(?:[\r\n]|\r\n)/)
    });
    const INTERPOLATION = (rawDelimiter = "") => ({
        className: 'subst',
        label: "interpol",
        begin: (0, regex_js_1.concat)(/\\/, rawDelimiter, /\(/),
        end: /\)/
    });
    const MULTILINE_STRING = (rawDelimiter = "") => ({
        begin: (0, regex_js_1.concat)(rawDelimiter, /"""/),
        end: (0, regex_js_1.concat)(/"""/, rawDelimiter),
        contains: [
            ESCAPED_CHARACTER(rawDelimiter),
            ESCAPED_NEWLINE(rawDelimiter),
            INTERPOLATION(rawDelimiter)
        ]
    });
    const SINGLE_LINE_STRING = (rawDelimiter = "") => ({
        begin: (0, regex_js_1.concat)(rawDelimiter, /"/),
        end: (0, regex_js_1.concat)(/"/, rawDelimiter),
        contains: [
            ESCAPED_CHARACTER(rawDelimiter),
            INTERPOLATION(rawDelimiter)
        ]
    });
    const STRING = {
        className: 'string',
        variants: [
            MULTILINE_STRING(),
            MULTILINE_STRING("#"),
            MULTILINE_STRING("##"),
            MULTILINE_STRING("###"),
            SINGLE_LINE_STRING(),
            SINGLE_LINE_STRING("#"),
            SINGLE_LINE_STRING("##"),
            SINGLE_LINE_STRING("###")
        ]
    };
    // https://docs.swift.org/swift-book/ReferenceManual/LexicalStructure.html#ID412
    const QUOTED_IDENTIFIER = { match: (0, regex_js_1.concat)(/`/, Swift.identifier, /`/) };
    const IMPLICIT_PARAMETER = {
        className: 'variable',
        match: /\$\d+/
    };
    const PROPERTY_WRAPPER_PROJECTION = {
        className: 'variable',
        match: `\\$${Swift.identifierCharacter}+`
    };
    const IDENTIFIERS = [
        QUOTED_IDENTIFIER,
        IMPLICIT_PARAMETER,
        PROPERTY_WRAPPER_PROJECTION
    ];
    // https://docs.swift.org/swift-book/ReferenceManual/Attributes.html
    const AVAILABLE_ATTRIBUTE = {
        match: /(@|#(un)?)available/,
        className: "keyword",
        starts: { contains: [
                {
                    begin: /\(/,
                    end: /\)/,
                    keywords: Swift.availabilityKeywords,
                    contains: [
                        ...OPERATORS,
                        NUMBER,
                        STRING
                    ]
                }
            ] }
    };
    const KEYWORD_ATTRIBUTE = {
        className: 'keyword',
        match: (0, regex_js_1.concat)(/@/, (0, regex_js_1.either)(...Swift.keywordAttributes))
    };
    const USER_DEFINED_ATTRIBUTE = {
        className: 'meta',
        match: (0, regex_js_1.concat)(/@/, Swift.identifier)
    };
    const ATTRIBUTES = [
        AVAILABLE_ATTRIBUTE,
        KEYWORD_ATTRIBUTE,
        USER_DEFINED_ATTRIBUTE
    ];
    // https://docs.swift.org/swift-book/ReferenceManual/Types.html
    const TYPE = {
        match: (0, regex_js_1.lookahead)(/\b[A-Z]/),
        relevance: 0,
        contains: [
            {
                className: 'type',
                match: (0, regex_js_1.concat)(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, Swift.identifierCharacter, '+')
            },
            {
                className: 'type',
                match: Swift.typeIdentifier,
                relevance: 0
            },
            {
                match: /[?!]+/,
                relevance: 0
            },
            {
                match: /\.\.\./,
                relevance: 0
            },
            {
                match: (0, regex_js_1.concat)(/\s+&\s+/, (0, regex_js_1.lookahead)(Swift.typeIdentifier)),
                relevance: 0
            }
        ]
    };
    const GENERIC_ARGUMENTS = {
        begin: /</,
        end: />/,
        keywords: KEYWORDS,
        contains: [
            ...COMMENTS,
            ...KEYWORD_MODES,
            ...ATTRIBUTES,
            OPERATOR_GUARD,
            TYPE
        ]
    };
    TYPE.contains.push(GENERIC_ARGUMENTS);
    // https://docs.swift.org/swift-book/ReferenceManual/Expressions.html#ID552
    // Prevents element names from being highlighted as keywords.
    const TUPLE_ELEMENT_NAME = {
        match: (0, regex_js_1.concat)(Swift.identifier, /\s*:/),
        keywords: "_|0",
        relevance: 0
    };
    // Matches tuples as well as the parameter list of a function type.
    const TUPLE = {
        begin: /\(/,
        end: /\)/,
        relevance: 0,
        keywords: KEYWORDS,
        contains: [
            'self',
            TUPLE_ELEMENT_NAME,
            ...COMMENTS,
            ...KEYWORD_MODES,
            ...BUILT_INS,
            ...OPERATORS,
            NUMBER,
            STRING,
            ...IDENTIFIERS,
            ...ATTRIBUTES,
            TYPE
        ]
    };
    const GENERIC_PARAMETERS = {
        begin: /</,
        end: />/,
        contains: [
            ...COMMENTS,
            TYPE
        ]
    };
    const FUNCTION_PARAMETER_NAME = {
        begin: (0, regex_js_1.either)((0, regex_js_1.lookahead)((0, regex_js_1.concat)(Swift.identifier, /\s*:/)), (0, regex_js_1.lookahead)((0, regex_js_1.concat)(Swift.identifier, /\s+/, Swift.identifier, /\s*:/))),
        end: /:/,
        relevance: 0,
        contains: [
            {
                className: 'keyword',
                match: /\b_\b/
            },
            {
                className: 'params',
                match: Swift.identifier
            }
        ]
    };
    const FUNCTION_PARAMETERS = {
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [
            FUNCTION_PARAMETER_NAME,
            ...COMMENTS,
            ...KEYWORD_MODES,
            ...OPERATORS,
            NUMBER,
            STRING,
            ...ATTRIBUTES,
            TYPE,
            TUPLE
        ],
        endsParent: true,
        illegal: /["']/
    };
    // https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID362
    const FUNCTION = {
        match: [
            /func/,
            /\s+/,
            (0, regex_js_1.either)(QUOTED_IDENTIFIER.match, Swift.identifier, Swift.operator)
        ],
        className: {
            1: "keyword",
            3: "title.function"
        },
        contains: [
            GENERIC_PARAMETERS,
            FUNCTION_PARAMETERS,
            WHITESPACE
        ],
        illegal: [
            /\[/,
            /%/
        ]
    };
    // https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID375
    // https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID379
    const INIT_SUBSCRIPT = {
        match: [
            /\b(?:subscript|init[?!]?)/,
            /\s*(?=[<(])/,
        ],
        className: { 1: "keyword" },
        contains: [
            GENERIC_PARAMETERS,
            FUNCTION_PARAMETERS,
            WHITESPACE
        ],
        illegal: /\[|%/
    };
    // https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID380
    const OPERATOR_DECLARATION = {
        match: [
            /operator/,
            /\s+/,
            Swift.operator
        ],
        className: {
            1: "keyword",
            3: "title"
        }
    };
    // https://docs.swift.org/swift-book/ReferenceManual/Declarations.html#ID550
    const PRECEDENCEGROUP = {
        begin: [
            /precedencegroup/,
            /\s+/,
            Swift.typeIdentifier
        ],
        className: {
            1: "keyword",
            3: "title"
        },
        contains: [TYPE],
        keywords: [
            ...Swift.precedencegroupKeywords,
            ...Swift.literals
        ],
        end: /}/
    };
    // Add supported submodes to string interpolation.
    for (const variant of STRING.variants) {
        const interpolation = variant.contains.find(mode => mode.label === "interpol");
        // TODO: Interpolation can contain any expression, so there's room for improvement here.
        interpolation.keywords = KEYWORDS;
        const submodes = [
            ...KEYWORD_MODES,
            ...BUILT_INS,
            ...OPERATORS,
            NUMBER,
            STRING,
            ...IDENTIFIERS
        ];
        interpolation.contains = [
            ...submodes,
            {
                begin: /\(/,
                end: /\)/,
                contains: [
                    'self',
                    ...submodes
                ]
            }
        ];
    }
    return {
        name: 'Swift',
        keywords: KEYWORDS,
        contains: [
            ...COMMENTS,
            FUNCTION,
            INIT_SUBSCRIPT,
            {
                beginKeywords: 'struct protocol class extension enum actor',
                end: '\\{',
                excludeEnd: true,
                keywords: KEYWORDS,
                contains: [
                    hljs.inherit(hljs.TITLE_MODE, {
                        className: "title.class",
                        begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
                    }),
                    ...KEYWORD_MODES
                ]
            },
            OPERATOR_DECLARATION,
            PRECEDENCEGROUP,
            {
                beginKeywords: 'import',
                end: /$/,
                contains: [...COMMENTS],
                relevance: 0
            },
            ...KEYWORD_MODES,
            ...BUILT_INS,
            ...OPERATORS,
            NUMBER,
            STRING,
            ...IDENTIFIERS,
            ...ATTRIBUTES,
            TYPE,
            TUPLE
        ]
    };
}
exports.default = default_1;
