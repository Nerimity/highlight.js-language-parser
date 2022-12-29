"use strict";
/*
Language: VBScript in HTML
Requires: xml.js, vbscript.js
Author: Ivan Sagalaev <maniac@softwaremaniacs.org>
Description: "Bridge" language defining fragments of VBScript in HTML within <% .. %>
Website: https://en.wikipedia.org/wiki/VBScript
Category: scripting
*/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(hljs) {
    return {
        name: 'VBScript in HTML',
        subLanguage: 'xml',
        contains: [
            {
                begin: '<%',
                end: '%>',
                subLanguage: 'vbscript'
            }
        ]
    };
}
exports.default = default_1;
