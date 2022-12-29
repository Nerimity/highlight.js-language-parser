"use strict";
/*
Language: Clojure REPL
Description: Clojure REPL sessions
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Requires: clojure.js
Website: https://clojure.org
Category: lisp
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** @type LanguageFn */
function default_1(hljs) {
    return {
        name: 'Clojure REPL',
        contains: [
            {
                className: 'meta.prompt',
                begin: /^([\w.-]+|\s*#_)?=>/,
                starts: {
                    end: /$/,
                    subLanguage: 'clojure'
                }
            }
        ]
    };
}
exports.default = default_1;
