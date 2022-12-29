"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NUMERIC = void 0;
// https://docs.oracle.com/javase/specs/jls/se15/html/jls-3.html#jls-3.10
var decimalDigits = '[0-9](_*[0-9])*';
var frac = `\\.(${decimalDigits})`;
var hexDigits = '[0-9a-fA-F](_*[0-9a-fA-F])*';
exports.NUMERIC = {
    className: 'number',
    variants: [
        // DecimalFloatingPointLiteral
        // including ExponentPart
        { begin: `(\\b(${decimalDigits})((${frac})|\\.)?|(${frac}))` +
                `[eE][+-]?(${decimalDigits})[fFdD]?\\b` },
        // excluding ExponentPart
        { begin: `\\b(${decimalDigits})((${frac})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
        { begin: `(${frac})[fFdD]?\\b` },
        { begin: `\\b(${decimalDigits})[fFdD]\\b` },
        // HexadecimalFloatingPointLiteral
        { begin: `\\b0[xX]((${hexDigits})\\.?|(${hexDigits})?\\.(${hexDigits}))` +
                `[pP][+-]?(${decimalDigits})[fFdD]?\\b` },
        // DecimalIntegerLiteral
        { begin: '\\b(0|[1-9](_*[0-9])*)[lL]?\\b' },
        // HexIntegerLiteral
        { begin: `\\b0[xX](${hexDigits})[lL]?\\b` },
        // OctalIntegerLiteral
        { begin: '\\b0(_*[0-7])*[lL]?\\b' },
        // BinaryIntegerLiteral
        { begin: '\\b0[bB][01](_*[01])*[lL]?\\b' },
    ],
    relevance: 0
};
