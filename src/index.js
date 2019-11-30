"use strict";

module.exports = function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path, options) {
        const {
          opts: { pattern, action }
        } = options;
        if (pattern && action && t.isStringLiteral(path.node.source)) {
          const currentStatement = path.node.source.value;
          const targetSource = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
          if (currentStatement.trim().search(targetSource) >= 0) {
            Object.keys(action)
              .sort()
              .reverse()
              .forEach(key => {
                if (key.toLowerCase() === "add") {
                  path.insertAfter(
                    t.ImportDeclaration([], t.stringLiteral(action[key]))
                  );
                } else if (key.toLowerCase() === "replace") {
                  path.replaceWith(
                    t.ImportDeclaration([], t.stringLiteral(action[key]))
                  );
                }
              });
          }
        }
      }
    }
  };
};
