"use strict";
/*
Language: TypeScript
Author: Panu Horsmalahti <panu.horsmalahti@iki.fi>
Contributors: Ike Ku <dempfi@yahoo.com>
Description: TypeScript is a strict superset of JavaScript
Website: https://www.typescriptlang.org
Category: common, scripting
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ECMAScript = __importStar(require("./lib/ecmascript.js"));
const javascript_js_1 = __importDefault(require("./javascript.js"));
/** @type LanguageFn */
function default_1(hljs) {
    const tsLanguage = (0, javascript_js_1.default)(hljs);
    const IDENT_RE = ECMAScript.IDENT_RE;
    const TYPES = [
        "any",
        "void",
        "number",
        "boolean",
        "string",
        "object",
        "never",
        "symbol",
        "bigint",
        "unknown"
    ];
    const NAMESPACE = {
        beginKeywords: 'namespace',
        end: /\{/,
        excludeEnd: true,
        contains: [tsLanguage.exports.CLASS_REFERENCE]
    };
    const INTERFACE = {
        beginKeywords: 'interface',
        end: /\{/,
        excludeEnd: true,
        keywords: {
            keyword: 'interface extends',
            built_in: TYPES
        },
        contains: [tsLanguage.exports.CLASS_REFERENCE]
    };
    const USE_STRICT = {
        className: 'meta',
        relevance: 10,
        begin: /^\s*['"]use strict['"]/
    };
    const TS_SPECIFIC_KEYWORDS = [
        "type",
        "namespace",
        "interface",
        "public",
        "private",
        "protected",
        "implements",
        "declare",
        "abstract",
        "readonly",
        "enum",
        "override"
    ];
    const KEYWORDS = {
        $pattern: ECMAScript.IDENT_RE,
        keyword: ECMAScript.KEYWORDS.concat(TS_SPECIFIC_KEYWORDS),
        literal: ECMAScript.LITERALS,
        built_in: ECMAScript.BUILT_INS.concat(TYPES),
        "variable.language": ECMAScript.BUILT_IN_VARIABLES
    };
    const DECORATOR = {
        className: 'meta',
        begin: '@' + IDENT_RE,
    };
    const swapMode = (mode, label, replacement) => {
        const indx = mode.contains.findIndex(m => m.label === label);
        if (indx === -1) {
            throw new Error("can not find mode to replace");
        }
        mode.contains.splice(indx, 1, replacement);
    };
    // this should update anywhere keywords is used since
    // it will be the same actual JS object
    Object.assign(tsLanguage.keywords, KEYWORDS);
    tsLanguage.exports.PARAMS_CONTAINS.push(DECORATOR);
    tsLanguage.contains = tsLanguage.contains.concat([
        DECORATOR,
        NAMESPACE,
        INTERFACE,
    ]);
    // TS gets a simpler shebang rule than JS
    swapMode(tsLanguage, "shebang", hljs.SHEBANG());
    // JS use strict rule purposely excludes `asm` which makes no sense
    swapMode(tsLanguage, "use_strict", USE_STRICT);
    const functionDeclaration = tsLanguage.contains.find(m => m.label === "func.def");
    functionDeclaration.relevance = 0; // () => {} is more typical in TypeScript
    Object.assign(tsLanguage, {
        name: 'TypeScript',
        aliases: [
            'ts',
            'tsx'
        ]
    });
    return tsLanguage;
}
exports.default = default_1;
