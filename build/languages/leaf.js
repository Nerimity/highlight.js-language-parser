"use strict";
/*
Language: Leaf
Author: Hale Chan <halechan@qq.com>
Description: Based on the Leaf reference from https://vapor.github.io/documentation/guide/leaf.html.
*/
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(hljs) {
    return {
        name: 'Leaf',
        contains: [
            {
                className: 'function',
                begin: '#+' + '[A-Za-z_0-9]*' + '\\(',
                end: / \{/,
                returnBegin: true,
                excludeEnd: true,
                contains: [
                    {
                        className: 'keyword',
                        begin: '#+'
                    },
                    {
                        className: 'title',
                        begin: '[A-Za-z_][A-Za-z_0-9]*'
                    },
                    {
                        className: 'params',
                        begin: '\\(',
                        end: '\\)',
                        endsParent: true,
                        contains: [
                            {
                                className: 'string',
                                begin: '"',
                                end: '"'
                            },
                            {
                                className: 'variable',
                                begin: '[A-Za-z_][A-Za-z_0-9]*'
                            }
                        ]
                    }
                ]
            }
        ]
    };
}
exports.default = default_1;
