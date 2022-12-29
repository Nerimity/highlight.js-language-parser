"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._rewriteBackreferences = exports.startsWith = exports.countMatchGroups = exports.either = exports.concat = exports.optional = exports.anyNumberOfTimes = exports.lookahead = exports.source = exports.escape = void 0;
/**
 * @param {string} value
 * @returns {RegExp}
 * */
function escape(value) {
    return new RegExp(value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'm');
}
exports.escape = escape;
/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function source(re) {
    if (!re)
        return null;
    if (typeof re === "string")
        return re;
    return re.source;
}
exports.source = source;
/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function lookahead(re) {
    return concat('(?=', re, ')');
}
exports.lookahead = lookahead;
/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function anyNumberOfTimes(re) {
    return concat('(?:', re, ')*');
}
exports.anyNumberOfTimes = anyNumberOfTimes;
/**
 * @param {RegExp | string } re
 * @returns {string}
 */
function optional(re) {
    return concat('(?:', re, ')?');
}
exports.optional = optional;
/**
 * @param {...(RegExp | string) } args
 * @returns {string}
 */
function concat(...args) {
    const joined = args.map((x) => source(x)).join("");
    return joined;
}
exports.concat = concat;
/**
 * @param { Array<string | RegExp | Object> } args
 * @returns {object}
 */
function stripOptionsFromArgs(args) {
    const opts = args[args.length - 1];
    if (typeof opts === 'object' && opts.constructor === Object) {
        args.splice(args.length - 1, 1);
        return opts;
    }
    else {
        return {};
    }
}
/** @typedef { {capture?: boolean} } RegexEitherOptions */
/**
 * Any of the passed expresssions may match
 *
 * Creates a huge this | this | that | that match
 * @param {(RegExp | string)[] | [...(RegExp | string)[], RegexEitherOptions]} args
 * @returns {string}
 */
function either(...args) {
    /** @type { object & {capture?: boolean} }  */
    const opts = stripOptionsFromArgs(args);
    const joined = '('
        + (opts.capture ? "" : "?:")
        + args.map((x) => source(x)).join("|") + ")";
    return joined;
}
exports.either = either;
/**
 * @param {RegExp | string} re
 * @returns {number}
 */
function countMatchGroups(re) {
    return (new RegExp(re.toString() + '|')).exec('').length - 1;
}
exports.countMatchGroups = countMatchGroups;
/**
 * Does lexeme start with a regular expression match at the beginning
 * @param {RegExp} re
 * @param {string} lexeme
 */
function startsWith(re, lexeme) {
    const match = re && re.exec(lexeme);
    return match && match.index === 0;
}
exports.startsWith = startsWith;
// BACKREF_RE matches an open parenthesis or backreference. To avoid
// an incorrect parse, it additionally matches the following:
// - [...] elements, where the meaning of parentheses and escapes change
// - other escape sequences, so we do not misparse escape sequences as
//   interesting elements
// - non-matching or lookahead parentheses, which do not capture. These
//   follow the '(' with a '?'.
const BACKREF_RE = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
// **INTERNAL** Not intended for outside usage
// join logically computes regexps.join(separator), but fixes the
// backreferences so they continue to match.
// it also places each individual regular expression into it's own
// match group, keeping track of the sequencing of those match groups
// is currently an exercise for the caller. :-)
/**
 * @param {(string | RegExp)[]} regexps
 * @param {{joinWith: string}} opts
 * @returns {string}
 */
function _rewriteBackreferences(regexps, { joinWith }) {
    let numCaptures = 0;
    return regexps.map((regex) => {
        numCaptures += 1;
        const offset = numCaptures;
        let re = source(regex);
        let out = '';
        while (re.length > 0) {
            const match = BACKREF_RE.exec(re);
            if (!match) {
                out += re;
                break;
            }
            out += re.substring(0, match.index);
            re = re.substring(match.index + match[0].length);
            if (match[0][0] === '\\' && match[1]) {
                // Adjust the backreference.
                out += '\\' + String(Number(match[1]) + offset);
            }
            else {
                out += match[0];
                if (match[0] === '(') {
                    numCaptures++;
                }
            }
        }
        return out;
    }).map(re => `(${re})`).join(joinWith);
}
exports._rewriteBackreferences = _rewriteBackreferences;
