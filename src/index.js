'use strict';

const targetSource = /^\.\/style(\.js)?$/;
module.exports = function ({ types: t }) {
    return {
        visitor: {
            ImportDeclaration(path, options){
                if (t.isStringLiteral(path.node.source) && path.node.source.value.trim().search(targetSource) >=0) {
                    path.replaceWith( t.ImportDeclaration([], t.stringLiteral( './style.css'))  );
                }
            }
        }    
    }
}