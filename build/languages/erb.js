"use strict";
/*
Language: ERB (Embedded Ruby)
Requires: xml.js, ruby.js
Author: Lucas Mazza <lucastmazza@gmail.com>
Contributors: Kassio Borges <kassioborgesm@gmail.com>
Description: "Bridge" language defining fragments of Ruby in HTML within <% .. %>
Website: https://ruby-doc.org/stdlib-2.6.5/libdoc/erb/rdoc/ERB.html
Category: template
*/
Object.defineProperty(exports, "__esModule", { value: true });
/** @type LanguageFn */
function default_1(hljs) {
    return {
        name: 'ERB',
        subLanguage: 'xml',
        contains: [
            hljs.COMMENT('<%#', '%>'),
            {
                begin: '<%[%=-]?',
                end: '[%-]?%>',
                subLanguage: 'ruby',
                excludeBegin: true,
                excludeEnd: true
            }
        ]
    };
}
exports.default = default_1;
