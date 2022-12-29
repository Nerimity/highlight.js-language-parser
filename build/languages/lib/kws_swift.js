"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityKeywords = exports.keywordAttributes = exports.typeIdentifier = exports.identifier = exports.identifierCharacter = exports.identifierHead = exports.operator = exports.operatorCharacter = exports.operatorHead = exports.builtIns = exports.numberSignKeywords = exports.precedencegroupKeywords = exports.literals = exports.keywords = exports.keywordTypes = exports.optionalDotKeywords = exports.dotKeywords = exports.keywordWrapper = void 0;
const regex_js_1 = require("../../lib/regex.js");
const keywordWrapper = keyword => (0, regex_js_1.concat)(/\b/, keyword, /\w$/.test(keyword) ? /\b/ : /\B/);
exports.keywordWrapper = keywordWrapper;
// Keywords that require a leading dot.
exports.dotKeywords = [
    'Protocol',
    'Type' // contextual
].map(exports.keywordWrapper);
// Keywords that may have a leading dot.
exports.optionalDotKeywords = [
    'init',
    'self'
].map(exports.keywordWrapper);
// should register as keyword, not type
exports.keywordTypes = [
    'Any',
    'Self'
];
// Regular keywords and literals.
exports.keywords = [
    // strings below will be fed into the regular `keywords` engine while regex
    // will result in additional modes being created to scan for those keywords to
    // avoid conflicts with other rules
    'actor',
    'any',
    'associatedtype',
    'async',
    'await',
    /as\?/,
    /as!/,
    'as',
    'break',
    'case',
    'catch',
    'class',
    'continue',
    'convenience',
    'default',
    'defer',
    'deinit',
    'didSet',
    'distributed',
    'do',
    'dynamic',
    'else',
    'enum',
    'extension',
    'fallthrough',
    /fileprivate\(set\)/,
    'fileprivate',
    'final',
    'for',
    'func',
    'get',
    'guard',
    'if',
    'import',
    'indirect',
    'infix',
    /init\?/,
    /init!/,
    'inout',
    /internal\(set\)/,
    'internal',
    'in',
    'is',
    'isolated',
    'nonisolated',
    'lazy',
    'let',
    'mutating',
    'nonmutating',
    /open\(set\)/,
    'open',
    'operator',
    'optional',
    'override',
    'postfix',
    'precedencegroup',
    'prefix',
    /private\(set\)/,
    'private',
    'protocol',
    /public\(set\)/,
    'public',
    'repeat',
    'required',
    'rethrows',
    'return',
    'set',
    'some',
    'static',
    'struct',
    'subscript',
    'super',
    'switch',
    'throws',
    'throw',
    /try\?/,
    /try!/,
    'try',
    'typealias',
    /unowned\(safe\)/,
    /unowned\(unsafe\)/,
    'unowned',
    'var',
    'weak',
    'where',
    'while',
    'willSet' // contextual
];
// NOTE: Contextual keywords are reserved only in specific contexts.
// Ideally, these should be matched using modes to avoid false positives.
// Literals.
exports.literals = [
    'false',
    'nil',
    'true'
];
// Keywords used in precedence groups.
exports.precedencegroupKeywords = [
    'assignment',
    'associativity',
    'higherThan',
    'left',
    'lowerThan',
    'none',
    'right'
];
// Keywords that start with a number sign (#).
// #(un)available is handled separately.
exports.numberSignKeywords = [
    '#colorLiteral',
    '#column',
    '#dsohandle',
    '#else',
    '#elseif',
    '#endif',
    '#error',
    '#file',
    '#fileID',
    '#fileLiteral',
    '#filePath',
    '#function',
    '#if',
    '#imageLiteral',
    '#keyPath',
    '#line',
    '#selector',
    '#sourceLocation',
    '#warn_unqualified_access',
    '#warning'
];
// Global functions in the Standard Library.
exports.builtIns = [
    'abs',
    'all',
    'any',
    'assert',
    'assertionFailure',
    'debugPrint',
    'dump',
    'fatalError',
    'getVaList',
    'isKnownUniquelyReferenced',
    'max',
    'min',
    'numericCast',
    'pointwiseMax',
    'pointwiseMin',
    'precondition',
    'preconditionFailure',
    'print',
    'readLine',
    'repeatElement',
    'sequence',
    'stride',
    'swap',
    'swift_unboxFromSwiftValueWithType',
    'transcode',
    'type',
    'unsafeBitCast',
    'unsafeDowncast',
    'withExtendedLifetime',
    'withUnsafeMutablePointer',
    'withUnsafePointer',
    'withVaList',
    'withoutActuallyEscaping',
    'zip'
];
// Valid first characters for operators.
exports.operatorHead = (0, regex_js_1.either)(/[/=\-+!*%<>&|^~?]/, /[\u00A1-\u00A7]/, /[\u00A9\u00AB]/, /[\u00AC\u00AE]/, /[\u00B0\u00B1]/, /[\u00B6\u00BB\u00BF\u00D7\u00F7]/, /[\u2016-\u2017]/, /[\u2020-\u2027]/, /[\u2030-\u203E]/, /[\u2041-\u2053]/, /[\u2055-\u205E]/, /[\u2190-\u23FF]/, /[\u2500-\u2775]/, /[\u2794-\u2BFF]/, /[\u2E00-\u2E7F]/, /[\u3001-\u3003]/, /[\u3008-\u3020]/, /[\u3030]/);
// Valid characters for operators.
exports.operatorCharacter = (0, regex_js_1.either)(exports.operatorHead, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/
// TODO: The following characters are also allowed, but the regex isn't supported yet.
// /[\u{E0100}-\u{E01EF}]/u
);
// Valid operator.
exports.operator = (0, regex_js_1.concat)(exports.operatorHead, exports.operatorCharacter, '*');
// Valid first characters for identifiers.
exports.identifierHead = (0, regex_js_1.either)(/[a-zA-Z_]/, /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/, /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/, /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/, /[\u1E00-\u1FFF]/, /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/, /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/, /[\u2C00-\u2DFF\u2E80-\u2FFF]/, /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/, /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/, /[\uFE47-\uFEFE\uFF00-\uFFFD]/ // Should be /[\uFE47-\uFFFD]/, but we have to exclude FEFF.
// The following characters are also allowed, but the regexes aren't supported yet.
// /[\u{10000}-\u{1FFFD}\u{20000-\u{2FFFD}\u{30000}-\u{3FFFD}\u{40000}-\u{4FFFD}]/u,
// /[\u{50000}-\u{5FFFD}\u{60000-\u{6FFFD}\u{70000}-\u{7FFFD}\u{80000}-\u{8FFFD}]/u,
// /[\u{90000}-\u{9FFFD}\u{A0000-\u{AFFFD}\u{B0000}-\u{BFFFD}\u{C0000}-\u{CFFFD}]/u,
// /[\u{D0000}-\u{DFFFD}\u{E0000-\u{EFFFD}]/u
);
// Valid characters for identifiers.
exports.identifierCharacter = (0, regex_js_1.either)(exports.identifierHead, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/);
// Valid identifier.
exports.identifier = (0, regex_js_1.concat)(exports.identifierHead, exports.identifierCharacter, '*');
// Valid type identifier.
exports.typeIdentifier = (0, regex_js_1.concat)(/[A-Z]/, exports.identifierCharacter, '*');
// Built-in attributes, which are highlighted as keywords.
// @available is handled separately.
exports.keywordAttributes = [
    'autoclosure',
    (0, regex_js_1.concat)(/convention\(/, (0, regex_js_1.either)('swift', 'block', 'c'), /\)/),
    'discardableResult',
    'dynamicCallable',
    'dynamicMemberLookup',
    'escaping',
    'frozen',
    'GKInspectable',
    'IBAction',
    'IBDesignable',
    'IBInspectable',
    'IBOutlet',
    'IBSegueAction',
    'inlinable',
    'main',
    'nonobjc',
    'NSApplicationMain',
    'NSCopying',
    'NSManaged',
    (0, regex_js_1.concat)(/objc\(/, exports.identifier, /\)/),
    'objc',
    'objcMembers',
    'propertyWrapper',
    'requires_stored_property_inits',
    'resultBuilder',
    'testable',
    'UIApplicationMain',
    'unknown',
    'usableFromInline'
];
// Contextual keywords used in @available and #(un)available.
exports.availabilityKeywords = [
    'iOS',
    'iOSApplicationExtension',
    'macOS',
    'macOSApplicationExtension',
    'macCatalyst',
    'macCatalystApplicationExtension',
    'watchOS',
    'watchOSApplicationExtension',
    'tvOS',
    'tvOSApplicationExtension',
    'swift'
];
